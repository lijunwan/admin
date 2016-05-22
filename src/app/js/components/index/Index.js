import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import {Menu,Icon,Modal,Radio, Row, Col} from 'antd';
import SimpleTable from '../common/SimpleTable';
import Search from '../common/Search';
const RadioGroup = Radio.Group;
export default class  Index extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchType: 'id',
			isShowDelModal: false,
			delBookId: '',
			filterKey: 'all',
			currentData: [],
			orgData: [],
		}
	}
	componentWillMount() {
	}
	redirectBookForm() {
		this.props.history.pushState(null, '/bookForm');
	}
	componentDidMount() {
		this.props.bookBoundAC.getBookList();
	}
	componentWillReceiveProps(nextProps) {
		const bookList = nextProps.book.toJS().bookList.data;
		if(bookList){
			const bookListData = JSON.stringify(bookList);
			localStorage.setItem('bookList', bookListData);
			this.setState({
				currentData: this.filterData(bookList, this.state.filterKey),
				orgData: bookList,
			})
		}
	}
	filterData(dataList, filterKey) {
		if(filterKey === 'all') {
			return dataList;
		} else {
			var list = [];
			dataList.map((obj)=>{
				if(obj.flag === filterKey) {
					list.push(obj);
				}
			});
			return list;
		}
	}
	modifyBookInfo(bookId) {
		this.props.history.pushState(null, '/bookForm?bookId='+bookId);
	}
	showBookInfo(bookId) {
		this.props.history.pushState(null, '/book/'+bookId);
	}
	createOperation(obj) {
		return (
			<div>
				<a onClick={this.modifyBookInfo.bind(this, obj['_id'])}>修改</a>|
				<a onClick={this.showDelModal.bind(this,obj['_id'])}>删除</a>|
				<a onClick={this.showBookInfo.bind(this,obj['_id'])}>查看</a>
			</div>
		)
	}
	showDelModal(value) {
		this.setState({
			delBookId: value,
			isShowDelModal: true,
		})
	}
	delBook() {
		this.props.bookBoundAC.delBook({bookId: this.state.delBookId});
		this.setState({
			isShowDelModal: false,
		})
	}
	handleCancel() {
		this.setState({
			isShowDelModal: false,
		})
	}
	onChangeRadio(evt) {
		const filterKey = evt.target.value;
		this.setState({
			filterKey: filterKey,
			currentData: this.filterData(this.state.orgData, filterKey),
		})
	}
	render(){
		if(!this.props.book.toJS().bookList.data) {
			return(
				<div>...</div>
			)
		}
		const config = {
			header:[
				{key: '_id', width: '0.2'},
				{key: 'bookName', width: '0.1'},
				{key: 'author', width: '0.1'},
				{key: 'price', width: '0.1'},
				{key: 'discount', width: '0.1'},
				{key: 'aprice', width: '0.1'},
				{key: 'stocks', width: '0.1'},
				{key: 'flag', width: '0.1'},
				{key: 'operation', width: '0.1', handleBlock: this.createOperation.bind(this)},
			],
			body: this.state.currentData,
			dict: 'bookInfo',
		}
		return(
			<div className="index">
				<h1 className="title"><Icon type="book" />书籍管理</h1>
				<Row style={{margin: '50px 0'}}>
					<Col span="10">
						<Search {...this.props}/>
					</Col>
					<Col span="2">
						<a onClick={this.redirectBookForm.bind(this)}>添加书籍</a>
					</Col>
					<Col span="10">
						<RadioGroup onChange={this.onChangeRadio.bind(this)} value={this.state.filterKey}>
							<Radio key="a" value="all">全部</Radio>
							<Radio key="b" value="new">新书上架</Radio>
							<Radio key="c" value="onsale">最新优惠</Radio>
							<Radio key="d" value="extend">推广商品</Radio>
					  	</RadioGroup>
					</Col>
				</Row>
				<SimpleTable config={config} />
				<Modal title="信息确认框" visible={this.state.isShowDelModal}
				  onOk={this.delBook.bind(this)} onCancel={this.handleCancel.bind(this)}>
				  <p>是否删除这条记录？</p>
				</Modal>
			</div>
	  )
	}
}
