import React , { Component }from 'react';
import 'antd/dist/antd.css';
import { List, Avatar, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import {getStory} from '../../redux/actions'
import { connect } from 'react-redux'
import compose from 'recompose/compose';

const listData = [];
for (let i = 1; i < 23; i++) {
  listData.push({
    href: 'https://ant.design',
    title: ` ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      '<10km',
    content:
      'This is a test of the content of each user`s content',
  });
}

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class CardList extends Component {
  constructor () {
    super()
  }
  componentDidMount(){

  }

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
        key={item.title}
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

  export default compose(connect( state => ({ user: state.user, story:state.story }), {})) (CardList)
