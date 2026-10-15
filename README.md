# ShopKart

ShopKart is a modern e-commerce storefront built as a full-stack web application. The project combines a React + Vite frontend with an Express + MongoDB backend to deliver a clean shopping experience with product browsing, wishlist management, cart flow, account authentication, and protected customer pages.

## Overview

This application is designed to simulate a premium sneaker store experience. It includes:

- a homepage with promotional sections and brand/category highlights
- a product catalog with filtering, sorting, and search
- product detail pages and shopping cart logic
- wishlist management and account-based flows
- customer registration/login with JWT-based backend auth
- protected profile and orders routes

The frontend is visually rich and styled with modern gradients, cards, and responsive layouts. The backend is intentionally lightweight and focuses on customer authentication and session handling through cookies and MongoDB.

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Framer Motion
- Tailwind CSS
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express 5
- MongoDB with Mongoose
- JWT authentication
- bcrypt password hashing
- cookie-parser
- dotenv

## Project Structure

```text
shopKart/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── README.md
├── README.md
└── .gitignore
```

## Frontend Features

### Store experience

- Home page with hero banner, category cards, featured products, and promotional sections
- Product listing page with filter sidebar and mobile filter drawer
- Sorting for newest, popularity, rating, and price
- Search route and catalog browsing experience
- Product detail flow with variants, color/size selection, and purchase actions

### Customer flow

- Login and registration pages
- Protected route guarding for profile and order pages
- Cart context managing subtotal, discounts, shipping, and totals
- Wishlist context persistently storing saved products
- Auth context for app-wide user state

### State management

The frontend uses React Context to manage app-wide state for:

- authentication
- shopping cart
- wishlist

This pattern keeps the project simple while still providing a clean and reusable state model for a storefront app.

## Backend Features

The backend currently provides customer authentication APIs for:

- register
- login
- fetch current customer
- logout
- change password

Key implementation details:

- bcrypt is used to hash customer passwords
- JWT tokens are generated and stored in HTTP-only cookies
- customer routes are protected using authentication middleware
- MongoDB stores customer records using a Mongoose schema

## Important Notes

This project is a solid e-commerce starter prototype, but it currently has a few realistic implementation characteristics:

- the frontend uses product data stored locally in the app and localStorage for cart/wishlist/auth state
- the backend is set up for real customer authentication, but the rest of the e-commerce flow is not yet fully connected to a full order/payment backend
- checkout, order history, and deeper backend commerce features are partially represented in the frontend instead of a full API layer

## Environment Setup

### 1. Install dependencies

Root project has separate frontend and backend apps. Install both:

```bash
cd frontend
npm install

cd ../backend
npm install
```

### 2. Backend environment variables

Create a `.env` file inside the backend folder:

```env
PORT=8004
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 3. Run the app

Start the backend:

```bash
cd backend
npm run dev
```

Start the frontend:

```bash
cd frontend
npm run dev
```

The frontend typically runs on Vite’s default local port, usually http://localhost:5173, while the backend runs on the configured port (default 8004).

## Development Notes

### Frontend scripts

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

### Backend scripts

```bash
npm run dev
npm run start
```

## Suggested Next Enhancements

To take this project further, the following improvements would make sense:

- connect cart and checkout flows to real backend APIs
- add product CRUD APIs and database models
- implement order creation and payment integration
- add product reviews and ratings APIs
- add admin dashboard for inventory management
- support image uploads and richer product metadata
- add testing for auth and storefront actions

## Summary

ShopKart is a polished storefront starter project that demonstrates how to structure a full-stack e-commerce application in a manageable way. It combines a premium shopping UI, shopping-state management, and secure customer auth fundamentals, making it a strong base for a more complete online store.
