/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MainContent from '../MainContent/MainContent.js';
import CustomPagination from '../Pagination/CustomPagination';
import './Trending.css';

const Trending = () => {
 const [page, setPage] = useState(1);
  const [content, setContent] = useState([])
  const fetchTrending = async () => {
   const {data} = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);
  // const {data} = await axios.get("https://api.themoviedb.org/3/trending/all/day?api_key=38b23aabd580d92198322057697231b3");
   console.log(data);
   setContent(data.results);
   setPage(data.total_pages);
  };
  useEffect(() => {
    fetchTrending(); 
  }, [page]);
  
  return (
    <div>
       <h2 className='pTitle'>Movies</h2>
        <div className="trends">
          {content && content.map((c) => (
          <MainContent 
          key={c.id} 
          id={c.id} 
          poster={c.poster_path}
          title={c.title || c.name}
          date={c.first_air_date || c.release_date}
          media_type={c.media_type}
          vote_average={c.vote_average}


          />))}
        </div>
         <CustomPagination setPage={setPage} page={page} />
    </div>
  );
};

export default Trending