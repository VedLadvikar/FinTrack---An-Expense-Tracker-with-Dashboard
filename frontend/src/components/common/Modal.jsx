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
            <div className="absolute inset-0 bg-[#1f1f1f]/40 backdrop-blur-sm" />

            {/* Modal panel */}
            <div
                className={`relative w-full ${maxWidth} bg-[#faf9f7] border border-[#ece7e2] rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] p-6 animate-slide-up`}
                onClick={(e) => e.stopPropagation()}
                style={{ animation: "slide-up 0.25s ease-out" }}
            >
                <div className="flex items-center justify-between mb-5">
                    <h2 className="text-base font-semibold text-[#1f1f1f]">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-[#ece7e2] text-[#7c7c7c] hover:text-[#1f1f1f] transition-colors cursor-pointer"
                    >
                        <LuX className="w-4 h-4" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
