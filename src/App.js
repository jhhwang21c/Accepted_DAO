import { useState } from 'react';
import './App.css';

import { Route, Routes } from 'react-router-dom';

import Nav from './Nav';
import Main from './pages/Main';
import Chat from './pages/Chat';
import Profile from './pages/Profile';


function App() {

  const [accounts, setAccounts] = useState([]);
  const [member, signIn] = useState(false);
  const [profileImg, setImg] = useState('');

  return (
    <div className='App'>
      <Nav accounts={accounts} setAccounts={setAccounts} member={member} signIn={signIn}
        profileImg={profileImg} setImg={setImg} />
      <Routes>
        <Route path='/pages/Profile'
          element={
            <Profile
              accounts={accounts} setAccounts={setAccounts}
              member={member} signIn={signIn}
              profileImg={profileImg} setImg={setImg}
            />}
        />
        <Route path='/pages/Chat'
          element={
            <Chat
              accounts={accounts} setAccounts={setAccounts}
              member={member} signIn={signIn}
              profileImg={profileImg} setImg={setImg}
            />}
        />
        <Route path='/'
          element={
            <Main
              accounts={accounts} setAccounts={setAccounts}
              member={member} signIn={signIn}
            />}
        />

      </Routes>
    </div>

  );
}

export default App;
