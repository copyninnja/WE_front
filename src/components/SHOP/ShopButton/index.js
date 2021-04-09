
import React, { useEffect,useState,useRef } from "react";


import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {excerpt} from '../../../util';
import './button.css';
const ShopButton = (props) => {
    const {time,category,storage,item_url,item_price,item_name,item_image,item_id,item_description,item_custom1_options,item_custom1_color,item_custom2_options,item_custom2_size}=props.props;
    // console.log(props)
    return (
            <button 
            variant="contained"
            color="secondary"
            key={category}
            className="myButton snipcart-add-item "
            data-item-id={item_id}
            data-item-price={item_price}
            data-item-url={item_url}
            data-item-description={excerpt(item_description)}
            data-item-image={item_image}
            data-item-name={item_name}
            data-item-custom1-name={item_custom1_color}
            data-item-custom1-required="true"
            data-item-custom1-options={item_custom1_options}
            data-item-custom2-name={item_custom2_size}
            data-item-custom2-options={item_custom2_options}
            data-item-custom3-name="storage:"
            data-item-custom3-type="readonly"
            data-item-custom3-value={storage}
            >
                <AddIcon className="fa fa-plus-circle"/>Add to Cart      
            </button>
            // <Button variant="contained" color="secondary" key='list-vertical-star-o' ><AddIcon className="fa fa-plus-circle"/>Add to Cart</Button>
        )
       
        

 };

export default ShopButton;
