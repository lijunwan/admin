import React, { Component, PropTypes } from 'react';
import '../../../css/common/search.css';
import {Row, Col} from 'antd';
export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchKey: '',
            searchType: 'id',
        }
    }
    onChangeHandel(event){
        this.setState({
            searchKey: event.target.value
        });
    }
    showSearchResult() {
        var obj = {
            searchType: this.state.searchType,
            searchKey: this.state.searchKey,
        }
        this.props.bookBoundAC.searchBook(obj);
    }
    componentWillReceiveProps(nextProps) {
    }
    changeSearchType(value) {
        this.setState({
            searchType: value,
        })
    }
    render() {
        var searchType ={
            'id': 'id',
            'other': '其他'
        }
        var placeStr = this.state.searchType === 'id' ? '请输入书籍id' : '请输入图书名或者作者名';
        return(
            <div className="Search">
                <ul className="Search-type">
                  <span>
                  <span className="Search-type-text">{searchType[this.state.searchType]}</span>
                  <i className="Search-triangel"></i></span>
                  <ul className="Search-type-menu">
                      <li><a onClick={this.changeSearchType.bind(this, 'id')}>id</a></li>
                      <li><a onClick={this.changeSearchType.bind(this, 'other')}>其他</a></li>
                  </ul>
                </ul>
                <input placeholder={placeStr} onChange = {this.onChangeHandel.bind(this)} value={this.state.searchKey}/>
                <a href="javascript:;" onClick={this.showSearchResult.bind(this)}><i className="fa fa-search"></i></a>
            </div>
        )
    }
}
