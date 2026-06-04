# 💳 Digital Payment Platform

Platform e-commerce modern untuk penjualan pulsa, token listrik, voucher, top-up e-wallet, dan top-up game dengan sistem pembayaran otomatis dan terintegrasi.

## 🚀 Fitur Utama

- ✅ Penjualan Pulsa (Semua Operator)
- ✅ Token Listrik Prepaid
- ✅ Voucher Internet
- ✅ Top-up E-wallet (OVO, Dana, GoPay, LinkAja)
- ✅ Top-up Game (Mobile Legends, PUBG, FF, dll)
- ✅ Payment Gateway (Midtrans)
- ✅ Admin Dashboard
- ✅ Riwayat Transaksi
- ✅ Sistem Referral
- ✅ Responsive Design

## 📦 Tech Stack

- **Backend**: Node.js + Express.js + MongoDB
- **Frontend**: React.js + Redux + Tailwind CSS
- **Payment**: Midtrans

## 🔧 Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env dengan konfigurasi Anda
npm run dev
Server berjalan di http://localhost:5000

🔧 Setup Frontend
bash
cd frontend
npm install
cp .env.example .env
npm start
Frontend berjalan di http://localhost:3000

📝 API Endpoints
Auth
POST /api/auth/register - Register user
POST /api/auth/login - Login user
GET /api/auth/me - Get current user
Products
GET /api/products - Get all products
GET /api/products/:id - Get product detail
POST /api/products - Create product (Admin)
PUT /api/products/:id - Update product (Admin)
DELETE /api/products/:id - Delete product (Admin)
Transactions
POST /api/transactions - Create transaction
GET /api/transactions - Get user transactions
GET /api/transactions/:id - Get transaction detail
Payments
POST /api/payments/create - Create payment
GET /api/payments/:orderId - Get payment status
Users
GET /api/users/profile - Get profile
PUT /api/users/profile - Update profile
GET /api/users/balance - Get balance
GET /api/users/referral/info - Get referral info
Admin
GET /api/admin/dashboard/stats - Dashboard stats
GET /api/admin/transactions - Get all transactions
PUT /api/admin/transactions/:id - Update transaction
GET /api/admin/users - Get all users
📂 Project Structure
Code
digital-payment-platform/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── midtrans.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Transaction.js
│   │   └── Payment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js
│   │   ├── transactions.js
│   │   ├── payments.js
│   │   ├── users.js
│   │   └── admin.js
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── PrivateRoute.jsx
│   │   ├── pages/
│   │   │   └── HomePage.jsx
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   ├── authSlice.js
│   │   │   ├── productSlice.js
│   │   │   └── cartSlice.js
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── tailwind.config.js
│   └── postcss.config.js
└── README.md
🚀 Quick Start
Prerequisites
Node.js v14 atau lebih tinggi
MongoDB local atau MongoDB Atlas
Git
Step 1: Backend Setup
bash
cd backend
npm install
cp .env.example .env
Edit .env:

Code
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/digital-payment
JWT_SECRET=your_secret_key_here
MIDTRANS_SERVER_KEY=your_midtrans_server_key
MIDTRANS_CLIENT_KEY=your_midtrans_client_key
MIDTRANS_ENV=sandbox
FRONTEND_URL=http://localhost:3000
Jalankan:

bash
npm run dev
Step 2: Frontend Setup
Buka terminal baru:

bash
cd frontend
npm install
cp .env.example .env
Edit .env:

Code
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
Jalankan:

bash
npm start
🔑 Configuration
MongoDB Setup
Option 1: Local MongoDB

bash
mongod
Option 2: MongoDB Atlas (Cloud)

Code
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
Midtrans Setup
Daftar di https://dashboard.midtrans.com
Dapatkan Server Key dan Client Key
Setup di backend .env file
👤 Admin Account
Untuk membuat admin account, update user role di MongoDB:

JavaScript
db.users.updateOne(
  {email: "admin@example.com"}, 
  {$set: {role: "admin"}}
)
🧪 Testing
Test Credentials
Email: test@example.com
Password: password123
Test Payment (Midtrans Sandbox)
Card Number: 4811 1111 1111 1114
Month: 08
Year: 25
CVV: 123
📚 Documentation
Lihat file-file berikut untuk dokumentasi lebih detail:

backend/.env.example - Backend environment variables
frontend/.env.example - Frontend environment variables
🐛 Troubleshooting
MongoDB Connection Error
bash
# Pastikan MongoDB service sudah running
# macOS
brew services start mongodb-community

# Windows
net start MongoDB
Port Already in Use
bash
# Ubah PORT di backend .env
PORT=5001

# Atau ubah port frontend
PORT=3001 npm start
CORS Error
Pastikan FRONTEND_URL di backend .env sudah benar

📞 Support
Jika ada pertanyaan atau menemukan bug, silakan buat issue di repository.

📄 License
MIT License - Bebas digunakan untuk keperluan personal dan komersial.

👨‍💻 Author
Dibuat untuk demonstrasi dan pembelajaran.
