import { Route, Routes } from 'react-router-dom';
import styles from './Body.module.css';
import LandingPage from '../Landing/Landing';

function Body() {
  return (
    <>
      <div className={styles.container}>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default Body;
