import { useEffect, useState } from 'react';
import ChatContent from '../../Components/Chat/ChatContent';
import ChatList from '../../Components/Chat/ChatList';
import styles from './Chat.module.css';
import io, { Socket } from 'socket.io-client';
import { BACKEND_URL } from '../../constants/constants';
import { sessionUser } from '../../api/connection';
import { useNavigate } from 'react-router-dom';
import { DefaultEventsMap } from '@socket.io/component-emitter';
function Chat() {
  const [rooms, setRooms] = useState([]);
  const [userType, setUserType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState('');
  const [selectedRoomUser, setSelectedRoomUser] = useState('');
  const [socketConnection, setSocketConnection] = useState<Socket<
    DefaultEventsMap,
    DefaultEventsMap
  > | null>(null);

  const navigate = useNavigate();

  const jwt = localStorage.getItem('jwtToken');
  useEffect(() => {
    sessionUser(jwt)
      .then((res) => {
        setUserType(res.data.data.role);
        setCurrentUser(res.data.data.id);
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

    setSocketConnection(socket);

    // Emit 'my-rooms' event to request rooms
    socket.emit('my-rooms');

    socket.on('my_rooms', (response) => {
      if (response.success) {
        // Handle successful response
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

  useEffect(() => {
    if (selectedRoom) {
      // Fetch messages of the selected room
      fetchRoomMessages(selectedRoom);
    }
  }, [selectedRoom]);

  const fetchRoomMessages = (room: string) => {
    console.log('HHh');
    console.log(room);
    if (socketConnection) {
      // Emit 'get-all-chats' event to request messages of the selected room
      socketConnection.emit('get-all-chats', { room_id: room });

      // Listen for messages on the selected room channel
      socketConnection.on(`all_chats`, (response) => {
        if (response.success) {
          // Handle successful response
          console.log('Messages of room', room, ':', response.data);
          setMessages(response.data);
        } else {
          // Handle error response
          console.error('Failed to get messages of room', room);
        }
      });
    }
  };

  const handleRoomSelect = (room: string) => {
    setSelectedRoom(room);
  };

  const handleTitleName = (name: string) => {
    setSelectedRoomUser(name);
  };

  const sendMessage = (message: string) => {
    console.log(message);
    console.log(selectedRoom);
    try {
      if (socketConnection) {
        socketConnection.emit('send-message', {
          room_id: selectedRoom,
          text: message,
        });

        console.log('Message sent successfully');
        socketConnection.on(`message`, (response) => {
          if (response.success) {
            // Handle successful response
            console.log(response.data);
          } else {
            // Handle error response
            console.error('Failed to get message');
          }
        });
      } else {
        console.error('Socket connection is not established');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <>
      <div className='container'>
        <div className={styles.main__chatbody}>
          <ChatList
            rooms={rooms}
            user={userType}
            onRoomSelect={handleRoomSelect}
            onTitleName={handleTitleName}
          />
          <ChatContent
            messages={messages}
            user={currentUser}
            title={selectedRoomUser}
            onTypedMessage={sendMessage}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
