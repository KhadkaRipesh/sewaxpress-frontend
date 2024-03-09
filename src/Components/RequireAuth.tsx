import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminNav from './Nav/AdminNav';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const token = sessionStorage.getItem('jwtToken');
  const role = sessionStorage.getItem('role');

  return role === allowedRoles ? (
    <div className='admins'>
      {role === 'ADMIN' ? <AdminNav /> : null}
      <Outlet />
    </div>
  ) : token ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
