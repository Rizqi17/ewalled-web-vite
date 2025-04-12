import { Link, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransferPage from "./pages/TransferPage";
import TopUpPage from "./pages/TopUpPage";
import FinancialOverviewPage from "./pages/FinancialOverviewPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/transfer" element={<TransferPage />} />
      <Route path="/topup" element={<TopUpPage />} />
      <Route path="/financialoverview" element={<FinancialOverviewPage />} />
    </Routes>
  );
}

export default App;
