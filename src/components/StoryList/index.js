import React , { Component }from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {getStory} from '../../redux/actions'
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import { distanceCal } from '../../util';
let listData = [];
// for (let i = 1; i < 23; i++) {
//   listData.push({
//     href: 'https://ant.design',
//     title: ` ${i}`,
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
//     description:
//       '<10km',
//     content:
//       'This is a test of the content of each user`s content',
//   });
// }

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class CardList extends Component {
  constructor () {
    super()
    this.state={
      distance:[],

  }
    
  }
calculate=(lat,longti)=>{
  navigator.geolocation.getCurrentPosition((position) => {
    var pos = [
      Math.floor(position.coords.longitude*10000000)/10000000,
      Math.floor(position.coords.latitude*10000000)/10000000
    ];
    let dis=distanceCal(lat,longti,pos[0],pos[1])
    dis=parseInt(dis/5)*5+5;
    // console.log(dis)
    if(dis){   
    this.setDistance(dis)
    console.log(this.state.distance)
    return dis;}
    else{
      this.setDistance(5)
      return 5;
    }
});
}
setDistance = dis => {
  //  console.log(sport)
  const newFris=[...this.state.distance];
  newFris.push(dis);
  this.setState({
    distance:newFris
  })
}
componentWillMount(){
  if (navigator.geolocation&&this.props.user.username!='') {
    navigator.geolocation.getCurrentPosition((position) => {
      var pos = [
        Math.floor(position.coords.longitude*10000000)/10000000,
        Math.floor(position.coords.latitude*10000000)/10000000
      ];
      this.props.getStory({username:this.props.user.username,location:pos});
    });
}
}
componentDidUpdate(prevProps){
  let a = []
  if(this.props.story.location!==prevProps.story.location){
    for (var i in this.props.story) {
      for (var key in this.props.story[i].location) {
        // console.log(key,a[key])
        a.push(this.props.story[i].location[key])
        this.calculate(a[0],a[1]);
        
      }
    }
    }
    if(this.state.distance!== []){
      let j=0
      listData=[];
    for (var i in this.props.story) {
    listData.push({
      key:`${i}`,
      title: `${this.props.story[i].username}`,
      avatar: require(`../../assets/images/${this.props.story[i].header}`),
      description:
        '<'+this.state.distance[j]+'km',
      content:
        `${this.props.story[i].content}`,
    });
    console.log(this.props.story[i].header)
  }
  }
}
// componentDidUpdate(prevState){

// }

render(){
  console.log(this.props.story)
    return(
      <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: page => {
        console.log(page);
      },
      pageSize: 3,
    }}
    dataSource={listData}
    footer={
      <div>
        <b>WE SPORT</b>
      </div>
    }
    renderItem={item => (
      <List.Item
        key={item.key}
        actions={[
          <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]}
        extra={
          <img
            width={272}
            alt="logo"
            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
          />
        }
      >
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<a href={item.href}>{item.title}</a>}
          description={item.description}
        />
        {item.content}
      </List.Item>
    )}
  />
    )
    }
  }

  export default compose(connect( state => ({ user: state.user, story:state.story }), {getStory})) (CardList)
