import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const endpoint = 'http://localhost:8000/api';

const ShowEnvio = () => {
  const [envios, setEnvios] = useState([]);

  useEffect(() => {
    getAllEnvios();
  }, []);

  const getAllEnvios = async () => {
    try {
      const response = await axios.get(`${endpoint}/envios`);
      setEnvios(response.data);
    } catch (error) {
      console.error('Error al obtener envíos:', error);
    }
  };

  const deleteEnvio = async (id) => {
    try {
      const response = await axios.delete(`${endpoint}/envio/${id}`);
      const { status, message } = response.data;
      if (status === 'error') {
        toast.error(message);
        return;
      }
      getAllEnvios();
      toast.success(message);
    } catch (error) {
      console.error('Error al eliminar envío:', error);
    }
  };

  const ActionEnvio = async (id, option) => {
    try {
      let Estado;
      option === 1 ? (Estado = 'Delivered') : (Estado = 'Delayed'); // Condicional
      const data = {
        Id: id,
        Estado: Estado,
      };

      const response = await axios.put(`${endpoint}/envio/${id}`, data);
      const { status, message } = response.data;
      if (status === 'error') {
        toast.error(message);
        return;
      }
      getAllEnvios();
      toast.success(message);
    } catch (error) {
      console.error('Error al eliminar envío:', error);
    }
  };

  const getStatusIndicator = (estado) => {
    switch (estado) {
      case 'In Transit':
        return 'badge bg-primary';
      case 'Delivered':
        return 'badge bg-success';
      case 'Delayed':
        return 'badge bg-warning';
      default:
        return 'badge bg-secondary';
    }
  };

  return (
    <div>
      <div className='d-grip gap-2'>
        <Link to='/create' className='btn btn-success btn-lg mt-2 mb-2 text-white'>
          Create
        </Link>
      </div>

      <table className='table table-striped'>
        <thead className='bg-primary text-white'>
          <tr>
            <th>description</th>
            <th>Fecha_Creacion</th>
            <th>Fecha_Entrega_Estimada</th>
            <th>Estado</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {envios.map((envio) => (
            <tr key={envio.id}>
              <td>{envio.description}</td>
              <td>{envio.Fecha_Creacion}</td>
              <td>{envio.Fecha_Entrega_Estimada}</td>
              <td>
                <span className={getStatusIndicator(envio.Estado)}>{envio.Estado}</span>
              </td>
              <td>
                <Link to={`/edit/${envio.id}`} className='btn btn-warning ms-2'>
                  <i className='fas fa-edit'></i>
                </Link>
                <button onClick={() => deleteEnvio(envio.id)} className='btn btn-danger ms-2'>
                  <i className='fas fa-trash'></i>
                </button>
                <button onClick={() => ActionEnvio(envio.id, 1)} className='btn btn-success ms-2'>
                  <i className='fas fa-check'></i>
                </button>
                <button onClick={() => ActionEnvio(envio.id, 2)} className='btn btn-primary ms-2'>
                  <i className='fas fa-exclamation-triangle'></i>
                </button>
                <Link to={`/update`} className='btn btn-warning ms-2'>
                  <i className='fas fa-clock'></i>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowEnvio;
