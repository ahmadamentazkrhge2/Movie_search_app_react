import { useState } from "react";
import "./App.css";
import MovieSearch from "./components/MovieSearch";

const API_KEY = `dc516557`;

function App() {
  const [data, setData] = useState(null);
  const [movieName, setMovie] = useState("");

  function searchApi() {
    if (!movieName) return; // Prevent empty search
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  return (
    <div className="app">
      <h2>Hello</h2>
      <h1 className="title">Movie Search App🎬</h1>

      <MovieSearch
        movieName={movieName}
        setMovie={setMovie}
        searchApi={searchApi}
      />

      {data && data.Response !== "False" && (
        <div className="movie-card">
          <img src={data.Poster} alt={data.Title} className="poster" />
          <div className="details">
            <h2>{data.Title}</h2>
            <p><strong>Year:</strong> {data.Year}</p>
            <p><strong>Genre:</strong> {data.Genre}</p>
            <p><strong>IMDB Rating:</strong> ⭐ {data.imdbRating}</p>
            <p><strong>Plot:</strong> {data.Plot}</p>
          </div>
        </div>
      )}

      {data && data.Response === "False" && (
        <p className="not-found">😢 No movie found</p>
      )}
    </div>
  );
}

export default App;
