import { Route, Routes } from 'react-router-dom';
import styles from './Body.module.css';
import LandingPage from '../Landing/Landing';
import NotFoundError from '../404-errror';

function Body() {
  return (
    <>
      <div className={styles.container}>
        <Routes>
          <Route path='*' element={<NotFoundError />}></Route>
          <Route path='/' element={<LandingPage />}></Route>
        </Routes>
      </div>
    </>
  );
}

export default Body;
