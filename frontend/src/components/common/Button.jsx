import { LuLoaderCircle } from "react-icons/lu";

const BASE =
    "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-[0.97] select-none";

const VARIANTS = {
    primary:
        "bg-[#0b516a] hover:bg-[#084b63] text-white shadow-sm px-4 py-2",
    accent:
        "bg-[#efaa75] hover:bg-[#c97a45] text-white shadow-sm px-4 py-2",
    secondary:
        "bg-[#faf9f7] hover:bg-[#ece7e2] text-[#1f1f1f] border border-[#ece7e2] shadow-sm px-4 py-2",
    danger:
        "bg-red-500 hover:bg-red-600 text-white shadow-sm px-4 py-2",
    ghost:
        "bg-transparent hover:bg-[#ece7e2] text-[#7c7c7c] hover:text-[#1f1f1f] px-3 py-1.5",
};

export default function Button({
    children,
    onClick,
    type = "button",
    variant = "primary",
    className = "",
    loading = false,
    disabled = false,
    fullWidth = false,
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${BASE} ${VARIANTS[variant] ?? VARIANTS.primary} ${fullWidth ? "w-full" : ""} ${className}`}
        >
            {loading && <LuLoaderCircle className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
