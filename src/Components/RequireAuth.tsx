import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminNav from './Nav/AdminNav';
import ServiceProviderNav from './Nav/ServiceProviderNav';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const token = localStorage.getItem('jwtToken');
  const role = localStorage.getItem('role');

  return role === allowedRoles ? (
    <>
      <div className='admins'>
        {role === 'ADMIN' ? <AdminNav /> : <ServiceProviderNav />}
        <Outlet />
      </div>
    </>
  ) : token ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
