# ShopKart Backend

The ShopKart backend is a REST API built with Node.js, Express, MongoDB, and Mongoose. Its current responsibility is customer account management and authentication for the ShopKart frontend.

The backend provides:

- Customer registration
- Customer login
- JWT-based authentication
- HttpOnly cookie sessions
- Current-user lookup
- Logout and cookie clearing
- Password changes
- MongoDB persistence
- CORS support for the Vite frontend

## Technology Stack

| Technology | Purpose |
| --- | --- |
| Node.js | JavaScript runtime |
| Express 5 | HTTP server and routing |
| MongoDB | Database |
| Mongoose | MongoDB object modeling and schema validation |
| bcrypt | Password hashing and password verification |
| jsonwebtoken | Creating and verifying authentication tokens |
| cookie-parser | Reading cookies from incoming requests |
| cors | Allowing the frontend to call the API with credentials |
| dotenv | Loading environment variables |
| morgan | Installed for HTTP request logging when needed |
| nodemon | Automatically restarts the server during development |

## Project Structure

```text
backend/
|-- index.js
|-- package.json
|-- .env
|-- controllers/
|   `-- customer.controller.js
|-- middlewares/
|   `-- auth.middleware.js
|-- models/
|   `-- customer.model.js
|-- routes/
|   `-- customer.routes.js
`-- utils/
    `-- generateToken.js
```

## Installation

From the backend directory:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the backend directory. Do not commit this file because it contains secrets.

```env
MONGO_URI=mongodb_connection_string
JWT_SECRET=long_random_secret
PORT=8004
NODE_ENV=development
```

### Variable explanation

- `MONGO_URI`: Connection string used by Mongoose to connect to MongoDB.
- `JWT_SECRET`: Private value used to sign and verify JWT tokens. It must be kept secret and should be long and random.
- `PORT`: Port used by Express. The application defaults to `8004` when this value is missing.
- `NODE_ENV`: Controls cookie security behavior. In production, the authentication cookie is marked `secure`, meaning it must be sent over HTTPS.

The existing local setup also contains database-related variables. Only variables actively used by the code should be relied on. `MONGO_URI`, `JWT_SECRET`, and `PORT` are the variables required by this backend.

## Running the Server

Development mode:

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

The server starts only after MongoDB connects successfully. A successful startup prints:

```text
MongoDB connected successfully
Server running on port 8004
```

If MongoDB connection fails, the error is logged and the process exits instead of starting an API that cannot use its database.

## API Base URL

When running locally, the API base URL is:

```text
http://localhost:8004
```

The frontend uses this URL through `VITE_API_BASE_URL`. If that frontend variable is missing, the frontend client also defaults to `http://localhost:8004`.

## Authentication Design

Authentication uses a JWT stored in an HttpOnly cookie rather than localStorage.

### Login flow

1. The frontend sends an email and password to `POST /customers/login`.
2. The backend normalizes the email and finds the matching customer.
3. bcrypt compares the submitted password with the stored password hash.
4. The backend creates a JWT containing the customer ID.
5. The JWT is sent as the `token` cookie.
6. The frontend receives sanitized customer data and treats the user as authenticated.

The cookie settings are:

- `httpOnly: true`: browser JavaScript cannot read the token.
- `sameSite: 'strict'`: reduces cross-site cookie requests.
- `secure: true` in production: cookie is sent only over HTTPS.
- `maxAge`: seven days.

### Protected request flow

1. The browser automatically sends the cookie with requests because the frontend uses `credentials: 'include'`.
2. `auth.middleware.js` reads the `token` cookie.
3. The JWT signature and expiry are checked with `JWT_SECRET`.
4. The customer ID inside the token is used to find the customer in MongoDB.
5. The customer document is attached to `req.user`.
6. The protected controller runs.

If the cookie is absent, invalid, expired, or points to a missing customer, the API returns HTTP `401 Unauthorized`.

### Logout flow

1. The frontend navigates away from protected UI.
2. It sends `POST /customers/logout` with the cookie.
3. The backend clears the `token` cookie.
4. The frontend clears its in-memory user state.

