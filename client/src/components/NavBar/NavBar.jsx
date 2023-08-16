import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "../Searchbar/Searchbar.jsx";
import s from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={s.bg}>
      <div className={s.container}>
        <SearchBar />
        <div className={s.navLinks}>
          <NavLink to="/create" className={s.link}>
            Create your puppy!
          </NavLink>
          <NavLink to="/home" className={s.link}>
            Back Home
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
