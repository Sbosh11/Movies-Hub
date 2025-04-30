import React, { useEffect, useState } from "react";
import axios from "axios";
import MainContent from "../MainContent/MainContent.js";
import { Box, Modal } from "@mui/material";
import { PlayCircleOutlineOutlined } from "@mui/icons-material";
import "./Movies.css";

const Movies = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [openTrailer, setOpenTrailer] = useState(null);

  const fetchMovies = async (type, setter) => {
    const url = `https://api.themoviedb.org/3/movie/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const { data } = await axios.get(url);
    setter(data.results);
  };

  const fetchTrailer = async (movieId) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
      const { data } = await axios.get(url);
      const trailer = data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setOpenTrailer(trailer.key);
      } else {
        alert("No trailer available.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    fetchMovies("now_playing", setNowPlaying);
    fetchMovies("popular", setPopular);
    fetchMovies("top_rated", setTopRated);
    fetchMovies("upcoming", setUpcoming);
  }, []);

  const handleCloseTrailer = () => {
    setOpenTrailer(null);
  };

  return (
    <div>
      {/* Now Playing Section */}
      <div>
        <h1 className="section-title">Now Playing</h1>
        <div className="movies-list">
          {nowPlaying.map((movie) => {
            const movieUrl = `https://www.themoviedb.org/movie/${movie.id}-${movie.title}`;
            return (
              <a
                key={movie.id}
                href={movieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                <MainContent
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Popular Section */}
      <div>
        <h1 className="section-title">Popular Movies</h1>
        <div className="movies-list">
          {popular.map((movie) => {
            const movieUrl = `https://www.themoviedb.org/movie/${movie.id}-${movie.title}`;
            return (
              <a
                key={movie.id}
                href={movieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                <MainContent
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Top Rated Section */}
      <div>
        <h1 className="section-title">Top Rated Movies</h1>
        <div className="movies-list">
          {topRated.map((movie) => {
            const movieUrl = `https://www.themoviedb.org/movie/${movie.id}-${movie.title}`;
            return (
              <a
                key={movie.id}
                href={movieUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                <MainContent
                  id={movie.id}
                  poster={movie.poster_path}
                  title={movie.title}
                  date={movie.release_date}
                  vote_average={movie.vote_average}
                />
              </a>
            );
          })}
        </div>
      </div>

      {/* Upcoming Section with Pop-out Modal */}
      <div>
        <h1 className="section-title">Upcoming Movies</h1>
        <div className="movies-list">
          {upcoming.map((movie) => (
            <div
              key={movie.id}
              className="movie-link"
              style={{
                cursor: "pointer",
                position: "relative",
                display: "inline-block",
              }}
              onClick={() => fetchTrailer(movie.id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "200px", height: "auto", borderRadius: "8px" }}
              />
              <PlayCircleOutlineOutlined
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: "40px",
                  color: "#fff",
                  zIndex: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Trailer Modal */}
      <Modal open={!!openTrailer} onClose={handleCloseTrailer}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            width: "50%",
            maxWidth: "800px",
            outline: "none",
          }}
        >
          {openTrailer && (
            <iframe
              width="100%"
              height="450"
              src={`https://www.youtube.com/embed/${openTrailer}?autoplay=1`}
              title="Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Movies;
