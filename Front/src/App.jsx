import { useState,useEffect } from 'react'
import { io } from 'socket.io-client';
import './App.css'

const socket = io('http://localhost:4000');

function App() {

  const [isConnected, setIsConnected] = useState(false);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {

    socket.on('connect', () => setIsConnected(true));


    socket.on('mensajito',(data) => {
      setMensajes(mensajes => [...mensajes, data])
    });

    return () => {
      socket.off('connect');
      socket.off('mensajito');
    }
  },[]);

  const enviarMensaje = () => {
    socket.emit('mensajito', {
      usuario: socket.id,
      mensaje: nuevoMensaje
    });
  }
  return (
    <>
      <div>
        <h2>{isConnected ? 'Conectado':'No Conectado'}</h2>
        <ul className='ULmsg'>
          {mensajes.map(mensaje =>(
            <li className='Limsg'>{mensaje.usuario}: {mensaje.mensaje}</li>
          ))}
        </ul>
        <input 
        type='text'
        onChange={e=> setNuevoMensaje(e.target.value)}
        ></input><br/>
        <button onClick={enviarMensaje}>Enviar</button>
      </div>
    </>
  )
}

export default App