The frontend must send requests with credentials enabled, and the backend must allow credentialed CORS requests. Both conditions are required for cookie authentication to work.

## API Endpoints

All routes are prefixed with `/customers`.

### Register customer

```http
POST /customers/register
Content-Type: application/json
```

Request body:

```json
{
  "fullName": "Asha Sharma",
  "email": "asha@example.com",
  "password": "password123",
  "phone": "+91 98765 43210"
}
```

Behavior:

- Requires all four fields.
- Requires a password with at least six characters.
- Trims the name and phone number.
- Converts the email to lowercase.
- Rejects duplicate email addresses.
- Hashes the password with bcrypt before saving.
- Never returns the password in the response.

Successful response status: `201 Created`.

### Login customer

```http
POST /customers/login
Content-Type: application/json
```

Request body:

```json
{
  "email": "asha@example.com",
  "password": "password123"
}
```

Behavior:

- Validates that email and password are present.
- Normalizes the email.
- Finds the customer by email.
- Verifies the password with bcrypt.
- Creates a seven-day JWT.
- Sets the HttpOnly `token` cookie.

Successful response status: `200 OK`.

### Get current customer

```http
GET /customers/me
```

This route is protected by `authMiddleware`. It reads the authenticated customer from `req.user` and returns sanitized profile data.

Successful response status: `200 OK`.

### Logout customer

```http
POST /customers/logout
```

This route is protected by `authMiddleware`. It clears the authentication cookie.

Successful response status: `200 OK`.

### Change password

```http
PATCH /customers/change-password
Content-Type: application/json
```

Request body:

```json
{
  "oldPassword": "password123",
  "newPassword": "newpassword456"
}
```

This route is protected. It:

- Requires both passwords.
- Requires the new password to have at least six characters.
- Verifies the old password.
- Hashes the new password with bcrypt.
- Saves the new hash to MongoDB.

Successful response status: `200 OK`.

## File-by-File Explanation

### `index.js`

This is the application entry point.

1. It configures public DNS resolvers using Node's DNS promise API.
2. It imports Express, Mongoose, CORS, cookie-parser, dotenv, and the customer routes.
3. It loads environment variables from `.env`.
4. It creates the Express application.
5. It reads the port and MongoDB connection string.
6. It configures CORS for the local Vite ports `5173` and `5174`, including `credentials: true` for cookies.
7. It enables JSON request bodies with `express.json()`.
8. It enables cookie parsing with `cookieParser()`.
9. It mounts customer routes under `/customers`.
10. It connects to MongoDB.
11. Only after a successful database connection does it start listening for HTTP requests.
12. If the connection fails, it logs the error and exits the process.

### `routes/customer.routes.js`

This file maps HTTP methods and paths to controller functions.

- `POST /register` calls `registerCustomer`.
- `POST /login` calls `loginCustomer`.
- `GET /me` first calls `authMiddleware`, then `getCurrentCustomer`.
- `POST /logout` first calls `authMiddleware`, then `logoutCustomer`.
- `PATCH /change-password` first calls `authMiddleware`, then `changePassword`.

The middleware is placed before a controller on protected routes. Express stops the request if the middleware sends an unauthorized response.

### `models/customer.model.js`

This file defines the MongoDB shape for a customer.

Fields:

- `fullName`: required string, trimmed.
- `email`: required, unique, trimmed, and lowercased.
- `password`: required string containing the bcrypt hash.
- `phone`: required string, trimmed.
- `createdAt`: automatically set to the current date.

The model is registered as `Customer` and uses the MongoDB collection named `customers`.

Important security detail: the password field stores a hash, not the original password.

### `controllers/customer.controller.js`

Controllers contain the business logic for customer operations.

#### `sanitizeCustomer`

Creates the safe customer shape returned to the frontend. It intentionally excludes the password and returns only the ID, full name, email, and phone.

#### `registerCustomer`

Reads the registration fields, validates them, normalizes the email, checks for an existing account, hashes the password, creates the MongoDB document, and returns the sanitized customer.

It handles duplicate database key errors separately with HTTP `409 Conflict` and uses HTTP `500` for unexpected server failures.

