import { useDispatch } from "react-redux";
import { handleInput, handleSearch } from "./Searchbar.js";
import { useState } from "react";
import { showDogs } from "../../actions/actions";
import { useHistory } from "react-router-dom";
import s from "./Searchbar.module.css";

const SearchBar = () =>{

    const dispatch = useDispatch();
    const history = useHistory();
    const [nameSearch, setNameSearch] = useState("");

    const handleInputL = (event) =>{
        handleInput(event, setNameSearch)
    }

    const handleSearchL = (event) =>{
        event.preventDefault();
        handleSearch(nameSearch, dispatch, showDogs, history);
        setNameSearch("");
    }


    return(
        <div>
            <input 
                type="search"
                name="nameSearch"
                placeholder="Enter name"
                value={nameSearch} //o input?
                onChange={handleInputL}
                className={s.input} />

            <button className={s.button} onClick={handleSearchL}>SEARCH</button>

        </div>
    )
}

export default SearchBar;