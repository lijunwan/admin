import React, { Component, PropTypes } from 'react';
import config from '../../dict';
import __keys from 'lodash/keys';
import {Select, Row, Col, Pagination,Modal} from 'antd';
export default class SimpleTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curentData: [],
            curentPage: 1,
            size: 10,
            actData: [],
        }
    }
    getCurentData(data, curentPage, pageSize) {
        const start = (curentPage-1) * pageSize;
        const end = start + pageSize;
        return data.slice(start, end);
    }
    componentWillMount() {
        this.setState({
            curentData: this.getCurentData(this.props.config.body, 1, this.state.size),
            actData: this.props.config.body,
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            curentData: this.getCurentData(nextProps.config.body, 1, this.state.size),
            actData: nextProps.config.body,
        })
    }
    createHead() {
        const list = [];
        this.props.config.header.map((obj, idx)=>{
        const width = obj.width *100 + '%';
            list.push(
                <td style={{width: width}} key={idx}>
                    {config[this.props.config.dict][obj.key]}
                </td>
            )
        });
        return list;
    }
    createBody() {
        const rows  = [];
        this.state.curentData.map((row, idx)=>{
            const cols = [];
            this.props.config.header.map((col, index)=>{
                if(col.handleBlock) {
                    cols.push(
                        <td key={index}>{col.handleBlock(row)}</td>
                    )
                } else {
                    cols.push(
                        <td key={index}>{row[col.key]}</td>
                    )
                }
            })
            rows.push(<tr key={idx}>{cols}</tr>)
        })
        return rows;
    }
    changePage(value) {
        console.log(value);
        this.setState({
            curentPage: value,
            curentData: this.getCurentData(this.state.actData, value, this.state.size),
        });
    }
    render() {
        return(
            <div style={{width: '100%'}}>
                <table className="ant-table" style={{width: '100%'}}>
                    <thead>
                        <tr>
                          {this.createHead()}
                        </tr>
                    </thead>
                    <tbody>
                        {this.createBody()}
                    </tbody>
                </table>
                <Pagination total = {this.state.actData.length} current={this.state.curentPage} pageSize = {this.state.size}  onChange = {this.changePage.bind(this)}/>
            </div>
        )
    }
}
