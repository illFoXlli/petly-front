import { ButtonSend, DivBox, Form, Input, Label, Title } from './Chat.styled';
import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import socket from 'utility/chatSoket';
import reducer from 'redux/ChatReduser';
import MessangerChat from './MessangerChat';
import LoginChat from './LoginChat';

const Chat = ({ type }) => {c
  const { name } = useSelector(selectUser);
  const [roomId, setRoomId] = useState('');
  // eslint-disable-next-line
  const [formChat, setFormChat] = useState(true);
  console.log(name);
  // eslint-disable-next-line

  const [state, dispatch] = useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [],
  });


  axios.defaults.baseURL = 'https://exemple-chat-back.onrender.com';

// console.log(setFormChat(state));
 
  const setUsers = users => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });
  };
  console.log(state);

  const onLogin = async obj => {
    console.log(obj);
    dispatch({
      type: 'JOINED',
      payload: obj,
    });
    socket.emit('ROOM:JOIN', obj);

    const { data } = await axios.get(
      `https://exemple-chat-back.onrender.com/rooms/${obj.roomId}`
    );
    console.log(data);
    setUsers(data.users);
  };


  // window.socket = socket;

  const setUsers = users => {
    dispatch({
      type: 'SET_USERS',
      payload: users,
    });


  const addMessage = message => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);
  return (
    <DivBox type={type}>
      <Title>Petly-chat</Title>
      {!state.joined ? (
        <LoginChat onLogin={onLogin} />
      ) : (
        <MessangerChat {...state} onAddMessage={addMessage} />
      )}
    </DivBox>
  );
};

export default Chat;
