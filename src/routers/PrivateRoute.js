import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function PrivateRoute({ component: Component }) {
  const { currentUser } = useAuth();

  const hasCurrentUser = !!currentUser;

  return hasCurrentUser ? Component : <Navigate to="/login" />;
}
