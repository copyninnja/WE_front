import React , { Component }from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, PlusOutlined } from '@ant-design/icons';
import {getStory} from '../../redux/actions'
import { connect } from 'react-redux'
import compose from 'recompose/compose';
import { distanceCal } from '../../util';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import {sendSubscribe} from '../../redux/actions';
import StoryButton from '../StoryButton'
import Item from 'antd/lib/list/Item';
let listData = [];

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
      subscribed:[]

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
subscribe = (username, e) => {
  e.target.disabled = true;
  this.state.subscribed.push(username)
  const from = this.props.user.username
  const to = username
  if (username != "anonymose") {
    // this.props.sendMsg({ from, to, content })
    // this.setState({ content: '' })
    this.props.sendSubscribe({from:from, to:to})
  }
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
  // console.log(prevProps,this.props)
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
        key: `${i}`,
        title: `${this.props.story[i].username}`,
        avatar: require(`../../assets/images/${this.props.story[i].header}`),
        description: '<' + this.state.distance[j] + 'km',
        content: `${this.props.story[i].content}`,
        img:this.props.story[i].Img[j]?this.props.story[i].Img:null
      });

    }
  }
}


render(){
 const subs=this.props.user
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
        actions={subs.subscribe.includes(item.title)||item.title===subs.username ?
          [
          // <IconText icon={PlusOutlined} text="subscribe" key="list-vertical-star-o" />,
          <Button disabled variant="contained" color="secondary" key='list-vertical-star-o' ><AddIcon className="fa fa-plus-circle"/>subscribe</Button>,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]
      :
      [
        // <IconText icon={PlusOutlined} text="subscribe" key="list-vertical-star-o" />,
        <p id="first">{console.log(item.img)}</p>,
        <StoryButton username={item.title}/>,
        // <Button disabled={this.state.subscribed.includes(item.title)} variant="contained" color="secondary" key='list-vertical-star-o' onClick={(e) => this.subscribe(item.title,e)}><AddIcon className="fa fa-plus-circle"/>subscribe</Button>,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      ]
      }

        
        extra={
          item.img? 
          item.img.map((one)=>{
            return <img src={`/api/upload/public/uploads/${one.backAddd}`}/> 
          })
          :
          <img hidden  width={272}    alt="logo"  src=""          />

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

  export default compose(connect( state => ({ user: state.user, story:state.story }), {getStory,sendSubscribe})) (CardList)
