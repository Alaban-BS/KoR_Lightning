import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import PriceList from "./components/PriceList";
import Order from "./components/Order";
import TitleBar from "./components/TitleBar";
import OrderManagement from "./components/OrderManagement";
import "./styles/App.css";
import "./styles/PriceList.css";
import "./styles/Order.css";
import "./styles/Login.css";
import "./i18n";
import { Product, OrderLine, FlagItem } from "./types";
import { useTranslation } from "react-i18next";
import { orderService } from "./services/orderService";
import App from './App';
import { ThemeProvider } from './theme/ThemeProvider';

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem("authenticated") === "true"
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(localStorage.getItem("authenticated") === "true");
    };

    window.addEventListener("storage", checkAuth);
    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/index"
            element={isAuthenticated ? <App /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const rootElement = document.getElementById("root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}
