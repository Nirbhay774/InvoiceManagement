# 🧾 Invoice Management App

A full-stack Invoice Management system to create, manage, and download customer invoices.  
Built using **React.js** (frontend), **Node.js + Express.js** (backend), and **MongoDB** (local database).

---

## 🚀 Live Demo (Coming Soon!)

> Link to deployed app (when available)

---

## 📦 Project Structure


---

## ⚡ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Nirbhay774/InvoiceManagement.git
cd InvoiceManagement

### 2. Install Frontend
cd frontend
npm install
npm start
Frontend will start on http://localhost:3000

### 3. Install Backend
cd backend
npm install
npm start
Backend will start on http://localhost:5000

###4. Local MongoDB Setup
Make sure MongoDB is installed and running locally.

Start MongoDB server:
mongod
The app will connect to the local database at:


mongodb://localhost:27017/invoiceApp

###5. Environment Variables
Inside the /backend directory, create a .env file:

PORT=5000
MONGODB_URI=mongodb://localhost:27017/invoiceApp
