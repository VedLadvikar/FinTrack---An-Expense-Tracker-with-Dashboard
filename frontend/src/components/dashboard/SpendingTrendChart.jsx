import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";


export default function SpendingTrendChart({ data = [] }) {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 text-xs">
                    <p className="text-black-200 font-medium">{label}</p>
                    <p className="text-expense">
                        Spent: ₹{payload[0].value.toLocaleString("en-IN")}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-black-200 mb-4">
                Weekly Spending
            </h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8c7a66" stopOpacity={0.3} />
                                <stop offset="95%" stopColor="#8c7a66" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#554d44" vertical={false} />
                        <XAxis
                            dataKey="week"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a4998e", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a4998e", fontSize: 12 }}
                            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#8c7a66"
                            strokeWidth={2}
                            fill="url(#spendingGradient)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-56 flex items-center justify-center text-sm text-black-600">
                    No spending data yet
                </div>
            )}
        </div>
    );
}