#### `loginCustomer`

Validates credentials, loads the customer, compares passwords with bcrypt, generates a JWT, and sends the JWT in the cookie. Invalid email and invalid password intentionally use the same error response so the API does not reveal which accounts exist.

#### `getCurrentCustomer`

Uses the customer placed on `req.user` by the authentication middleware. It returns sanitized data so the frontend can restore the session after a page refresh.

#### `logoutCustomer`

Clears the `token` cookie using matching cookie options and returns a success message.

#### `changePassword`

Verifies the old password, validates the new password, hashes it, and saves the new hash. It does not store or return a plain-text password.

### `middlewares/auth.middleware.js`

This is the reusable protection layer for authenticated routes.

1. Reads `req.cookies.token`.
2. Returns `401` if no token exists.
3. Verifies the JWT using `JWT_SECRET`.
4. Loads the customer referenced by `decoded.userId`.
5. Returns `401` if the token is invalid or the customer no longer exists.
6. Adds the customer document to `req.user`.
7. Calls `next()` so the controller can continue.

The `try/catch` converts token errors, expired tokens, malformed tokens, and database lookup failures into a consistent unauthorized response.

### `utils/generateToken.js`

This helper creates JWTs.

- It reads `JWT_SECRET` from the environment.
- It throws a clear error if the secret is missing.
- It signs a payload containing `userId`.
- It makes the token expire after seven days.

The middleware later verifies the same token with the same secret.

### `package.json`

This file defines backend dependencies and commands:

- `npm run dev`: starts `nodemon index.js` for development.
- `npm start`: starts `node index.js`.
- `dependencies`: packages required by the running API.
- `devDependencies`: development-only packages such as nodemon.
- `type: commonjs`: enables `require()` and `module.exports` syntax.

## Frontend Integration Contract

The frontend API client must:

```js
fetch(url, {
  credentials: 'include',
  headers: { 'Content-Type': 'application/json' },
});
```

The frontend calls these backend endpoints:

| Frontend operation | Backend endpoint |
| --- | --- |
| Registration | `POST /customers/register` |
| Login | `POST /customers/login` |
| Session restore | `GET /customers/me` |
| Logout | `POST /customers/logout` |

The browser owns the HttpOnly cookie. The frontend does not read the JWT directly and should use `/customers/me` to confirm the current session.

## Common Errors

### `401 Unauthorized` from `/customers/me`

This normally means there is no cookie, the cookie expired, the JWT secret changed, or the customer no longer exists.

### CORS error in the browser

Check all of the following:

- Backend is running on port `8004`.
- Frontend is running on an allowed origin.
- Backend CORS has `credentials: true`.
- Frontend fetch requests use `credentials: 'include'`.
- The frontend is using `localhost` or `127.0.0.1` consistently.

### MongoDB connection failure

Check `MONGO_URI`, network access to the MongoDB cluster, database credentials, and the local internet connection. The server will not start until the connection succeeds.

### Login succeeds but refresh logs the user out

The browser may not be storing or sending the cookie. Check credentialed fetch requests, CORS configuration, cookie settings, and whether frontend and backend origins are being mixed between `localhost` and `127.0.0.1`.

## Security Notes

- Never commit `.env` or expose its values in documentation.
- Never store plain-text passwords.
- Use a strong, random `JWT_SECRET` in every environment.
- Use HTTPS in production so `secure` cookies can be enabled safely.
- Keep returning sanitized customer data rather than the full Mongoose document.
- Consider adding rate limiting, request validation, structured logging, and CSRF protection before production deployment.

## Current Scope and Future Expansion

The backend currently focuses on customer authentication. The frontend contains product, cart, wishlist, checkout, and order screens, but corresponding persistent backend APIs are not yet implemented in this service. Those features currently rely on frontend data and state.

A natural next backend expansion would be:

1. Product and category APIs.
2. Persistent carts and wishlists tied to the authenticated customer.
3. Order creation and order history endpoints.
4. Payment integration.
5. Central request validation and consistent error formatting.
6. Automated API tests.
