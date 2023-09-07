import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const endpoint = "http://localhost:8000/api";

const EditEnvio = () => {
  const [description, setDescription] = useState("");
  const [Fecha_Entrega_Estimada, setFecha_Entrega_Estimada] = useState(new Date());
  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${endpoint}/envio/${id}`, {
        description: description,
        Fecha_Entrega_Estimada: Fecha_Entrega_Estimada.toISOString().slice(0, 10),
      });
      navigate("/");
    } catch (error) {
      console.error("Error al actualizar envío:", error);
      // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
    }
  };

  useEffect(() => {
    const getEnvioById = async () => {
      try {
        const response = await axios.get(`${endpoint}/envio/${id}`);
        setDescription(response.data.description);
        setFecha_Entrega_Estimada(new Date(response.data.Fecha_Entrega_Estimada));
      } catch (error) {
        console.error("Error al obtener envío por ID:", error);
        // Aquí puedes manejar el error, mostrar un mensaje al usuario, etc.
      }
    };
    getEnvioById();
  }, [id]);

  return (
    <div>
      <h3>Edit Envio</h3>
      <form onSubmit={update}>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Fecha_Entrega_Estimada</label>
          <DatePicker
            selected={Fecha_Entrega_Estimada}
            onChange={(date) => setFecha_Entrega_Estimada(date)}
            dateFormat="yyyy-MM-dd"
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default EditEnvio;
