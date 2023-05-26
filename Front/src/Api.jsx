import React from 'react'
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:4000');

const Api = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
    
        socket.on('connect', () => {
          console.log('Conectadito');
        });

        socket.on('datos_obtenidos', (data) => {
            setData(data);
          });

    
      }, []);

      const EnviarData = () => {
        socket.emit('dato_enviados',(data))
      }

  return (
    <div>
        <h1>Api Mela</h1>
        {data ? (
        <ul>
          {data.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
      <button onClick={EnviarData}>Ver Api</button> 
    </div>
  )
}

export default Api