import { LuLoaderCircle } from "react-icons/lu";


export default function Spinner({ size = "lg", className = "" }) {
    const sizes = {
        sm: "w-5 h-5",
        md: "w-8 h-8",
        lg: "w-12 h-12",
    };

    return (
        <div className={`flex items-center justify-center py-12 ${className}`}>
            <LuLoaderCircle
                className={`${sizes[size]} text-almond-cream-400 animate-spin`}
            />
        </div>
    );
}
