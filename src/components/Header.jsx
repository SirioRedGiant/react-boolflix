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
    <header className="sticky-top bg-black py-3 shadow-lg main-header">
      <div className="container-fluid d-flex justify-content-between align-items-center px-4">
        <h1 className="text-danger fw-bold m-0 logo-text">BOOLFLIX</h1>

        <div className="d-flex gap-2">
          <input
            type="text"
            className="form-control bg-dark text-white border-secondary"
            placeholder="Cerca film o serie..."
            value={searchedInput}
            onChange={(e) => setSearchedInput(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && handleSearch()}
          />
          <button className="btn btn-danger fw-bold" onClick={handleSearch}>
            CERCA
          </button>
        </div>
      </div>
    </header>
  );
}
