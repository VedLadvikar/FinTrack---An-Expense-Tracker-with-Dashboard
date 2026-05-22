import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";


export default function IncomeExpenseChart({ data = [] }) {
    const formatCurrency = (value) => {
        return `₹${(value / 1000).toFixed(0)}k`;
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="glass-card p-3 text-xs">
                    <p className="text-black-200 font-medium mb-2">{label}</p>
                    {payload.map((entry, index) => (
                        <p key={index} style={{ color: entry.color }} className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                            {entry.name}: ₹{entry.value.toLocaleString("en-IN")}
                        </p>
                    ))}
                </div>
            );
        }
        return null;
    };

    return (
        <div className="glass-card p-5 animate-fade-in">
            <h3 className="text-sm font-semibold text-black-200 mb-4">
                Income vs Expense
            </h3>
            {data.length > 0 ? (
                <ResponsiveContainer width="100%" height={280}>
                    <BarChart data={data} barGap={4}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#554d44" vertical={false} />
                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a4998e", fontSize: 12 }}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#a4998e", fontSize: 12 }}
                            tickFormatter={formatCurrency}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(148, 163, 184, 0.05)" }} />
                        <Legend
                            iconType="circle"
                            iconSize={8}
                            wrapperStyle={{ fontSize: "12px", color: "#a4998e" }}
                        />
                        <Bar dataKey="income" name="Income" fill="#6b8c73" radius={[6, 6, 0, 0]} maxBarSize={40} />
                        <Bar dataKey="expense" name="Expense" fill="#8c7a66" radius={[6, 6, 0, 0]} maxBarSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            ) : (
                <div className="h-56 flex items-center justify-center text-sm text-black-600">
                    No data available yet
                </div>
            )}
        </div>
    );
}
