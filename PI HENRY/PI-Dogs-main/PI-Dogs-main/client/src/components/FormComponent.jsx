import React, { useState } from 'react';
import axios from 'axios';
import s from './FormComponent.module.css';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    minHeight: '',
    maxHeight: '',
    minWeight: '',
    maxWeight: '',
    lifespan: '',
    temperaments: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Validaciones
    setErrors({
      ...errors,
      [name]: validateField(name, value),
    });
  };

  const validateField = (name, value) => {
    // Implementa tus validaciones aquí, por ejemplo:
    if (name === 'name' && /\d/.test(value)) {
      return 'El nombre no debe contener números';
    }
    // Agrega más validaciones según tus requisitos

    return ''; // Si no hay errores
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (validateForm()) {
      try {
        const newDogData = {
          name: formData.name,
          height: `${formData.minHeight} - ${formData.maxHeight}`,
          weight: `${formData.minWeight} - ${formData.maxWeight}`,
          life_span: formData.lifespan,
          temperaments: formData.temperaments,
        };

        const response = await axios.post('http://localhost:3001/api/dogs', newDogData);

        console.log('New dog created:', response.data);
        // Aquí podrías redirigir a otra página o mostrar un mensaje de éxito
      } catch (error) {
        console.error('Error creating new dog:', error);
      }
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    // Realiza validaciones en todos los campos y agrega errores al objeto newErrors

    if (Object.keys(newErrors).length > 0) {
      formIsValid = false;
    }

    setErrors(newErrors);
    return formIsValid;
  };

  return (
    <div className={s.container}>
      <h2>Crear Nueva Raza de Perro</h2>
      <form onSubmit={handleSubmit}>
        <div className={s.formgroup}>
          <label className={s.label} htmlFor="name">Nombre:</label>
          <input className={s.input} type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className={s.error}>{errors.name}</span>}
        </div>
        <div>
          <label htmlFor="minHeight">Altura Mínima:</label>
          <input type="number" name="minHeight" value={formData.minHeight} onChange={handleChange} />
          {/* Agrega campo maxHeight */}
          {/* Agrega manejo de errores para minHeight y maxHeight */}
        </div>
        <div>
          {/* Agrega campos restantes de formulario (minWeight, maxWeight, lifespan, temperaments) */}
          {/* Agrega manejo de errores para cada campo */}
        </div>
        <button className={s.button} type="submit">Crear Raza</button>
      </form>
    </div>
  );
};

export default FormComponent;

