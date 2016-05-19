import React, { Component, PropTypes } from 'react';
import SimpleTable from '../common/SimpleTable';
export default class  Order extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchKey: '',
		}
	}
	componentDidMount() {
		this.props.bookBoundAC.getOrderList();
	}
	render(){
		if(!this.props.order.toJS().orderList.data) {
			return(
				<div>...</div>
			)
		}
		const config = {
			header:[
				{key: '_id', width: '0.2'},
				{key: 'time', width: '0.1'},
				{key: 'bookId', width: '0.1'}
				{key: 'bookName', width: '0.1'},
				{key: 'aprice', width: '0.1'},
				{key: 'count', width: '0.1'},
				{key: 'sumMon', width: '0.1'},
				{key: 'userId', width: '0.1'},
				{key:'userName', width: '0.1'},
				{key: 'address', width: '0.1'},
				{key: 'orderStatus', width: '0.1'},
				{key: 'operation', width: '0.1', handleBlock: this.createOperation.bind(this)},
			],
			body: this.props.book.toJS().bookList.data,
			dict: 'orderInfo',
		}
		return(
			<div className="index">
				<h1 className="title"><Icon type="bars" />书籍管理</h1>
				<div style={{margin: '50px 0'}}>
				<Search {...this.props}/>
				</div>
				<SimpleTable config={config} />
			</div>
	  )
	}
}