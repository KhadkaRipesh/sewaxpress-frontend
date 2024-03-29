import { useEffect } from 'react';
import { sessionUser } from '../../api/connection';

function Notification() {
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');

    sessionUser(token)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return <></>;
}

export default Notification;
