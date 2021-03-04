// 信息页面的头部

import React,{ Component } from "react";
import {List} from 'antd-mobile'
import {Row,Col} from 'antd';
import PropTypes from 'prop-types'
import './header.css';
import FormLabel from '@material-ui/core/FormLabel';
import { Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}
export default class HeaderSelector extends Component {

  static propTypes={
    setHandleHeader:PropTypes.func.isRequired
  }

  state={
    loading: false,
    icon:null
  }

  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false,
        }),
      );
    }
    console.log(info)
    this.setState({
      icon:require(`../../assets/images/${info.file.name}`)
    })
    this.props.setHandleHeader(info.file.name)
  };
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
    const { loading, imageUrl } = this.state;
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    const {icon}=this.state
    console.log(this.state)
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
            <Upload
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="/api/upload"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
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