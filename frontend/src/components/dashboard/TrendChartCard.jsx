import { useState } from "react";


function buildPath(data, width, height, padX, padY) {
    if (!data || data.length < 2) return "";
    const max = Math.max(...data);
    const min = Math.min(...data) * 0.85;
    const range = max - min || 1;
    const points = data.map((v, i) => {
        const x = padX + (i / (data.length - 1)) * (width - padX * 2);
        const y = padY + (1 - (v - min) / range) * (height - padY * 2);
        return [x, y];
    });
    let d = `M ${points[0][0]} ${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const cpx = (prev[0] + curr[0]) / 2;
        d += ` C ${cpx} ${prev[1]}, ${cpx} ${curr[1]}, ${curr[0]} ${curr[1]}`;
    }
    return d;
}

function buildArea(data, width, height, padX, padY) {
    const path = buildPath(data, width, height, padX, padY);
    if (!path) return "";
    const lastX = padX + width - padX * 2;
    const firstX = padX;
    return `${path} L ${lastX} ${height - padY} L ${firstX} ${height - padY} Z`;
}

export default function TrendChartCard({ data }) {
    const [tooltip, setTooltip] = useState(null);
    const [period, setPeriod] = useState("1Y");

    const W = 520;
    const H = 180;
    const padX = 20;
    const padY = 16;


    const allMonths = data?.map((d) => d.month) ?? [];
    const allIncome = data?.map((d) => d.income ?? 0) ?? [];
    const allExpense = data?.map((d) => d.expense ?? 0) ?? [];

    const displayMonths = period === "6M" ? allMonths.slice(-6) : allMonths;
    const displayIncome = period === "6M" ? allIncome.slice(-6) : allIncome;
    const displayExpense = period === "6M" ? allExpense.slice(-6) : allExpense;

    const hasData = displayIncome.length >= 2;

    const incomeArea   = buildArea(displayIncome, W, H, padX, padY);
    const expenseArea  = buildArea(displayExpense, W, H, padX, padY);
    const incomePath   = buildPath(displayIncome, W, H, padX, padY);
    const expensePath  = buildPath(displayExpense, W, H, padX, padY);

    const handleMouseMove = (e) => {
        if (!hasData) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const svgX = ((e.clientX - rect.left) / rect.width) * W;
        const idx = Math.round(((svgX - padX) / (W - padX * 2)) * (displayIncome.length - 1));
        const ci = Math.max(0, Math.min(displayIncome.length - 1, idx));
        const x = padX + (ci / (displayIncome.length - 1)) * (W - padX * 2);
        setTooltip({ x, month: displayMonths[ci], income: displayIncome[ci], expense: displayExpense[ci] });
    };

    return (
        <div className="bg-[#faf9f7] border border-[#ece7e2] rounded-xl p-5 shadow-[0px_8px_20px_rgba(0,0,0,0.04)]">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-[#1f1f1f] font-semibold text-[15px]">Cash Flow</p>
                    <p className="text-[#7c7c7c] text-xs mt-0.5">Income vs. Expenses</p>
                </div>
                <div className="flex items-center gap-1">
                    {(["6M", "1Y"]).map((p) => (
                        <button
                            key={p}
                            onClick={() => setPeriod(p)}
                            className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all duration-150 ${
                                period === p
                                    ? "bg-[#0b516a] text-white"
                                    : "text-[#7c7c7c] hover:text-[#1f1f1f] hover:bg-[#ece7e2]"
                            }`}
                        >
                            {p}
                        </button>
                    ))}
                </div>
            </div>


            <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 rounded-full bg-[#68d7d1] inline-block" />
                    <span className="text-[#7c7c7c] text-xs">Income</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="w-3 h-0.5 rounded-full bg-[#efaa75] inline-block" />
                    <span className="text-[#7c7c7c] text-xs">Expenses</span>
                </div>
            </div>

            <div className="relative">
                {hasData ? (
                    <svg
                        viewBox={`0 0 ${W} ${H}`}
                        className="w-full"
                        style={{ height: 180 }}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setTooltip(null)}
                    >
                        <defs>
                            <linearGradient id="ftIncomeGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor="#68d7d1" stopOpacity="0.22" />
                                <stop offset="100%" stopColor="#68d7d1" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="ftExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%"   stopColor="#f4c7a8" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#f4c7a8" stopOpacity="0" />
                            </linearGradient>
                        </defs>


                        {[0.25, 0.5, 0.75].map((t) => (
                            <line key={t}
                                x1={padX} y1={padY + t * (H - padY * 2)}
                                x2={W - padX} y2={padY + t * (H - padY * 2)}
                                stroke="#ece7e2" strokeWidth="1"
                            />
                        ))}


                        <path d={incomeArea}  fill="url(#ftIncomeGrad)" />
                        <path d={expenseArea} fill="url(#ftExpenseGrad)" />


                        <path d={incomePath}  fill="none" stroke="#68d7d1" strokeWidth="2" strokeLinecap="round" />
                        <path d={expensePath} fill="none" stroke="#efaa75" strokeWidth="2" strokeLinecap="round" />


                        {tooltip && (
                            <line
                                x1={tooltip.x} y1={padY}
                                x2={tooltip.x} y2={H - padY}
                                stroke="#ece7e2" strokeWidth="1" strokeDasharray="3,3"
                            />
                        )}


                        {displayMonths.map((m, i) => {
                            if (displayMonths.length > 6 && i % 2 !== 0) return null;
                            const x = padX + (i / (displayMonths.length - 1)) * (W - padX * 2);
                            return (
                                <text key={m} x={x} y={H - 2} textAnchor="middle"
                                    style={{ fill: "#7c7c7c", fontSize: 10 }}>
                                    {m}
                                </text>
                            );
                        })}
                    </svg>
                ) : (
                    <div className="flex items-center justify-center h-[180px] text-[#7c7c7c] text-sm">
                        Not enough data to render chart
                    </div>
                )}


                {tooltip && (
                    <div
                        className="absolute bg-[#1f1f1f] text-white text-xs rounded-lg px-3 py-2 pointer-events-none shadow-lg"
                        style={{
                            left: `${(tooltip.x / W) * 100}%`,
                            top: 0,
                            transform: "translateX(-50%)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <p className="font-medium mb-1">{tooltip.month}</p>
                        <p className="text-[#68d7d1]">
                            Income: ₹{tooltip.income?.toLocaleString("en-IN")}
                        </p>
                        <p className="text-[#efaa75]">
                            Expense: ₹{tooltip.expense?.toLocaleString("en-IN")}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
