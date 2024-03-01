import { Outlet } from 'react-router-dom';
import Nav from '../../Components/Nav/Nav';
import { useEffect, useState } from 'react';
import ProfileNavbar from '../../Components/Nav/ProfileNavbar';

function Base() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken');
    if (jwtToken) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      {isLoggedIn ? <ProfileNavbar /> : <Nav />}
      <Outlet />
    </>
  );
}

export default Base;
