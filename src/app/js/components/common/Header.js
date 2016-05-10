import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import {Menu,Icon} from 'antd';
import '../../../css/common/header.css';
import logoImg from '../../../images/logo.jpg';
export default class Header extends Component {
	constructor(props) {
    super(props);
  }
	logOut(){
		this.props.clientBoundAC.logOut();
	  //this.props.history.pushState(null,'/')
	}
	render() {
		//console.log(this.props.client.toJS(),"Header")
		let info = this.props.client.toJS().info;
		return(
			<div className="Header">
				<div className="Header-menu">
					<img src={logoImg} alt="" />
					<Menu mode="horizontal">
							<Menu.Item><Icon type="book" />书籍管理</Menu.Item>
							<Menu.Item><Icon type="user" />用户管理</Menu.Item>
							<Menu.Item><Icon type="bars" />订单管理</Menu.Item>
							<Menu.Item><Icon type="line-chart" />数据统计</Menu.Item>
					</Menu>
				</div>
			</div>
		)
	}
}
