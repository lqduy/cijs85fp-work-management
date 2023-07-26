import { Link } from "react-router-dom";
import Login from "../Login/Login";
import signupStyles from '../Login/Login.module.scss'
import { useAuth } from "../../../contexts/AuthContext";
import { AuthProvider } from "../../../contexts/AuthContext";
import { useRef, useState } from "react";

const Signup = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()
  const {signup, currentUser} = useAuth();
  const [error, setError] = useState('')
  const [loading, setLoanding] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      return setError('Passwords do not match')
    } 
    try{
      setError('');
      setLoanding(true)
      await signup(emailRef.current.value, passwordRef.current.value)
    } catch {
      setError('Please try again')
      setLoanding(false)

    }

  }
 if (currentUser) {console.log("Current user: ", currentUser.email)}
 

  return (
    <AuthProvider>
    <div className={signupStyles.wrapper}>
      <div className={signupStyles.logo}>
        <img width="200" height="42" src="/assets/trello-logo-blue.svg" />
      </div>
      <div className={signupStyles.container}>
        <form className={signupStyles.myform} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control font-size-lg"
              id="user-email"
              aria-describedby="emailHelp"
              placeholder="Enter your email here"
              ref={emailRef}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password here"
              ref={passwordRef}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="Enter your password here"
              ref={confirmPasswordRef}
            />
          </div>
          <div className={(signupStyles.info)}>
            <div className={(signupStyles.error)}>{error}</div>
          <div className={signupStyles.infoText + " info-text"}>
            <Link to="/login" element={<Login />}>
              Already have an account? Log in here
            </Link>
          </div>
          <button type="submit" className={signupStyles.btn}>
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
    </AuthProvider>
  );
};
export default Signup;
