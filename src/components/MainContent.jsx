import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function MainContent() {
  // Prendiamo l'array dei film dal Context
  const { movies } = useContext(MovieContext);
  // l'array delle serie tv
  const { tvSeries } = useContext(MovieContext);

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

  return (
    <main className="container py-4">
      {/* --- FILMS --- */}
      <section className="mb-5">
        <h2 className="text-danger border-bottom pb-2 mb-4">Films</h2>
        {movies.length > 0 ? (
          <ul className="list-group">
            {movies.map((movie) => (
              <li
                key={movie.id}
                className="list-group-item bg-light mb-3 shadow-sm"
              >
                <h4 className="fw-bold">Titolo: {movie.title}</h4>
                <p className="mb-1">
                  <strong>Titolo Originale:</strong> {movie.original_title}
                </p>
                <p className="mb-1">
                  <strong>Lingua:</strong>{" "}
                  {getFlagImage(movie.original_language)}
                </p>
                <p className="mb-0">
                  <strong>Voto:</strong> {movie.vote_average}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Nessun film trovato</p>
        )}
      </section>
      {/* --- SERIE TV --- */}
      <section className="mb-5">
        <h2 className="text-primary border-bottom pb-2 mb-4">TV Series</h2>
        {tvSeries.length > 0 ? (
          <ul className="list-group">
            {tvSeries.map((tvSerie) => (
              <li
                key={tvSerie.id}
                className="list-group-item bg-light mb-3 shadow-sm"
              >
                <h4 className="fw-bold">Titolo: {tvSerie.name}</h4>
                <p className="mb-1">
                  <strong>Titolo Originale:</strong> {tvSerie.original_name}
                </p>
                <p className="mb-1">
                  <strong>Lingua:</strong>{" "}
                  {getFlagImage(tvSerie.original_language)}
                </p>
                <p className="mb-0">
                  <strong>Voto:</strong> {tvSerie.vote_average}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-muted">Nessuna serie tv trovata</p>
        )}
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
