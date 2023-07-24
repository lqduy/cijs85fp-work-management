import "./Login.module.scss";
import { Link } from "react-router-dom";
import Signup from "../Signup/Signup";
import loginStyles from './Login.module.scss'


const Login = () => {
  return (

    <div className={(loginStyles.wrapper)}>
      <div className={(loginStyles.logo)}>
        <img width="200" height="42" src="/assets/trello-logo-blue.svg" />
      </div>
      <div className={(loginStyles.container)}>
      <form className={(loginStyles.myform)}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="user-email"
              aria-describedby="emailHelp"
              placeholder="Enter your email here"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your password here"
            />
          </div>
          <div className={(loginStyles.info)}>
          <div className={(loginStyles.infoText) + " info-text"}>
          <Link to="/signup" element={<Signup />}>
            Don't have an account? Sign up here
            </Link>
          </div>
          <button type="submit" className={(loginStyles.btn)}>
            Submit
          </button>
          </div>
      </form>
      </div>
    </div>
  );
};

export default Login;
