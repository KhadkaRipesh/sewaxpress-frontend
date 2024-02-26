import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();

  const token = sessionStorage.getItem('jwtToken');
  const role = sessionStorage.getItem('role');
  // console.log(role, token);
  console.log(role, allowedRoles);
  return role === allowedRoles ? (
    <Outlet />
  ) : token ? (
    <Navigate to='/unauthorized' state={{ from: location }} replace />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};

export default RequireAuth;
