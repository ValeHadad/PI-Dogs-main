import React from 'react';

const DogCard = ({ dog }) => {
  return (
    <div>
      <img src={dog.image} alt={dog.name} />
      <h2>{dog.name}</h2>
      <p>Temperament: {dog.temperament}</p>
      <p>Weight: {dog.weight}</p>
    </div>
  );
};

export default DogCard;
