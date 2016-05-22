import React, { Component, PropTypes } from 'react';
import SimpleTable from '../common/SimpleTable';
import { Radio, Row, Col, Icon} from 'antd';
import echarts from 'echarts';
const RadioGroup = Radio.Group;
let saleChart;
export default class  Statistics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'default',
            currentData: [],
            orgData: [],
        }
    }
    componentDidMount() {
        this.props.bookBoundAC.getBookList();
    }
    componentWillReceiveProps(nextProps) {
        const bookList = nextProps.book.toJS().bookList.data;
        if(bookList) {
            this.setState({
                currentData: bookList,
                orgData: bookList,
            })
        }
        this.createCharts()

    }
    getKeyData(dataList,keyName,keyNum) {
        var obj = {};
        const nameList = [];
        const numList = [];
        if(keyNum=== 'favorite') {
            dataList.map((obj)=>{
                nameList.push(obj[keyName]);
                numList.push(obj[keyNum].length);
            })
        } else {
            dataList.map((obj)=>{
                nameList.push(obj[keyName]);
                numList.push(obj[keyNum]);
            })
        }
        obj.nameList = nameList;
        obj.numList = numList;
        return obj;
    }
    countFavorite(value) {
        return value.length;
    }
    sortItem(list, key) {
        let result = [];
       if(key=="favorite") {
           result = list.sort(function(a, b){
               console.log(a[key],b[key], '???')
               return  b[key].length - a[key].length;
           });
       } else {
            result = list.sort(function(a, b){
               console.log(a[key],b[key], '???')
               return  b[key] - a[key];
           });
       }
      console.log('list', result);
      return list;
    }
    changeSortKey(evt) {
        if(evt.target.value=='default') {
            this.setState({
                currentData: this.state.orgData,
            })
        } else {
            this.setState({
                currentData: this.sortItem(this.state.orgData, evt.target.value),
            })
        }
        this.setState({
            sortKey: evt.target.value,
        })
    }
    createCharts() {
        const saleList = this.sortItem(this.state.orgData, 'saleNumber').slice(0,10);
        const saleObj = this.getKeyData(saleList, 'bookName', 'saleNumber');
        var saleChart = echarts.init(document.getElementById('saleNumber'));
        // 绘制图表
        saleChart.setOption({
            title: { text: '销量统计' },
            tooltip: {},
            xAxis: {
                data: saleObj.nameList
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: saleObj.numList
            }]
        });
        const scoresList = this.sortItem(this.state.orgData, 'scores').slice(0,10);
        const scoresObj = this.getKeyData(scoresList, 'bookName', 'scores');
        console.log(scoresObj, '???/')
        var scoresChart = echarts.init(document.getElementById('scores'));
        scoresChart.setOption({
            title: { text: '评分统计' },
            tooltip: {},
            xAxis: {
                data: scoresObj.nameList
            },
            yAxis: {},
            series: [{
                name: '评分',
                type: 'bar',
                data: scoresObj.numList
            }]
        });
        const favoriteList = this.sortItem(this.state.orgData, 'favorite').slice(0,10);
        const favoriteObj = this.getKeyData(scoresList, 'bookName', 'favorite');
        console.log(scoresObj, '???/')
        var favoriteChart = echarts.init(document.getElementById('favorite'));
        favoriteChart.setOption({
            title: { text: '收藏量统计' },
            tooltip: {},
            xAxis: {
                data: favoriteObj.nameList
            },
            yAxis: {},
            series: [{
                name: '收藏量',
                type: 'bar',
                data: favoriteObj.numList
            }]
        });
    }
    render() {
        const bookList = this.props.book.toJS().bookList.data;
        if(!bookList) {
            return(<div>
                    ...
                    <div id="saleNumber"></div>
                    <div id="scores"></div>
                    <div id="favorite"></div>
                </div>)
        }
        const config = {
			header:[
				{key: '_id', width: '0.2'},
				{key: 'bookName', width: '0.1'},
				{key: 'saleNumber', width: '0.1'},
				{key: 'scores', width: '0.1'},
				{key: 'favorite', width: '0.1', handle: this.countFavorite.bind(this)},
			],
			body: this.state.currentData,
			dict: 'bookStatic',
		}
        return (
            <div>
                <h1 className="title"><Icon type="line-chart" />数据统计</h1>
                <RadioGroup onChange={this.changeSortKey.bind(this)} value={this.state.sortKey}>
                    <Radio key="a" value="default">默认</Radio>
                    <Radio key="b" value="saleNumber">销量</Radio>
                    <Radio key="c" value="scores">评分</Radio>
                    <Radio key="d" value="favorite">收藏量</Radio>
                </RadioGroup>
                <div style={{margin: '20px 0'}}>
                    <SimpleTable config={config} />
                </div>
                <Row>
                    <Col span="12">
                        <div id="saleNumber" style={{height: '300px', width: '300px'}}></div>
                    </Col>
                    <Col span="12">
                        <div id="scores" style={{height: '300px', width: '300px'}}></div>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <div id="favorite" style={{height: '300px', width: '300px'}}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
