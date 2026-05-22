import mongoose from "mongoose";
import Transaction from "../models/transactionModel.js";

const getDashboard = async (req, res) => {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const now = new Date();

    const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
    const fourWeeksAgo = new Date(now);
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28);

    const currentMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const previousMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const previousMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59);

    try {
        const [
            financialSummary,
            monthlyData,
            categoryBreakdown,
            weeklySpending,
            recentTransactions,
            currentMonthData,
            previousMonthData,
        ] = await Promise.all([
            Transaction.aggregate([
                { $match: { userId } },
                {
                    $group: {
                        _id: "$type",
                        total: { $sum: "$amount" },
                    },
                },
            ]),

            Transaction.aggregate([
                {
                    $match: {
                        userId,
                        date: { $gte: sixMonthsAgo },
                    },
                },
                {
                    $group: {
                        _id: {
                            year: { $year: "$date" },
                            month: { $month: "$date" },
                            type: "$type",
                        },
                        total: { $sum: "$amount" },
                    },
                },
                { $sort: { "_id.year": 1, "_id.month": 1 } },
            ]),

            Transaction.aggregate([
                { $match: { userId, type: "expense" } },
                {
                    $group: {
                        _id: "$category",
                        total: { $sum: "$amount" },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { total: -1 } },
            ]),

            Transaction.aggregate([
                {
                    $match: {
                        userId,
                        type: "expense",
                        date: { $gte: fourWeeksAgo },
                    },
                },
                {
                    $group: {
                        _id: {
                            week: { $isoWeek: "$date" },
                            year: { $isoWeekYear: "$date" },
                        },
                        total: { $sum: "$amount" },
                        count: { $sum: 1 },
                    },
                },
                { $sort: { "_id.year": 1, "_id.week": 1 } },
            ]),

            Transaction.find({ userId })
                .sort({ date: -1, createdAt: -1 })
                .limit(5)
                .lean(),

            Transaction.aggregate([
                {
                    $match: {
                        userId,
                        date: { $gte: currentMonthStart },
                    },
                },
                {
                    $group: {
                        _id: "$type",
                        total: { $sum: "$amount" },
                    },
                },
            ]),

            Transaction.aggregate([
                {
                    $match: {
                        userId,
                        date: {
                            $gte: previousMonthStart,
                            $lte: previousMonthEnd,
                        },
                    },
                },
                {
                    $group: {
                        _id: "$type",
                        total: { $sum: "$amount" },
                    },
                },
            ]),
        ]);

        let totalIncome = 0;
        let totalExpense = 0;
        financialSummary.forEach((item) => {
            if (item._id === "income") totalIncome = item.total;
            if (item._id === "expense") totalExpense = item.total;
        });
        const balance = totalIncome - totalExpense;

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const monthlyChart = [];
        const monthlyMap = {};

        monthlyData.forEach((item) => {
            const key = `${item._id.year}-${item._id.month}`;
            if (!monthlyMap[key]) {
                monthlyMap[key] = {
                    month: monthNames[item._id.month - 1],
                    year: item._id.year,
                    income: 0,
                    expense: 0,
                };
            }
            monthlyMap[key][item._id.type] = item.total;
        });

        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
            if (monthlyMap[key]) {
                monthlyChart.push(monthlyMap[key]);
            } else {
                monthlyChart.push({
                    month: monthNames[d.getMonth()],
                    year: d.getFullYear(),
                    income: 0,
                    expense: 0,
                });
            }
        }

        const savingsTrend = monthlyChart.map((m) => ({
            month: m.month,
            savings: m.income - m.expense,
        }));

        const categoryData = categoryBreakdown.map((item) => ({
            name: item._id,
            value: item.total,
            count: item.count,
        }));

        const highestExpenseCategory = categoryBreakdown.length > 0
            ? { name: categoryBreakdown[0]._id, amount: categoryBreakdown[0].total }
            : null;

        const weeklyData = weeklySpending.map((item) => ({
            week: `W${item._id.week}`,
            amount: item.total,
            transactions: item.count,
        }));

        let currentIncome = 0, currentExpense = 0;
        currentMonthData.forEach((item) => {
            if (item._id === "income") currentIncome = item.total;
            if (item._id === "expense") currentExpense = item.total;
        });

        let prevIncome = 0, prevExpense = 0;
        previousMonthData.forEach((item) => {
            if (item._id === "income") prevIncome = item.total;
            if (item._id === "expense") prevExpense = item.total;
        });

        const incomeChange = prevIncome > 0
            ? (((currentIncome - prevIncome) / prevIncome) * 100).toFixed(1)
            : currentIncome > 0 ? 100 : 0;

        const expenseChange = prevExpense > 0
            ? (((currentExpense - prevExpense) / prevExpense) * 100).toFixed(1)
            : currentExpense > 0 ? 100 : 0;

        const monthlySavingsPercentage = currentIncome > 0
            ? (((currentIncome - currentExpense) / currentIncome) * 100).toFixed(1)
            : 0;

        res.json({
            success: true,
            data: {
                totalIncome,
                totalExpense,
                balance,
                monthlySavingsPercentage: parseFloat(monthlySavingsPercentage),
                highestExpenseCategory,
                monthlyChart,
                categoryData,
                weeklyData,
                savingsTrend,
                recentTransactions,
                monthlyComparison: {
                    currentMonth: {
                        income: currentIncome,
                        expense: currentExpense,
                    },
                    previousMonth: {
                        income: prevIncome,
                        expense: prevExpense,
                    },
                    incomeChange: parseFloat(incomeChange),
                    expenseChange: parseFloat(expenseChange),
                },
            },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export { getDashboard };
