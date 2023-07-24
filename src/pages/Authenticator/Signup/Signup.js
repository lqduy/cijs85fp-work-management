import { Link } from "react-router-dom";
import Login from "../Login/Login";
import signupStyles from '../Login/Login.module.scss'

const Signup = () => {
  return (
    <div className={signupStyles.wrapper}>
      <div className={signupStyles.logo}>
        <img width="200" height="42" src="/assets/trello-logo-blue.svg" />
      </div>
      <div className={signupStyles.container}>
        <form className={signupStyles.myform}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control font-size-lg"
              id="user-email"
              aria-describedby="emailHelp"
              placeholder="Enter your email here"
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
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              placeholder="Enter your password here"
            />
          </div>
          <div className={(signupStyles.info)}>
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
  );
};
export default Signup;
