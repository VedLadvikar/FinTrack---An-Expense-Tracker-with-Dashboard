
export default function StatCard({ icon: Icon, label, value, trend, trendLabel, color = "primary" }) {
    const colorMap = {
        primary: {
            bg: "bg-jet-black-900 border-jet-black-800",
            icon: "text-almond-cream-400",
        },
        income: {
            bg: "bg-jet-black-900 border-jet-black-800",
            icon: "text-income",
        },
        expense: {
            bg: "bg-jet-black-900 border-jet-black-800",
            icon: "text-expense",
        },
        info: {
            bg: "bg-jet-black-900 border-jet-black-800",
            icon: "text-khaki-beige-400",
        },
    };

    const colors = colorMap[color] || colorMap.primary;

    const formatValue = (val) => {
        if (typeof val !== "number") return val;
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="glass-card p-5 relative overflow-hidden animate-fade-in hover-card">
            <div className="relative">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-sm text-black-400 font-medium">{label}</p>
                    <div className={`w-9 h-9 rounded-lg border ${colors.bg} flex items-center justify-center shadow-sm`}>
                        <Icon className={`w-5 h-5 ${colors.icon}`} />
                    </div>
                </div>
                <p className="text-2xl font-bold text-black-50 mb-1">
                    {formatValue(value)}
                </p>
                {trend !== undefined && (
                    <p className={`text-xs font-medium ${trend >= 0 ? "text-income" : "text-expense"}`}>
                        {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}% {trendLabel || "vs last month"}
                    </p>
                )}
            </div>
        </div>
    );
}
