// Desarrolla info de todos los perros //
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize");
const axios = require("axios");

const infoAllDogs = async (name) => {
  if (!name) {
    const dogsBD = await Dog.findAll({ include: Temperament });

    const dogsFoundDB = [];
    dogsBD?.map((dog) => {
      const infoDog = {
        id: dog.id,
        name: dog.name,
        image: dog.image,
        weight: dog.weight,
        temperament: dog.temperaments?.map((temp) => temp.name),
      };
      dogsFoundDB.push(infoDog);
    });

    //ahora buscamos en la API:
    const { data } = await axios("https://api.thedogapi.com/v1/breeds");
    const dogApi = data.map((dog) => {
      return {
        id: dog.id,
        name: dog.name,
        image:
          dog.image?.url ||
          `https://cdn2.thedogapi.com/images/${dog?.reference_image_id}.jpg` ||
          "",
        height: dog.height?.metric,
        weight: dog.weight?.metric,
        life_span: dog.life_span,
        temperament: dog.temperament,
      };
    });

    return [...dogApi, ...dogsFoundDB];
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
        image: dog.image,
        weight: dog.weight,
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
          image: data?.url,
          height: data?.breeds[0].height.metric,
          weight: data?.breeds[0].weight.metric,
          temperament: data?.breeds[0]?.temperament,
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
