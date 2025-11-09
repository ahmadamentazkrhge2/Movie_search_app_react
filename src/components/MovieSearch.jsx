import React from "react";

export default function MovieSearch({ movieName, setMovie, searchApi }) {
  return (
    <div className="search-box">
      <input
        className="search-input"
        value={movieName}
        onChange={(e) => setMovie(e.target.value)}
        type="text"
        placeholder="Enter movie name..."
      />
      <button className="search-btn" onClick={searchApi}>
        Search
      </button>
    </div>
  );
}
