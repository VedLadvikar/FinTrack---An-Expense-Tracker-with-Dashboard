import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import transactionRouter from './routes/transactionRoutes.js';
import dashboardRouter from './routes/dashboardRoutes.js';
import reportRouter from './routes/reportRoutes.js';
import errorHandler from './middleware/errorHandler.js';

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://fin-track-an-expense-tracker-with-d.vercel.app/"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
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

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port http://localhost:${process.env.PORT}`)
}) 
