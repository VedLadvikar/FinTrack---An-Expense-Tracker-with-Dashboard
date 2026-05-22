import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import dashboardService from "../services/dashboardService";
import StatCard from "../components/dashboard/StatCard";
import IncomeExpenseChart from "../components/dashboard/IncomeExpenseChart";
import CategoryPieChart from "../components/dashboard/CategoryPieChart";
import SpendingTrendChart from "../components/dashboard/SpendingTrendChart";
import SavingsTrendChart from "../components/dashboard/SavingsTrendChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import MonthlyComparison from "../components/dashboard/MonthlyComparison";
import { SkeletonCard, SkeletonChart } from "../components/common/Skeleton";
import { LuWallet, LuTrendingUp, LuTrendingDown, LuPiggyBank } from "react-icons/lu";


export default function DashboardPage() {
    const { user } = useAuth();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboard = async () => {
            try {
                const response = await dashboardService.getDashboard();
                if (response.success) {
                    setData(response.data);
                }
            } catch (error) {
                console.error("Failed to load dashboard:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDashboard();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-black-50 mb-1">Dashboard</h1>
                    <p className="text-sm text-black-400">Your financial overview</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonChart key={i} />)}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-black-50 mb-1">
                        Welcome back, {user?.name?.split(" ")[0] || "User"} 👋
                    </h1>
                    <p className="text-sm text-black-400">
                        Here's your financial overview for {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    icon={LuWallet}
                    label="Total Balance"
                    value={data?.balance || 0}
                    color="primary"
                />
                <StatCard
                    icon={LuTrendingUp}
                    label="Total Income"
                    value={data?.totalIncome || 0}
                    trend={data?.monthlyComparison?.incomeChange}
                    color="income"
                />
                <StatCard
                    icon={LuTrendingDown}
                    label="Total Expense"
                    value={data?.totalExpense || 0}
                    trend={data?.monthlyComparison?.expenseChange}
                    color="expense"
                />
                <StatCard
                    icon={LuPiggyBank}
                    label="Savings Rate"
                    value={`${data?.monthlySavingsPercentage || 0}%`}
                    trendLabel="this month"
                    color="info"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <IncomeExpenseChart data={data?.monthlyChart} />
                <CategoryPieChart data={data?.categoryData} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <SpendingTrendChart data={data?.weeklyData} />
                <RecentTransactions transactions={data?.recentTransactions} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <MonthlyComparison data={data?.monthlyComparison} />
                    {data?.highestExpenseCategory && (
                        <div className="glass-card p-5 animate-fade-in hover-card">
                            <h3 className="text-sm font-semibold text-black-200 mb-3">
                                Highest Expense Category
                            </h3>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-expense/5 border border-expense/10">
                                <span className="text-sm text-black-200">
                                    {data.highestExpenseCategory.name}
                                </span>
                                <span className="text-sm font-bold text-expense">
                                    ₹{data.highestExpenseCategory.amount.toLocaleString("en-IN")}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
                <SavingsTrendChart data={data?.savingsTrend} />
            </div>
        </div>
    );
}
