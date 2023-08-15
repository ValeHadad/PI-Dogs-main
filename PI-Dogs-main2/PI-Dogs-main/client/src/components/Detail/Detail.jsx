import { useHistory, useParams } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";
import { getDog } from "./Detail.js";
import { useDispatch } from "react-redux";
import s from "./Detail.module.css";

const Detail = () => {
  const UUIDdogs = RegExp(
    /[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}/
  );
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const [dog, setDog] = useState([]);
  const [] = useState({
    name: "",
    image: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
  });
  console.log(dog);
  useEffect(() => {
    getDog(id, setDog, dispatch, history);
    return () => setDog([]);
  }, [dispatch, id, history]);

  if (UUIDdogs.test(id)) {
    return (
      <div className={s.container} key={dog?.id || dog.id}>
        <Fragment>
          <h2 className={s.title}>Details you should know!</h2>

          <div className={s.data}>
            <img className={s.img} src={dog?.url || dog.image?.url} alt="" />

            <div className={s.info}>
              <h4 className={s.span_etiq}>
                Name:<span> {dog?.name || dog.name}</span>
              </h4>

              {dog?.origin && (
                <h4 className={s.span_etiq}>
                  Origin: <span>{dog?.origin}</span>
                </h4>
              )}

              <h4 className={s.span_etiq}>
                Temperaments:
                <span> {dog?.temperament || dog?.temperament}</span>
              </h4>
              <table>
                <tbody className={s.table_title}>
                  <tr>
                    <td>Height:</td>
                    <td>Weight:</td>
                    <td>Life Span:</td>
                    <td>ID:</td>
                  </tr>
                </tbody>
                <tbody className={s.table_content}>
                  <tr>
                    <td>{dog?.height?.metric || dog.height?.metric} cm </td>
                    <td>{dog?.weight?.metric || dog.weight?.metric} kg </td>
                    <td>{dog?.life_span || dog.life_span}</td>
                    <td>{dog?.id || dog.id}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div></div>
        </Fragment>
      </div>
    );
  } else {
    return (
      <div className={s.container} key={dog[0]?.id || dog.id}>
        {dog.length ? (
          <Fragment>
            <h2 className={s.title}>Details you should know!</h2>

            <div className={s.data}>
              <img
                className={s.img}
                src={dog[1]?.url || dog.image?.url}
                alt=""
              />

              <div className={s.info}>
                <h4 className={s.span_etiq}>
                  Name:<span> {dog[0]?.name || dog.name}</span>
                </h4>

                {dog[0]?.origin && (
                  <h4 className={s.span_etiq}>
                    Origin: <span>{dog[0]?.origin}</span>
                  </h4>
                )}

                <h4 className={s.span_etiq}>
                  Temperaments:
                  <span> {dog[0]?.temperament || dog?.temperament}</span>
                </h4>
                <table>
                  <tbody className={s.table_title}>
                    <tr>
                      <td>Height:</td>
                      <td>Weight:</td>
                      <td>Life Span:</td>
                      <td>ID:</td>
                    </tr>
                  </tbody>
                  <tbody className={s.table_content}>
                    <tr>
                      <td>
                        {dog[0]?.height?.metric || dog.height?.metric} cm{" "}
                      </td>
                      <td>
                        {dog[0]?.weight?.metric || dog.weight?.metric} kg{" "}
                      </td>
                      <td>{dog[0]?.life_span || dog.life_span}</td>
                      <td>{dog[0]?.id || dog.id}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div></div>
          </Fragment>
        ) : null}
      </div>
    );
  }
};

export default Detail;
