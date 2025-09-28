# 📚 Bookstore API (Node.js + MongoDB)

A modular Bookstore REST API built with **Node.js, Express, and MongoDB**, featuring **JWT authentication, CRUD operations for books and authors, and MVC architecture**.

---

## ✨ Features

- 📖 CRUD for books and authors
- 👤 User authentication & authorization with JWT
- ✅ Request validation with ajv
- 🛡 Secure setup with Helmet, CORS, rate limiting, bcrypt password hashing
- 📝 Centralized error handling & logging middleware (winston)
- 📦 Seed script for sample data
- 🧪 Unit & integration testing with Jest + Supertest
- 📜 OpenAPI/Swagger documentation (`docs/swagger.json`)

---

## 🗂 Project Structure

```bash
bookstore-backend/
├─ src/
│  ├─ server.js            # server entry
│  ├─ app.js               # express app setup
│  ├─ config/              # env, db, jwt helpers
│  ├─ models/              # mongoose schemas
│  ├─ controllers/         # request/response handling
│  ├─ services/            # business logic
│  ├─ routes/              # api endpoints
│  ├─ middlewares/         # auth, error, logger, validation
│  ├─ validators/          # request validation
│  ├─ utils/               # shared helpers
│  ├─ scripts/             # seed & setup scripts
│  ├─ tests/               # jest + supertest tests
│  ├─ public/ & views/     # optional: static files + ejs templates
├─ docs/                   # swagger/openapi docs
├─ .env.example            # environment variables
├─ docker-compose.yml       # optional: mongo + server
└─ Dockerfile               # docker build
```

---

## ⚡️ Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/bookstore-backend.git
cd bookstore-backend
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Set up environment variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/bookstore
JWT_SECRET=replace_this_with_a_strong_secret
JWT_EXPIRES_IN=1d
NODE_ENV=development
```

### 4️⃣ Run the server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

---

## 🧪 Testing

Run tests with Jest + Supertest:

```bash
npm test
```

---

## 📦 Database Seeding

Populate MongoDB with sample data:

```bash
npm run seed
```

---

## 📜 API Documentation

The API is documented with **Swagger**.

- JSON spec: `docs/swagger.json`
- You can integrate Swagger UI to view docs in the browser.

---

## 🚀 Deployment

The project includes:

- `Dockerfile` for containerization
- `docker-compose.yml` for local MongoDB setup
- CI workflow example in `.github/workflows/ci.yml`

Can be deployed to **Render, Railway, Fly.io, DigitalOcean, or Heroku**.

---

## 🤝 Contributing

Pull requests are welcome!
For major changes, please open an issue first to discuss what you’d like to change.
