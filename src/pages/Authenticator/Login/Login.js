import "./Login.module.scss";
import { Link, useNavigate  } from "react-router-dom";
import Signup from "../Signup/Signup";
import { AuthProvider } from "../../../contexts/AuthContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useRef, useState } from "react";
import loginStyles from "./Login.module.scss";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/')
      
    } catch {
      setError("Incorrect email address and / or password.");
    }
    setLoading(false);
  };
  return (
    <AuthProvider>
      <div className={loginStyles.wrapper}>
        <div className={loginStyles.logo}>
          <img
            width="200"
            height="42"
            src="/assets/trello-logo-blue.svg"
            alt=""
          />
        </div>
        <div className={loginStyles.container}>
          <form className={loginStyles.myform} onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="user-email"
                aria-describedby="emailHelp"
                placeholder="Enter your email here"
                ref={emailRef}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="user-password"
                placeholder="Enter your password here"
                ref={passwordRef}
                required
              />
            </div>
            <div className={loginStyles.info}>
            <div className={loginStyles.error}>{error}</div>
              <div className={loginStyles.infoText + " info-text"}>
                <Link to="/signup" element={<Signup />}>
                  Don't have an account? Sign up here
                </Link>
              </div>
              <button
                type="submit"
                className={loginStyles.btn}
                disabled={loading}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
};

export default Login;
