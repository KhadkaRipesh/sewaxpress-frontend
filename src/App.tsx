import LoadingBar from 'react-top-loading-bar';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Base from './Pages/Base/Base';
import LandingPage from './Pages/Landing/Landing';
import Category from './Pages/Category/Category';
import Services from './Pages/Services/Service';
import SetPassword from './Components/Auth/SetPassword';
import UnauthorizedPage from './Components/UnauthorizedPage';
import RequireAuth from './Components/RequireAuth';
import AdminDashboard from './Pages/Admin/Dashboard';
import Bookings from './Pages/Admin/Booking';
import Categories from './Pages/Admin/Category';
import Users from './Pages/Admin/User';
import { useState } from 'react';
import Loading from './Components/resuable/Loading';
import PopupModal from './Components/modal/PopupModal';
import GoogleAuth from './Components/Auth/GoogleAuth';
import NotFoundError from './Pages/404-errror';
import ServiceProviderDashboard from './Pages/ServiceProvider/Dashboard';
import Test from './Pages/ServiceProvider/Test';
import ServiceManagement from './Pages/ServiceProvider/Services';
import Chat from './Pages/Chat/Chat';
const ROLES = {
  CUSTOMER: 'CUSTOMER',
  SERVICE_PROVIDER: 'SERVICE_PROVIDER',
  ADMIN: 'ADMIN',
};
function App() {
  const [loading, setLoading] = useState(true);
  // // Page will load after 1 second
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  if (loading) {
    return <Loading />;
  }
  // If page is not in loading state, display page.
  else {
    const token = localStorage.getItem('jwtToken');
    let isAuth;
    if (token) {
      isAuth = true;
    }
    return (
      <>
        <ToastContainer position='bottom-right' />
        <LoadingBar color='#1D588B' progress={100} height={4} />

        <Routes>
          {/* protected routes for admin*/}
          <Route
            path='/admin'
            element={<RequireAuth allowedRoles={ROLES.ADMIN} />}
          >
            <Route path='dashboard' element={<AdminDashboard />}></Route>
            <Route path='booking' element={<Bookings />}></Route>
            <Route path='category' element={<Categories />}></Route>
            <Route path='user' element={<Users />}></Route>
          </Route>

          {/* protected routes for service provider */}
          <Route
            path='/serviceprovider'
            element={<RequireAuth allowedRoles={ROLES.SERVICE_PROVIDER} />}
          >
            <Route
              path='dashboard'
              element={<ServiceProviderDashboard />}
            ></Route>
            <Route path='services' element={<ServiceManagement />}></Route>
            <Route path='booking' element={<Test />}></Route>
            <Route path='messages' element={<Chat />}></Route>
          </Route>

          {/* public routes */}
          <Route path='/' element={<Base />}>
            <Route path='/' element={<LandingPage />}></Route>
            <Route path='/:city' element={<Category />}></Route>
            <Route path='/:city/:category' element={<Services />}></Route>
            <Route path='/messages' element={<Chat />}></Route>
          </Route>
          <Route
            path='/login'
            element={isAuth ? <Navigate to='/' /> : <PopupModal />}
          ></Route>
          <Route
            path='/success/google/callback'
            element={isAuth ? <Navigate to='/' /> : <GoogleAuth />}
          ></Route>
          <Route
            path='/:userId/set-password/:otp'
            element={isAuth ? <Navigate to='/' /> : <SetPassword />}
          ></Route>
          <Route path='/unauthorized' element={<UnauthorizedPage />}></Route>
          <Route path='*' element={<NotFoundError />}></Route>
        </Routes>
      </>
    );
  }
}

export default App;
