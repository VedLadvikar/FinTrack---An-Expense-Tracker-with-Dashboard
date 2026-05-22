import Transaction from "../models/transactionModel.js";
import * as XLSX from "xlsx";

const exportReport = async (req, res) => {
    const userId = req.user._id;
    const { startDate, endDate, type, category } = req.query;

    try {
        const filter = { userId };

        if (type && type !== "all") {
            filter.type = type;
        }

        if (category && category !== "all") {
            filter.category = category;
        }

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const transactions = await Transaction.find(filter)
            .sort({ date: -1 })
            .lean();

        const excelData = transactions.map((t) => ({
            Date: new Date(t.date).toLocaleDateString("en-IN", {
                year: "numeric",
                month: "short",
                day: "numeric",
            }),
            Type: t.type.charAt(0).toUpperCase() + t.type.slice(1),
            Category: t.category,
            Description: t.description,
            Amount: t.amount,
        }));

        const totalIncome = transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);

        excelData.push({});
        excelData.push({ Date: "SUMMARY", Type: "", Category: "", Description: "Total Income", Amount: totalIncome });
        excelData.push({ Date: "", Type: "", Category: "", Description: "Total Expense", Amount: totalExpense });
        excelData.push({ Date: "", Type: "", Category: "", Description: "Net Balance", Amount: totalIncome - totalExpense });

        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(excelData);

        worksheet["!cols"] = [
            { wch: 15 },
            { wch: 10 },
            { wch: 15 },
            { wch: 30 },
            { wch: 12 },
        ];

        XLSX.utils.book_append_sheet(workbook, worksheet, "Transactions");

        const buffer = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=expense-report.xlsx");
        res.send(buffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export { exportReport };
