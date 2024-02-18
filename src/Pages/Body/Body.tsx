import { Route, Routes } from 'react-router-dom';
import LandingPage from '../Landing/Landing';
import NotFoundError from '../404-errror';
import SetPassword from '../../Components/Auth/SetPassword';
import Category from '../Category/Category';
import Services from '../Services/Service';

function Body() {
  return (
    <>
      <div>
        <Routes>
          <Route path='*' element={<NotFoundError />}></Route>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/:city' element={<Category />}></Route>
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
