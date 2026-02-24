import { useContext } from "react";
import { MovieContext } from "../context/MovieContext";

export default function MainContent() {
  // l'array dei film dal Context
  const { movies } = useContext(MovieContext);

  return (
    <main className="container py-4">
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
                <strong>Lingua:</strong> {movie.original_language}
              </p>
              <p className="mb-0">
                <strong>Voto:</strong> {movie.vote_average}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h3 className="text-center text-muted mt-5">
          Che film stai cercando...
        </h3>
      )}
    </main>
  );
}
