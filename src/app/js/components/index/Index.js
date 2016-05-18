import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import {Menu,Icon,Modal} from 'antd';
import SimpleTable from '../common/SimpleTable';
import Search from '../common/Search';

export default class  Index extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchType: 'id',
			isShowDelModal: false,
			delBookId: '',
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
			localStorage.setItem('bookList', bookListData)
		}
	}
	modifyBookInfo(bookId) {
		this.props.history.pushState(null, '/bookForm?bookId='+bookId);
	}
	createOperation(obj) {
		return (
			<div>
				<a onClick={this.modifyBookInfo.bind(this, obj['_id'])}>修改</a>|
				<a onClick={this.showDelModal.bind(this,obj['_id'])}>删除</a>|
				<a>查看</a>
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
			body: this.props.book.toJS().bookList.data,
			dict: 'bookInfo',
		}
		return(
			<div className="index">
				<h1 className="title"><Icon type="book" />书籍管理</h1>
				<a onClick={this.redirectBookForm.bind(this)}>添加书籍</a>
				<div style={{margin: '50px 0'}}>
				<Search {...this.props}/>
				</div>
				<SimpleTable config={config} />
				<Modal title="信息确认框" visible={this.state.isShowDelModal}
				  onOk={this.delBook.bind(this)} onCancel={this.handleCancel.bind(this)}>
				  <p>是否删除这条记录？</p>
				</Modal>
			</div>
	  )
	}
}
