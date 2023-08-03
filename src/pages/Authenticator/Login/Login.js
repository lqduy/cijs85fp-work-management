import "./Login.module.scss";
import { Link, useNavigate } from "react-router-dom";
import Signup from "../Signup/Signup";
import { AuthProvider } from "../../../contexts/AuthContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useRef, useState } from "react";
import loginStyles from "./Login.module.scss";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError("");
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      setError("Incorrect email address and / or password.");
    } finally {
      setLoading(false);
    }
  };

  const hasCurrentUser = !!currentUser;
  return (
    <AuthProvider>
      {hasCurrentUser ? (
        <div className={loginStyles.wrapper}>
          <div className={loginStyles.logoTxt}>
            <h2>Error: Please log out first</h2>
          </div>
        </div>
      ) : (
        <div className={loginStyles.wrapper}>
          <div className={loginStyles.logo}>
            <img width="200" height="80" src="/assets/logo.png" alt="logo" />
          </div>
          <div className={loginStyles.container}>
            <div className={loginStyles.logoTxt}>
              <h2>Log In</h2>
            </div>
            <form className={loginStyles.myform} onSubmit={handleSubmit}>
              <div className="mb-3 form-section">
                <label className={loginStyles.formLabel + " form-label"}>
                  Email address
                </label>
                <input
                  type="email"
                  className={loginStyles.formInput}
                  id="user-email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email here"
                  ref={emailRef}
                  required
                />
              </div>
              <div className="mb-3">
                <label className={loginStyles.formLabel + " form-label"}>
                  Password
                </label>
                <input
                  type="password"
                  className={loginStyles.formInput}
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
      )}
    </AuthProvider>
  );
};

export default Login;
