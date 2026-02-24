//! chiamata axios

import { createContext, useState } from "react";
import axios from "axios";

// Context dei film
export const MovieContext = createContext();

export function MovieProvider({ children }) {
  // Stato che memorizza i risultati dei film
  const [movies, setMovies] = useState([]);

  // La API KEY (ricordarsi di ignorarla con GITIGNORE .env)
  const apiKey = "67d5034507e11d28e84aa4bca5058ec4";
  const baseUrl = "https://api.themoviedb.org/3";

  // Funzione ricerca film
  const searchedMovies = (query) => {
    // Se la ricerca è vuota, l'array si deve resettare
    if (query.trim() === "") {
      setMovies([]);
      return;
    }

    axios
      .get(`${baseUrl}/search/movie`, {
        params: {
          api_key: apiKey,
          query: query, // cosa cerca l'utente
          language: "it-IT",
        },
      })
      .then((res) => {
        // i risultati (l'array si trova in res.data.results)
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error("Errore durante la ricerca:", err);
      });
  };

  return (
    <MovieContext.Provider value={{ movies, searchedMovies }}>
      {children}
    </MovieContext.Provider>
  );
}
