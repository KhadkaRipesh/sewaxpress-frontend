import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Body from './Pages/Body/Body';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfileNavbar from './Components/Nav/ProfileNavbar';
import { jwtDecode } from 'jwt-decode';
import Loading from './Components/resuable/Loading';
import AdminNav from './Components/Nav/AdminNav';
import Nav from './Components/Nav/Nav';
function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const location = useLocation();

  // Set loading state to true initially
  const [loading, setLoading] = useState(true);

  // Page will load after 1 second
  setTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(() => {
    // store token and roles if there is on session
    const jwtToken = sessionStorage.getItem('jwtToken');
    const role = sessionStorage.getItem('role');
    // if use is admin redirect to admin dashboard
    if (role === 'ADMIN') {
      setIsAdmin(true);
      navigate('/admin/dashboard');
    }
    if (jwtToken) {
      try {
        const decodedToken = jwtDecode(jwtToken);

        // Check if token is expired
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setIsLoggedIn(true);
        } else {
          // Token is expired, clear sessionStorage and log out
          sessionStorage.removeItem('jwtToken');
          console.log(isLoggedIn);
        }
      } catch (error) {
        // Handle invalid or expired token
        console.error('Error decoding JWT token:', error);
        setIsLoggedIn(false);
        sessionStorage.removeItem('jwtToken');
      }
    }
  }, []);

  const isSetPasswordPage = () => {
    return location.pathname.includes('set-password');
  };

  const renderNavBar = () => {
    if (isSetPasswordPage()) {
      return null;
    } else if (isAdmin) {
      return <AdminNav />;
    } else if (isLoggedIn) {
      return <ProfileNavbar />;
    }
    return <Nav />;
  };

  if (loading) {
    return <Loading />;
  }
  // If page is not in loading state, display page.
  else {
    return (
      <>
        <div className={`${isAdmin ? 'App' : ''}`}>
          <ToastContainer position='bottom-right' />
          <LoadingBar color='#1D588B' progress={100} height={4} />
          {renderNavBar()}
          <Body />
        </div>
      </>
    );
  }
}

export default App;
