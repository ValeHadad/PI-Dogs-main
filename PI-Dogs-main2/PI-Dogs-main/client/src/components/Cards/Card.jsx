import React from "react";
import s from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({ id, name, image, temperament, weight }) => {
  return (
    <div className={s.master}>
      <Link className={s.nav} to={`/detail/${id}`}>
        <img className={s.img} src={image} alt="picDog" />
        <div className={s.cardDatos}>
          <p className={s.nombre}>{name}</p>
          <p className={s.peso}>{weight}/KG </p>
        </div>
        <p className={s.cardDato}>{temperament}</p>
      </Link>
    </div>
  );
};

export default Card;
