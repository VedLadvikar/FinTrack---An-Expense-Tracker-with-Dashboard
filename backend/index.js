import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const corsOptions = {
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173",
    "https://fin-track-an-expense-tracker-with-d.vercel.app/" // fallback just in case
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

const app = express();
app.use(cors(corsOptions)); // This handles preflight globally in Express 5

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/user", userRouter)
app.use("/api/transactions", transactionRouter)
app.use("/api/dashboard", dashboardRouter)
app.use("/api/reports", reportRouter)

app.get('/', (req, res) => {
    res.send("API IS WORKING")
})

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
}) 
