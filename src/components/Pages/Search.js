import React, { useState } from "react";
import axios from "axios";
import MainContent from "../MainContent/MainContent";
import "./Search.css";

const categories = [
  { name: "Movies", key: "movie" },
  { name: "TV Shows", key: "tv" },
  { name: "People", key: "person" },
  { name: "Collections", key: "collection" },
  { name: "Keywords", key: "keyword" },
  { name: "Companies", key: "company" },
  { name: "Networks", key: "network" },
];

const Search = () => {
  const [query, setQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    categories.map((c) => c.key)
  );
  const [results, setResults] = useState({});

  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3/search/";

  const handleCheckboxChange = (key) => {
    setSelectedCategories((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const fetchSearchResults = async () => {
    if (!query) return;
    const promises = selectedCategories.map(async (cat) => {
      try {
        const { data } = await axios.get(`${BASE_URL}${cat}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
            page: 1,
            query,
            include_adult: false,
          },
        });
        return { category: cat, results: data.results };
      } catch {
        return { category: cat, results: [] };
      }
    });

    const allResults = await Promise.all(promises);
    const grouped = {};
    allResults.forEach(({ category, results }) => {
      grouped[category] = results;
    });
    setResults(grouped);
  };

  const renderItems = (items, category) => {
    if (!items || items.length === 0) return null;
    return (
      <div key={category}>
        <h2 className="section-title">
          {categories.find((c) => c.key === category)?.name}
        </h2>
        <div className="movies-list">
          {items.map((item) => {
            const title = item.title || item.name;
            const poster = item.poster_path || item.profile_path;
            const date = item.release_date || item.first_air_date;
            const url = `https://www.themoviedb.org/${category}/${item.id}`;

            return (
              <a
                key={item.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="movie-link"
              >
                <MainContent
                  id={item.id}
                  poster={poster}
                  title={title}
                  date={date}
                  vote_average={item.vote_average}
                />
              </a>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="search-container">
      <div className="search-input-section">
        <input
          type="text"
          placeholder="Search movies, TV shows, people..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-input"
        />
        <button className="search-button" onClick={fetchSearchResults}>
          Search
        </button>
      </div>

      <div className="search-options">
        <h4>Search Categories:</h4>
        <div className="checkboxes">
          {categories.map(({ name, key }) => (
            <label key={key}>
              <input
                type="checkbox"
                checked={selectedCategories.includes(key)}
                onChange={() => handleCheckboxChange(key)}
              />
              {name}
            </label>
          ))}
        </div>
      </div>

      <div className="search-results">
        {Object.entries(results).map(([category, items]) =>
          renderItems(items, category)
        )}
      </div>
    </div>
  );
};

export default Search;
