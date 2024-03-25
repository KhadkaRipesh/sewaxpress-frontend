import { useEffect, useState } from 'react';
import ChatContent from '../../Components/Chat/ChatContent';
import ChatList from '../../Components/Chat/ChatList';
import styles from './Chat.module.css';
import io, { Socket } from 'socket.io-client';
import { BACKEND_URL } from '../../constants/constants';
import { getRoomById, sessionUser } from '../../api/connection';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useQuery } from 'react-query';
function Chat() {
  const location = useLocation();

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
  const [chatHeader, setChatHeader] = useState('');

  // if user cames from service list page through chat
  useEffect(() => {
    const fetchData = async () => {
      const searchParams = new URLSearchParams(location.search);
      const roomId = searchParams.get('roomId');

      try {
        const roomInfoResponse = await getRoomById(roomId, jwt);
        const roomInfo = roomInfoResponse.data.data;
        setSelectedRoom(roomId);
        setChatHeader(roomInfo.hubName);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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
  }, []);

  useEffect(() => {
    if (selectedRoom) {
      // Fetch messages of the selected room
      fetchRoomMessages(selectedRoom);
    }

    // Cleanup function to disconnect socket
    return () => {
      if (socketConnection) {
        socketConnection.off(`all_chats`);
      }
    };
  }, [selectedRoom]);

  const fetchRoomMessages = (room: string) => {
    if (socketConnection) {
      // Emit 'get-all-chats' event to request messages of the selected room
      socketConnection.emit('get-all-chats', { room_id: room });

      // Listen for messages on the selected room channel
      socketConnection.on(`all_chats`, (response) => {
        if (response.success) {
          // Handle successful response
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
    if (!message) return null;
    try {
      if (socketConnection) {
        socketConnection.emit('send-message', {
          room_id: selectedRoom,
          text: message,
        });

        console.log('Message sent successfully');
      } else {
        console.error('Socket connection is not established');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // Listen for incoming messages
  useEffect(() => {
    if (socketConnection) {
      // Listen for response from the server
      socketConnection.on('message', (response) => {
        if (response.success) {
          console.log('Message received successfully:', response.data);
          setMessages((prevMessage) => [...prevMessage, response.data]);
          // Handle the received message data here
        } else {
          console.error('Failed to receive message');
          // Handle the error here
        }
      });
    }

    // Clean up the event listener when the component unmounts
    return () => {
      if (socketConnection) {
        socketConnection.off('message');
      }
    };
  }, [socketConnection]);

  return (
    <>
      <div className='container'>
        <div className={styles.main__chatbody}>
          <ChatList
            rooms={rooms}
            user={userType}
            // from message page directly
            onRoomSelect={handleRoomSelect}
            onTitleName={handleTitleName}
            // from service page while starting chat
            defaultSelectedRoom={selectedRoom}
          />
          <ChatContent
            messages={messages}
            user={currentUser}
            title={selectedRoomUser}
            onTypedMessage={sendMessage}
            defaultTitleRoom={chatHeader}
          />
        </div>
      </div>
    </>
  );
}

export default Chat;
