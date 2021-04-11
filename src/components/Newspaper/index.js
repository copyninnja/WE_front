import React, { useEffect, useState } from 'react';
import  './paper.css';
import moment from 'moment';
const Newspaper =()=>{
    const [state,setState]=useState({
        main:{temp:273.15},
        weather:[{description:null}],
        wind:{speed:null}
    });
    const [news,setNews]=useState([]);
    useEffect(() => {
        const url = [
            `http://api.openweathermap.org`,
            `/data/2.5/forecast?q=Waterford&appid=${process.env.REACT_APP_WEATHERAPI}`
          ].join("")
        
          fetch(url)
            .then(res => res.json())
            .then(data => {
              setState(data.list[0]);
            });
        const newsUrl=[`https://newsapi.org/v2/top-headlines?`,
        `apiKey=${process.env.REACT_APP_NEWSAPI}&country=ie&category=sports`].join("")
        fetch(newsUrl)
        .then(res => res.json())
        .then(data => {
            setNews(data.articles);
        });
        
      }, []);
      console.log(news)


return(
    <div className="bo">
<div className="head2">
    <div className="headerobjectswrapper">
        <div className="weatherforcastbox"><span style={{ font: 'italic'}}>Weatherforcast for the next 24 hours: 
        {state.weather[0].description}</span><span><br/>Wind: {state.wind.speed}km/h SSE; Ther: {(state.main.temp-273.15).toFixed(2)}°C; Hum: {state.main.humidity}%</span></div>
        <p className="pclassName"><span id="header1">SportPost Ireland</span></p>
    </div>
    <div className="subhead">Waterford, {moment().format("dddd, MMMM Do YYYY, h:mm")}</div>
    </div>

<div className="content">
    <div className="collumns">
        {news.map((new1,id) => 
             <div className="collumn" key={id}>
            <div className="head2"><span className="headline hl3">{new1.title}</span><p className="pclassName"><span className="headline hl4">{new1.author}</span></p></div>
            <p className="pclassName">{new1.description}</p>
            <p className="pclassName">{new1.content}</p>
            <figure className="figure">
			<img className="media" src={new1.urlToImage} alt=""/>
			<figcaption className="figcaption">{new1.publishedAt}</figcaption>
			</figure>

            </div>
)}

           </div>
    
    </div>
    </div>


)
}
export default Newspaper;
