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
    <div class="bo">
<div class="head2">
    <div class="headerobjectswrapper">
        <div class="weatherforcastbox"><span style={{ font: 'italic'}}>Weatherforcast for the next 24 hours: 
        {state.weather[0].description}</span><span><br/>Wind: {state.wind.speed}km/h SSE; Ther: {(state.main.temp-273.15).toFixed(2)}°C; Hum: {state.main.humidity}%</span></div>
        <p class="pClass"><span id="header1">SportPost Ireland</span></p>
    </div>
    <div class="subhead">Waterford, {moment().format("dddd, MMMM Do YYYY, h:mm")}</div>
    </div>

<div class="content">
    <div class="collumns">
        {news.map((new1,id) => 
             <div class="collumn" key={id}>
            <div class="head2"><span class="headline hl3">{new1.title}</span><p class="pClass"><span class="headline hl4">{new1.author}</span></p></div>
            <p class="pClass">{new1.description}</p>
            <p class="pClass">{new1.content}</p>
            <figure class="figure">
			<img class="media" src={new1.urlToImage} alt=""/>
			<figcaption class="figcaption">{new1.publishedAt}</figcaption>
			</figure>

            </div>
)}

           </div>
    
    </div>
    </div>


)
}
export default Newspaper;
