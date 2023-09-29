import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router';

const NavigationPage = () => {
  const { currentUser } = useAuth();
  const navigator = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigator('/u/home');
    } else {
      navigator('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <></>;
};

export default NavigationPage;
