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
	}
	render() {
		//console.log(this.props.client.toJS(),"Header")
		let info = this.props.client.toJS().info;
		return(
			<div className="Header">
				<div className="Header-menu">
					<Link to ="/index"><img src={logoImg} alt="" /></Link>
					<Menu mode="horizontal" style={{float:'left'}}>
							<Menu.Item><Link to="/index"><Icon type="book" />书籍管理</Link></Menu.Item>
							<Menu.Item><Link to="/user"><Icon type="user" />用户信息</Link></Menu.Item>
							<Menu.Item><Link to="/order"><Icon type="bars" />订单管理</Link></Menu.Item>
							<Menu.Item><Link to="/statistics"><Icon type="line-chart" />数据统计</Link></Menu.Item>
					</Menu>
					<div className="Header-user">
						<a onClick={this.logOut.bind(this)}>退出</a>
					</div>
				</div>
			</div>
		)
	}
}
