import "./assets/css/index.css";

import Header from "./components/Header";
import MainContent from "./components/MainContent";
import { MovieProvider } from "./context/MovieContext"; // senza il "segnale radio" non può arrivarea header e maincontent

export default function App() {
  return (
    <MovieProvider>
      <Header />
      <MainContent />
    </MovieProvider>
  );
}
