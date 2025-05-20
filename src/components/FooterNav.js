import * as React from "react";
import { useEffect, useState } from "react";
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
  const [value, setValue] = useState(0);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (value === 0) navigate("/Movies-Hub");
    else if (value === 1) navigate("/Movies-Hub/Movies");
    else if (value === 2) navigate("/Movies-Hub/Series");
    else if (value === 3) setShowSearchOverlay(true);
  }, [value, navigate]);

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
          showLabels
          value={value}
          onChange={(event, newValue) => setValue(newValue)}
        >
          <BottomNavigationAction
            label="Trending"
            icon={<WhatshotIcon />}
            sx={{ color: "#fff" }}
          />
          <BottomNavigationAction
            label="Movies"
            icon={<MovieIcon />}
            sx={{ color: "#fff" }}
          />
          <BottomNavigationAction
            label="TV Series"
            icon={<LocationOnIcon />}
            sx={{ color: "#fff" }}
          />
          <BottomNavigationAction
            label="Search"
            icon={<SearchIcon />}
            sx={{ color: "#fff" }}
          />
        </BottomNavigation>
      </Box>

      {/* Search Overlay Component */}
      <SearchOverlay
        isVisible={showSearchOverlay}
        onClose={() => setShowSearchOverlay(false)}
      />
    </>
  );
}
