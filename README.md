# Employee Task Management System

A full-stack web application designed for organization-level task delegation, progress monitoring, and daily reporting. The system provides role-based workspaces tailored specifically for managers and employees.

## 🌐 Live Demo

- **Frontend**: [https://task-manager-app-154s.onrender.com](https://task-manager-app-154s.onrender.com)
- **Backend API**: [https://task-manager-app-backend-73ci.onrender.com](https://task-manager-app-backend-73ci.onrender.com)

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19 (Vite-powered)
- **Styling:** Tailwind CSS v4
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **Notifications:** React Hot Toast
- **Date Handling:** date-fns

### Backend
- **Runtime:** Node.js (v20.18.0)
- **Framework:** Express v5
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs

---

## ✨ Features

### 🔑 Authentication & Role-Based Access
- Secure signup and login workflow with JWT tokens
- Route guards preventing unauthorized role access
- Secure token-based session persistence
- Password hashing with bcryptjs

### 📋 Manager Workspace
- **Dashboard Overview:** Displays high-level analytics including total tasks, pending vs completed tasks, active employees, and daily report submission rates
- **Employee Management:** Complete Card view of all employees with Info, search functionality, and detailed individual analytics
- **Task Delegation:** Create, view, update, and delete tasks for specific employees with custom descriptions and due dates
- **Report Verification:** View and review daily reports submitted by employees

### 💻 Employee Workspace
- **Dashboard Summary:** Clean visualization of personal task completion metrics
- **My Tasks:** Interactively view assigned tasks with manager name display, update status values (Pending, In Progress, Review, Completed)
- **Daily Reports:** Submit structured daily activity logs with work summary and blockers
- **Report History:** View all submitted reports with date-wise filtering

### 🌟 Bonus Features Implemented
- ✅ **Search & Filters** - Search tasks/reports by title, description, or employee name
- ✅ **Pagination** - Efficient data loading for task lists
- ✅ **Manager Assignment Display** - Employees can see who assigned each task
- ✅ **Responsive Design** - Fully responsive UI that works on all device sizes
- ✅ **Modern UI** - Beautiful gradient designs with smooth animations

---
## 👥 Demo Credentials

| Role | Email | Password | Name |
|------|-------|----------|------|
| **Manager** | `manager@example.com` | `123456` | Manager ABC |
| **Employee** | `tejaswaghamare121@gmail.com` | `123456` | Tejas Devidas Waghamare |

> 💡 **Note:** Use these credentials to log in and test the application. The Manager has access to all management features, while the Employee can view assigned tasks and submit daily reports.

> ⚠️ **Important:** The live demo uses a free Render instance. The backend may take 20-30 seconds to wake up on first request. Please wait a moment after login.