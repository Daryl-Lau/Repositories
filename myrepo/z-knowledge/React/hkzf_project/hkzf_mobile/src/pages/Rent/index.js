import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import { getPublishedHouses } from '../../api'
import config from '../../config'

import NavHeader from '../../components/NavHeader'
import HouseItem from '../../components/HouseItem'
import NoData from '../../components/NoData'

import styles from './index.module.css'

export default class Rent extends Component {
  state = {
    // 出租房屋列表
    list: []
  }

  // 获取已发布房源的列表数据
  async getHouseList () {
    const res = await getPublishedHouses()

    const { status, body } = res.data
    if (status === 200) {
      this.setState({
        list: body
      })
    } else {
      const { history, location } = this.props
      history.replace('/login', {
        from: location.pathname
      })
    }
  }

  componentDidMount () {
    this.getHouseList()
  }

  renderHouseItem () {
    const { list } = this.state
    const { history } = this.props

    return list.map(item => {
      return (
        <HouseItem
          key={item.houseCode}
          onClick={() => history.push(`/detail/${item.houseCode}`)}
          src={config.baseURL + item.houseImg}
          title={item.title}
          desc={item.desc}
          tags={item.tags}
          price={item.price}
        />
      )
    })
  }

  renderRentList () {
    const { list } = this.state
    const hasHouses = list.length > 0

    if (!hasHouses) {
      return (
        <NoData>
          您还没有房源，
          <Link to="/rent/add" className={styles.link}>
            去发布房源
          </Link>
          吧~
        </NoData>
      )
    }

    return <div className={styles.houses}>{this.renderHouseItem()}</div>
  }

  render () {
    const { history } = this.props

    return (
      <div className={styles.root}>
        <NavHeader onLeftClick={() => history.go(-1)}>房屋管理</NavHeader>

        {this.renderRentList()}
      </div>
    )
  }
}