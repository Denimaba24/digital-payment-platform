#!/bin/bash

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}╔════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  Digital Payment Platform - Download & Setup Script   ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════╝${NC}"
echo ""

# Download repo
echo -e "${YELLOW}📥 Downloading repository...${NC}"
git clone https://github.com/Denimaba24/digital-payment-platform.git
cd digital-payment-platform

# Create backend structure
echo -e "${YELLOW}📁 Creating backend structure...${NC}"
mkdir -p backend/{config,middleware,models,routes}
mkdir -p frontend/src/{components,pages/{auth,admin},redux}

# Backend - package.json
echo -e "${YELLOW}📝 Creating backend files...${NC}"

cat > backend/package.json << 'EOFPKG'
{
  "name": "digital-payment-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0",
    "dotenv": "^16.0.3",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.0",
    "midtrans-client": "^1.3.0",
    "cors": "^2.8.5",
    "helmet": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
EOFPKG

# Backend - .env.example
cat > backend/.env.example << 'EOFENV'
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/digital-payment
JWT_SECRET=your_secret_key_here
MIDTRANS_SERVER_KEY=your_server_key
MIDTRANS_CLIENT_KEY=your_client_key
MIDTRANS_ENV=sandbox
FRONTEND_URL=http://localhost:3000
EOFENV

# Backend - .gitignore
cat > backend/.gitignore << 'EOFGIT'
node_modules/
.env
.DS_Store
*.log
EOFGIT

# Backend - server.js
cat > backend/server.js << 'EOFSERVER'
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/transactions', require('./routes/transactions'));
app.use('/api/payments', require('./routes/payments'));
app.use('/api/users', require('./routes/users'));
app.use('/api/admin', require('./routes/admin'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
EOFSERVER

# Create route files
touch backend/routes/{auth,products,transactions,payments,users,admin}.js

# Frontend - package.json
echo -e "${YELLOW}📝 Creating frontend files...${NC}"

cat > frontend/package.json << 'EOFFEPKG'
{
  "name": "digital-payment-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0",
    "react-redux": "^8.0.5",
    "@reduxjs/toolkit": "^1.9.1",
    "react-icons": "^4.7.1",
    "react-toastify": "^9.1.1",
    "tailwindcss": "^3.2.7"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "devDependencies": {
    "react-scripts": "5.0.1"
  }
}
EOFFEPKG

# Frontend - .env.example
cat > frontend/.env.example << 'EOFFEENV'
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_MIDTRANS_CLIENT_KEY=your_key
EOFFEENV

# Frontend - .gitignore
cat > frontend/.gitignore << 'EOFFEGIT'
node_modules
.env
build/
EOFFEGIT

# Create README
cat > QUICK_START.md << 'EOFREADME'
# 🚀 Quick Start Guide

## Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
