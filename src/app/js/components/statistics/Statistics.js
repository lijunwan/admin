import React, { Component, PropTypes } from 'react';
import SimpleTable from '../common/SimpleTable';
import { Radio, Row, Col, Icon} from 'antd';
import echarts from 'echarts';
const RadioGroup = Radio.Group;
import { DatePicker } from 'antd';
import moment from 'moment';
const RangePicker = DatePicker.RangePicker;
let statisChart;
export default class  Statistics extends Component{
    constructor(props) {
        super(props);
        this.state = {
            sortKey: 'default',
            currentData: [],
            orgData: [],
            timeRange:[],
        }
    }
    componentWillReceiveProps(nextProps) {
        const bookList = nextProps.book.toJS().bookList.data;
        if(bookList) {
            this.setState({
                currentData: bookList,
                orgData: bookList,
            })
        }
        const statData = nextProps.order.toJS().orderStatistics.data;
        if(statData) {
            this.createStatistics(statData);
        }
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
        console.log(document.getElementById('saleNumber'), '-----')
        if(document.getElementById('saleNumber')) {
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
        }
        if(document.getElementById('scores')) {
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
        }
        if(document.getElementById('favorite')) {
            const favoriteList = this.sortItem(this.state.orgData, 'favorite').slice(0,10);
            const favoriteObj = this.getKeyData(favoriteList, 'bookName', 'favorite');
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
    }
    changeDate(value, dateString) {
        var obj = [];
        obj.push(moment(value[0]).format('YYYY-MM-DD'));
        obj.push(moment(value[1]).format('YYYY-MM-DD'));
        this.setState({
            timeRange: obj,
        });
    }
    searchRecords() {
        if(this.state.timeRange[0] && this.state.timeRange[1]) {
            this.props.orderBoundAC.getOrderStatistics({startTime: this.state.timeRange[0], endTime: this.state.timeRange[1]})
        }
    }
    searchNowSta() {
        var date = moment().format('YYYY-MM-DD');
        this.props.orderBoundAC.getOrderStatistics({startTime: date, endTime: date})
    }
    componentDidMount() {
        var date = moment().format('YYYY-MM-DD');
        this.props.bookBoundAC.getBookList();
        this.props.orderBoundAC.getOrderStatistics({startTime: date, endTime: date})
        statisChart = document.getElementById('statistics');
        console.log(document.getElementById('title'), '图表层-----')
    }
    modifySumMon(value) {
        return value.toFixed(2);
    }
    createStatistics(data) {
        const statistics = data.slice(0,20);
        const stataCount = this.getKeyData(statistics, 'bookName', 'count');
        const stataSumMon = this.getKeyData(statistics, 'bookName', 'sumMon');
        if(statisChart) {
            var saleChart = echarts.init(statisChart);
            // 绘制图表
            saleChart.setOption({
                title : {
                    text: '图书销售量与销售额',
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:['销售量','销售额']
                },
                calculable : true,
                xAxis : [
                    {
                        type : 'category',
                        data : stataCount.nameList
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:'销售量',
                        type:'bar',
                        data: stataCount.numList,
                    },
                    {
                        name:'销售额',
                        type:'bar',
                        data:stataSumMon.numList,
                    }
                ]
            });
        }
    }
    countSum(data) {
        let sum = 0 ;
        data.map((obj)=>{
            sum += obj.sumMon;
        });
        console.log('销售额',sum.toFixed(2))
        return sum.toFixed(2);
    }
    render() {
        const bookList = this.props.book.toJS().bookList.data;
        const orderStatistics = this.props.order.toJS().orderStatistics.data;
        console.log(this.props.order.toJS().orderStatistics,'???---')
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
        const staticConfig = {
            header:[
                {key: '_id', width: '0.2'},
                {key: 'bookName', width: '0.1'},
                {key: 'count', width: '0.1'},
                {key: 'sumMon', width: '0.1',handle: this.modifySumMon.bind(this)},
            ],
            body: this.props.order.toJS().orderStatistics.data,
            dict: 'orderStatic',
        }
        return (
            <div>
                    <h2 style={{margin: '10px 0'}}><Icon type="line-chart" />数据统计</h2>
                    <h3 id="title" style={{margin: '50px 0 20px'}}>销售量统计</h3>
                    {!orderStatistics ? <div>...</div> :
                        <div>
                            <p>
                                <a style={{margin: '0 10px 0 0'}} onClick={this.searchNowSta.bind(this)}>今日销售统计</a>
                                <RangePicker style={{ width: 184 }} onChange={this.changeDate.bind(this)} value={this.state.timeRange}/>
                                <a　onClick={this.searchRecords.bind(this)}>查询</a>
                                <span style={{margin: '0 10px'}}>总计:
                                    <span style={{fontSize: '18px',fontWeight: 'bold', color: '#027BC2'}}>￥{this.countSum(orderStatistics)}</span>
                                </span>
                            </p>　
                            <div style={{margin: '20px 0'}}>
                                <SimpleTable config={staticConfig} />
                            </div>
                        </div>
                    }
                    <div id="statistics" style={{height: '300px', width: '600px'}}></div>
                    <h3 style={{margin: '50px 0 20px'}}>书籍参数统计</h3>
                    {!bookList ? <div>...</div> :
                        <div>
                            <RadioGroup onChange={this.changeSortKey.bind(this)} value={this.state.sortKey}>
                                <Radio key="a" value="default">默认</Radio>
                                <Radio key="b" value="saleNumber">销量</Radio>
                                <Radio key="c" value="scores">评分</Radio>
                                <Radio key="d" value="favorite">收藏量</Radio>
                            </RadioGroup>
                            <div style={{margin: '20px 0'}}>
                                <SimpleTable config={config} />
                            </div>
                                {this.createCharts()}
                        </div>
                    }

                <Row>
                    <Col span="12">
                        <div id="saleNumber" style={{height: '300px', width: '300px'}}></div>
                    </Col>
                    <Col span="12">
                        <div id="scores" style={{height: '300px', width: '300px'}}></div>
                    </Col>
                    <Col span="12">
                        <div id="favorite" style={{height: '300px', width: '300px'}}></div>
                    </Col>
                </Row>
            </div>
        )
    }
}
