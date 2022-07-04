import * as React from 'react';
import  {useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
//import RestoreIcon from '@mui/icons-material/Restore';
//import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';





export default function SimpleBottomNavigation() {

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

useEffect(() => {
    if (value === 0) navigate('/Movies-Hub');
    else if (value === 1) navigate('/Movies-Hub/Movies');
    else if (value === 2) navigate('/Movies-Hub/Series');
    else if (value === 3) navigate('/Movies-Hub/Search');
 }, [value, navigate]);

  
  return (
    <Box sx={{ 
      width: '100%', 
      mt: 'auto'
     }}>
      <BottomNavigation
      sx={{
       //bgcolor: '#2C467A',
        bgcolor: '#b93c3c', 
        boxShadow:'-2px -2px 50px 3px rgb(51 51 51)',
     }}

        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction sx={{ color: '#fff' }} label="Trending" icon={<WhatshotIcon />} />
        <BottomNavigationAction sx={{ color: '#fff' }} label="Movies" icon={<MovieIcon/>} />
        <BottomNavigationAction sx={{ color: '#fff' }} label="TV Series" icon={<LocationOnIcon />} />
        <BottomNavigationAction sx={{ color: '#fff' }} label="Search" icon={<SearchIcon />} />
      </BottomNavigation>
    </Box>
  );
}
