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
let subscribed=[]
let len=0;

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class StoryList extends Component {
  constructor (prop) {
    super(prop)
    this.state={
      distance:[],
      subscribed:[],
      listData:[]
  }
    
  }
calculate=(lat,longti)=>{
  navigator.geolocation.getCurrentPosition((position) => {
    var pos = [
      Math.floor(position.coords.longitude*10000000)/10000000,
      Math.floor(position.coords.latitude*10000000)/10000000
    ];
    let dis=distanceCal(lat,longti,pos[0],pos[1])
    console.log(dis)
    dis=parseInt(dis/5)*5+5;
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
  // newFris.reverse();
  this.setState({
    distance:newFris
  })
}
setList = lis => {
  //  console.log(sport)
  const newFris=[...lis];
    // newFris.reverse();
  this.setState({
    listData:newFris
  })
  listData=newFris
}
subscribe = (username, e) => {
  e.target.disabled = true;
  this.state.subscribed.push(username)
  subscribed.push(username);
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
        Math.floor(position.coords.longitude*1000000)/1000000,
        Math.floor(position.coords.latitude*1000000)/1000000
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
        a.push(this.props.story[i].location[key])
        if(a.length%2==0){
        this.calculate(a[0],a[1]);
        console.log(this.props.story[i].location)
        a.splice(0,2);
        }

      }
    }
    }
    if(len==Object.keys(this.props.story).length){  
      let j=0;
      console.log(this.props.story);
      console.log(this.state.distance);
      const newS=[];
      // newFris.reverse();
    for (var i in this.props.story) {
      newS.push({
        key: `${this.props.story[i].time}`,
        title: `${this.props.story[i].username}`,
        avatar: require(`../../assets/images/${this.props.story[i].header}`),
        description: '<' + this.state.distance[j] + 'km',
        content: `${this.props.story[i].content}`,
        img:this.props.story[i].Img[0]?this.props.story[i].Img:null
      });
      j+=1;
    }
    console.log(this.state.listData)

    this.setList(newS)

    // len+=1;
  }

  len+=1;
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
        actions={subs.subscribe.includes(item.title)||item.title===subs.username||item.title=="anonymous"||subscribed.includes(item.title) ?
          [
          // <IconText icon={PlusOutlined} text="subscribe" key="list-vertical-star-o" />,
          <Button disabled variant="contained" color="secondary" key='list-vertical-star-o' ><AddIcon className="fa fa-plus-circle"/>subscribe</Button>,
          <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
          <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
        ]
      :
      [
        // <IconText icon={PlusOutlined} text="subscribe" key="list-vertical-star-o" />,
        <StoryButton username={item.title}/>,
        // <Button disabled={this.state.subscribed.includes(item.title)} variant="contained" color="secondary" key='list-vertical-star-o' onClick={(e) => this.subscribe(item.title,e)}><AddIcon className="fa fa-plus-circle"/>subscribe</Button>,
        <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
        <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
      ]
      }

        
        extra={
          item.img? 
          item.img.map((one)=>{
            return <img key={one} width={150} src={`/api/upload/public/uploads/${one.backAddd}`}/> 
          })
          :
          <img hidden  width={150} alt="logo" src="sporty.png" />

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

  export default compose(connect( state => ({ user: state.user, story:state.story }), {getStory,sendSubscribe})) (StoryList)
