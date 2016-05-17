import React, { Component, PropTypes } from 'react';
import logoImg from '../../../images/logo.jpg';
import '../../../css/index.css';
import {Menu,Icon} from 'antd';
import SimpleTable from '../common/SimpleTable';
import Search from '../common/Search';

export default class  Index extends Component{
	constructor(props){
		super(props);
		this.state = {
			searchType: 'id',
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
				<a>删除</a>|
				<a>查看</a>
			</div>
		)
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
			</div>
	  )
	}
}
