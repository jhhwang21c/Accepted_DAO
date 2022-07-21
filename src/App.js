import { useState, usestate } from 'react';
import './App.css';
import Chat from './Chat';
import MainPage from './MainPage';

import { Route, Routes } from 'react-router-dom';

function App() {
  const [accounts, setAccounts] = useState([]);
  const [member, signIn] = useState(false);
  //const [color, changeColor] = useState('white');
  return (

    <Routes>
      <Route path='/chat' element={<Chat />} />
      <Route path='/' element={<MainPage accounts={accounts} setAccounts={setAccounts} member={member} signIn={signIn} />} />
    </Routes>
  );
}

export default App;
