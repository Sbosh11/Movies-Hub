import React from 'react';
import { img_300, unavailable } from '../../config/config';
import "./MainContent.css";

const MainContent = ({
    id,
    poster,
    title,
    date,
    media_type,
    vote_average, 
 }) => {
  return (
    <div className="media">
        <img className="poster"
        src={ poster? `${img_300}/${poster}`: unavailable } alt={title} />
        <b className='title'>{title}</b>
        <div className="subTitle">
        <span>{media_type === "tv" ? "TV Series" : "Movies"}</span>
        <span>{date}</span>
       </div>
        
    </div>
  )
}

export default MainContent;
