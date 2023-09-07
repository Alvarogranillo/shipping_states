import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 

const endpoint = 'http://localhost:8000/api/envio';

const CreateProduct = () => {
  const [description, setDescription] = useState('');
  const [Fecha_Creacion, setFecha_Creacion] = useState(null);
  const [Fecha_Entrega_Estimada, setFecha_Entrega_Estimada] = useState(null); 
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date);
  };

  const store = async (e) => {
    e.preventDefault();

    if (!isValidDate(Fecha_Creacion) || !isValidDate(Fecha_Entrega_Estimada)) {
      setError('Selecciona fechas válidas.');
      return;
    }

    try {
      const response = await axios.post(endpoint, {
        description: description,
        Fecha_Creacion: Fecha_Creacion.toISOString().split('T')[0], 
        Fecha_Entrega_Estimada: Fecha_Entrega_Estimada.toISOString().split('T')[0], 
        Estado: 'In Transit',
      });
      const { status, message } = response.data;
      if (status === 'error') {
        toast.error(message);
        return;
      }
      toast.success(message, {
        onClose: () => navigate('/')
      });
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div>
      <h3>Create Envio</h3>
      {error && <div className='alert alert-danger'>{error}</div>}
      <form onSubmit={store}>
      <div className='mb-3 mx-auto'>
     <label className='form-label'>Description</label>
      <input
       value={description}
       onChange={(e) => setDescription(e.target.value)}
      type='text'
      className='form-control'
    required
    />
    </div>

        <div className='mb-3'>
          <label className='form-label'>Fecha_Creacion</label>
          <DatePicker 
            selected={Fecha_Creacion}
            onChange={(date) => setFecha_Creacion(date)}
            dateFormat='yyyy-MM-dd'
            className='form-control'
            required
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Fecha_Entrega_Estimada</label>
          <DatePicker 
            selected={Fecha_Entrega_Estimada}
            onChange={(date) => setFecha_Entrega_Estimada(date)}
            dateFormat='yyyy-MM-dd'
            className='form-control'
            required
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Store
        </button>
      </form>
    </div>
  );
};

export default CreateProduct;
