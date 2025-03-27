# mogoatlasdatabase_23.03.25
github link is https://stunning-fishstick-rvq695g79953pvp7.github.dev/

# Secure Account Management Dashboard

This is a secure account management dashboard built with Node.js, Express, MongoDB Atlas (backend), and React with Tailwind CSS (frontend).

## Features
- Dark-themed UI
- CRUD operations for storing personal account data
- Automatic website logo fetching
- Auto-incrementing serial numbers
- Unique username & password per website
- Secure authentication with JWT
- Input validation and sanitization
- Role-based access control (Admin/User)
- Security best practices (bcrypt, rate limiting, NoSQL injection prevention, TLS/SSL enforcement)

## Installation

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/jayakumar9/secure-vjkpersonaldata.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd backend
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `backend` directory based on `.env.example`
5. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the frontend development server:
   ```sh
   npm start
   ```

## Usage
- Register or log in as a user.
- Manage stored account credentials securely.
- Only admins have full CRUD access; users can only manage their own accounts.

## Security Measures Implemented
- **Environment variables** for credentials.
- **TLS/SSL encryption** enforced.
- **Input validation & sanitization** using `express-validator`.
- **Password hashing** with `bcrypt`.
- **NoSQL injection prevention**.
- **Rate limiting** to prevent brute-force attacks.
- **Restricted MongoDB access** to trusted IPs.

## Contributing
Feel free to submit pull requests for improvements!

## License
MIT License