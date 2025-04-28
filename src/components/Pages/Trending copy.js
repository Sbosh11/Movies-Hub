/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import MainContent from "../MainContent/MainContent.js";
import { Box, Modal } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "./Trending.css";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [type, setType] = useState("all");

  const [trailers, setTrailers] = useState([]);
  const [trailerType, setTrailerType] = useState("movie");
  const [openTrailer, setOpenTrailer] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const categories = ["all", "movie", "tv"];
  const trailerCategories = ["movie", "tv"];

  const fetchTrending = async () => {
    const url =
      type === "all"
        ? `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`
        : `https://api.themoviedb.org/3/trending/${type}/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`;

    const { data } = await axios.get(url);
    setContent(data.results);
  };

  const fetchTrailers = async () => {
    const url =
      trailerType === "movie"
        ? `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
        : `https://api.themoviedb.org/3/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;

    const { data } = await axios.get(url);
    console.log("Trailer list (UPCOMING):", data);

    const trailerPromises = data.results.slice(0, 15).map(async (item) => {
      try {
        const videoUrl =
          trailerType === "movie"
            ? `https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
            : `https://api.themoviedb.org/3/tv/${item.id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

        const { data: videoData } = await axios.get(videoUrl);
        const trailer = videoData.results.find(
          (vid) => vid.type === "Trailer" && vid.site === "YouTube"
        );

        return trailer
          ? {
              ...trailer,
              title: item.title || item.name,
              overview: item.overview,
              vote_average: item.vote_average,
              vote_count: item.vote_count,
              release_date: item.release_date,
              first_air_date: item.first_air_date,
              poster_path: item.poster_path,
            }
          : null;
      } catch (error) {
        console.error("Error fetching trailer for:", item.id, error);
        return null;
      }
    });

    const trailersData = await Promise.all(trailerPromises);

    const sortedTrailers = trailersData
      .filter((trailer) => trailer !== null)
      .sort((a, b) => {
        const dateA = new Date(a.release_date || a.first_air_date || 0);
        const dateB = new Date(b.release_date || b.first_air_date || 0);
        return dateB - dateA;
      });

    setTrailers(sortedTrailers);
  };

  useEffect(() => {
    fetchTrending();
  }, [type, page]);

  useEffect(() => {
    fetchTrailers();
  }, [trailerType]);

  const handleTypeChange = (selectedType) => {
    setType(selectedType);
    setPage(1);
  };

  const handleTrailerTypeChange = (selectedType) => {
    setTrailerType(selectedType);
  };

  const handleOpenTrailer = (trailer) => {
    setOpenTrailer(trailer);
  };

  const handleCloseTrailer = () => {
    setOpenTrailer(null);
  };

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div>
      <h1 className="pTitle">Trending</h1>

      <div>
        <ul className="category-list">
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleTypeChange(cat)}
              className={type === cat ? "active" : ""}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </li>
          ))}
        </ul>
      </div>

      <div className="trends">
        {content &&
          content.map((c) => (
            <MainContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>

      {/* Latest Trailers Section */}
      <div>
        <h2 className="pTitle">Latest Trailers</h2>

        <ul className="category-list">
          {trailerCategories.map((cat) => (
            <li
              key={cat}
              onClick={() => handleTrailerTypeChange(cat)}
              className={trailerType === cat ? "active" : ""}
            >
              {cat === "movie" ? "Movies" : "TV Series"}
            </li>
          ))}
        </ul>

        <div
          className="trailers"
          style={{ display: "flex", overflowX: "auto", gap: "20px" }}
        >
          {trailers.map((trailer) => (
            <div
              key={trailer.id}
              style={{
                width: "500px",
                minWidth: "500px",
                flex: "0 0 auto",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                background: "#f9f9f9",
                padding: "10px",
                borderRadius: "8px",
              }}
              onClick={() => handleOpenTrailer(trailer)}
            >
              <iframe
                width="100%"
                height="280"
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&showinfo=0&controls=0`}
                title={trailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ pointerEvents: "none" }}
              ></iframe>
              <h4 style={{ margin: "10px 0 0", color: "#666" }}>
                {trailer.title}
              </h4>
              <p
                style={{
                  fontSize: "14px",
                  color: "#666",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {expandedDescriptions[trailer.id]
                  ? trailer.overview
                  : trailer.overview.length > 50
                  ? trailer.overview.substring(0, 50)
                  : trailer.overview}

                {trailer.overview.length > 50 && (
                  <span
                    onClick={() => toggleDescription(trailer.id)}
                    style={{
                      color: "red",
                      cursor: "pointer",
                      marginLeft: "5px",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {expandedDescriptions[trailer.id] ? (
                      <RemoveIcon fontSize="small" />
                    ) : (
                      <AddIcon fontSize="small" />
                    )}
                  </span>
                )}
              </p>

              <p style={{ fontSize: "12px", color: "#888" }}>
                ⭐ {trailer.vote_average || 0} ({trailer.vote_count || 0} votes)
              </p>
            </div>
          ))}
        </div>

        {/* Pop-out Modal */}
        <Modal open={!!openTrailer} onClose={handleCloseTrailer}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 2,
              width: "90%",
              maxWidth: "800px",
              outline: "none",
            }}
          >
            {openTrailer && (
              <iframe
                width="100%"
                height="450"
                src={`https://www.youtube.com/embed/${openTrailer.key}?autoplay=1`}
                title={openTrailer.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Trending;
