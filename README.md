# 🛒 E-Commerce Project

Welcome to the **E-Commerce** project! This is a fully-featured online store platform that allows users to browse products, add them to their cart, and complete orders in a seamless, secure, and user-friendly environment. The project is built using **Node.js** and **MongoDB**, utilizing **Passport.js** for authentication, and is designed with scalability and extensibility in mind.

## 🌟 Features

- 🔒 **Secure Authentication**: Authentication is handled through **HTTP-only cookies** and **JWT** (both Access Tokens and Refresh Tokens). This ensures a secure, token-based authentication process while keeping sensitive information safe.
- 🛍️ **Shopping Cart Functionality**: Users can add products to their cart, adjust quantities, and remove items. The cart persists across sessions to offer users a seamless experience.

- 📦 **Product Catalog**: The project offers a dynamic product catalog where users can search, filter, and sort products by category, price range, and other criteria. Pagination is also implemented to manage large datasets efficiently.

- 🛠️ **Order Management**: Users can view, create, and manage their orders. They can track their purchase history and view order details such as product information, total cost, and delivery status.

- 📊 **Admin Panel**: Admin users have full access to manage the platform, including product management (adding, updating, and removing products), order processing, and user account management.

- 🌐 **REST API**: The project provides a comprehensive API that allows interaction with the platform, making it easy to integrate with different frontend clients or mobile apps.

- 🛠️ **Extensibility**: The project is built with a modular architecture, making it easy to extend functionalities or integrate new services in the future.

## 🏗️ Tech Stack

- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Passport.js, JWT, HTTP-only Cookies
- **Version Control**: Git, GitHub

## 🚀 Getting Started

To get started with this project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/SaberPorramezan/e-commerce.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your environment variables:

   Refer to the `.env.example` file in the project root for the required environment variables. You can create your own `.env` file based on this example.

4. Start the development server:

   ```bash
   npm run dev
   ```

## 🛠️ Testing the API

To explore and test all available API endpoints, you can use **Postman** with the provided collection file in the project:

- **Postman Collection**: Use the `e-commerce.postman_collection.json` file available in the repository to import all API routes and easily test them.

## 🤝 Contributing

We welcome contributions to improve this project! Feel free to fork the repository, make your changes, and submit a pull request. Here’s how you can get involved:

1. Fork the repo.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## 📧 Contact

For any inquiries, feel free to reach out via Telegram: [SaberPorramezan](https://t.me/SaberPorramezan) or open an issue in the repository.

---

### 💡 If you find this project helpful or interesting, please give it a star ⭐ on [GitHub](https://github.com/SaberPorramezan/e-commerce)!
