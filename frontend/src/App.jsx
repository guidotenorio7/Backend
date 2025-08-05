import { useState } from 'react';
import './App.css';
import Head from './components/Head.jsx';
import Body from './components/Body.jsx';
import Modal from './components/Modal.jsx';

export default function App() {
  const [menuShowed, setMenuShowed] = useState(false);

  return (
    <>
    <Modal></Modal>
      <Head
        setMenuShowed={setMenuShowed}
      />
      <Body
        menuShowed={menuShowed}
      />
    </>
  )
}
