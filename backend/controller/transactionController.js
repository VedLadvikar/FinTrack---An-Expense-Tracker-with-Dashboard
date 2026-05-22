import Transaction from "../models/transactionModel.js";

const addTransaction = async (req, res) => {
    const userId = req.user._id;
    const { amount, type, category, description, date } = req.body;

    try {
        const transaction = await Transaction.create({
            userId,
            amount,
            type,
            category,
            description,
            date: new Date(date),
        });

        res.status(201).json({
            success: true,
            message: "Transaction added successfully",
            data: { transaction },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const getTransactions = async (req, res) => {
    const userId = req.user._id;
    const {
        page = 1,
        limit = 10,
        type,
        category,
        search,
        startDate,
        endDate,
    } = req.query;

    try {
        const filter = { userId };

        if (type && type !== "all") {
            filter.type = type;
        }

        if (category && category !== "all") {
            filter.category = category;
        }

        if (search) {
            filter.description = { $regex: search, $options: "i" };
        }

        if (startDate || endDate) {
            filter.date = {};
            if (startDate) filter.date.$gte = new Date(startDate);
            if (endDate) filter.date.$lte = new Date(endDate);
        }

        const pageNum = parseInt(page, 10);
        const limitNum = parseInt(limit, 10);
        const skip = (pageNum - 1) * limitNum;

        const [transactions, total] = await Promise.all([
            Transaction.find(filter)
                .sort({ date: -1, createdAt: -1 })
                .skip(skip)
                .limit(limitNum)
                .lean(),
            Transaction.countDocuments(filter),
        ]);

        res.json({
            success: true,
            data: {
                transactions,
                pagination: {
                    page: pageNum,
                    limit: limitNum,
                    total,
                    pages: Math.ceil(total / limitNum),
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

const updateTransaction = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { amount, type, category, description, date } = req.body;

    try {
        const transaction = await Transaction.findOne({ _id: id, userId });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        transaction.amount = amount;
        transaction.type = type;
        transaction.category = category;
        transaction.description = description;
        transaction.date = new Date(date);

        await transaction.save();

        res.json({
            success: true,
            message: "Transaction updated successfully",
            data: { transaction },
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

const deleteTransaction = async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;

    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: id,
            userId,
        });

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found",
            });
        }

        res.json({
            success: true,
            message: "Transaction deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export { addTransaction, getTransactions, updateTransaction, deleteTransaction };
