# 🚀 FinTrack - Premium Expense Tracker & Finance Dashboard

A full-stack, personal finance management application built with the **MERN** stack. Designed with a custom "Dark SaaS" aesthetic, FinTrack allows users to securely authenticate, effortlessly log transactions, and gain actionable insights through real-time Recharts visualizations.

---

## 🌟 Key Features

- **Robust Authentication**: Secure registration and login using JWT (JSON Web Tokens) and bcrypt password hashing.
- **Unified Transaction Management**: Effortlessly track both incomes and expenses with category tagging.
- **Dynamic Analytics Dashboard**: Visual insights into spending habits with interactive charts (Monthly vs Expenses, Category Breakdown, Savings Trend).
- **Premium User Interface**: Custom-built, mobile-first UI using Tailwind CSS v4 featuring a strict `jet-black` and `almond-cream` palette, skeleton loaders, and micro-animations.
- **Excel Export**: Download structured `.xlsx` reports of your financial transactions with built-in summary statistics.

---

## 🛠️ Technology Stack

**Frontend**
- **React.js** (Vite)
- **Tailwind CSS v4**
- **Recharts** (Data Visualization)
- **Axios**
- **React Router Dom**

**Backend**
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose**
- **JWT** (Stateless Authentication)
- **bcrypt** (Password Hashing)
- **xlsx** (Excel report generation)

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Local installation or MongoDB Atlas cluster)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Backend Setup

Open a new terminal window:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory and add the following variables:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup

Open another terminal window:

```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm run dev
```

The application will now be running at `http://localhost:5173`.

---

## 📁 Project Structure

```text
expense-tracker/
├── backend/
│   ├── config/          # DB connection setup
│   ├── controller/      # API Route logic
│   ├── middleware/      # JWT Auth & Error Handling
│   ├── models/          # Mongoose Schemas (User, Transaction)
│   ├── routes/          # Express Routers
│   └── server.js        # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── context/     # Global state (AuthContext)
│   │   ├── pages/       # Route-level components
│   │   ├── services/    # Axios API wrappers
│   │   ├── App.jsx      # Main layout and routing
│   │   └── index.css    # Tailwind entry & custom theme tokens
```

---

## 🔒 Security Practices Implemented
- Passwords are salted and hashed via `bcrypt` before storage.
- JWT verification required for all private API routes via custom Express middleware.
- Mongoose queries explicitly exclude sensitive fields (`.select("-password")`).
- Strict CORS policies and unified global error handlers to prevent stack-trace leaks in production.

---

## 📝 License
This project is open-source and available under the [MIT License](LICENSE).
