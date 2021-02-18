// 信息页面的头部

import React,{ Component } from "react";
import {List} from 'antd-mobile'
import {Row,Col} from 'antd';
import PropTypes from 'prop-types'
import './header.css';
import UploadCom from '../uploadHeader';
import FormLabel from '@material-ui/core/FormLabel';

export default class HeaderSelector extends Component {

  static propTypes={
    setHandleHeader:PropTypes.func.isRequired
  }

  state={
    icon:null
  }
  constructor(prop) {
    super(prop)
    this.headerList=[]
    let row;
    for (let i = 1; i < 6; i++) {
      row=[];
      for(let j = 1; j < 5; j++){
      row.push({
        text:'头像'+((i-1)*4+j),
        icon:require(`../../assets/images/头像${(i-1)*4+j}.png`)
      })    
    }
     this.headerList.push(row) 
  }
  }
  render () {
    // const listHeader='请选择头像'
    // 头部头像

    const {icon}=this.state
    const listHeader=icon? (<div>chosen avatar：<img src={icon} /></div>):'please choose your avatar'
    return (
      
      <div className="grid">
        <List renderHeader={()=>listHeader}></List>
       {
  
         this.headerList.map((row, ri) => (
          <Row key={ri} >
          {row.map(cellId => <Col span={6} key={cellId.text} id={cellId.text} ><img sizes='100px' src={cellId.icon} onClick={()=>{this.headerClick(cellId.text,cellId.icon)} }/></Col>)}
           </Row>
          ))
        }
        <div className="container">
          <div className="row">
            <div className="col-sm" >
            <FormLabel component="legend" style={{marginTop:'50px'}}> Or you can upload your own header</FormLabel>
              </div>
            <div className="col-sm">
            <UploadCom/>    
            </div>
             </div>
           </div>
    </div>

    )
  }
  headerClick=(text,icon)=>{
    this.setState({
      icon
    })
    this.props.setHandleHeader(text)

  }
}