import React, { Component, PropTypes} from 'react';
import {Icon} from 'antd';
import '../../../css/common/upload.css';
import __remove from 'lodash/remove';
import __assign from 'lodash/assign';
var uploadInput, upLoadForm;
export default class  Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      preImg: [],
      imgList: [],
    }
  }
  delImg(index) {
    let preFileList = this.props.fileList.slice(0);
    let fileList = __remove(preFileList, function(n,idx) {
      return idx !== index;
    });
    if(this.props.delFileList) {
        let delfileList = this.props.delFileList.slice(0);
        let delItem = this.props.fileList[index];
        console.log('delItem',delItem, fileList, this.props.fileList);
        if(typeof delItem === 'string') {
            delfileList.push(delItem);
            this.props.delFileHandel(delfileList);
        }
    }
    let imgList = __remove(this.state.imgList.slice(0), function(n,idx) {
      return idx !== index;
    });

    this.setState({
      imgList: imgList,
    })
    this.props.changeState(fileList);
  }
  componentWillReceiveProps(nextProps){
      if(nextProps.fileList.length===0){
        this.setState({
            imgList: [],
        })
      }
  }
  createImgList() {
    const list =[];
    this.state.imgList.map((imgSrc, index)=>{
        list.push(
            <div className="Upload-img-wrap" key={index}>
              <img className="Upload-list-item" src={imgSrc} />
              <div className="Upload-img-cover">
                <div className="Upload-img-modal">
                  <i className="anticon anticon-delete Upload-delete" onClick={this.delImg.bind(this, index)}></i>
                </div>
              </div>
            </div>
        )
    })
    return list;
  }
  componentDidMount() {
    const list = [];
    if(this.props.isEdit) {
        this.setState({
            imgList: this.props.fileList,
        })
    }
  }
  previewFile(e) {
    let fileList = this.props.fileList.slice(0);
    const file = e.target.files;
    fileList.push(e.target.files);
    const list = this.state.imgList.slice(0);
    let reader = new FileReader();
    if(file) {
      reader.readAsDataURL(file[0]);
    }
    const that = this;
    reader.addEventListener("load",()=>{
      list.push(reader.result);
      if(this.props.count) {
          let count = parseInt(this.props.count);
          this.props.changeState(fileList.slice(-count))
          that.setState({
              imgList: list.slice(-count),
          })
          if(this.props.delFileList) {
            let delfileList = this.props.delFileList.slice(0);
            if(fileList.length > count) {
                if(typeof fileList[0] === 'string') {
                    delfileList.push(fileList[0]);
                    this.props.delFileHandel(delfileList);
                }
            }
          }
      }
    }, false);
  }
  render() {
    return(
      <div>
        <div className="Upload-item">
         {this.createImgList()}
        </div>
        <div className="Upload-card">
          <Icon type="plus" />
          <p>上传照片</p>
          <input id={this.props.id} type="file"  onChange={this.previewFile.bind(this)}/>
        </div>
      </div>
    )
  }
}
