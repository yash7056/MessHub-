# MessHub - Hyperlocal Mess Finder & Menu Management Platform

MessHub is a full-stack web application designed for students and working professionals to discover hyperlocal mess services (tiffin centers/diners), view real-time daily menus, compare meal pricing, read verified community reviews, and get navigation directions. It also provides mess owners (sellers) with an intuitive dashboard to manage their daily menu schedule, pricing, availability, and review feedback.

---

## 🚀 Key Features

### For Students (Customers)
- **Hyperlocal Discovery**: Find nearby messes based on distance.
- **Real-time Status**: View whether a mess is open and accepting orders.
- **Daily Menu Tracking**: Check today's scheduled lunch and dinner menus before visiting.
- **Advanced Sorting & Filtering**: Filter by maximum distance, minimum rating, budget cap, and food category (Vegetarian vs. Non-Vegetarian). Sort by rating, distance, or pricing.
- **Interactive Review System**: Read customer reviews and submit rating feedback directly to the database.
- **Directions & Contact**: Instant navigation links via Google Maps API and direct phone calls.

### For Mess Owners (Sellers)
- **Menu Management**: Dynamic lunch and dinner menu builder (add, edit, or delete items).
- **Pricing & Category Controls**: Set customizable meal pricing and mark the establishment as pure Vegetarian or Mixed.
- **Instant Status Toggle**: Open or close the mess with a single click (immediately updates customer view).
- **Settings Dashboard**: Edit contact details, address location, and mess name.
- **Reviews Monitor**: View and track customer reviews in real-time.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite, Lucide React (Icons).
- **Backend**: Node.js, Express.js, REST API Architecture, JSON Web Tokens (JWT) Authentication, CORS.
- **Database**: MongoDB, Mongoose (Object Data Modeling).

---

## 📂 Project Architecture

```
FEP/
├── frontend/                 # React Frontend Application
│   ├── src/                  # Components, contexts, services, etc.
│   ├── index.html            # Frontend HTML entry point
│   ├── package.json          # Frontend packages
│   └── [configurations...]   # Vite, Tailwind, TS config files
├── backend/                  # Node.js/Express Backend Server
│   ├── routes/               # API Routes
│   │   ├── auth.js           # JWT Registration & Login Routes
│   │   └── messes.js         # Mess Search, Updates, & Reviews
│   ├── .env                  # Backend configuration settings
│   ├── package.json          # Backend packages
│   └── server.js             # Server startup entry point
├── database/                 # MongoDB Schemas & Seeding Scripts
│   ├── models/               # MongoDB Mongoose Schemas
│   │   ├── User.js           # Users (Customers & Sellers)
│   │   └── Mess.js           # Messes, Menus, & Reviews
│   ├── package.json          # Database module packages
│   └── seed.js               # Database seeding script
├── start.bat                 # One-click Windows startup automation
├── reorganize.bat            # Directory structure setup batch file
└── README.md                 # Project documentation
```

---

## 🚦 How to Get Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- A MongoDB Atlas connection string (configured in `backend/.env`).

### 1. Database Configuration
By default, the application connects to your MongoDB Atlas database. You can modify this in `backend/.env`:
```env
PORT=5001
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.yourcluster.mongodb.net/messhub?appName=Cluster0
JWT_SECRET=your_jwt_secret_key_here
```

### 2. File Organization
Before starting the app, run the reorganization script to move all files into their correct folders:
- Double-click the **`reorganize.bat`** script in the project root folder.

### 3. Auto Startup (Windows)
After running `reorganize.bat`, double-click **`start.bat`** in the root folder. This script will automatically:
1. Detect and install database dependencies.
2. Detect and install backend dependencies.
3. Detect and install frontend dependencies.
4. Launch both the backend API (port `5001`) and frontend app (port `5173`) in separate command prompt windows.

### 4. Manual Startup
If you prefer manual commands:

**Reorganize Files (Manually or using the bat script):**
Run `reorganize.bat` first.

**Database & Seeding Setup:**
```bash
cd database
npm install
npm run seed
```

**Backend Setup:**
```bash
cd backend
npm install
npm run dev
```

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```

---

## 💾 Database Seeding (Preconfigured Accounts)

To populate MongoDB with default data, run the seed script:
```bash
cd database
npm run seed
```

This will clear the database and register the following login credentials:

| Role | Name | Email | Password | Details |
| :--- | :--- | :--- | :--- | :--- |
| **Seller** | Ramesh Kumar | `ramesh@messhub.com` | `password123` | Owns *Shree Krishna Mess* |
| **Seller** | Suresh Patel | `suresh@messhub.com` | `password123` | Owns *Annapurna Mess* |
| **Seller** | Vijay Singh | `vijay@messhub.com` | `password123` | Owns *Sagar Mess* |
| **Seller** | Lakshmi Devi | `lakshmi@messhub.com` | `password123` | Owns *Mama's Kitchen* (Non-Veg) |
| **Student** | Priya Sharma | `priya@gmail.com` | `password123` | Default customer account |
| **Student** | Rahul Mehta | `rahul@gmail.com` | `password123` | Default customer account |

---

## 💼 Resume Talking Points (For Interviews)

If you are showcasing this project on your resume, here are the key technical designs you implemented:
- **Role-Based Auth (RBAC)**: Designed Express middleware and React Context to enforce strict role access (e.g., student vs. mess owner views) backed by JWT authorization.
- **MongoDB Subdocuments**: Leveraged Mongoose schema nesting to store customer reviews directly inside the `Mess` document, minimizing relational joins and improving read speed.
- **Optimized Frontend Search**: Implemented debouncing on search parameters to control API call frequencies, ensuring the backend is not overloaded during user typing.
- **RESTful Query Architecture**: Built query parameters parsing to filter records by coordinates distance and pricing logic directly on the database query layer.
- **Clean Monorepo Design**: Organized code into distinct modular domains (`frontend`, `backend`, `database`), creating clean boundaries between UI views, server routing, and database modeling layers.
