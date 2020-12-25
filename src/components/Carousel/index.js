
import React from "react";
import CarouselCard from "../CarouselCard"
import {Carousel} from 'antd';
import 'antd/dist/antd.css';

const Karousel =({movies,session_id}) => {
  const movieCards = movies.map(m => (
    <CarouselCard key={m.id} movie={m} session_id={session_id}/>));

        const contentStyle = {
            height: '580px',
            color: '#fff',
            lineHeight: '160px',
            textAlign: 'center',
            background: '#364d79',

        };


return( 
  <div style={contentStyle}>
  <Carousel autoplay>
   {movieCards}
    <div>
      <h2 style={contentStyle}>end</h2>
    </div>

    </Carousel>

</div>
);

}
export default Karousel;