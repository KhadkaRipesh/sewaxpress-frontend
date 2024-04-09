import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminNav from './Nav/AdminNav';
import ServiceProviderNav from './Nav/ServiceProviderNav';
import { useQuery } from 'react-query';
import { sessionUser } from '../api/connection';
import Loading from './resuable/Loading';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwtToken');
  const { data: userInfo, isLoading } = useQuery('users', () =>
    sessionUser(jwt)
      .then((res) => {
        return res.data.data;
      })
      .catch((error) => {
        if (error) {
          console.log(error);
          localStorage.removeItem('jwtToken');
          navigate('/login');
        }
      })
  );
  if (isLoading) {
    return <Loading />;
  }

  if (userInfo?.role === allowedRoles) {
    return (
      <div className='admins'>
        {userInfo.role === 'ADMIN' ? <AdminNav /> : <ServiceProviderNav />}
        <Outlet />
      </div>
    );
  } else {
    return (
      <Navigate
        to={userInfo ? '/unauthorized' : '/login'}
        state={{ from: location }}
        replace
      />
    );
  }
};

export default RequireAuth;
