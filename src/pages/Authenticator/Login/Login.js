import './Login.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Signup from '../Signup/Signup';
import { useAuth } from '../../../contexts/AuthContext';
import { useRef, useState } from 'react';
import loginStyles from './Login.module.scss';
import SidebarLayout from '../../../layouts/SidebarLayout/SidebarLayout';
import { eyeIcon, closedEyeIcon, arrowRightIcon } from '../../../utils/icons';
import Loading from '../../../components/Loading/Loading';
import Button from '../../../components/Button';

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login, currentUser, signInWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      await login(emailRef.current.value, passwordRef.current.value, currentUser);
      console.log(currentUser);
      navigate(`/u/home`);
    } catch (error) {
      setError('Incorrect email address and / or password.');
    } finally {
      setLoading(false);
    }
  };
  const googleSignUpHandler = async e => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await signInWithGoogle();
      navigate(`/u/home`);
    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const hasCurrentUser = !!currentUser;
  return (
    <>
      {hasCurrentUser ? (
        <SidebarLayout>
          <div className={loginStyles.wrapper}>
            <div className={loginStyles.errTxt}>
              <h2>Error: Please log out first</h2>
            </div>
          </div>
        </SidebarLayout>
      ) : (
        <div className={loginStyles.wrapper}>
          <Button to={'/about'} rigthIcon={arrowRightIcon} className={loginStyles.linkToLadingPage}>
            Learn more about us
          </Button>
          <div className={loginStyles.logo}>
            <img width="auto" height="100%" src="/assets/logo.png" alt="logo" />
          </div>
          <div className={loginStyles.container}>
            <div className={loginStyles.logoTxt}>
              <h2>LOG IN</h2>
            </div>
            <form className={loginStyles.myform} onSubmit={handleSubmit}>
              <div className="mb-3 form-section">
                <label className={loginStyles.formLabel + ' form-label'}>Email address</label>
                <div className={loginStyles.fieldControl}>
                  <input
                    type="email"
                    className={loginStyles.formInput}
                    id="user-email"
                    aria-describedby="emailHelp"
                    placeholder="Enter your email here"
                    ref={emailRef}
                    style={{ width: '100%' }}
                    required
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className={loginStyles.formLabel + ' form-label'}>Password</label>
                <div className={loginStyles.fieldControl}>
                  <input
                    type={hidePassword ? 'password' : 'text'}
                    className={loginStyles.formInput}
                    id="user-password"
                    placeholder="Enter your password here"
                    ref={passwordRef}
                    required
                  />
                  <span
                    className={loginStyles.viewpwIcon}
                    onClick={() => setHidePassword(!hidePassword)}
                  >
                    {hidePassword ? eyeIcon : closedEyeIcon}
                  </span>
                </div>
              </div>
              <div className={loginStyles.info}>
                <div className={loginStyles.error}>{error}</div>
                <div className={loginStyles.infoText + ' info-text'}>
                  <Link to="/signup" element={<Signup />}>
                    Don't have an account? <span className={loginStyles.nav}>Sign up here</span>
                  </Link>
                </div>
                <button type="submit" className={loginStyles.btn} disabled={loading}>
                  Log in
                </button>
                <div className={loginStyles.orText} id="orText">
                  <span>OR</span>
                </div>
                <div className={loginStyles.socialMedia}>
                  <button
                    disabled={loading}
                    type="button"
                    className={loginStyles.btn}
                    onClick={googleSignUpHandler}
                  >
                    <img src="/assets/google-logo.webp" alt="" width="32px" height="auto" />
                    <span>Continue with Google</span>
                  </button>
                  <button
                    disabled={loading}
                    type="button"
                    className={loginStyles.btn}
                    onClick={googleSignUpHandler}
                  >
                    <img src="/assets/facebook-logo.webp" alt="" width="32px" height="auto" />
                    <span>Continue with Facebook</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
