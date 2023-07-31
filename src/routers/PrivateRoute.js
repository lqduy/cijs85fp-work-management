
import { useNavigate  } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
export default function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
	const navigate = useNavigate();

  return currentUser ? children : navigate('/login')
}