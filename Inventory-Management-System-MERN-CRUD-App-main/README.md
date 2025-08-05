# 🏢 Advanced Inventory Management System - MERN Stack

<div align="center">

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat&logo=JSON%20web%20tokens&logoColor=white)

**A comprehensive inventory management system built with modern MERN stack technology**

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [API Documentation](#-api-documentation) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents
- [Overview](#-overview)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Overview

This Advanced Inventory Management System is a full-stack web application designed to help businesses efficiently manage their product inventory. Built with the MERN stack (MongoDB, Express.js, React, Node.js), it provides a modern, responsive, and secure platform for inventory operations.

### Key Highlights
- 🔐 **Secure Authentication** - JWT-based user authentication with password encryption
- 💰 **Indian Rupee Support** - Currency display in INR (₹) for local businesses
- 📊 **Real-time Dashboard** - Live inventory statistics and analytics
- 🛒 **Sales Processing** - Automatic stock reduction with low-stock alerts
- 📱 **Responsive Design** - Modern UI that works on all devices
- 🔍 **Advanced Search** - Multi-criteria product search functionality

## ✨ Features

### 🔑 Authentication & Security
- **User Registration & Login** - Secure account creation with shop name integration
- **JWT Token Authentication** - Protected routes and API endpoints
- **Password Encryption** - bcrypt-based password hashing
- **Session Management** - Automatic token validation and refresh

### 📦 Product Management
- **CRUD Operations** - Create, Read, Update, Delete products
- **Product Categories** - Organize products by categories
- **Detailed Product Information** - Name, price, barcode, quantity, description
- **Product Search** - Search by name, category, or barcode
- **Bulk Operations** - Efficient management of multiple products

### 📊 Inventory Control
- **Real-time Stock Tracking** - Live inventory quantity updates
- **Low Stock Alerts** - Automatic warnings for products below threshold
- **Stock Thresholds** - Customizable minimum stock levels per product
- **Inventory Valuation** - Total inventory value calculation

### 💼 Sales Management
- **Sales Processing** - Record sales with automatic stock deduction
- **Sales Confirmation** - Real-time feedback on successful transactions
- **Quantity Validation** - Prevent overselling with stock checks
- **Sales History** - Track all sales transactions

### 📈 Dashboard & Analytics
- **Live Statistics** - Total products, categories, low stock items
- **Inventory Overview** - Visual representation of stock levels
- **Quick Actions** - Fast access to common operations
- **Performance Metrics** - Key business indicators

### 🎨 User Interface
- **Modern Design** - Clean, intuitive interface with gradient themes
- **Responsive Layout** - Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Theme** - Comfortable viewing in any environment
- **Loading States** - Smooth user experience with loading indicators

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **React Router** - Client-side routing for single-page application
- **CSS3** - Modern styling with Flexbox and Grid
- **Font Awesome** - Professional icon library
- **Fetch API** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for secure authentication
- **bcryptjs** - Password hashing library
- **CORS** - Cross-Origin Resource Sharing middleware

### Development Tools
- **Nodemon** - Development server with hot reloading
- **npm** - Package manager for JavaScript
- **VS Code** - Recommended IDE with extensions

## 📥 Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **MongoDB** (v4.4 or higher)
- **npm** or **yarn**
- **Git**

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

3. **Frontend Setup**
   ```bash
   cd Frontend/inventory_management_system
   npm install
   ```

4. **Database Configuration**
   - Open MongoDB Compass or MongoDB Atlas
   - Create a new database: `IMS`
   - Create collections: `products` and `users`

5. **Environment Variables**
   Create a `.env` file in the Backend directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/IMS
   JWT_SECRET=your_jwt_secret_key_here
   PORT=3001
   ```

## ⚙️ Configuration

### MongoDB Setup
1. **Local MongoDB:**
   - Install MongoDB Community Edition
   - Start MongoDB service
   - Database: `IMS`
   - Collections: `products`, `users`

2. **MongoDB Atlas (Cloud):**
   - Create Atlas account
   - Create cluster
   - Get connection string
   - Update `MONGODB_URI` in `.env`

### Environment Configuration
```env
# Database
MONGODB_URI=mongodb://localhost:27017/IMS

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Server
PORT=3001
NODE_ENV=development

# CORS (Optional)
FRONTEND_URL=http://localhost:3000
```

## 🚀 Usage

### Starting the Application

1. **Start Backend Server**
   ```bash
   cd Backend
   npm run server
   # Server runs on http://localhost:3001
   ```

2. **Start Frontend Application**
   ```bash
   cd Frontend/inventory_management_system
   npm start
   # Application opens at http://localhost:3000
   ```

### Using the Application

1. **Registration**
   - Visit `http://localhost:3000`
   - Click "Register" to create a new account
   - Fill in your details including shop name

2. **Dashboard**
   - View real-time inventory statistics
   - Monitor low stock alerts
   - Access quick action buttons

3. **Product Management**
   - Add new products with detailed information
   - Update existing product details
   - Delete products with confirmation
   - Search and filter products

4. **Sales Processing**
   - Select products for sale
   - Specify quantities
   - Process sales with automatic stock updates

## 📡 API Documentation

### Authentication Endpoints
```javascript
POST /api/register    // User registration
POST /api/login       // User login
GET  /api/verify      // Token verification
```

### Product Endpoints
```javascript
GET    /products           // Get all products
GET    /products/:id       // Get single product
POST   /insertproduct     // Create new product
PUT    /updateproduct/:id // Update product
DELETE /deleteproduct/:id // Delete product
```

### Sales Endpoints
```javascript
POST /saleproduct/:id     // Process product sale
```

### Dashboard Endpoints
```javascript
GET /dashboard/stats      // Get inventory statistics
GET /dashboard/lowstock   // Get low stock products
```

## 🗄️ Database Schema

### User Schema
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  username: String (unique),
  password: String (hashed),
  shopName: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Product Schema
```javascript
{
  ProductName: String,
  ProductPrice: Number,
  ProductBarcode: String,
  ProductQuantity: Number,
  ProductCategory: String,
  ProductDescription: String,
  LowStockThreshold: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## 📱 Application Screens

### 1. Authentication
- **Login Page** - Secure user authentication
- **Registration Page** - New user account creation with shop details

### 2. Dashboard
- **Overview Statistics** - Total products, inventory value, low stock alerts
- **Quick Actions** - Fast access to common operations
- **Recent Activity** - Latest inventory changes

### 3. Product Management
- **Product Listing** - Grid view with search and filter options
- **Add Product** - Comprehensive form for new product entry
- **Edit Product** - Update existing product information
- **Product Details** - Detailed view with all product information

### 4. Sales Management
- **Sales Interface** - Product selection and quantity specification
- **Sales Confirmation** - Transaction summary and stock updates
- **Stock Alerts** - Real-time low stock notifications

## 🤝 Contributing

We welcome contributions to improve the Inventory Management System!

### How to Contribute
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow ES6+ JavaScript standards
- Use meaningful commit messages
- Add comments for complex logic
- Test thoroughly before submitting
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **MongoDB** for the flexible NoSQL database
- **Express.js** for the robust web framework
- **React** for the powerful frontend library
- **Node.js** for the scalable runtime environment
- **JWT** for secure authentication
- **Font Awesome** for beautiful icons
- **bcryptjs** for secure password hashing

---

<div align="center">

**Built with ❤️ using MERN Stack**

For support or questions, please open an issue or contact the development team.

</div>
