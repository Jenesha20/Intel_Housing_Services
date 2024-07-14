# Intel_Housing_Services

This repository contains the source code for the Housing Services Website, built using the MERN stack (MongoDB, Express.js, React, Node.js) and styled with Tailwind CSS.

## Prerequisites

Before getting started, ensure that you have the following installed on your system:

- **Node.js**: [Install Node.js](https://nodejs.org/)
- **npm**: Comes with Node.js installation
- **MongoDB**: [Install MongoDB](https://docs.mongodb.com/manual/installation/)

## Getting Started

To run the Housing Services Website locally, follow these steps:

1. **Clone this repository to your local machine:**

    ```sh
    git clone https://github.com/Jenesha20/Intel_Housing_Services
    ```

2. **Navigate to the repository directory:**

    ```sh
    cd Intel_Housing_Services
    ```

3. **Install dependencies for both frontend and backend:**

    ```sh
    # Navigate to backend directory and install dependencies
    cd Housing_Backend
    npm install
    
    # Navigate to frontend directory and install dependencies
    cd ../Housing_Frontend
    npm install
    ```

4. **Start the backend server:**

    ```sh
    cd Housing_Backend
    node server.js
    ```

    The backend server will run on `http://localhost:5000`.

5. **Start the frontend development server:**

    ```sh
    cd ../Housing_Frontend
    npm start
    ```

    The frontend application will be accessible at `http://localhost:3000`.

## Project Structure

The project is divided into two main parts:

### Backend (Express.js + MongoDB)

Located in the `Housing_Backend` directory, this contains the server-side code and API endpoints for the Housing Services Website. It uses Express.js for the server framework and MongoDB as the database.

### Frontend (React + Tailwind CSS)

Located in the `Housing_Frontend` directory, this contains the client-side code for the Housing Services Website. It uses React for building the user interface and Tailwind CSS for styling.

## Scripts

In both the `Housing_Frontend` and `Housing_Backend` directories, the following npm scripts are available:

- **Install dependencies:**

    ```sh
    npm install
    ```

- **Start the development server:**

    ```sh
    npm start
    ```

- **Run tests:**

    ```sh
    npm test
    ```

- **Build for production:**

    ```sh
    npm run build
    ```

## Links

- **Report**: [House_Communique](https://github.com/Jenesha20/Intel_Housing_Services/tree/main/House_Communique)
- **Presentation**: [House_Summary](https://github.com/Jenesha20/Intel_Housing_Services/tree/main/Housing_Summary)
- **Figma File**: [Prototype](https://www.figma.com/proto/KoXKX1D74DPcjn3ZKAJKxS/Household-services?node-id=1-3&t=pa19Jb3eHU82lkWu-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1%3A3&show-proto-sidebar=1)

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or create a pull request.

---

**Happy Coding!** 🎉
