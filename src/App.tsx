import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Body from './Pages/Body/Body';
import NavBar from './Pages/Nav/Nav';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <LoadingBar color='#1D588B' progress={100} height={4} />
      <NavBar />
      <Body />
    </>
  );
}

export default App;
