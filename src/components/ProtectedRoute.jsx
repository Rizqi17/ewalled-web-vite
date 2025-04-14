import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

function ProtectedRoute({ children }) {
  const user = useAuthStore((state) => state.user);

  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
