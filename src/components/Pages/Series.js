import React, { useEffect, useState } from "react";
import axios from "axios";
import MainContent from "../MainContent/MainContent.js";
import "./Movies.css";

const Series = () => {
  const [airingToday, setAiringToday] = useState([]);
  const [onTheAir, setOnTheAir] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const fetchSeries = async (type, setter) => {
    const url = `https://api.themoviedb.org/3/tv/${type}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`;
    const { data } = await axios.get(url);
    setter(data.results);
  };

  useEffect(() => {
    fetchSeries("airing_today", setAiringToday);
    fetchSeries("on_the_air", setOnTheAir);
    fetchSeries("popular", setPopular);
    fetchSeries("top_rated", setTopRated);
  }, []);

  const buildTvUrl = (tv) =>
    `https://www.themoviedb.org/tv/${tv.id}-${tv.name.replace(/ /g, "-")}`;

  return (
    <div>
      {/* Airing Today Section */}
      <div>
        <h1 className="section-title">Airing Today</h1>
        <div className="movies-list">
          {airingToday.map((tv) => (
            <a
              key={tv.id}
              href={buildTvUrl(tv)}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-link"
            >
              <MainContent
                id={tv.id}
                poster={tv.poster_path}
                title={tv.name}
                date={tv.first_air_date}
                vote_average={tv.vote_average}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Currently On The Air Section */}
      <div>
        <h1 className="section-title">Currently On The Air</h1>
        <div className="movies-list">
          {onTheAir.map((tv) => (
            <a
              key={tv.id}
              href={buildTvUrl(tv)}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-link"
            >
              <MainContent
                id={tv.id}
                poster={tv.poster_path}
                title={tv.name}
                date={tv.first_air_date}
                vote_average={tv.vote_average}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Popular TV Shows Section */}
      <div>
        <h1 className="section-title">Popular TV Shows</h1>
        <div className="movies-list">
          {popular.map((tv) => (
            <a
              key={tv.id}
              href={buildTvUrl(tv)}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-link"
            >
              <MainContent
                id={tv.id}
                poster={tv.poster_path}
                title={tv.name}
                date={tv.first_air_date}
                vote_average={tv.vote_average}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Top Rated TV Shows Section */}
      <div>
        <h1 className="section-title">Top Rated TV Shows</h1>
        <div className="movies-list">
          {topRated.map((tv) => (
            <a
              key={tv.id}
              href={buildTvUrl(tv)}
              target="_blank"
              rel="noopener noreferrer"
              className="movie-link"
            >
              <MainContent
                id={tv.id}
                poster={tv.poster_path}
                title={tv.name}
                date={tv.first_air_date}
                vote_average={tv.vote_average}
              />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Series;