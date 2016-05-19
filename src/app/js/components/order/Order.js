import React, { Component, PropTypes } from 'react';
import SimpleTable from '../common/SimpleTable';
import {Icon} from 'antd';
import SimpleSearch from '../common/SimpleSearch';
export default class  Order extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchKey: '',
		}
	}
	componentDidMount() {
		this.props.orderBoundAC.getOrderList();
	}
	createOperation() {

	}
	changeHandle(key) {
		this.setState({
			searchKey: key,
		})
	}
	searchHandle() {
		this.props.orderBoundAC.searchOrder({orderId: this.state.searchKey});
	}
	render(){
		console.log('??',this.props.order.toJS().orderList)
		if(!this.props.order.toJS().orderList.data) {
			return(
				<div>...</div>
			)
		}
		const config = {
			header:[
				{key: '_id', width: '0.15'},
				{key: 'time', width: '0.1'},
				{key: 'bookId', width: '0.1'},
				{key: 'bookName', width: '0.1'},
				{key: 'aprice', width: '0.05'},
				{key: 'count', width: '0.05'},
				{key: 'sumMon', width: '0.05'},
				{key: 'userId', width: '0.1'},
				{key: 'address', width: '0.1'},
				{key: 'orderStatus', width: '0.1'},
				{key: 'operation', width: '0.1', handleBlock: this.createOperation.bind(this)},
			],
			body: this.props.order.toJS().orderList.data,
			dict: 'orderInfo',
		}
		return(
			<div style={{paddingBottom: '100px'}}>
				<h1 className="title"><Icon type="bars" />订单管理</h1>
				<div style={{margin: '50px 0'}}>
				<SimpleSearch placeholder="请输入订单Id"
							  value={this.state.searchKey}
							  onChange={this.changeHandle.bind(this)}
							  onClick={this.searchHandle.bind(this)}/>
				</div>
				<SimpleTable config={config} />
			</div>
	  )
	}
}
