//! scaricato i pacchetti ed il motore per le stelle icon --> npm i @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons @fortawesome/react-fontawesome LINK DOCUMENT --> https://docs.fontawesome.com/web/use-with/react/
import { faStar as fullStar } from "@fortawesome/free-solid-svg-icons"; // Stella Piena
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons"; // Stella Vuota
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // componente importato

export default function MovieCard({ element }) {
  const title = element.title || element.name;
  const originalTitle = element.original_title || element.original_name;

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
    <div
      key={element.id}
      className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
    >
      <div className="movie-card shadow-lg rounded">
        {/* Copertina */}
        <img
          src={getPosterImage(element.poster_path)}
          alt={element.title}
          className="movie-poster"
        />
        {/* RETRO ==> Hover con CSS */}
        <div className="movie-info p-3">
          <h5 className="fw-bold text-danger">{element.title}</h5>
          <p className="small mb-1">
            <em>{element.original_title}</em>
          </p>
          <div className="mb-2 small">
            Lingua: {getFlagImage(element.original_language)}
          </div>
          <div className="mb-2 small">
            Voto: {renderStars(element.vote_average)}
          </div>
          <p className="overview-text mt-3">
            <strong>Overview:</strong>
            <br />
            {element.overview || "Trama non disponibile."}
          </p>
        </div>
      </div>
    </div>
  );
}
