import React, { Component, PropTypes } from 'react';
import { Breadcrumb,Row,Col,Icon,DatePicker,Select,Checkbox,Cascader} from 'antd';
import '../../../css/bookForm.css';
import Upload from '../common/Upload.js';
import __assign from 'lodash/assign';
import moment from 'moment';
export default class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValue: {
         bookName:'',
         author:'',//作者
         pubHouse:'',//出版社
         pubDate:'',//出版时间
         comment:[],//评论 存放评论的id
         price: '',//定价
         discount: '',//折扣
         aprice: '',//售价
         cover:'',//封面 保存 照片位置
         picture:[],//书籍的图片
         editions:'',//版次
         pages:'',
         words:'',
         type:'',//分类
         authorIntro:[],//作者简介
         prestocks: '',//进货量,
         introduce:[],//简介，
      },
      isDisable: true,
      coverFileList: [],
      pictureList: [],
      priceParams:{
        yuan: 0,
        jiao: 0,
        fen: 0,
      },
      discount: {
        shi: 9,
        ge: 9,
      }
    }
  }
  textareaChange(evt) {
    let formValue = __assign({}, this.state.formValue);
    let value = evt.target.value.replace(/\n/, '#');
    formValue[evt.target.id] = value.split('#');
    this.setState({
        formValue: formValue,
    })
  }
  pubDateChange(value) {
    let formValue = __assign({}, this.state.formValue);
    formValue.pubDate = moment(value).format('YYYY-MM-DD');
    this.setState({
        formValue: formValue,
    })
   }
  changePrice(event) {
    let priceParams = __assign({}, this.state.priceParams);
    if(event.target.id == 'jiao' || event.target.id == 'fen') {
      if(event.target.value <10) {
        priceParams[event.target.id] = event.target.value;
        this.setState({
        priceParams: priceParams,
      });
      }
    } else {
      priceParams[event.target.id] = event.target.value;
      this.setState({
        priceParams: priceParams,
      });
    }
    if(this.state.isDisable) {
      let aprice = priceParams.yuan + '.' + priceParams.jiao + priceParams.fen;
      let formValue = __assign({}, this.state.formValue);
      formValue.aprice = aprice;
      formValue.price = aprice;
      this.setState({
        formValue: formValue,
      })
    } else {
      let price = priceParams.yuan + '.' + priceParams.jiao + priceParams.fen;
      let discount = this.state.discount.shi + '.' + this.state.discount.ge;
      let aprice = this.countAprice(price, discount);
       let formValue = __assign({}, this.state.formValue);
       formValue.price = price;
       formValue.aprice = aprice;
        this.setState({
          formValue: formValue,
        })
    }
  }
  countAprice(discount, price) {
    return (discount * 0.1* price).toFixed(2)
  }
  changeDiscount(event) {
    let discount = __assign({}, this.state.discount);
    discount[event.target.id] = event.target.value;
    let formValue = __assign({}, this,state.formValue);
    formValue.discount = discount.shi + '.' + discount.ge;
    formValue.aprice = this.countAprice(formValue.discount, formValue.price);
    this.setState({
      discount: discount,
      formValue: formValue
    })
  }
  handleChangeCover(info) {
    let fileList = info.fileList;
    fileList = fileList.slice(-2);
    fileList = fileList.map((file)=>{
      if(file.response) {
        file.url = file.response.url;
      }
      return file;
    })
  }
  checkBoxHandle(e) {
    let formValue = __assign({}, this.state.formValue);
    if(e.target.checked) {
        formValue.discount = '10';
        this.setState({
            isDisable: true,
            formValue: formValue,
        })
    } else {
      this.setState({
        isDisable: false,
      })
    }
    formValue.aprice = this.countAprice(formValue.discount, formValue.price)
    this.setState({
        formValue: formValue,
    })
  }
  createBookClass() {
    if(this.props.book.toJS().bookMenu.data) {
      let bookMenu = this.props.book.toJS().bookMenu.data;
       return(
         <Cascader options={bookMenu} onChange={this.bookTypeChange.bind(this)}/>
      )
    }
  }
  bookTypeChange(value) {
    let formValue = __assign({}, this.state.formValue);
    formValue.type = value[2];
    this.setState({
      formValue: formValue,
    })
  }
  componentDidMount() {
    this.props.bookeBoundAC.getBookType();
  }
  textChange(event) {
    let formValue = __assign({}, this.state.formValue);
    formValue[event.target.id] = event.target.value;
    this.setState({
      formValue: formValue,
    })
  }
  changeCover(fileList) {
    this.setState({
      coverFileList: fileList,
    })
  }
  changePicture(fileList) {
    this.setState({
      pictureList: fileList,
    })
  }
  saveBook() {
    console.log(this.state.formValue);
  }
  render() {
    const coverProps = {
      action: '/api/book/uploadCover',
      onChange: this.handleChangeCover,
      listType: "picture-card",
    }
    return(
      <div className="bookForm">
        <div className="breadcrumb">
          <Breadcrumb>
            <Breadcrumb.Item>书籍管理</Breadcrumb.Item>
            <Breadcrumb.Item>添加书籍</Breadcrumb.Item>
          </Breadcrumb>
          <div className="form">
            <Row>
              <Col span="2">
                <div className="formKey">封面(１张)</div>
              </Col>
              <Col span="20">
                <Upload {...coverProps} count="1" fileList={this.state.coverFileList} changeState={this.changeCover.bind(this)}>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">图片(4张)</div>
              </Col>
              <Col span="20">
                <Upload listType="picture-card" count="4" fileList={this.state.pictureList} changeState={this.changePicture.bind(this)}>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">书名</div>
              </Col>
              <Col span="8">
                <input className="ant-input"
                       type="text"
                       id="bookName"
                       value={this.state.formValue.bookName}
                       onChange={this.textChange.bind(this)}></input>
              </Col>
            </Row>
            <Row>
            <Row>
              <Col span="2">
                <div className="formKey">书籍分类</div>
              </Col>
              <Col>
                {this.createBookClass()}
              </Col>
            </Row>
              <Col span="2">
                <div className="formKey">作者</div>
              </Col>
              <Col span="8">
                  <input className="ant-input"
                         type="text"
                         id="author"
                         value={this.state.formValue.author}
                         onChange={this.textChange.bind(this)}></input>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">定价</div>
              </Col>
              <Col span="6">
                <input type="number"
                       className="ant-input"
                       style={{width: '80px'}}
                       id="yuan"
                       value={this.state.priceParams.yuan}
                       onChange={this.changePrice.bind(this)}/>
                元
                <input type="number"
                       className="ant-input"
                       style={{width: '50px'}}
                       min="0"
                       max="9"
                       id="jiao"
                       value={this.state.priceParams.jiao}
                       onChange={this.changePrice.bind(this)}/>
                角
                <input type="number"
                       className="ant-input"
                       style={{width: '50px'}}
                       min="0"
                       max="9"
                       id="fen"
                       value={this.state.priceParams.fen}
                       onChange={this.changePrice.bind(this)}/>
                分
              </Col>
              <Col span="2">
                <div className="formKey">折扣</div>
              </Col>
              <Col span="4">
                 <Select defaultValue="9" disabled={this.state.isDisable} id="shi" value={this.state.discount.shi} onChange={this.changeDiscount.bind(this)}>
                    <Option value="9">9</Option>
                    <Option value="8">8</Option>
                    <Option value="7">7</Option>
                    <Option value="6">6</Option>
                    <Option value="5">5</Option>
                    <Option value="4">4</Option>
                    <Option value="3">3</Option>
                    <Option value="2">2</Option>
                    <Option value="1">1</Option>
                </Select>
                <span style={{margin: '0 5px'}}>.</span>
                 <Select defaultValue="9" disabled={this.state.isDisable} id="ge" value={this.state.discount.ge} onChange={this.changeDiscount.bind(this)}>
                    <Option value="9">9</Option>
                    <Option value="8">8</Option>
                    <Option value="7">7</Option>
                    <Option value="6">6</Option>
                    <Option value="5">5</Option>
                    <Option value="4">4</Option>
                    <Option value="3">3</Option>
                    <Option value="2">2</Option>
                    <Option value="1">1</Option>
                </Select>
                折
              </Col>
              <Col span="2">
                <Checkbox onChange={this.checkBoxHandle.bind(this)} defaultChecked={1===1}/>
                <span style={{margin: '0 5px'}}>无折扣</span>
              </Col>
              <Col span="2">
                <div className="formKey">售价</div>
              </Col>
              <Col span="4">
                <span>{this.state.formValue.aprice}</span>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">出版社</div>
              </Col>
              <Col span="6">
                <input className="ant-input"
                       type="text"
                       id="pubHouse"
                       value={this.state.formValue.pubHouse}
                       onChange={this.textChange.bind(this)}></input>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">出版时间</div>
              </Col>
              <Col span="8">
                <DatePicker onChange={this.pubDateChange.bind(this)} />
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">版次</div>
              </Col>
              <Col span="2">
                <input type="number"
                       className="ant-input"
                       style={{width: '80px'}}
                       id="editions"
                       value={this.state.formValue.editions}
                       onChange={this.textChange.bind(this)}/>
              </Col>
              <Col span="2">
                <div className="formKey">页数</div>
              </Col>
              <Col span="2">
                 <input type="number"
                        className="ant-input"
                        style={{width: '80px'}}
                        id="pages"
                        value={this.state.formValue.pages}
                        onChange={this.textChange.bind(this)}/>
              </Col>
              <Col span="2">
                <div className="formKey">字数</div>
              </Col>
              <Col span="2">
                 <input type="number"
                        className="ant-input"
                        style={{width: '80px'}}
                        id="words"
                        value={this.state.formValue.words}
                        onChange={this.textChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">库存</div>
              </Col>
              <Col span="4">
                <input type="number"
                       className="ant-input"
                       style={{width: '80px'}}
                       id="prestocks"
                       value={this.state.prestocks}
                       onChange={this.textChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">作者简介</div>
              </Col>
              <Col span="8">
                <textarea className="ant-input"
                          id="authorIntro"
                          value={this.state.formValue.authorIntro.join('\n')}
                          onChange={this.textareaChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">书籍简介</div>
              </Col>
              <Col span="8">
                <textarea className="ant-input"
                          id="introduce"
                          value={this.state.formValue.introduce.join('\n')}
                          onChange={this.textareaChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <input　className="BookForm-button" type="button"　value="提交" onClick={this.saveBook.bind(this)}/>
                <input　className="BookForm-button" type="button"　value="取消"/>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
