# ShopKart Frontend

This frontend is the customer-facing storefront for the ShopKart e-commerce project. It is built with React, Vite, and modern UI tools to create a premium shopping experience for sneaker and lifestyle product browsing.

## Overview

The app presents a polished storefront with a modern design and e-commerce interactions such as:

- product landing and category-driven home pages
- catalog pages with filtering and sorting
- product cards and detail flows
- wishlist and cart management
- account login/register UX
- protected routes for authenticated user screens

The project is designed to look and feel like a premium online store while remaining easy to extend.

## Main Features

### Storefront UI

- Hero banner with promotional highlights and CTA buttons
- Category cards for different product segments
- Featured, new-arrival, and best-seller product sections
- Branded product listing experience with responsive layouts
- Search and filter interfaces for catalog exploration

### Shopping behavior

- add to cart with quantity logic
- subtotal, discount, shipping, and total calculation
- clear cart and remove individual items
- wishlist toggle and saved product count
- checkout summary flow

### Authentication UX

- login page
- registration page
- protected pages for profile and orders
- user state stored in localStorage for the demo app flow

## Folder Structure

```text
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── data/
│   ├── pages/
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
└── ...
```

## Core App Structure

### Context providers

- `AuthContext.jsx` manages user login state and authentication status
- `CartContext.jsx` manages cart contents and totals
- `WishlistContext.jsx` manages saved items and wishlist count

### Routing

The app uses React Router and includes these routes:

- `/` — home
- `/products` — product catalog
- `/products/:id` — product details
- `/search` — search page
- `/login` — login
- `/register` — register
- `/cart` — cart
- `/wishlist` — wishlist
- `/checkout` — checkout
- `/profile` — protected profile screen
- `/orders` — protected orders screen
- `/orders/:id` — protected order details screen

## Data Model

The product catalog is defined in `src/data/products.js` and includes:

- product name, brand, category
- pricing and discounts
- colors and size options
- ratings and popularity
- image URLs
- new/featured/best-seller flags

## Frontend Stack

- React 19
- Vite
- React Router
- Framer Motion
- Tailwind CSS
- Lucide React
- React Hot Toast

## Local Setup

### Install dependencies

```bash
cd frontend
npm install
```

### Start the dev server

```bash
npm run dev
```

### Production build

```bash
npm run build
```

### Preview build

```bash
npm run preview
```

## Notes

This frontend is intentionally structured as a premium storefront demo. It uses static product data and localStorage-based state management to simulate a working shopping experience while the backend handles customer authentication logic.

For the full project overview, environment setup, and backend documentation, see the project-level README in the root of the repository.
