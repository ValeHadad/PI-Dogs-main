import s from "./LandingPage.module.css";
import { Link } from "react-router-dom";

const LandingPage = () => {
   

    return (
        <div className={s.bg}>
            <div className={s.content}>
                <h1 className={s.title}>{"Busca a tu perrito favorito"}</h1>
                <div className={s.buttonContainer}>
                    <Link to="/home">
                        <button className={s.button}>vamos!</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LandingPage;

