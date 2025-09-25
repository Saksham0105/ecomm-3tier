# E-commerce 3-Tier Application

A complete e-commerce web application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
/frontend    - React + Tailwind CSS frontend
/backend     - Node.js + Express API server
/db          - MongoDB schemas and seed scripts
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env file with your MongoDB URI and JWT secret
npm start
```

### 2. Database Setup

```bash
# Make sure MongoDB is running locally or provide remote URI in backend/.env
cd db
node seed.js  # Seeds sample products
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create `backend/.env` file:

```
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key-here
PORT=5000
```

## Features

- User authentication (JWT-based)
- Product catalog and search
- Shopping cart functionality
- Order management
- Responsive design
- Admin product management

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove cart item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:id` - Get single order

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Axios
- **Backend**: Node.js, Express, JWT, bcryptjs
- **Database**: MongoDB, Mongoose
- **Development**: Vite, ESLint