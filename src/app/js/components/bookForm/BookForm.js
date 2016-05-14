import React, { Component, PropTypes } from 'react';
import { Breadcrumb,Row,Col,Icon} from 'antd';
import '../../../css/bookForm.css';
import Upload from '../common/Upload.js'
export default class BookForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coverFileList:[{
        uid:-1,
        name: 'cover.png',
        status: 'done',
      }],
    }
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
                <div className="formKey">封面</div>
              </Col>
              <Col span="10">
                <Upload {...coverProps} count="1">
                  <Icon type="plus" />
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">图片</div>
              </Col>
              <Col span="10">
                <Upload listType="picture-card" count="4">
                  <Icon type="plus" />
                  <div className="ant-upload-text">上传照片</div>
                </Upload>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">书名</div>
              </Col>
              <Col span="8">
                <input className="ant-input" type="text"></input>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">作者</div>
              </Col>
              <Col span="8">
                  <input className="ant-input" type="text"></input>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">定价</div>
              </Col>
              <Col span="4">

              </Col>
              <Col span="2">
                <div className="formKey">折扣</div>
              </Col>
              <Col span="4">

              </Col>
              <Col span="2">
                <div className="formKey">售价</div>
              </Col>
              <Col span="4">

              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">出版社</div>
              </Col>
              <Col span="6">
                <input className="ant-input" type="text"></input>
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">出版时间</div>
              </Col>
              <Col span="8">

              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">版次</div>
              </Col>
              <Col span="6">

              </Col>
              <Col span="2">
                <div className="formKey">页数</div>
              </Col>
              <Col span="6">

              </Col>
              <Col span="2">
                <div className="formKey">字数</div>
              </Col>
              <Col span="6">

              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">库存</div>
              </Col>
              <Col span="6">

              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">作者简介</div>
              </Col>
              <Col span="8">
                <textarea className="ant-input" />
              </Col>
            </Row>
            <Row>
              <Col span="2">
                <div className="formKey">书籍简介</div>
              </Col>
              <Col span="8">
                <textarea className="ant-input" />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}
