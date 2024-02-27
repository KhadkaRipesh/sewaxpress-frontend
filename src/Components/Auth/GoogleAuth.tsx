import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ErrorMessage } from '../../utils/notify';

function GoogleAuth() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const accessToken = searchParams.get('access_token');
    const userType = searchParams.get('user_type');
    const error = searchParams.get('error');
    if (accessToken && userType) {
      sessionStorage.setItem('jwtToken', accessToken);
      sessionStorage.setItem('role', userType);
      navigate('/');
      window.location.reload();
    }
    if (error) {
      navigate('/');
      ErrorMessage(error);
    }
  }, []);

  return <></>;
}

export default GoogleAuth;
