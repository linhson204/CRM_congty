// components/FacebookToast.tsx
import toast from "react-hot-toast";
import { FaBell } from "react-icons/fa";

export const FacebookToast = (title: string, message: string) => {
    toast.custom((t) => (
        <div
        className={`${
            t.visible ? "animate-enter" : "animate-leave"
        } max-w-md w-full bg-[#242526] shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
        <div className="flex-1 w-0 p-4">
            <div className="flex items-start">
            {/* Icon chuông xanh Facebook */}
            <div className="flex-shrink-0 pt-0.5">
                <FaBell className="h-6 w-6 text-[#1877F2]" />
            </div>
            {/* Nội dung */}
            <div className="ml-3 flex-1">
                <p className="text-sm font-medium text-white">{title}</p>
                <p className="mt-1 text-sm text-gray-300">{message}</p>
            </div>
            </div>
        </div>
        </div>
    ));
};
