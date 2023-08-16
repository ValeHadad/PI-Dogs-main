import {
  getTemperaments,
  handleChange,
  // handleTemperaments,
  handleSubmit,
} from "./Form.js";
import s from "./Form.module.css";
import { useEffect, useState } from "react";
import { validate } from "./validate.js";
import { useHistory } from "react-router-dom";

const Form = () => {
  const [setTempShow] = useState([]);
  const [temperaments, setTemperaments] = useState([]);
  const history = useHistory();
  const [dogCreate, setDogCreate] = useState({
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
  const [errors, setErrors] = useState({
    name: "",
    image: "",
    temperaments: "",
    weight: "",
    height: "",
    life_span: "",
  });

  const handleChangeL = (event) => {
    handleChange(event, dogCreate, setDogCreate, setErrors, validate);
  };

  //funcionalidad al boton de agregar temperamento:
  /* const handleChangeButton = (event) => {
    event.preventDefault();

    setDogCreate((dogCreate) => ({
      ...dogCreate,
      temperaments: dogCreate.temperaments.includes(tempSelect)
        ? [...dogCreate.temperaments]
        : [...dogCreate.temperaments, tempSelect],
    }));
    handleTemperaments(tempSelect, setTempShow, tempShow, temperaments);
  }; */
  console.log(dogCreate);
  const handleChecbox = (event) => {
    if (!dogCreate.temperaments.includes(event.target.value)) {
      setDogCreate({
        ...dogCreate,
        temperaments: [...dogCreate.temperaments, event.target.value],
      });
    } else {
      setDogCreate({
        ...dogCreate,
        temperaments: [
          ...dogCreate.temperaments.filter(
            (temp) => temp !== event.target.value
          ),
        ],
      });
    }
  };

  //funcionalidad al boton de agregar dog:
  const handleSubmitButton = (event) => {
    event.preventDefault();
    handleSubmit(dogCreate, setDogCreate, setTempShow);
  };

  // botoncito para volver a la home

  const handleBackClick = () => {
    // Navegar de regreso a la página de inicio
    history.push("/home");
  };

  //obtengo los temp cuando el comp se monta, y se "limpia" cuando el comp se desmonta-.
  useEffect(() => {
    getTemperaments(setTemperaments);
    return () => {
      setTemperaments([]);
    };
  }, []);

  return (
    <div className={s.container}>
      <form className={s.container_form} onSubmit={handleSubmitButton}>
        <h3 className={s.title}>Create your puppy :3</h3>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChangeL}
          value={dogCreate.name}
        />
        {errors.name && <p>{errors.name}</p>}

        <label htmlFor="name">Weight:</label>
        <input
          className={s.input_num}
          type="number"
          name="weight_min"
          placeholder="kg min"
          min="1"
          max="50"
          onChange={handleChangeL}
          value={dogCreate.weight_min}
        />
        <input
          className={s.input_num}
          type="number"
          name="weight_max"
          placeholder="kg max"
          min="5"
          max="100"
          onChange={handleChangeL}
          value={dogCreate.weight_max}
        />
        {errors.weight && <p>{errors.weight}</p>}

        <label htmlFor="name">Height:</label>
        <input
          className={s.input_num}
          type="number"
          name="height_min"
          placeholder="cm min"
          min="10"
          max="100"
          onChange={handleChangeL}
          value={dogCreate.height_min}
        />
        <input
          className={s.input_num}
          type="number"
          name="height_max"
          placeholder="cm max"
          min="10"
          max="100"
          onChange={handleChangeL}
          value={dogCreate.height_max}
        />
        {errors.height && <p>{errors.height}</p>}

        <label htmlFor="life_span">Life Span:</label>
        <input
          className={s.input_num}
          type="number"
          name="life_span_min"
          placeholder="years min"
          min="5"
          max="15"
          onChange={handleChangeL}
          value={dogCreate.life_span_min}
        />
        <input
          className={s.input_num}
          type="number"
          name="life_span_max"
          placeholder="years max"
          min="8"
          max="20"
          onChange={handleChangeL}
          value={dogCreate.life_span_max}
        />
        {errors.life_span && <p>{errors.life_span}</p>}

        <label htmlFor="image">Image:</label>
        <input
          type="url"
          name="image"
          placeholder="insert a valid url"
          onChange={handleChangeL}
          value={dogCreate.image}
        />
        {errors.image && <p>{errors.image}</p>}
        <label htmlFor="temperaments">Temperaments:</label>
        <div className={s.checkboxcontainer}>
          {temperaments.map((temp) => (
            <div className={s.checkboxLabel} key={temp.id}>
              <label>
                <input
                  type="checkbox"
                  name={temp.name}
                  id={temp.name}
                  value={temp.id}
                  onClick={handleChecbox}
                />
                {temp.name}
              </label>
            </div>
          ))}
        </div>

        <div>
          <button className={s.create_btn} type="submit">
            Create!
          </button>
        </div>
      </form>
      <button className={s.backButton} onClick={handleBackClick}>
        Back!
      </button>
    </div>
  );
};

export default Form;
