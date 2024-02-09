import LoadingBar from 'react-top-loading-bar';
import './App.css';
import Body from './Pages/Body/Body';
import Nav from './Pages/Nav/Nav.module';

function App() {
  return (
    <>
      <LoadingBar color='#1D588B' progress={100} height={4} />
      <Nav />
      <Body />
    </>
  );
}

export default App;
