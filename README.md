
---

### ✅ `frontend/README.md`

# Student Management System - Frontend

This is the **frontend** of the Student Management System built using **React**, **Redux Toolkit**, and **Tailwind CSS**. It connects to a secure Node.js backend and enables Super Admins and Staff to manage student and staff records.

---

## 🚀 Deployment

### 🔗 Hosted Application:
Frontend: [https://student-management-frontend-peach.vercel.app](https://student-management-frontend-peach.vercel.app)  
Backend: [https://student-management-backend-6ecp.onrender.com](https://student-management-backend-6ecp.onrender.com)

---

## 👥 Roles and Credentials

### 🔐 Super Admin (default user)
- **Email:** `admin@gmail.com`
- **Password:** `123456`

### 👤 Staff User
- **Email:** `staff@gmail.com`
- **Password:** `123456`



## ⚙️ Features

- Super Admin & Staff login
- Dashboard with role-based UI
- Student CRUD operations
- Staff management with permission assignment
- Real-time permission control
- Secure Axios interceptor with token refresh
- Responsive UI with Tailwind CSS

---

## 🧭 Routes in App

| Route         | Role Access     | Description                           |
|---------------|------------------|---------------------------------------|
| `/login`      | Public           | Login page                            |
| `/dashboard`  | Admin / Staff    | Main dashboard                        |
| `/students`   | Admin / Staff    | View/add/edit/delete students         |
| `/staffs`     | Admin only       | Manage staff and set permissions      |

---

## 👥 Role Permissions Logic

### 🔐 Super Admin
- ✅ Full access to both **students** and **staff**
- ✅ Can add, edit, delete students
- ✅ Can add staff and assign permissions

### 👤 Staff
- 👀 Initially only has **view access** to students
- 📝 **Create/Edit/Delete** actions must be granted by the **Super Admin**

✅ Permissions:
- View: Can see student data
- Create: Can add new students
- Edit: Can update student records
- Delete: Can remove student records



## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/student-management-frontend.git
cd student-management-frontend
```

### 2. Install Dependencies

```bash
npm install

```

### 3. Environment Setup

Create a .env file:

```
VITE_API_BASE_URL=https://student-management-backend-6ecp.onrender.com/api
```

### 4. Run Frontend

```npm run dev```
