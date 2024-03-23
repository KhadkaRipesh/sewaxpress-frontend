import { useEffect, useState } from 'react';
import ChatContent from '../../Components/Chat/ChatContent';
import ChatList from '../../Components/Chat/ChatList';
import styles from './Chat.module.css';
import io from 'socket.io-client';
import { BACKEND_URL } from '../../constants/constants';
import { sessionUser } from '../../api/connection';
import { useNavigate } from 'react-router-dom';
function Chat() {
  const [rooms, setRooms] = useState([]);
  const [userType, setUserType] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem('jwtToken');

    sessionUser(jwt)
      .then((res) => {
        setUserType(res.data.data.role);
      })
      .catch((error) => {
        if (error) {
          localStorage.removeItem('jwtToken');
          navigate('/login');
        }
      });

    const socket = io(BACKEND_URL, {
      extraHeaders: {
        Authorization: `${jwt}`,
      },
    });

    // Emit 'my-rooms' event to request rooms
    socket.emit('my-rooms');

    socket.on('my_rooms', (response) => {
      if (response.success) {
        // Handle successful response
        console.log('My rooms:', response.data);
        setRooms(response.data);
      } else {
        // Handle error response
        console.error('Failed to get rooms');
      }
    });

    // Cleanup function to disconnect socket
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <>
      <div className='container'>
        <div className={styles.main__chatbody}>
          <ChatList rooms={rooms} user={userType} />
          <ChatContent />
        </div>
      </div>
    </>
  );
}

export default Chat;
