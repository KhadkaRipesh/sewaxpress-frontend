import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing/Landing';
import NotFoundError from '../404-errror';
import SetPassword from '../../Components/Auth/SetPassword';
import Category from '../Category/Category';
import RequireAuth from '../../Components/RequireAuth';
import UnauthorizedPage from '../../Components/UnauthorizedPage';
import PopupModal from '../../Components/modal/PopupModal';
import GoogleAuth from '../../Components/Auth/GoogleAuth';
import Services from '../Services/Service';
import AdminDashboard from '../Admin/Dashboard';
import Bookings from '../Admin/Booking';
import Categories from '../Admin/Category';
import Users from '../Admin/User';
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
            path='/admin'
            element={<RequireAuth allowedRoles={ROLES.ADMIN} />}
          >
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path='booking' element={<Bookings />}></Route>
            <Route path='category' element={<Categories />}></Route>
            <Route path='user' element={<Users />}></Route>
          </Route>

          {/* public route */}
          <Route path='*' element={<NotFoundError />}></Route>
          <Route path='/login' element={<PopupModal />}></Route>
          <Route path='/' element={<LandingPage />}></Route>
          <Route
            path='/success/google/callback'
            element={<GoogleAuth />}
          ></Route>
          <Route path='/:city' element={<Category />}></Route>
          <Route path='/unauthorized' element={<UnauthorizedPage />}></Route>

          <Route path='/:city/:category' element={<Services />}></Route>
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
