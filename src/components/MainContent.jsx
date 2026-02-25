import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";

export default function MainContent() {
  // Prendiamo l'array dei film dal Context
  const { movies, tvSeries } = useContext(MovieContext);

  return (
    <main className="container-fluid bg-dark min-vh-100 py-4">
      {/* --- FILMS --- */}
      <section className="container-fluid mb-5">
        <h2 className="text-danger border-bottom border-danger pb-2 mb-4 fw-bold">
          Films
        </h2>
        <div className="row g-4">
          {movies.length > 0 ? (
            movies.map((movie) => <MovieCard key={movie.id} element={movie} />)
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
              <MovieCard key={tvSerie.id} element={tvSerie} />
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
