

const COLORS = ["#68d7d1", "#efaa75", "#5bc9c4", "#f4c7a8", "#3ab5b0", "#e89860", "#a8d8b0"];

export default function CategorySpendingChart({ data }) {
    if (!data || data.length === 0) {
        return (
            <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] h-full flex flex-col">
                <p className="text-[#1f1f1f] font-semibold text-[15px] mb-1">Category Spending</p>
                <p className="text-[#7c7c7c] text-xs mb-4">Expense breakdown</p>
                <div className="flex-1 flex items-center justify-center text-[#7c7c7c] text-sm">
                    No data available
                </div>
            </div>
        );
    }

    const maxVal = Math.max(...data.map((d) => d.amount ?? d.total ?? 0), 1);

    return (
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)] h-full flex flex-col">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-[#1f1f1f] font-semibold text-[15px]">Category Spending</p>
                    <p className="text-[#7c7c7c] text-xs mt-0.5">Expense breakdown</p>
                </div>
            </div>


            <div className="flex items-end gap-2 h-36 mt-auto">
                {data.slice(0, 8).map((cat, i) => {
                    const val = cat.amount ?? cat.total ?? 0;
                    const h = (val / maxVal) * 100;
                    const color = COLORS[i % COLORS.length];
                    const label = cat.name ?? cat.category ?? cat._id ?? "Other";
                    return (
                        <div key={label} className="flex-1 flex flex-col items-center gap-1 group">
                            <div className="flex items-end h-28 w-full justify-center">
                                <div
                                    className="w-full rounded-t-md opacity-75 group-hover:opacity-100 transition-all duration-200"
                                    style={{ height: `${Math.max(h, 4)}%`, backgroundColor: color }}
                                    title={`₹${val.toLocaleString("en-IN")}`}
                                />
                            </div>
                            <p className="text-[#7c7c7c] text-[10px] text-center truncate w-full">
                                {label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
