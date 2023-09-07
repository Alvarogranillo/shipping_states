import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowUpdate = () => {
  const [envioChanges, setEnvioChanges] = useState([]);

  useEffect(() => {
    getAllEnvioChanges();
  }, []);

  const endpoint = 'http://localhost:8000/api'; // Reemplaza con tu endpoint real para obtener cambios de envío

  const getAllEnvioChanges = async () => {
    try {
      const response = await axios.get(`${endpoint}/enviochanges`); // Reemplaza con la ruta correcta de tu endpoint para obtener cambios de envío
      setEnvioChanges(response.data);
    } catch (error) {
      console.error('Error al obtener cambios de envío:', error);
    }
  };

  return (
    <div>
      <h2>Envío Changes</h2>
      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>Envío ID</th>
            <th>Field Name</th>
            <th>Old Value</th>
            <th>New Value</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {envioChanges.map((change) => (
            <tr key={change.id}>
              <td>{change.envio_id}</td>
              <td>{change.field_name}</td>
              <td>{change.old_value}</td>
              <td>{change.new_value}</td>
              <td>{change.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUpdate;
