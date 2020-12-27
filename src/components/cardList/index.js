import React from "react";
import Card from "../card";
import './cardList.css';


const CardList = () => {
    const listData = [];
    for (let i = 1; i < 23; i++) {
  listData.push({
    title: ` ${i}`,
  });
}
  const CardList = listData.map(m => (
    <Card key={m.title}  />
  ));
  return <div id="cardlist" className="row .bg-light">{CardList}</div>;
};

export default CardList;