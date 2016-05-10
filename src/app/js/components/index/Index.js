import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import {Menu,Icon} from 'antd';

export default class  Index extends Component{
	constructor(props){
		super(props)
	}
	componentWillMount() {
	}
	redirectBookForm() {
		this.props.history.pushState(null, '/bookForm');
	}
	render(){
		return(
			<div className="index">
				<h1 className="title"><Icon type="book" />书籍管理</h1>
				<a onClick={this.redirectBookForm.bind(this)}>添加书籍</a>
			</div>
	  )
	}
}
