import React, { Component } from 'react';
import { Upload, Modal ,message} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteImg} from '../../api'
import {BASE_IMG_URL} from '../../config/constants'


function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
class PictureWall extends Component {
  constructor(props) {
    super(props);
    let fileList = [];
    const {imgs}  = this.props;
    if(imgs && imgs.length > 0){
      fileList = imgs.map((img,index)=>{
        return {
          uid: -index,
          name:img,
          status:'done',
          url: BASE_IMG_URL+img
        }
      })
    }
    this.state={
      previewVisible: false,
      previewImage: '',
      previewTitle: '',
      fileList,
    }
  }
  
  handleCancel = () => {
    this.setState({ previewVisible: false });
  }
//预览指定的图片大图
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };
  handleChange = async ({ file,fileList }) =>{
    //一旦上传成功，将当前上传的file信息修正（name, url）
    if(file.status === 'done'){
      const res = file.response;
      if(res.status === 0){
        message.success("上传图片成功")
        file = fileList[fileList.length - 1]
        const {name, url} = res.data;
        file.name =name;
        file.url = url;

      }else{
        message.error("上传图片失败")
      }
    }else if(file.status === "removed"){
      const res = await reqDeleteImg(file.name);
      if(res.status === 0){
        message.success("删除图片成功")
      }else{
        message.error("删除图片失败")
      }
    }
    this.setState({ fileList });
  }

  getFileNameList = ()=>{
    return this.state.fileList.map(item=>{
      return item.name;
    })
  }

  render() { 
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return ( 
      <div className="clearfix">
        <Upload
          action="/manage/img/upload"
          accept="image/*"
          name="image"/*请求参数名 */
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}
 
export default PictureWall;