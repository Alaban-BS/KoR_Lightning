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

const App: React.FC = () => {
  const { t } = useTranslation();
  const [productData, setProductData] = useState<Product[]>([]);
  const [orderLines, setOrderLines] = useState<OrderLine[]>([]);
  const [flagMapping, setFlagMapping] = useState<Record<string, string>>({});
  const [stockData, setStockData] = useState<any[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);

  // Load saved order on initial load
  useEffect(() => {
    const savedOrders = orderService.getAllOrders();
    if (savedOrders.length > 0) {
      const latestOrder = savedOrders[savedOrders.length - 1];
      setOrderLines(latestOrder.orderLines);
      setCurrentOrderId(latestOrder.id);
    }
  }, []);

  // Auto-save order when it changes
  useEffect(() => {
    if (currentOrderId) {
      try {
        orderService.updateOrder(currentOrderId, orderLines);
        console.log('Order updated successfully:', { currentOrderId, orderLines });
      } catch (error) {
        console.error('Error updating order:', error);
      }
    }
  }, [orderLines, currentOrderId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productRes = await fetch("/CustomerPricing.json");
        const products: Product[] = await productRes.json();
        setProductData(products);
      } catch (error) {
        console.error(
          t("error.priceList") || "Error loading price list:",
          error
        );
      }

      try {
        const flagRes = await fetch("/Flags.json");
        const flags: FlagItem[] = await flagRes.json();
        const mapping = flags.reduce((acc, item) => {
          acc[item.origin] = item.iso;
          return acc;
        }, {} as Record<string, string>);
        setFlagMapping(mapping);
      } catch (error) {
        console.error(t("error.flags") || "Error loading flags:", error);
      }

      try {
        const stockRes = await fetch("/Stock.json");
        const stock = await stockRes.json();
        setStockData(stock);
      } catch (error) {
        console.error(t("error.stock") || "Error loading stock data:", error);
      }
    };

    void fetchData();
  }, [t]);

  const handleRemoveLine = (sku: string) => {
    setOrderLines((prevLines) => {
      const newLines = prevLines
        .map((line) => (line.SKU === sku ? { ...line, qty: 0 } : line))
        .filter((line) => line.qty > 0);
      
      // Update the order immediately after removing a line
      if (currentOrderId) {
        orderService.updateOrder(currentOrderId, newLines);
      }
      
      return newLines;
    });
  };

  const handleLoadOrder = (loadedOrderLines: OrderLine[], orderId: string) => {
    // Save current order before loading new one
    if (currentOrderId) {
      orderService.updateOrder(currentOrderId, orderLines);
    }
    
    // Load new order
    setOrderLines(loadedOrderLines);
    setCurrentOrderId(orderId);
  };

  const handleNewOrder = () => {
    setOrderLines([]);
    setCurrentOrderId(null);
  };

  return (
    <div className="app-container">
      <TitleBar />
      <div className="main-content">
        <div className="price-list-container">
          <PriceList
            productData={productData}
            orderLines={orderLines}
            setOrderLines={setOrderLines}
            flagMapping={flagMapping}
            stockData={stockData}
          />
        </div>
        <div className="order-container">
          <Order
            orderLines={orderLines}
            productData={productData}
            onRemoveLine={handleRemoveLine}
            orderManagement={
              <OrderManagement
                currentOrderId={currentOrderId}
                currentOrderLines={orderLines}
                onLoadOrder={handleLoadOrder}
                onNewOrder={handleNewOrder}
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

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
