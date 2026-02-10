
````markdown
# Mini E-Commerce API

This is a RESTful API for a mini e-commerce application built with **Node.js, Express, TypeScript, and MongoDB**.  
It supports user authentication, product management, cart functionality, order management, and payment simulation.

---

## Base URL

https://e-commerce-blond-omega-71.vercel.app/api/v1

---

## Tech Stack

- **Backend:** Node.js, Express.js, TypeScript
- **Database:** MongoDB (Mongoose)
- **Authentication:** JWT
- **Validation:** Zod / Custom Middleware
- **Password Hashing:** bcryptjs
- **Error Handling:** Custom AppError
- **Deployment:** Vercel

---

## Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/Sabbir386/mini-E-Commerce-Api.git
cd mini-E-Commerce-Api
````

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Environment Variables

Create a `.env` file and add:

```
PORT=5000
MONGO_URI=<your-mongodb-uri>
JWT_ACCESS_SECRET=<your-jwt-secret>
```

### 4️⃣ Run Server

```bash
npm run start:dev
```

---

## Database Schema / ER Diagram

### Collections

**Users**

* `_id`
* `name`
* `email`
* `password`
* `role`
* `cancellationCount`
* `createdAt`
* `updatedAt`

**Products**

* `_id`
* `name`
* `description`
* `price`
* `stock`
* `isDeleted`
* `createdAt`
* `updatedAt`

**Cart**

* `_id`
* `user`
* `items[{ product, quantity }]`
* `totalPrice`
* `createdAt`
* `updatedAt`

**Orders**

* `_id`
* `user`
* `items[{ product, quantity, price }]`
* `totalAmount`
* `paymentMethod`
* `paymentStatus`
* `status`
* `isCancelled`
* `createdAt`
* `updatedAt`

---

## Relationships

* User → Cart (**1 : 1**)
* User → Orders (**1 : N**)
* Cart → Products (**M : N**)
* Order → Products (**M : N**)

---

## API Endpoints

### 🔐 Auth

* `POST /users/register` → Register user
* `POST /users/login` → Login & receive JWT

---

### 📦 Products

* `GET /products` → Get all products
* `GET /products/:id` → Get product details
* `POST /products` → Create product (**Admin**)
* `PATCH /products/:id` → Update product (**Admin**)
* `DELETE /products/:id` → Soft delete product (**Admin**)

---

### 🛒 Cart (Customer Only)

* `POST /cart/add` → Add item to cart
* `POST /cart/remove` → Remove item from cart
* `GET /cart` → Get logged-in user cart

---

### 📑 Orders

* `POST /orders` → Create order
* `GET /orders/my` → Get my orders
* `GET /orders` → Get all orders (**Admin**)
* `PATCH /orders/:orderId` → Update order status (**Admin**)
* `PATCH /orders/cancel/:orderId` → Cancel order (**Customer**)

---

## Key Architectural Decisions

* Role-based authentication using JWT
* Middleware-based route protection
* Mongoose transactions for order creation
* Stock deduction on order placement
* Stock restoration on cancellation
* Single cart per user design

---

## Assumptions

* Only two roles exist → `admin`, `customer`
* Payment is simulated (no real gateway)
* Maximum 3 order cancellations per user
* Admin manages all orders
* Customers manage only their own data

---

## Postman Collection

A Postman collection is included for testing all endpoints.

---

## Live Deployment

Base API:
[https://e-commerce-blond-omega-71.vercel.app/api/v1](https://e-commerce-blond-omega-71.vercel.app/api/v1)

Main URL:
[https://e-commerce-blond-omega-71.vercel.app](https://e-commerce-blond-omega-71.vercel.app)

---

```

---
