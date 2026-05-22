
export default function Input({
    label,
    id,
    type = "text",
    value,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    className = "",
    ...props
}) {
    return (
        <div className={`flex flex-col gap-1.5 ${className}`}>
            {label && (
                <label
                    htmlFor={id}
                    className="text-sm font-medium text-black-200"
                >
                    {label}
                    {required && <span className="text-stone-brown-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={`w-full px-4 py-2 bg-jet-black-900 border rounded-lg text-black-50 placeholder-black-600 outline-none transition-all duration-150 text-sm shadow-sm ${
                    error
                        ? "border-stone-brown-500 focus:border-stone-brown-500 focus:ring-1 focus:ring-stone-brown-500"
                        : "border-black-700 focus:border-almond-cream-400 focus:ring-1 focus:ring-almond-cream-400 hover:border-black-600"
                }`}
                {...props}
            />
            {error && (
                <p className="text-xs text-stone-brown-500 mt-0.5">{error}</p>
            )}
        </div>
    );
}
