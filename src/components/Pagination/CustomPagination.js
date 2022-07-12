
import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


const CustomPagination = ({ setPage, page}) => { 
  //Handle Change
const handleChange = page => {
 setPage(page)
 window.scroll(0,0)
}

 //const [page, setPage] = React.useState(1);
  //const handleChange = (setPage, value: number) => {
  //  setPage(value);
//  };

  return (
    <div>
        <Stack spacing={2}>
      <Pagination
      onChange={(e) => handleChange(e.target.textContent)}
      style= {{
        display: 'flex',
        justifyContent: 'center'

      }} 
      count={page} />
      </Stack>
    </div>
  );
};

export default CustomPagination;