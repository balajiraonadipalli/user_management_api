# User Management API

A RESTful API for managing users, built with **Node.js**, **Express**, and **SQLite3**.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm

### Installation

```bash
npm install
```

### Run the Server

```bash
# Development (with auto-restart)
npm run dev

# Production
npm start
```

Server runs at `http://localhost:6111`

---

## 📁 Project Structure

```
user-management-api/
├── controllers/
│   └── UserController.js   # Request handlers
├── routes/
│   └── UserRoutes.js       # Route definitions
├── database/
│   └── db.js               # SQLite connection & schema
├── index.js                # App entry point
└── users.db                # SQLite database file
```

---

## 📋 API Endpoints

### Get All Users

```
GET /users
```

**Query Parameters:**

| Param   | Description                           | Example              |
|---------|---------------------------------------|----------------------|
| `search`  | Filter by name or email             | `?search=balaji`     |
| `sort`    | Column to sort by (default: `id`)   | `?sort=name`         |
| `order`   | Sort direction (default: `ASC`)     | `?order=DESC`        |

**Response:**
```json
[
  { "id": 1, "name": "Balaji", "email": "balu@gmail.com", "age": 15 }
]
```

---

### Get User by ID

```
GET /users/:id
```

**Response:**
```json
{ "id": 1, "name": "Balaji", "email": "balu@gmail.com", "age": 15 }
```

**404 if not found:**
```json
{ "error": "User not found" }
```

---

### Create User

```
POST /users
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Balaji",
  "email": "balu@gmail.com",
  "age": 15
}
```

**Response `201`:**
```json
{ "id": 1, "name": "Balaji", "email": "balu@gmail.com", "age": 15 }
```

---

### Update User

```
PUT /users/:id
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Balaji Updated",
  "email": "balu@gmail.com",
  "age": 20
}
```

**Response:**
```json
{ "id": 1, "name": "Balaji Updated", "email": "balu@gmail.com", "age": 20 }
```

---

### Delete User

```
DELETE /users/:id
```

**Response:**
```json
{ "message": "User 1 deleted successfully" }
```

---

## 🗄️ Database Schema

```sql
CREATE TABLE users (
  id    INTEGER PRIMARY KEY AUTOINCREMENT,
  name  TEXT,
  email TEXT UNIQUE,
  age   INTEGER
);
```

---

## ⚙️ Dependencies

| Package       | Purpose                        |
|---------------|--------------------------------|
| `express`     | Web framework                  |
| `sqlite3`     | Embedded database              |
| `cors`        | Cross-origin resource sharing  |
| `body-parser` | Request body parsing           |
| `nodemon`     | Auto-restart in development    |
