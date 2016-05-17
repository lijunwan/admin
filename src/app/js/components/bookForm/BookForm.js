import React, { Component, PropTypes } from 'react';
import { Breadcrumb,
         Row,
         Col,
         Icon,
         DatePicker,
         Select,
         Checkbox,
         Cascader,
         message,
         Radio,
         Modal} from 'antd';
const confirm = Modal.confirm;
import '../../../css/bookForm.css';
import Upload from '../common/Upload.js';
import __assign from 'lodash/assign';
import __keys from 'lodash/keys';
import __pick from 'lodash/pick';
const RadioGroup = Radio.Group;
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
         price: '',//定价
         discount: '10',//折扣
         aprice: '',//售价
         cover:'',//封面 保存 照片位置
         editions:'',//版次
         pages:'',
         words:'',
         type:'',//分类
         authorIntro:'',//作者简介
         stocks: '',//进货量,
         introduce:'',//简介，
         flag: 'none',
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
      },
      bookType:[],
      isEdit: false,
    }
  }
  componentWillMount() {
    if(this.props.location.query.bookId) {
        this.setState({
            isEdit: true,
        })
        let bookList = JSON.parse(localStorage.getItem('bookList'));
        console.log(bookList, '???');
        let bookInfo = {}
        bookList.map((obj)=>{
            if(obj['_id'] === this.props.location.query.bookId) {
                bookInfo = obj;
            }
        })
        var obj = __assign({}, this.state.formValue, bookInfo);
        var bookType = this.convertBookType(obj.type);
        var price = this.convertPrice(obj.price);
        var isDisable = true;
        if(obj.discount *1 !== 10) {
           isDisable = false;
        }
        this.setState({
            formValue: obj,
            bookType: bookType,
            priceParams: price,
            isDisable: isDisable,
        })
    }
  }
  convertPrice(value) {
    const obj = {};
    console.log(value, '????');
    obj.yuan = value.split('.')[0];
    obj.jiao = value.split('.')[1].substring(0,1);
    obj.fen = value.split('.')[1].substring(1,2);
    return obj;
  }
  convertBookType(value) {
    const list = [];
    list.push(value.substring(0,1));
    list.push(value.substring(0,2));
    list.push(value);
    return list;
  }
  textareaChange(evt) {
    let formValue = __assign({}, this.state.formValue);
    let value = evt.target.value.replace(/\n/, '#');
    formValue[evt.target.id] = value;
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
      if(event.target.value <10 && event.target.value > -1) {
        priceParams[event.target.id] = event.target.value;
        this.setState({
        priceParams: priceParams,
      });
      }
    } else {
      if(event.target.value > -1) {
          priceParams[event.target.id] = event.target.value;
          this.setState({
            priceParams: priceParams,
          });
      }
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
  changeDiscount(key, value) {
    let discount = __assign({}, this.state.discount);
    discount[key] = value;
    let formValue = __assign({}, this.state.formValue);
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
      formValue.discount = '9.9';
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
         <Cascader options={bookMenu} onChange={this.bookTypeChange.bind(this)} value={this.state.bookType}/>
      )
    }
  }
  bookTypeChange(value) {
    let formValue = __assign({}, this.state.formValue);
    formValue.type = value[2];
    this.setState({
      formValue: formValue,
      bookType: value,
    })
  }
  componentDidMount() {
    this.props.bookBoundAC.getBookType();
  }
  textChange(event) {
    let formValue = __assign({}, this.state.formValue);
    formValue[event.target.id] = event.target.value;
    this.setState({
      formValue: formValue,
    })
  }
  numberChange(event) {
      let formValue = __assign({}, this.state.formValue);
      if(event.target.value > -1) {
          formValue[event.target.id] = event.target.value;
          this.setState({
            formValue: formValue,
          })
      }
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
    let keyList = ['bookName', 'author', 'pubHouse', 'pubDate', 'price', 'discount', 'aprice', 'type', 'stocks'];
    let flag = true;
    keyList.map((key)=>{
        if(this.state.formValue[key]== '') {
            message.error('所有带*号的都为必填项');
            flag = false;
            return false;
        }
    })
    if(1) {
        // if(this.state.coverFileList.length !== 1){
        //     message.error('请上传1张封面');
        //     return false;
        // }
        // if(this.state.pictureList.length !== 4) {
        //     message.error('请上传4张图片');
        //     return false;
        // }
        this.props.bookBoundAC.addBook(this.state.formValue);
    }
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.book.toJS().bookInfo.data) {
        const bookInfo = nextProps.book.toJS().bookInfo.data
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        xhr.open("post", '/api/book/cover?bookId='+ bookInfo['_id'], true);
        formData.append('file',this.state.coverFileList[0][0]);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send(formData);

        var xhr1 = new XMLHttpRequest();
        var formData1 = new FormData();
        xhr1.open("post", '/api/book/picture?bookId='+ bookInfo['_id'], true);
        this.state.pictureList.map((file)=>{
            console.log(file)
            formData1.append('file',file[0]);
        })
        xhr1.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr1.send(formData1);
        message.success('添加成功！');
        this.resetFormvalue();
        this.props.bookBoundAC.clearBookInfo();
    }
  }
  resetFormvalue() {
    var keyList = __keys(this.state.formValue);
    var formValue = __assign(this.state.formValue)
    keyList.map((key)=>{
        if(key === 'discount') {
            formValue[key] = 10;
        }
        else {
            formValue[key] = '';
        }
    })
    var priceParams = {yuan:0, jiao:0, fen:0};
    var discount = {shi:9, ge:9};
    this.setState({
        formValue: formValue,
        priceParams: priceParams,
        discount: discount,
        coverFileList:[],
        pictureList: [],
        bookType:[],
    })
  }
  onChangeRadio(evt) {
      console.log(evt.target.value);
    let formValue = __assign({}, this.state.formValue);
    formValue.flag = evt.target.value;
    this.setState({
        formValue: formValue,
    })
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
            <Breadcrumb.Item>{this.state.isEdit ? '修改书籍信息' : '添加书籍'}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="form">
            <Row>
              <Col span="2">
                <div className="formKey reqKey">封面(１张)</div>
              </Col>
              <Col span="20">
                <Upload {...coverProps} count="1" fileList={this.state.coverFileList} changeState={this.changeCover.bind(this)}>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey reqKey">图片(4张)</div>
              </Col>
              <Col span="20">
                <Upload listType="picture-card" count="4" fileList={this.state.pictureList} changeState={this.changePicture.bind(this)}>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey reqKey">书名</div>
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
                <div className="formKey reqKey">书籍分类</div>
              </Col>
              <Col>
                {this.createBookClass()}
              </Col>
            </Row>
              <Col span="2">
                <div className="formKey reqKey">作者</div>
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
                <div className="formKey reqKey">定价</div>
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
                 <Select defaultValue="9" disabled={this.state.isDisable} id="shi" value={this.state.discount.shi} onChange={this.changeDiscount.bind(this,'shi')}>
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
                 <Select defaultValue="9" disabled={this.state.isDisable} id="ge" value={this.state.discount.ge} onChange={this.changeDiscount.bind(this, 'ge')}>
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
                <Checkbox onChange={this.checkBoxHandle.bind(this)} value={!this.state.isDisable}/>
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
                <Col span="2">书籍所属区域</Col>
                <RadioGroup onChange={this.onChangeRadio.bind(this)} value={this.state.formValue.flag}>
                <Radio key="a" value="none">无</Radio>
                <Radio key="b" value="new">新书上架</Radio>
                <Radio key="c" value="onsale">最新优惠</Radio>
                <Radio key="d" value="extend">推广商品</Radio>
              </RadioGroup>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey reqKey" >出版社</div>
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
                <div className="formKey reqKey">出版时间</div>
              </Col>
              <Col span="8">
                <DatePicker onChange={this.pubDateChange.bind(this)} value={this.state.formValue.pubDate}/>
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
                       onChange={this.numberChange.bind(this)}/>
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
                        onChange={this.numberChange.bind(this)}/>
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
                        onChange={this.numberChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey reqKey">库存</div>
              </Col>
              <Col span="4">
                <input type="number"
                       className="ant-input"
                       style={{width: '80px'}}
                       id="stocks"
                       value={this.state.formValue.stocks}
                       onChange={this.numberChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">作者简介</div>
              </Col>
              <Col span="8">
                <textarea className="ant-input"
                          id="authorIntro"
                          value={this.state.formValue.authorIntro.replace('#','\n')}
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
                          value={this.state.formValue.introduce.replace('#','\n')}
                          onChange={this.textareaChange.bind(this)}/>
              </Col>
            </Row>
            <Row>
              <Col span="12">
                <input　className="BookForm-button" type="button"　value="提交" onClick={this.saveBook.bind(this)}/>
                <input　className="BookForm-button" type="button"　value="返回首页"/>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
