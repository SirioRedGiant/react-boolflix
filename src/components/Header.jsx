import { useState, useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function Header() {
  // Stato locale per gestire quello che l'utente scrive nell'input
  const [searchedInput, setSearchedInput] = useState("");

  //  mi "sintonizzo" alla "stazione radio" context per prendere la funzione di ricerca
  const { searchedMovies } = useContext(MovieContext);

  // Funzione che gestisce il click o l'invio del form
  const handleSearch = () => {
    console.log(searchedInput);
    searchedMovies(searchedInput);
  };

  return (
    <header className="p-3 bg-dark text-white d-flex justify-content-between align-items-center">
      <h1 className="text-danger m-0">BOOLFLIX</h1>

      <div className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Cerca un film..."
          value={searchedInput}
          onChange={(e) => setSearchedInput(e.target.value)}
          onKeyUp={(e) => e.key === "Enter" && handleSearch()} // per cercare l'input con invio
        />
        <button className="btn btn-danger" onClick={handleSearch}>
          Cerca
        </button>
      </div>
    </header>
  );
}
