# 💰 CryptoPortfolio

## CryptoPortfolio is a cryptocurrency portfolio tracking application designed to help users monitor and manage their digital assets efficiently. The project leverages a combination of C#, TypeScript, and CSS to deliver a responsive and user-friendly interface.

## 🚀 Features

- Real-Time Tracking: Monitor the real-time value of your cryptocurrency holdings.

- Comprehensive Dashboard: View a consolidated dashboard displaying your portfolio's performance.

- Email notifications: Get notified when a coin reaches the target price.

- Multi-Asset Support: Track a wide range of cryptocurrencies.

- User Authentication: Secure login system to protect user data.

- Responsive Design: Accessible on various devices, ensuring usability on desktops, tablets, and smartphones.

## 🛠️ Technologies Used

🔙 Backend – ASP.NET Core (C#)
ASP.NET Core Web API – For building RESTful endpoints that handle:

- Portfolio data

- User operations

- Integration with external APIs (CoinGecko)

- Entity Framework Core – ORM used to interact with a relational database (SQL Server).

- Dependency Injection – Ensures clean, testable architecture.

- Model Binding & Validation – Strongly-typed models with validation to enforce data integrity.

- AWS SES(Simgle email Service) - Sending price alert emails.

🔜 Frontend – React + TypeScript

- React – Dynamic UI rendering and component-based structure.

- TypeScript – Static typing improves development safety and efficiency.

- Axios – To communicate with backend services and fetch live crypto prices.

- Tailwind CSS / Custom CSS – For fast and responsive styling.

- React Hooks – To manage component state and lifecycle events.

🗃️ Database
SQL Server – Used to persist:

- User profiles

- Portfolio entries

- Coin metadata

- Comments

- Price alerts for email notifications

- Configured via Entity Framework with connection strings in appsettings.json.

🌐 External API

- CoinGecko API:

- Retrieves real-time prices and metadata for cryptocurrencies.

- Used in backend services to keep portfolio values current.
