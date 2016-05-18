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
        if(typeof delItem[0] === 'string') {
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
  componentDidMount() {
    const list = [];
    if(this.props.isEdit) {
        this.props.fileList.map((value)=>{
            if(typeof(value)=== 'string') {
                list.push(
                    <div className="Upload-img-wrap" key={list.length}>
                      <img className="Upload-list-item" src={value} />
                      <div className="Upload-img-cover">
                        <div className="Upload-img-modal">
                          <i className="anticon anticon-delete Upload-delete" onClick={this.delImg.bind(this, list.length)}></i>
                        </div>
                      </div>
                    </div>
                )
            }
        })
        this.setState({
            imgList: list,
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
        list.push(
        <div className="Upload-img-wrap" key={list.length}>
          <img className="Upload-list-item" src={reader.result} />
          <div className="Upload-img-cover">
            <div className="Upload-img-modal">
              <i className="anticon anticon-delete Upload-delete" onClick={this.delImg.bind(this, list.length)}></i>
            </div>
          </div>
        </div>
      )
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
    // console.log(uploadInput.files)
    // var file = uploadInput.files[0];
    // var reader = new FileReader();
    // reader.addEventListener("load",()=>{
    //    this.props.onChange(reader.result);
    // }, false);
    // if(file) {
    //   reader.readAsDataURL(file);
    // console.log(upLoadForm.onClick);
    // upLoadForm.submit();
    // var xhr = new XMLHttpRequest();
    // var formData = new FormData();

    // xhr.open("post", '/api/user/authorization/headImages', true);
    // formData.append('file',file);
    // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    // xhr.send(formData);
    // }
  }
  render() {
    return(
      <div>
        <div className="Upload-item">
         {this.state.imgList}
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
