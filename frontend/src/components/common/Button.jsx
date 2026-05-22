import { LuLoaderCircle } from "react-icons/lu";


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
    const base =
        "inline-flex items-center justify-center gap-2 font-medium rounded-lg px-5 py-2.5 transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed text-sm active:scale-[0.98] hover:scale-[1.02] hover:shadow-md";

    const variants = {
        primary:
            "bg-almond-cream-400 hover:bg-almond-cream-500 text-white shadow-sm border border-transparent",
        secondary:
            "bg-jet-black-900 hover:bg-jet-black-800 text-black-50 border border-black-700 shadow-sm",
        danger:
            "bg-stone-brown-500 hover:bg-stone-brown-500 text-white shadow-sm border border-transparent",
        ghost:
            "bg-transparent hover:bg-jet-black-900 text-black-200 hover:text-black-50",
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`${base} ${variants[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
        >
            {loading && <LuLoaderCircle className="w-4 h-4 animate-spin" />}
            {children}
        </button>
    );
}
