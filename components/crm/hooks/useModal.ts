import React, { useState, useEffect } from "react";

const useModal = (className: any | string, targetIcon: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {

    // if (isOpen) return
    const handleClickOutside = (e: any) => {
      if (!className) return
      const parentNode = document?.querySelector(`.${className}`);
      if (!parentNode?.contains(e.target) && (!targetIcon?.some((item: any) => item === e.target.getAttribute("class")))) {
        setIsOpen(false)
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return { isOpen, openModal, closeModal, toggleModal };
};

export default useModal;
