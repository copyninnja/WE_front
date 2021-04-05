import React, { useEffect, useState } from "react";
import ShopCard from "../card";
import './cardList.css';
import products from'../../../products.json'
// import { AddToCart } from 'react-snipcart'
import {getProductList} from '../../../redux/actions'
import {useSelector, useDispatch} from 'react-redux'

const CardList = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductList());
  }, []);
  const products = useSelector(state => state.product)
  console.log(products)
  const CardList = products.map((product,i) =>product.name=="Shoes"?
    (
      <ShopCard
      key={i}
      time={product.updated}
      category={product.name}
      storage={product.fields.storage}
      item_url={product.fields.url}
      item_price={product.fields.price}
      item_name={product.fields.item_name}
      item_image={product.fields.item_image}
      item_id={product.fields.id}
      item_description={product.fields.item_description}
      item_custom1_options={product.fields.item_custom1_options}
      item_custom1_color={product.fields.item_custom1_color}
      item_custom2_options={product.fields.item_custom2_options}
      item_custom2_size={product.fields.item_custom2_size}
      />
    )
      :(
      <ShopCard
      key={i}
      time={product.updated}
      category={product.name}
      storage={product.fields.storage}
      item_url={product.fields.url}
      item_price={product.fields.price}
      item_name={product.fields.item_name}
      item_image={product.fields.item_image}
      item_id={product.fields.id}
       item_description={product.fields.item_description}
       item_custom1_options={product.fields.item_custom1_options}
       item_custom1_color={product.fields.item_custom1_color}
       />
    ));
  
 
  return (
    <div>
      <button className="snipcart-customer-signin">My account</button>
      <button className="snipcart-checkout">Click here to checkout</button>
      <span className="snipcart-items-count"></span>
      <span className="snipcart-total-price"></span>
      <div id="cardlist" className="row .bg-light">{CardList}</div>;
  </div>
  )
};

export default CardList;