import React, { useState } from "react";
import { Rate } from 'antd';
import 'antd/dist/antd.css';

const Rank = ({movie,session_id}) => {
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];
    const [rank,setRank]=useState(0);

    const rankit=(it)=>{
        if(it===0){
        setRank(0);
        console.log("hello")
      // POST request using fetch inside useEffect React hook
      const requestRank = {
          method: 'DELETE',
      };
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, requestRank)
      .then(async response => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          window.alert(JSON.stringify(data.status_message))
      })
      .catch(error => {
          console.error('There was an error!', error);
      }); 
       // eslint-disable-next-line
    }else{
        
      let data = new FormData();
      setRank(it);
      data.append("value",it*2);
      // POST request using fetch inside useEffect React hook
      const requestRank = {
          method: 'POST',
          body: data
      };
      fetch(`https://api.themoviedb.org/3/movie/${movie.id}/rating?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${session_id}`, requestRank)
      .then(async response => {
          const data = await response.json();
          // check for error response
          if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }

          window.alert(JSON.stringify(data.status_message))
      })
      .catch(error => {
          console.error('There was an error!', error);
      }); 
       // eslint-disable-next-line
    }
  }



      const handleChange = (value) => {
        rankit(value);
      };

return( 
    <span>
    <Rate  tooltips={desc} onChange={handleChange} value={rank} data-cy="ratetext" />
    {rank ? <span className="ant-rate-text" >{desc[rank - 1]}</span> : ''}
  </span>
);

}
export default Rank;