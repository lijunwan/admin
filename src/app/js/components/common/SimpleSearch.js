import React, { Component, PropTypes } from 'react';
import '../../../css/common/search.css';
import {Row, Col} from 'antd';
export default class Search extends Component {
    constructor(props) {
        super(props);
    }
    onChangeHandel(evt){
        this.props.onChange(evt.target.value);
    }
    render() {
        return(
            <div className="Search">
                <input style={{padding: '5px 10px'}} placeholder={this.props.placeholder}
                       onChange = {this.onChangeHandel.bind(this)}
                       value={this.props.searchKey}/>
                <a href="javascript:;" onClick={this.props.onClick}><i className="fa fa-search"></i></a>
            </div>
        )
    }
}
