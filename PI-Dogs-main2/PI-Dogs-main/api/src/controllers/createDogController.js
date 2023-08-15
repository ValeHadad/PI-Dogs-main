const { Dog, Temperament } = require("../db");

const createDog = async ({
  name,
  image,
  height,
  weight,
  life_span,
  temperaments,
}) => {
  if (!name || !image || !height || !weight || !life_span || !temperaments)
    throw Error("You must complete all fields");

  //uso el model Dog y el metodo create para crear un nuevo registro en la BDD
  const newDog = await Dog.create({
    name,
    image,
    height,
    weight,
    life_span,
  });
  for (const temp of temperaments) {
    const findTemp = await Temperament.findOne({ where: { id: temp } });
    await newDog.addTemperament(findTemp);
  }
  return newDog;
};

module.exports = {
  createDog,
};
