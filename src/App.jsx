import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");

  // fetch data from api
  useEffect(() => {
    fetch("https://api.tvmaze.com/shows")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMovies(data);
      });
  }, []);

  // filter using user input
  const filterMovies =
    input.trim() === ""
      ? []
      : movies.filter((movie) =>
          movie.name.toLowerCase().includes(input.toLowerCase())
        );

  return (
    <div>
      <div className="nav-container">
        <h1>Type - Search - Enjoy.</h1>
        <p className="nav-subtitle">All the movies you are looking for </p>
        <input
          className="input-search"
          placeholder=" Search for movies"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div className="content-container">
        {input.trim() === "" ? (
          <p>search for movies</p>
        ) : filterMovies.length === 0 ? (
          <p>nothing was found</p>
        ) : (
          filterMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                className="card-img"
                src={movie.image.medium}
                alt={movie.name}
              />
              <div className="movie-info">
                <p className="movie-title ">{movie.name}</p>
                <p className="movie-genres">{movie.genres}</p>
                <p className="movie-rating">⭐{movie.rating.average}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
