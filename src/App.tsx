import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Body from './Pages/Body/Body';
import NavBar from './Pages/Nav/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProfileNavbar from './Pages/Nav/ProfileNavbar';
import { jwtDecode } from 'jwt-decode';
import Loading from './Components/resuable/Loading';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();

  // Set loading state to true initially
  const [loading, setLoading] = useState(true);

  // Page will load after 2 seconds
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken');
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

  const isHomePage = () => {
    return location.pathname.includes('/');
  };

  const renderNavBar = () => {
    if (isSetPasswordPage()) {
      return null;
    } else if (isLoggedIn) {
      return <ProfileNavbar />;
    }
    return <NavBar />;
  };

  if (loading) {
    return <Loading />;
  }

  // If page is not in loading state, display page.
  else {
    return (
      <>
        <ToastContainer position='bottom-right' />
        <LoadingBar color='#1D588B' progress={100} height={4} />
        {renderNavBar()}
        <Body />
      </>
    );
  }
}

export default App;
