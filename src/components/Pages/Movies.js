import axios from "axios";
import React, { useEffect, useState } from "react";
import MainContent from "../MainContent/MainContent.js";

import "./Movies.css";

const Movies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);

  const fetchMovies = async (url, setMovies) => {
    try {
      const { data } = await axios.get(url);
      setMovies(data.results);
      console.log(`${setMovies.name} Movies:`, data.results);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_API_KEY;

    fetchMovies(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`,
      setPopularMovies
    );
    fetchMovies(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`,
      setTopRatedMovies
    );
    fetchMovies(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
      setUpcomingMovies
    );
    fetchMovies(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1`,
      setNowPlayingMovies
    );
  }, []);

  return (
    <div>
      {/* Now Playing Movies Section */}
      <div className="movies-section">
        <h2>Now Playing Movies</h2>
        <div className="movies-list">
          {nowPlayingMovies.map((movie) => (
            <MainContent
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>

      {/* Popular Movies Section */}
      <div className="movies-section">
        <h2>Popular Movies</h2>
        <div className="movies-list">
          {popularMovies.map((movie) => (
            <MainContent
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>

      {/* Top Rated Movies Section */}
      <div className="movies-section">
        <h2>Top Rated Movies</h2>
        <div className="movies-list">
          {topRatedMovies.map((movie) => (
            <MainContent
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>

      {/* Upcoming Movies Section */}
      <div className="movies-section">
        <h2>Upcoming Movies</h2>
        <div className="movies-list">
          {upcomingMovies.map((movie) => (
            <MainContent
              key={movie.id}
              poster={movie.poster_path}
              title={movie.title}
              date={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
