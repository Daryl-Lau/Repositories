import React from 'react'
import { Route } from 'react-router-dom'

import { TabBar } from 'antd-mobile';
// import './index.scss'
import styles from './index.module.css'

import Index from '../Index'
// import News from '../News'
// import HouseList from '../HouseList'
// import Profile from '../Profile'

// 代码分割
const News = React.lazy(() => import('../News'))
const HouseList = React.lazy(() => import('../HouseList'))
const Profile = React.lazy(() => import('../Profile'))

const tabItems = [
  {
    title: '首页',
    icon: 'icon-ind',
    path: '/home'
  },
  {
    title: '找房',
    icon: 'icon-findHouse',
    path: '/home/houselist'
  },
  {
    title: '资讯',
    icon: 'icon-infom',
    path: '/home/news'
  },
  {
    title: '我的',
    icon: 'icon-my',
    path: '/home/profile'
  }
]

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: this.props.location.pathname,
    };
  }

  componentDidUpdate (prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        selectedTab: this.props.location.pathname
      });
    }
  }

  renderTabItem = () => {
    return tabItems.map(item => (<TabBar.Item
      title={item.title}
      key={item.path}
      icon={<i className={`iconfont ${item.icon}`}></i>}
      selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
      selected={this.state.selectedTab === item.path}
      onPress={() => {
        this.setState({
          selectedTab: item.path,
        });
        this.props.history.push(item.path)
      }}
    >
    </TabBar.Item>))
  }

  render () {
    return (
      <div className={styles.home}>
        <Route path={'/home'} exact component={Index}></Route>
        <Route path={'/home/news'} component={News}></Route>
        <Route path={'/home/houselist'} component={HouseList}></Route>
        <Route path={'/home/profile'} component={Profile}></Route>
        <TabBar
          tintColor="#21b97a"
          barTintColor="white"
          noRenderContent={true}
        >
          {this.renderTabItem()}
        </TabBar>
      </div>
    );
  }
}

