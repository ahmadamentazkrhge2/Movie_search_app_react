import { useState, useEffect } from "react";
import "./App.css";
import MovieSearch from "./components/MovieSearch";

const API_KEY = `dc516557`;

function App() {
  const [data, setData] = useState(null);
  const [movieName, setMovie] = useState("");
  const [watchlist, setWatchlist] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("movieWatchlist");
    const savedTheme = localStorage.getItem("theme");
    
    if (savedWatchlist) {
      setWatchlist(JSON.parse(savedWatchlist));
    }
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("movieWatchlist", JSON.stringify(watchlist));
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    document.body.className = isDarkMode ? "dark-theme" : "light-theme";
  }, [watchlist, isDarkMode]);

  function searchApi() {
    if (!movieName) return;
    fetch(
      `https://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`
    )
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  }

  const addToWatchlist = (movie) => {
    if (!movie.imdbID) return;
    
    if (!watchlist.find(item => item.imdbID === movie.imdbID)) {
      setWatchlist([...watchlist, movie]);
    }
  };

  const removeFromWatchlist = (imdbID) => {
    setWatchlist(watchlist.filter(movie => movie.imdbID !== imdbID));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark' : 'light'}`}>
      <header className="app-header">
        <h1 className="main-title">Movie Search App 🎬</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="search-section">
        <MovieSearch
          movieName={movieName}
          setMovie={setMovie}
          searchApi={searchApi}
          isDarkMode={isDarkMode}
        />
      </div>

      <div className="content-section">
        {data && data.Response !== "False" && (
          <div className="movie-card">
            <img 
              src={data.Poster !== "N/A" ? data.Poster : "/placeholder-movie.jpg"} 
              alt={data.Title} 
              className="poster" 
            />
            <div className="details">
              <h2>{data.Title}</h2>
              <div className="movie-info">
                <p><strong>Year:</strong> {data.Year}</p>
                <p><strong>Genre:</strong> {data.Genre}</p>
                <p><strong>IMDB Rating:</strong> ⭐ {data.imdbRating !== "N/A" ? data.imdbRating : "No rating"}</p>
                <p><strong>Director:</strong> {data.Director}</p>
                <p><strong>Runtime:</strong> {data.Runtime}</p>
              </div>
              <p className="plot"><strong>Plot:</strong> {data.Plot}</p>
              
              <button 
                className={`watchlist-btn ${watchlist.find(item => item.imdbID === data.imdbID) ? 'added' : 'add'}`}
                onClick={() => watchlist.find(item => item.imdbID === data.imdbID) 
                  ? removeFromWatchlist(data.imdbID) 
                  : addToWatchlist(data)
                }
              >
                {watchlist.find(item => item.imdbID === data.imdbID) 
                  ? "✓ Added to Watchlist" 
                  : "+ Add to Watchlist"}
              </button>
            </div>
          </div>
        )}

        {data && data.Response === "False" && (
          <div className="not-found">
            <p>😢 No movie found for "{movieName}"</p>
            <p className="suggestion">Try searching for a different title</p>
          </div>
        )}

        {watchlist.length > 0 && (
          <div className="watchlist-section">
            <h2 className="section-title">
              📝 My Watchlist <span className="count">({watchlist.length})</span>
            </h2>
            <div className="watchlist-grid">
              {watchlist.map(movie => (
                <div key={movie.imdbID} className="watchlist-card">
                  <img 
                    src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-movie.jpg"} 
                    alt={movie.Title} 
                    className="watchlist-poster" 
                  />
                  <div className="watchlist-details">
                    <h3>{movie.Title}</h3>
                    <p className="year-rating">{movie.Year} • ⭐ {movie.imdbRating !== "N/A" ? movie.imdbRating : "N/A"}</p>
                    <button 
                      className="remove-btn"
                      onClick={() => removeFromWatchlist(movie.imdbID)}
                    >
                      🗑️ Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {watchlist.length === 0 && data && (
          <div className="empty-watchlist">
            <p>Your watchlist is empty</p>
            <p>Add movies to watch later by clicking "Add to Watchlist"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;