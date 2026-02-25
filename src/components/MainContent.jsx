import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

//! scaricato i pacchetti ed il motore per le stelle icon --> npm i @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome LINK DOCUMENT --> https://docs.fontawesome.com/web/use-with/react/
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons"; // Stella Piena
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"; // Stella Vuota
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // componente importato

export default function MainContent() {
  // Prendiamo l'array dei film dal Context
  const { movies, tvSeries } = useContext(MovieContext);

  //note Funzione che mappa la lingua alla bandiera dal formato codice lingua a codice nazione
  const getFlagImage = (languageCode) => {
    const languageToCountry = {
      it: "it",
      en: "us",
      ja: "jp",
      fr: "fr",
      de: "de",
      es: "es",
      ug: "gb", // drop the bomb --> https://www.youtube.com/watch?v=CwLrBK0fL1c
    };
    const countryCode = languageToCountry[languageCode]; // verifica se il codiceLingua che arriva esiste nel "dizionario"

    //todo Gestione casi con/senza bandiera
    if (countryCode) {
      return (
        <img
          src={`https://flagicons.lipis.dev/flags/4x3/${countryCode}.svg`}
          alt=""
          style={{ width: "20px", marginLeft: "5px", verticalAlign: "middle" }}
        />
      );
    }
    return (
      <span className="badge bg-warning text-uppercase text-black">
        {languageCode}
      </span>
    );
  };

  //note Funzione che converte un voto da 1 a 10 in decimale a 1 a 5 stelline per eccesso --> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil
  const renderStars = (vote) => {
    const rating = Math.ceil(vote / 2);
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={i <= rating ? fullStar : emptyStar}
          className={i <= rating ? "text-warning" : "text-muted"}
        />,
      );
    }
    return stars;
  };

  //note Funzione che aggiunge le immagini copertina ai film --> prende poster_path e lo aggiunge alla baseUrl per trovare il percorso all'immagine
  //todo --- dimensioni consigliate immagini di poster_path
  /*
  "poster_sizes": [
  "w92",
  "w154",
  "w185",
  "w342",
  "w500",
  "w780",
  "original"
],
  */
  const getPosterImage = (posterPath) => {
    // posterPath --> poster_path
    const baseUrl = "https://image.tmdb.org/t/p";
    const pictureSize = "/w342/";
    return posterPath
      ? `${baseUrl}${pictureSize}${posterPath}`
      : "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExeTVsaXk3Y2thZWxyN2FqNGEwZ2IyYmx5Znk0bzJuYXV2MzQ4N3NkbSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/OSuaE6AknuRc7syZXp/200.webp";
  };

  return (
    <main className="container-fluid bg-dark min-vh-100 py-4">
      {/* --- FILMS --- */}
      <section className="container-fluid mb-5">
        <h2 className="text-danger border-bottom border-danger pb-2 mb-4 fw-bold">
          Films
        </h2>
        <div className="row g-4">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div
                key={movie.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              >
                <div className="movie-card shadow-lg rounded">
                  {/* Copertina */}
                  <img
                    src={getPosterImage(movie.poster_path)}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  {/* RETRO ==> Hover con CSS */}
                  <div className="movie-info p-3">
                    <h5 className="fw-bold text-danger">{movie.title}</h5>
                    <p className="small mb-1">
                      <em>{movie.original_title}</em>
                    </p>
                    <div className="mb-2 small">
                      Lingua: {getFlagImage(movie.original_language)}
                    </div>
                    <div className="mb-2 small">
                      Voto: {renderStars(movie.vote_average)}
                    </div>
                    <p className="overview-text mt-3">
                      <strong>Overview:</strong>
                      <br />
                      {movie.overview || "Trama non disponibile."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted ms-3">Nessun film trovato.</p>
          )}
        </div>
      </section>
      {/* --- SERIE TV --- */}
      <section className="container-fluid mb-5">
        <h2 className="text-primary border-bottom pb-2 mb-4 fw-bold">
          Tv Series
        </h2>
        <div className="row g-4">
          {tvSeries.length > 0 ? (
            tvSeries.map((tvSerie) => (
              <div
                key={tvSerie.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
              >
                <div className="movie-card shadow-lg rounded">
                  {/* Copertina */}
                  <img
                    src={getPosterImage(tvSerie.poster_path)}
                    alt={tvSerie.name}
                    className="movie-poster"
                  />
                  {/* RETRO ==> Hover con css */}
                  <div className="movie-info p-3">
                    <h5 className="fw-bold text-danger">{tvSerie.name}</h5>
                    <p className="small mb-1">
                      <em>{tvSerie.original_name}</em>
                    </p>
                    <div className="mb-2 small">
                      Lingua: {getFlagImage(tvSerie.original_language)}
                    </div>
                    <div className="mb-2 small">
                      Voto: {renderStars(tvSerie.vote_average)}
                    </div>
                    <p className="overview-text mt-3">
                      <strong>Overview:</strong>
                      <br />
                      {tvSerie.overview || "Trama non disponibile."}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted ms-3">Nessun film trovato.</p>
          )}
        </div>
      </section>
      {/* in caso entrambe le ricerche non vadano a buon fine o non sia stato ancora compilato */}
      {movies.length === 0 && tvSeries.length === 0 && (
        <h3 className="text-center text-muted mt-5">
          Cerca un film o telefilm nel campo di ricerca...
        </h3>
      )}
    </main>
  );
}
