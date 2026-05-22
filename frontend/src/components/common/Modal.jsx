import { useEffect } from "react";
import { LuX } from "react-icons/lu";


export default function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-lg" }) {

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

            {/* Modal content */}
            <div
                className={`relative w-full ${maxWidth} glass-card p-6 animate-slide-up`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-lg font-semibold text-black-50">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-jet-black-800 text-black-400 hover:text-black-50 transition-colors cursor-pointer"
                    >
                        <LuX className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                {children}
            </div>
        </div>
    );
}
