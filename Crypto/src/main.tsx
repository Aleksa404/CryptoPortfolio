import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, Route, RouterProvider } from "react-router-dom";
import HomePage from "./Pages/HomePage.tsx";
import SearchPage from "./Pages/SearchPage.tsx";
import CoinPage from "./Pages/CoinPage.tsx";
import PortfolioPage from "./Pages/PortfolioPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "search", element: <SearchPage /> },
      { path: "coin/:ticker", element: <CoinPage /> },
      { path: "portfolio", element: <PortfolioPage /> },
    ],
    errorElement: <div>404 Page not found</div>,
  },

  {},
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
