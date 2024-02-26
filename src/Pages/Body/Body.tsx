import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing/Landing';
import NotFoundError from '../404-errror';
import SetPassword from '../../Components/Auth/SetPassword';
import Category from '../Category/Category';
import ServiceProviderDashboard from '../ServiceProvider/Dashboard';
import Login from '../ServiceProvider/Test';
import RequireAuth from '../../Components/RequireAuth';
import Admin from '../ServiceProvider/Admin';
import UnauthorizedPage from '../../Components/UnauthorizedPage';
import PopupModal from '../../Components/modal/PopupModal';
const ROLES = {
  CUSTOMER: 'CUSTOMER',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  ADMIN: 'ADMIN',
};
function Body() {
  return (
    <>
      <div>
        <Routes>
          {/* protect route */}
          <Route
            element={<RequireAuth allowedRoles={ROLES.SERVICE_PROVIDER} />}
          >
            <Route
              path='/service'
              element={<ServiceProviderDashboard />}
            ></Route>
            <Route path='/admin' element={<Admin />}></Route>
          </Route>

          {/* public route */}
          <Route path='*' element={<NotFoundError />}></Route>
          <Route path='/login' element={<PopupModal />}></Route>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/:city' element={<Category />}></Route>
          <Route path='/unauthorized' element={<UnauthorizedPage />}></Route>
          {/* <Route path='/:city/:category' element={<Services />}></Route> */}
          <Route
            path='/:userId/set-password/:otp'
            element={<SetPassword />}
          ></Route>
        </Routes>
      </div>
    </>
  );
}

export default Body;
