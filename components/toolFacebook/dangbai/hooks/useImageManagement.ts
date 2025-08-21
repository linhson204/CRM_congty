import {
  uploadImage,
  deleteImage,
} from "../../../../pages/api/toolFacebook/dang-bai/upload";

export const useImageManagement = (
  uploadedImages: any[],
  setUploadedImages: React.Dispatch<React.SetStateAction<any[]>>,
  selectedImages: string[],
  setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>,
  setIsUploadingImages: React.Dispatch<React.SetStateAction<boolean>>,
  setIsDeletingImage: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Kiểm tra số lượng ảnh trước khi upload
      const totalImagesAfterUpload = uploadedImages.length + files.length;
      if (totalImagesAfterUpload > 4) {
        alert("Chỉ được phép tải tối đa 4 ảnh!");
        return;
      }

      setIsUploadingImages(true);

      try {
        const maxFiles = Math.min(files.length, 4 - uploadedImages.length);
        const filesToUpload = Array.from(files).slice(0, maxFiles);

        const uploadResponse = await uploadImage(filesToUpload);

        if (uploadResponse && Array.isArray(uploadResponse)) {
          setUploadedImages((prev) => [...prev, ...uploadResponse]);
          const newImageUrls = uploadResponse.map((img) => img.link || img.url);
          setSelectedImages((prev) => [...prev, ...newImageUrls]);
        } else {
          console.error("❌ Invalid upload response:", uploadResponse);
          alert("Lỗi khi upload ảnh. Vui lòng thử lại!");
        }
      } catch (error) {
        console.error("❌ Error uploading images:", error);
        alert("Lỗi khi upload ảnh. Vui lòng thử lại!");
      } finally {
        setIsUploadingImages(false);
      }
    }
  };

  const removeImage = async (index: number) => {
    try {
      setIsDeletingImage(index);

      const imageToDelete = uploadedImages[index];

      if (imageToDelete && imageToDelete.id) {
        await deleteImage(imageToDelete.id);
      }

      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(`❌ Error deleting image at index ${index}:`, error);

      setSelectedImages((prev) => prev.filter((_, i) => i !== index));
      setUploadedImages((prev) => prev.filter((_, i) => i !== index));

      alert(
        "Có lỗi khi xóa ảnh trên server, nhưng ảnh đã được xóa khỏi danh sách."
      );
    } finally {
      setIsDeletingImage(null);
    }
  };

  return {
    handleImageUpload,
    removeImage,
    uploadedImages,
    setUploadedImages,
    selectedImages,
    setSelectedImages,
    isUploadingImages: false, // This should be managed by modalManagement
    isDeletingImage: null, // This should be managed by modalManagement
  };
};
