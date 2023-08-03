import { Link, useNavigate  } from "react-router-dom";
import Login from "../Login/Login";
import signupStyles from "../Login/Login.module.scss";
import { useAuth } from "../../../contexts/AuthContext";
import { AuthProvider } from "../../../contexts/AuthContext";
import { useRef, useState } from "react";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const { signup, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError("Passwords do not match");
    }
    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/')

    } catch {
      setError("There is an error, please try again");
    }
    setLoading(false);
  };
  if (currentUser) {
    console.log("Current user: ", currentUser.email);
  }

  return (
    <AuthProvider>
      <div className={signupStyles.wrapper}>
        <div className={signupStyles.logo}>
          <img src="/assets/logo.png"
          width="200"
          height="80"
            alt="logo" />
        </div>
        <div className={signupStyles.container}>
        <div className={signupStyles.logoTxt}><h2>Sign Up</h2></div>
          <form className={signupStyles.myform} onSubmit={handleSubmit}>
            <div className="mb-3 form-section">
              <label className={(signupStyles.formLabel)}>Email address</label>
              <input
                type="email"
                className={(signupStyles.formInput)}
                id="user-email"
                aria-describedby="emailHelp"
                placeholder="Enter your email here"
                ref={emailRef}
                required
              />
            </div>
            <div className="mb-3 form-section">
              <label className={(signupStyles.formLabel)}>Password</label>
              <input
                type="password"
                className={(signupStyles.formInput)}
                id="password"
                placeholder="Enter your password here"
                ref={passwordRef}
                required
              />
            </div>
            <div className="mb-3 form-section">
              <label className={(signupStyles.formLabel)}>Confirm Password</label>
              <input
                type="password"
                className={(signupStyles.formInput)}
                id="confirm-password"
                placeholder="Confirm your password here"
                ref={confirmPasswordRef}
                required
              />
            </div>
            <div className={signupStyles.info}>
              <div className={signupStyles.error}>{error}</div>
              <div className={signupStyles.infoText + " info-text"}>
                <Link to="/login" element={<Login />}>
                  Already have an account? Log in here
                </Link>
              </div>
              <button
                disabled={loading}
                type="submit"
                className={signupStyles.btn}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </AuthProvider>
  );
};
export default Signup;
