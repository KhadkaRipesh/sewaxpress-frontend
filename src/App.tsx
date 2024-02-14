import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Body from './Pages/Body/Body';
import NavBar from './Pages/Nav/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
function App() {
  const location = useLocation();

  const isSetPasswordPage = () => {
    return location.pathname.includes('set-password');
  };

  const renderNavBar = () => {
    if (isSetPasswordPage()) {
      return null;
    }
    return <NavBar />;
  };
  return (
    <>
      <ToastContainer position='bottom-right' />
      <LoadingBar color='#1D588B' progress={100} height={4} />
      {renderNavBar()}
      <Body />
    </>
  );
}

export default App;
