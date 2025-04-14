import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import TopUpPage from "./pages/TopUpPage";
import FinancialOverviewPage from "./pages/FinancialOverviewPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* public routes */}
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* protected routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transfer"
        element={
          <ProtectedRoute>
            <TransferPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/topup"
        element={
          <ProtectedRoute>
            <TopUpPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/financialoverview"
        element={
          <ProtectedRoute>
            <FinancialOverviewPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
