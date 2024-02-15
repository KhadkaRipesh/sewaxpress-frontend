import { useLocation, useNavigate } from 'react-router-dom';

function ProfileNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  sessionStorage.setItem('redirectUrl', location.pathname);
  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    const redirectUrl = sessionStorage.getItem('redirectUrl');
    if (redirectUrl) {
      console.log(redirectUrl);
      navigate(`${redirectUrl}`);
      // Clear the stored URL after redirection
      sessionStorage.removeItem('redirectUrl');
    } else {
      // If there is no stored URL, redirect to a default page
      navigate('/');
    }
    window.location.reload();
  };
  return (
    <>
      <div className='container'>
        <div className='row'>
          <button onClick={logout}>Logout</button>
          This is profile navbar
        </div>
      </div>
    </>
  );
}

export default ProfileNavbar;
