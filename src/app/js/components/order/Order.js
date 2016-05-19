import React, { Component, PropTypes } from 'react';
import SimpleTable from '../common/SimpleTable';
import {Icon, Row, Col, Select,Modal} from 'antd';
const Option = Select.Option;
import SimpleSearch from '../common/SimpleSearch';
import moment from 'moment';
export default class  Order extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchKey: '',
			filterKey: 'ALL',
			currentData: [],
			orgData:[],
			isShowSendModal: false,
			sendOrderId: '',
		}
	}
	componentDidMount() {
		this.props.orderBoundAC.getOrderList();
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			currentData: this.filterOrder(nextProps.order.toJS().orderList.data, this.state.filterKey),
			orgData: nextProps.order.toJS().orderList.data,
		})
	}
	showSendModal(orderId) {
		this.setState({
			isShowSendModal: true,
			sendOrderId: orderId,
		})
	}
	showOrderInfo(orderId) {
		this.props.history.pushState(null, '/orderDetail?orderId='+orderId);
	}
	createOperation(obj) {
		switch (obj.orderStatus) {
			case 'UNSEND':
				return (
				  <div>
				    <p><a onClick={this.showSendModal.bind(this, obj['_id'])}>发货</a></p>
					<p><a onClick={this.showOrderInfo.bind(this,obj['_id'])}>查看订单</a></p>
				  </div>
			  	)
			default:
				return (
				  <div>
					<p><a onClick={this.showOrderInfo.bind(this,obj['_id'])}>查看订单</a></p>
				  </div>
				)
		}
	}
	changeHandle(key) {
		this.setState({
			searchKey: key,
		})
	}
	searchHandle() {
		this.props.orderBoundAC.searchOrder({orderId: this.state.searchKey});
	}
	modifyTime(time) {
		return moment(time).format('YYYY-MM-DD hh:mm:ss')
	}
	changeFilterKey(key) {
		let currentData = [];
		currentData = this.filterOrder(this.state.orgData, key);
		this.setState({
			filterKey: key,
			currentData: currentData
		})
	}
	filterOrder(data, key) {
		let currentData = [];
		if(key=== 'ALL') {
			currentData = data;
		} else {
			data.map((obj)=>{
				if(obj.orderStatus == key) {
					currentData.push(obj);
				}
			})
		}
		return currentData;
	}
	sendOrderHandle() {
		this.props.orderBoundAC.sendOrde({orderId: this.state.sendOrderId});
		this.setState({
			isShowSendModal: false,
		})
	}
	cancelHandle() {
		this.setState({
			isShowSendModal: false,
		})
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
				{key: '_id', width: '0.1'},
				{key: 'time', width: '0.15', handle: this.modifyTime.bind(this)},
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
			body: this.state.currentData,
			dict: 'orderInfo',
		}
		return(
			<div style={{paddingBottom: '100px'}}>
				<h1 className="title"><Icon type="bars" />订单管理</h1>
				<div style={{margin: '50px 0'}}>
				<Row>
					<Col span="10">
						<SimpleSearch placeholder="请输入订单Id"
									  value={this.state.searchKey}
									  onChange={this.changeHandle.bind(this)}
									  onClick={this.searchHandle.bind(this)}/>
					</Col>
					<Col span="4" style={{marginTop: '3.5px'}}>
						<Select defaultValue="ALL" style={{ width: 120 }} onChange={this.changeFilterKey.bind(this)}>
						<Option value="ALL">全部状态</Option>
						<Option value="UNPAY">未支付</Option>
						<Option value="UNSEND">待发货</Option>
						<Option value="UNCONFIRM">未确认收货</Option>
						<Option value="UNEVALUATION">未评价</Option>
						<Option value="CLOSED">已关闭</Option>
						</Select>
					</Col>
				</Row>
				</div>
				<SimpleTable config={config} />
				<Modal title="信息提示框"
						visible = {this.state.isShowSendModal}
						onOk={this.sendOrderHandle.bind(this)}
						onCancel={this.cancelHandle.bind(this)}>
					<p>是否发货?</p>
				</Modal>
			</div>
	  )
	}
}
