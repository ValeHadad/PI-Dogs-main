import s from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import SearchBar from "../Searchbar/Searchbar.jsx";



const NavBar = () =>{
    return(
        <div className={s.bg}>
            <div className={s.container}>
                <SearchBar/>
                <NavLink to="/form">
                    <button className={s.button}>Create your dog!</button>
                </NavLink>
                <NavLink to="/prueba">
                    <button className={s.button}>prueba</button>
                </NavLink>
                <NavLink to="/home">
                    <button className={s.button}>Back Home</button>
                </NavLink>
            </div>
        </div>
    )
}

export default NavBar;