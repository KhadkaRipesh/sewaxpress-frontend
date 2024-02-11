import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Body from './Pages/Body/Body';
import NavBar from './Pages/Nav/Nav';

function App() {
  return (
    <>
      <LoadingBar color='#1D588B' progress={100} height={4} />
      <NavBar />
      <Body />
    </>
  );
}

export default App;
