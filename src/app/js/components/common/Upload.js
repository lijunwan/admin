import React, { Component, PropTypes} from 'react';
import {Icon} from 'antd';
import '../../../css/common/upload.css';
import __remove from 'lodash/remove';
var uploadInput, upLoadForm;
export default class  Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fileList:[],
      preImg: [],
      imgList: [],
    }
  }
  delImg(index) {
    let fileList = this.state.fileList.slice(0);
    let imgList = __remove(this.state.imgList, function(n,idx) {
       console.log(index ,idx,'index')
      return idx !== index;
    });
    console.log(imgList, '---')
    this.setState({
      imgList: imgList,
    })

  }
  previewFile(e) {
    let fileList = this.state.fileList.slice(0);
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
          that.setState({
          imgList: list.slice(-count),
          fileList: fileList.slice(-count),
        })
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
    console.log(this.state.imgList, '???--');
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
