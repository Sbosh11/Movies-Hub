import React from 'react';
import Container from '@mui/material/Container';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Trending from '../Pages/Trending';
import Movies from '../Pages/Movies';
import Series from '../Pages/Series';
import Search from '../Pages/Search';
import Header from '../Header';
import SimpleBottomNavigation from '../FooterNav';
import './index.css';





const appRoutes = [
  { key:1, path: "/Movies-Hub", element: <Trending/> },
  { key:2, path: "/Movies-Hub/Movies", element: <Movies /> },
  { key:3, path: "/Movies-Hub/Series", element: <Series /> },
  { key:4, path: "/Movies-Hub/Search", element: <Search /> }
];


const AppRouter = () => {
  return (
  <BrowserRouter>
   <Header id="header"/>
   <Container sx={{textAlign: 'left', flex: '1 1 auto', position: 'relative', 'overflow-y':'auto'}} maxWidth={false} > 
   <Routes>
        {appRoutes.map((route) => (
          <Route {...route}/>
       ))}
          {/*<Route path='/Movies-Hub' element={<Trending />} exact />
      <Route path='/Movies-Hub/Movies' element={<Movies />} />
        <Route path='/Movies-Hub/Series' element={<Series />} />
  <Route path='/Movies-Hub/Search' element={<Search />}  />*/}
      </Routes>
        </Container>
        <SimpleBottomNavigation id= "footer"/>
  </BrowserRouter>
  )
}

export default AppRouter;