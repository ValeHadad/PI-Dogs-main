// Desarrolla info de todos los perros //
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const infoAllDogs = async (name) => {
  if (!name) {
    console.log("hola");

    const dogsBD = await Dog.findAll({ include: Temperament });
    console.log(dogsBD);
    const dogsFoundDB = [];
    dogsBD?.map((dog) => {
      const infoDog = {
        id: dog.id,
        name: dog.name,
        image: { url: dog.image },
        weight: { metric: dog.weight },
        temperament: dog.temperaments?.map((temp) => temp.name),
      };
      dogsFoundDB.push(infoDog);
    });

    //ahora buscamos en la API:
    const { data } = await axios("https://api.thedogapi.com/v1/breeds");

    return [...data, ...dogsFoundDB];
  } else {
    const nameUnified = name;

    dogFound = await Dog.findAll({
      where: {
        name: { [Op.iLike]: `%${nameUnified}%` },
      },
      include: Temperament,
    });

    const dogsFoundDB = [];

    dogFound?.map((dog) => {
      const infoDog = {
        id: dog.id,
        name: dog.name,
        image: { url: dog.image },
        weight: { metric: dog.weight },
        temperament: dog.temperaments?.map((temp) => temp.name),
      };
      dogsFoundDB.push(infoDog);
    });

    //ahora buscamos en la API:
    const { data } = await axios(
      `https://api.thedogapi.com/v1/breeds/search?q=${nameUnified}`
    );

    const dogsFoundAPI = [];

    for (const dog of data) {
      if (dog.hasOwnProperty("reference_image_id")) {
        let { data } = await axios(
          `https://api.thedogapi.com/v1/images/${dog?.reference_image_id}`
        );

        const newDog = {
          id: data?.breeds[0].id,
          name: data?.breeds[0].name,
          image: { url: data?.url },
          weight: data?.breeds[0].weight,
          // temperament: data?.breeds[0]?.temperament
        };
        dogsFoundAPI.push(newDog);
      }
    }

    if (dogsFoundDB.length === 0 && dogsFoundAPI !== 0) return dogsFoundAPI;
    if (dogsFoundDB.length !== 0 && dogsFoundAPI === 0) return dogsFoundDB;
    if (dogsFoundDB.length !== 0 && dogsFoundAPI !== 0)
      return dogsFoundDB.concat(dogsFoundAPI);

    return `There is no dog with ${name}`;
  }
};

module.exports = {
  infoAllDogs,
};
