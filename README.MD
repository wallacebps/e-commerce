# Product Management Project

This project is a full-stack web application built with the **MERN** stack (MongoDB, Express, React, Node.js). It provides functionality for managing products, including adding, listing, editing, and deleting products, as well as user authentication via JWT.

[Deploy](https://e-commerce-lime-alpha-39.vercel.app/login)

## Technologies Used

### Frontend:
- **React**: JavaScript library for building interactive user interfaces.
- **React Router**: For navigation between pages.
- **Tailwind CSS**: Utility-first CSS framework for styling components.
- **Font Awesome**: Icons for social media and navigation.
- **React Spinners**: Loading indicators for asynchronous operations.
- **LocalStorage**: For storing user authentication information.

### Backend:
- **Express**: Framework for building server-side APIs and routes.
- **MongoDB Atlas**: Cloud-hosted MongoDB service for storing products and user data.
- **Mongoose**: MongoDB object modeling for Node.js.
- **JWT**: Authentication using JSON Web Tokens for secure user sessions.
- **dotenv**: For loading environment variables.

## Features

### Frontend

- **ProductList**:
  - Display products with search and filtering functionality.
  - Option to delete products with a confirmation prompt.
  - Loading indicator (`ClipLoader`) displayed while data is being fetched.
  - Error messages displayed on failure.

- **AddProduct**:
  - Form to add new products with fields such as name, price, category, and company.
  - Validation for required fields and price format.
  - Sends a POST request to add the product to the backend.
  - Loading indicator and success/error messages.

- **UpdateProduct**:
  - Form to edit product details with validation for fields.
  - Sends a PUT request to update the product.
  - Product details loaded upon page initialization.
  - Loading indicator and error messages.

### Backend

- **User Authentication**:
  - User registration with JWT token generation.
  - Login with email and password, returning a JWT token.
  - JWT-based authentication to protect private routes.

- **Product Management**:
  - Create, list, update, and delete products.
  - Permission verification based on `userId` before allowing modification.

## How to Run the Project

### Prerequisites

- Node.js (version >= 16)
- MongoDB Atlas account (for cloud database)
- MongoDB URI (from MongoDB Atlas)

### Step-by-Step Guide

1. Clone the repository:

```bash
git clone https://github.com/wallacebps/product-management-project.git
cd product-management-project
```

2. Install frontend dependencies:

```bash
cd frontend
npm install
```

3. Install backend dependencies:

```bash
cd ../backend
npm install
```

4. Set up environment variables:

In the `backend` directory, create a `.env` file with the following variables:

```bash
JWT_KEY=your-secret-jwt-key
MONGODB_URI=your-mongodb-atlas-uri
```

5. Start MongoDB (if using a local database) or ensure your MongoDB Atlas cluster is active.

6. Start the backend server:

```bash
cd backend
npm start
```

7. Start the frontend server:

```bash
cd frontend
npm start
```

### Testing the Application

- The frontend will be available at `http://localhost:3000`.
- The backend will be available at `http://localhost:5000`.

## Deployment

### Technologies Used for Deployment:

- **MongoDB Atlas**: The database is hosted on MongoDB Atlas, providing a secure and scalable solution for product and user data storage.
- **Vercel**: The frontend is deployed using Vercel, which offers fast and optimized hosting for React applications with easy CI/CD integrations.
- **Render**: The backend is deployed on Render, a cloud platform that supports Node.js applications and offers automatic scaling and deployment from GitHub repositories.

### Deployment Steps

1. **Frontend Deployment (Vercel)**:
   - The frontend is deployed on [Vercel](https://vercel.com).
   - The repository is connected to Vercel, and every push to the main branch triggers an automatic deployment.
   - Environment variables such as `REACT_APP_API_URL` are configured in the Vercel dashboard to point to the backend URL.

2. **Backend Deployment (Render)**:
   - The backend is deployed on [Render](https://render.com).
   - Render automatically builds and deploys the backend from the GitHub repository, with environment variables like `JWT_KEY` and `MONGODB_URI` configured in the Render dashboard.
   - The backend is hosted as a Node.js application and can scale automatically based on demand.

   **Live Demo**
    You can view the live application here:
    [Live Demo](https://e-commerce-lime-alpha-39.vercel.app/login)

## Future Improvements

- **Componentization**: Refactor and better modularize the frontend to improve maintainability and reusability of components.
- **Testing with Jest**: Implement unit and integration tests using Jest to ensure the application’s robustness and reliability.
- **Password Security**: Implement password hashing with `bcrypt` to ensure passwords are securely stored.
- **Error Handling**: Improve error handling and provide more informative responses for the API.
- **Input Validation and Sanitization**: Use libraries like `express-validator` or `Joi` for more rigorous input validation and sanitization.
- **Consistent API Responses**: Standardize API responses with consistent `status` and `data` fields for all routes.

## Contact

You can connect with me via:

- [LinkedIn](https://www.linkedin.com/in/wallacebps/)
- [GitHub](https://github.com/wallacebps)

---
