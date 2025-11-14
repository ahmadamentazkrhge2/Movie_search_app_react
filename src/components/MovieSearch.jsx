import React from "react";

export default function MovieSearch({ movieName, setMovie, searchApi, isDarkMode }) {
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchApi();
    }
  };

  return (
    <div className="search-box">
      <input
        className="search-input"
        value={movieName}
        onChange={(e) => setMovie(e.target.value)}
        onKeyPress={handleKeyPress}
        type="text"
        placeholder="Search for a movie..."
      />
      <button className="search-btn" onClick={searchApi}>
        🔍 Search
      </button>
    </div>
  );
}