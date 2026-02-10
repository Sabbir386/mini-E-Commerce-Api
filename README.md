# Mini E-Commerce API

This is a RESTful API for a mini e-commerce application built with Node.js, Express,Typescript and MongoDB. It supports user authentication, product management, cart functionality, order management, and payment simulation.

---

## Base URL

```

[https://e-commerce-blond-omega-71.vercel.app/api/v1](https://e-commerce-blond-omega-71.vercel.app/api/v1)

```

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Validation:** Zod / Custom Middleware
- **Password Hashing:** bcryptjs
- **Error Handling:** Custom AppError
- **Deployment:** Vercel

---

## Setup Instructions

1. **Clone repository**

```bash
git clone https://github.com/Sabbir386/mini-E-Commerce-Api.git
cd mini-E-Commerce-Api
```

2. **Install dependencies**

```bash
npm install
```

3. **Environment variables**
   Create a `.env` file and add:

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_ACCESS_SECRET=<your-jwt-secret>
```

4. **Run the server**

```bash
npm run start:dev
```

---

## Database Schema / ER Diagram

Collections:

- **Users:** `_id, name, email, password, role, cancellationCount, createdAt, updatedAt`
- **Products:** `_id, name, description, price, stock, isDeleted, createdAt, updatedAt`
- **Cart:** `_id, user, items[{product, quantity}], totalPrice, createdAt, updatedAt`
- **Orders:** `_id, user, items[{product, quantity, price}], totalAmount, paymentMethod, paymentStatus, status, isCancelled, createdAt, updatedAt`

Relation

User → Cart (1:1)

User → Order (1:N)

User → Order (1:N)

Cart → Product (M:N)

Order → Product (M:N)

---

## API Endpoints

### Auth

- `POST /users/register` – Register user
- `POST /users/login` – Login user, receive JWT

### Products

- `GET /products` – List all products
- `GET /products/:id` – Get product details
- `POST /products` – Create product (admin only)
- `PATCH /products/:id` – Update product (admin only)
- `DELETE /products/:id` – Delete product (admin only)

### Cart

- `POST /cart/add` – Add item (customer only)
- `POST /cart/remove` – Remove item (customer only)
- `GET /cart` – Get current user's cart (customer only)

### Orders

- `POST /orders` – Create order (customer only)
- `GET /orders/my` – Get my orders (customer only)
- `GET /orders` – Get all orders (admin only)
- `PATCH /orders/:orderId` – Update order status (admin only)
- `PATCH /orders/cancel/:orderId` – Cancel order (customer only)

---

## Key Architectural Decisions

- Role-based authentication (JWT + middleware)
- Mongoose transactions for cart → order conversion
- Stock deduction on order, restored on cancellation
- Cart linked to user (single cart per user)

---

## Assumptions

- Only two roles: `admin` and `customer`
- Payment simulation only (no real integration)
- Users can cancel max 3 orders; after that, cancellation is blocked
- Admins can view/update all orders; customers manage only their own

---

## Postman Collection

Include a Postman collection JSON file for testing endpoints.

---

## Optional checking vercel deployment main url

- **Live API:** [https://e-commerce-blond-omega-71.vercel.app](https://e-commerce-blond-omega-71.vercel.app)

```

```
