import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import MovieIcon from "@mui/icons-material/Movie";
import SearchIcon from "@mui/icons-material/Search";
import SearchOverlay from "../components/Pages/SearchOverlay";

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState("trending");
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    if (newValue === "search") {
      setShowSearchOverlay((prev) => !prev); // Toggle overlay
    } else {
      setValue(newValue);
      setShowSearchOverlay(false); // hide overlay when clicking other tabs
      if (newValue === "trending") navigate("/Movies-Hub");
      else if (newValue === "movies") navigate("/Movies-Hub/Movies");
      else if (newValue === "series") navigate("/Movies-Hub/Series");
    }
  };

  return (
    <>
      <Box sx={{ width: "100%", mt: "auto" }}>
        <BottomNavigation
          sx={{
            bgcolor: "#3B3542",
            "&& .Mui-selected": {
              color: "#90bce9",
            },
          }}
          value={value === "search" ? false : value}
          onChange={handleChange}
          showLabels
        >
          <BottomNavigationAction
            label="Trending"
            value="trending"
            icon={<WhatshotIcon />}
            sx={{ color: "#fff" }}
          />
          <BottomNavigationAction
            label="Movies"
            value="movies"
            icon={<MovieIcon />}
            sx={{ color: "#fff" }}
          />
          <BottomNavigationAction
            label="TV Series"
            value="series"
            icon={<LocationOnIcon />}
            sx={{ color: "#fff" }}
          />
          <BottomNavigationAction
            label="Search"
            value="search"
            icon={<SearchIcon />}
            sx={{ color: "#fff" }}
          />
        </BottomNavigation>
      </Box>

      {/* Show/hide SearchOverlay */}
      <SearchOverlay isVisible={showSearchOverlay} />
    </>
  );
}
