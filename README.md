# CryptoPortfolio

CryptoPortfolio is a cryptocurrency portfolio tracking application designed to help users monitor and manage their digital assets efficiently. The project leverages a combination of C#, TypeScript, and CSS to deliver a responsive and user-friendly interface.

Features
Real-Time Tracking: Monitor the real-time value of your cryptocurrency holdings.

Comprehensive Dashboard: View a consolidated dashboard displaying your portfolio's performance.

Multi-Asset Support: Track a wide range of cryptocurrencies.

User Authentication: Secure login system to protect user data.

Responsive Design: Accessible on various devices, ensuring usability on desktops, tablets, and smartphones.

🛠️ Technologies Used
Backend – ASP.NET Core (C#)
ASP.NET Core Web API: Used for building RESTful endpoints to handle portfolio data, user operations, and integration with external APIs like CoinGecko.

Entity Framework Core: Likely used as an Object-Relational Mapper (ORM) to interact with a relational database (e.g., PostgreSQL or SQL Server).

Dependency Injection: Built-in DI for clean architecture and testability.

Model Binding & Validation: Ensures data integrity through strongly-typed models and validation attributes.

Frontend – React + TypeScript
React: Handles the dynamic UI rendering and state management for user interactions.

TypeScript: Provides static type-checking for better developer experience and reliability.

Axios or Fetch API: For communicating with the ASP.NET backend and retrieving real-time coin prices.

Tailwind CSS / Custom CSS: For styling the UI, making it responsive and visually appealing.

React Hooks: For managing component state, effects, and logic reusability.

Database
SQL Server: relational database to store user data, portfolio entries, and coin metadata.

Could be configured via Entity Framework migrations and connection strings in appsettings.json.

External API
CoinGecko API:

Fetches real-time cryptocurrency prices and metadata.

Used in backend services to enrich portfolio information with up-to-date pricing.
