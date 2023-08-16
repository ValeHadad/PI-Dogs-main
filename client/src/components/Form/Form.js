import axios from "axios";

export const getTemperaments = async (setTemperaments) => {
  const { data } = await axios(`http://localhost:3001/temperaments`);
  setTemperaments(data);
};

export const handleChange = (
  event,
  dogCreate,
  setDogCreate,
  setErrors,
  validate
) => {
  const { name, value } = event.target;
  setDogCreate({
    ...dogCreate,
    [name]: value,
  });

  setErrors(
    validate({
      ...dogCreate,
      [name]: value,
    })
  );
};

export const handleTemperaments = (
  tempSelect,
  setTempShow,
  tempShow,
  temperaments
) => {
  if (Array.isArray(temperaments)) {
    const tempFound = temperaments.find((temp) => temp.id === +tempSelect);
    if (tempShow.includes(`${tempFound.name}`)) return;
    setTempShow([...tempShow, `${tempFound.name}`]);
  }
};

//pa manejar el envio del form
export const handleSubmit = async (dogCreate, setDogCreate, setTempShow) => {
  try {
    const newDog = {
      name:
        dogCreate.name[0].toUpperCase() + dogCreate.name.slice(1).toLowerCase(),
      image: `${dogCreate.image}`,
      height: `${dogCreate.height_min} - ${dogCreate.height_max}`,
      weight: `${dogCreate.weight_min} - ${dogCreate.weight_max}`,
      life_span: `${dogCreate.life_span_min} - ${dogCreate.life_span_max} years`,
      temperaments: dogCreate.temperaments,
    };
    const { data } = await axios.post(`http://localhost:3001/dogs`, newDog);
    setDogCreate({
      name: "",
      image: "",
      height_min: "",
      height_max: "",
      weight_min: "",
      weight_max: "",
      life_span_min: "",
      life_span_max: "",
      temperaments: [],
    });

    alert("Dog created successfully!");

    const result = window.confirm("Do you want to add a new puppy?");
    if (result) {
      window.location.href = "http://localhost:3000/create";
    } else {
      window.location.href = "http://localhost:3000/home";
    }

    console.log(data);
  } catch (error) {
    alert("Unexpected error, please try again later");
  }
};
