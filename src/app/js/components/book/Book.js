import React, { Component, PropTypes } from 'react';
import '../../../css/book/book.css';
import NumberBox from './NumberBox'
import ImgShow from './ImgShow';
import BookTab from './BookTab';
import BookDetail from './BookDetail'
import {Icon, Row, Col,message,Breadcrumb} from 'antd';
import logoImg from '../../../images/logo.jpg';
import Search from '../common/Search';
import moment from 'moment';
import config from '../../dict';
export default class  Book extends Component{
    constructor(props) {
      super(props);
      this.state = {
        showContent: 'bookDetai',
        count: 1,
        isFavorite: false,
        favoriteLen: 0,
      }
    }
    componentDidMount () {
        console.log(this.props, '====')
        if(this.props.params.bookId) {
            this.props.bookBoundAC.getBookInfo({bookId:this.props.params.bookId})
        }
    }
    modifyMoney (value) {
      return Math.round(value).toFixed(2);
    }
    addBookIntoCars() {
      var obj = {
          bookId: this.props.params.bookId,
          count: this.state.count,
      }
      this.props.clientBoundAC.addBookIntoCars(obj);
      message.success('您已成功添加到购物车，请前往购物车查看');
    }
   addNumber() {
    this.setState({
      count: this.state.count + 1,
    })
  }
  subNumber() {
    if(this.state.count>1) {
      this.setState({
        count: this.state.count - 1,
      })
    }
  }
  addFavorite() {
    var obj = {
      bookId : this.props.params.bookId,
    };
    if(!this.state.isFavorite) {
      this.props.favoriteBoundAC.addFavorite(obj);
      this.setState({
        isFavorite: true,
      })
    }
  }
  confirmPay() {
    const list = [];
    const data = this.props.book.toJS().bookDetail.data;
    const orderData = {}
    var obj = {
      bookInfo: data,
      shopCartInfo: {
        count: 1,
        bookId: data['_id']
      }
    }
    list.push(obj);
    orderData.bookInfo = list;
    orderData.sumMon = this.state.count * data.aprice;
    localStorage.setItem('confirmOrder', JSON.stringify(orderData))
    this.props.history.push({pathname: '/payment/'})
  }
  createStars(index) {
    const list = [];
		for(let i=0;i<5;i++) {
			if(i <= index){
				list.push(
					<i className="anticon anticon-star evaluation-star" style={{marginRight: '5px'}}></i>
				)
			} else{
				list.push(
					<i className="anticon anticon-star-o" style={{marginRight: '5px'}}></i>
				)
			}
		}
		return list;
  }
  createEvaluation() {
    const data = this.props.book.toJS().bookDetail.data;
    const list = [];
    if(data) {
      data.evaluation.map((evaItem)=>{
        list.push(
          <Row style={{borderBottom: '1px solid #ccc', paddingBottom: '10px'}}>
            <Col span="2">
              <img className="Book-evaHeadimg" src={evaItem.headImg}/>
              <p className="evaluation-userName">{evaItem.userName}</p>
            </Col>
            <Col span="22">
              <p>{this.createStars(evaItem.scores-1)}</p>
              <p style={{margin:'10px 0'}}>{evaItem.evaText}</p>
              <p style={{textAlign: 'right'}}>{moment(evaItem.date).format("YYYY-MM-DD hh:mm:ss")}</p>
            </Col>
          </Row>
        )
      })
    }
    if(list.length <1) {
        list.push(
            <p className="BookDetai-nocontent">暂无评价</p>
        )
    }
    return list;
  }
  editBookInfo() {
    this.props.history.pushState(null, '/bookForm?bookId='+ this.props.params.bookId)
  }
    render() {
        const bookInfo = this.props.book.toJS().bookDetail;
        const favoriteStarClass = this.state.isFavorite ? 'anticon anticon-star Book-start-active' : 'anticon anticon-star Book-start';
        const favoriteText = this.state.isFavorite ? '已收藏' : '收藏商品';
        if(bookInfo.data) {
            const money = this.modifyMoney(bookInfo.data.price);
            const picture = bookInfo.data.picture.slice(0);
            picture.unshift(bookInfo.data.cover);
            return(
                <div>
                    <div  style={{margin: '50px 0'}}>
                        <Breadcrumb>
                          <Breadcrumb.Item>书籍管理</Breadcrumb.Item>
                          <Breadcrumb.Item>查看详情</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                <div className="Book clearfix">
                    <div className="Book-infor">
                        <div className="Book-img">
                            <ImgShow data = {picture}/>
                        </div>
                        <div className="Book-basic-info clearfix">
                          <div className="Info-box">
                            <p className="Info-bookName">{bookInfo.data.bookName}</p>
                            <p className="Info-pub">
                                <span className= "Info-pub-item">作者：{bookInfo.data.author}</span>
                                <span className= "Info-pub-item">出版社：{bookInfo.data.pubHouse}</span>
                                <span className= "Info-pub-item">出版时间：{bookInfo.data.pubDate}</span>
                            </p>
                            <div className="price-info">
                              <p><span className="price-key letter02">定价</span> <span>￥{bookInfo.data.price}</span></p>
                              <p>
                                <span className="price-key letter02">折扣</span>
                                {bookInfo.data.discount*1 == 10 ? '无折扣': bookInfo.data.discount}
                              </p>
                              <p><span className="price-key letter02">售价</span><span>￥{bookInfo.data.aprice}</span></p>
                            </div>
                             <p className="Book-saleNum">库存量: {bookInfo.data.stocks}</p>
                            <Row>
                                <Col span="3">销量：{bookInfo.data.saleNumber}</Col>
                                <Col span="3">评分： {bookInfo.data.scores}</Col>
                                <Col span="3">收藏： {bookInfo.data.favorite.length}</Col>
                            </Row>
                            <p style={{margin: '10px 0'}}>所属分类：{bookInfo.data.typeText}</p>
                            <p style={{margin: '10px 0'}}>放置区域： {config.bookArea[bookInfo.data.flag]}</p>
                            <a className="Book-button shop-button" onClick={this.editBookInfo.bind(this)}>前往编辑</a>
                          </div>
                        </div>
                    </div>
                    <div className="clearfix" style={{marginTop : '20px'}}>
                      <div className="book-detai">
                        <h3  className="BookDetai-blockName">商品详情</h3>
                        <div className="detail-content clearfix">
                            <BookDetail {...this.props} data={bookInfo.data}/>
                        </div>
                        <h3  className="BookDetai-blockName" style={{marginTop: '20px'}}>商品评价</h3>
                        <div className="detail-content clearfix">
                          {this.createEvaluation()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )
        }
        if(bookInfo.errorCode) {
            return(<div className="Book-noreco">书籍已被删除</div>)
        }
        return (<div>...</div>)
    }
}
