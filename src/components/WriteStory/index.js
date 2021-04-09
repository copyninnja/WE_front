import React, { useState ,useEffect} from 'react';
import 'antd/dist/antd.css';
import {
  Form,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Rate,
  Checkbox,
  Row,
  Col,
  Input
} from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import {useSelector} from 'react-redux'
import { reqWriteStory  } from "../../api";
import { Redirect } from 'react-router-dom';
import { VoiceMessage } from 'react-chat-app'



// import { write } from '../../redux/actions'

const { Option } = Select;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },

};


const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};


export default  function WriteStory(props) {
  const [story,setStory]= useState({
    username:'',
    type:'',
    introduction:'',
    sport:[],
    img:[],
    anonymous:false,
    location:[]
  });
  const user = useSelector(state => state.user)

     // 更新运动
     const setSport = sport => {
      //  console.log(story)
      const newFris=[...sport];
      setStory({...story,
        sport:newFris
      })
    }
  const onFinish = (values) => {
    // console.log(values)
    story.introduction = values.introduction;
    story.anonymous = values.switch;
    if(values.upload){
    let backAddd = values.upload.map(item => item.response.data.name)
    let frontAddd = values.upload.map(item => item.name)
    let combined = frontAddd.map((v, i) => ({
      frontAddd: v,
      backAddd: backAddd[i]
    }));
    story.img = combined
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = [
        Math.floor(position.coords.longitude*10000000)/10000000,
        Math.floor(position.coords.latitude*10000000)/10000000
      ];
      story.location = pos;
    });
}
// console.log(user)
    if(!story.anonymous){
      story.username=user.username;   
      story.type=user.type;
    }
    else{
      story.username='anonymous';   
      story.type=null
    }
     reqWriteStory(story).then(cos=>{
       if(cos.data.code===0){
        console.log(props)
        //  return <Redirect to="/story"/>
        props.props.history.push('/story')
       }
     } )

  };
  
   const [form] = Form.useForm(); //用于之后取数据
   const [fileList, setFileList] = useState(null); //文件列表
   const [fileName, setFileName] = useState(null); //文件名


   const handleChange = (info) => {
    let files = [...info.fileList];
    files = files.slice(-1);
    setFileList(files);

    if (files && files.length > 0) {
        const [fname, fextname] =  files[0]["name"].split(/\.(?=[^\.]+$)/); //分割文件名
        setFileName(fname);
    }
}
useEffect(() => {
  //实时更新
  form.setFieldsValue({
      name: fileName,
  });
}, [fileName]);

  return (
    <Form
      name="validate_other"
      {...formItemLayout}
      onFinish={onFinish}

      form={form}
    >
      <Form.Item name= 'introduction' label="Introduction">
        <Input.TextArea  id="intro"  />
      </Form.Item>

      <Form.Item
        name="select-multiple"
        label="Select[multiple]"
        rules={[
          {
            required: true,
            message: 'Please select your sport tag!',
            type: 'array',
          },
        ]}
      >
        <Select mode="multiple" placeholder="Please select your sport tag" onChange={setSport}>
          <Option value="badminton">badminton</Option>
          <Option value="running">running</Option>
          <Option value="basketball">basketball</Option>
          <Option value="football">football</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="upload"
        label="Upload"
        valuePropName="fileList"
        getValueFromEvent={normFile}
        extra="pick a picture to express your feeling!"
      >
        <Upload name="file" listType="picture" action="/api/upload" onChange={handleChange} fileList={fileList}
        accept={'.png,.jpg.jpeg'}
        >
          <Button icon={<UploadOutlined /> }>Click to upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item name="switch" label="anonymous" valuePropName="checked">
        <Switch name="anonymose"/>
        
      </Form.Item>
      
      <Form.Item name="voice" label="Voice story" >
        <VoiceMessage/>    
       </Form.Item>

      <Form.Item
        wrapperCol={{
          span: 12,
          offset: 4,
        }}
      >
        
        <Button type="primary" htmlType="submit" >
          Submit
        </Button>
        
      </Form.Item>

    </Form>
  );
};

