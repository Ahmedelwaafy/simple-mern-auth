# Simple MERN Auth

This repository contains a full-stack authentication application built with the MERN stack (MongoDB, Express, React, Node.js) using React for the frontend and Nest.js for the backend.

## Repository Structure

The project is organized into two main directories:
- `/frontend` - React application
- `/backend` - Nest.js API

## Getting Started

### Prerequisites
- Node.js (v14 or newer)
- npm or yarn
- MongoDB

### Installation

Clone the repository:
```bash
git clone git@github.com:Ahmedelwaafy/simple-mern-auth.git
cd simple-mern-auth
```

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```
The frontend will be available at `http://localhost:5173`

#### Backend Setup
```bash
cd backend
npm install
npm run start:dev
```
The backend API will be available at `http://localhost:3000`

### Environment Variables

#### Backend (.env)
Create a `.env` file in the backend directory with the following variables:
```
MONGODB_URI=mongodb://username:password@your-mongodb-uri.com:27017
MONGODB_DATABASE=your-database-name
JWT_SECRET=your-secret-key
JWT_TOKEN_AUDIENCE=https://your-frontend-url.com
JWT_TOKEN_ISSUER=https://your-backend-url.com
JWT_ACCESS_TOKEN_TTL=3600
JWT_REFRESH_TOKEN_TTL=86400
API_VERSION=v1
```

#### Frontend (.env)
Create a `.env` file in the frontend directory with the following variables:
```
VITE_RECAPTCHA_KEY=your-recaptcha-site-key
VITE_BACKEND_URL=http://localhost:3000/api/v1
```

## Frontend Features

### Localization
The application supports multiple languages with easy switching between them. We use i18next for translations.

### Dark Mode
Users can toggle between light and dark themes according to their preferences. The setting is saved and persists between sessions.

### CAPTCHA Integration
Form submissions are protected with CAPTCHA verification to prevent spam and bot activities.

### Lazy Loading Routes
The application implements code splitting and lazy loading to improve initial load performance, loading components only when needed.

### Error Boundaries
Robust error handling with React Error Boundaries to prevent the entire application from crashing when component errors occur.

### Meta Tags
Dynamic meta tags for SEO optimization, improving search engine visibility and social media sharing.

## Backend Features

### Secure Sessions
Authentication using HTTP-only cookies for enhanced security, protecting against XSS attacks.

### API Documentation
Comprehensive API documentation using Swagger, accessible at `/api/docs` when the server is running.

### Error Handling
Centralized error handling with proper HTTP status codes and consistent error responses.

### Security Headers
Added Helmet for securing HTTP headers to protect against common web vulnerabilities.

### Rate Limiting
Implemented rate limiting with the ThrottlerModule to protect against brute force attacks and prevent API abuse.

## Testing Endpoints

### Using Swagger UI
The API documentation includes an interactive interface to test endpoints:
1. Start the backend server
2. Navigate to `http://localhost:3000/api/docs` in your browser
3. Use the Swagger UI to explore and test available endpoints

### Using HTTP Files in VS Code
Each module in the backend contains HTTP files in the HTTP folder that can be used with the HttpYAC extension in VS Code:
1. Install the HttpYAC extension from [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=anweber.vscode-httpyac)
2. Open any file from the HTTP folder in the module you want to test
3. Send requests directly from VS Code

## Development Process Recording

The complete development process of this project has been recorded and can be viewed at:
[https://www.awesomescreenshot.com/video/37423953?key=0da2a38372eb684070cc905ca0c18782](https://www.awesomescreenshot.com/video/37423953?key=0da2a38372eb684070cc905ca0c18782)# simple-mern-ecommerce-with-paymob-integration
