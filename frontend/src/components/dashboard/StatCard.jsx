
export default function StatCard({ icon: Icon, label, value, trend, trendLabel, color = "primary" }) {

    const iconStyles = {
        primary: { bg: "bg-[#0b516a]/10", color: "text-[#0b516a]" },
        income:  { bg: "bg-[#68d7d1]/15",  color: "text-[#3ab5b0]" },
        expense: { bg: "bg-[#f4c7a8]/25",  color: "text-[#c97a45]" },
        info:    { bg: "bg-emerald-50",    color: "text-emerald-600" },
    };

    const style = iconStyles[color] ?? iconStyles.primary;

    const formatValue = (val) => {
        if (typeof val !== "number") return val;
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    return (
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_12px_28px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-200">
            <div className="flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-lg ${style.bg} flex items-center justify-center`}>
                    <Icon size={17} className={style.color} strokeWidth={2} />
                </div>
                {trend !== undefined && (
                    <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                            trend >= 0
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-red-50 text-red-500"
                        }`}
                    >
                        {trend >= 0 ? "+" : ""}{trend}%
                    </span>
                )}
            </div>
            <p className="text-[#7c7c7c] text-xs mb-1">{label}</p>
            <p className="text-[#1f1f1f] text-xl font-bold tracking-tight">
                {formatValue(value)}
            </p>
            <p className="text-[#7c7c7c] text-[11px] mt-1">
                {trendLabel || "vs. last month"}
            </p>
        </div>
    );
}
