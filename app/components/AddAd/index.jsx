import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';


import CarTabBar from '../CarTabBar';
import Header from '../Header'
// import { Upload, Icon } from 'antd';
import {Button,Toast} from 'antd-mobile';
import axios from 'axios'
import qs from 'qs'
let dataReq = require('../script/req');

require('./index.css');

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    console.log(file)
    var isJPG=false;
    if(file.type === 'image/jpeg'||file.type === 'image/png'){
        isJPG=true;
    }
    const isLt2M = file.size / 1024 < 500;
    if (!isLt2M) {
        Toast.fail('文件小于500k!');
    }
    return isJPG && isLt2M;
}

class AddAd extends React.Component {
  constructor() {
  	super() ;
      this.state = {
          loading: false,
          adUrl:"",
          imageUrl:""
      }
  }
    componentDidMount(){
        this.getImgUrl()
    }
    getImgUrl(){
        var that = this;
        axios({
            method: 'get',
            url: dataReq.globalUrl + "business/ad-get",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: {
                token: dataReq.token,
            }

        }).then(function (response) {
            console.log(response)
            if(response.data.err==0&&response.data.data){
                that.setState({
                    adUrl:response.data.data.path,
                    imageUrl:response.data.data.path
                })
            }

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    handleChange(info){
        console.log(info)
        const that = this
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {

            that.setState({
                adUrl:info.file.response.data.url
            })
            console.log(that.state.adUrl)
// Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => that.setState({
                imageUrl,
                loading: false,
            }));
        }
    }
    submitFun(){
        console.log(this.state.adUrl)
        var adUrl=this.state.adUrl;
        if(adUrl==""){
            Toast.fail('必须上传图片 !!!', 1);
        }else{
            axios({
                method: 'post',
                url: dataReq.globalUrl + 'business/ad-add',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: qs.stringify({
                    token: dataReq.token,
                    path:adUrl
                })
            }).then(function (res) {
                if(res.data.err==0){
                    Toast.success('广告上传成功 !!!', 1);
                }

            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    render() {
        const uploadButton = (
            <div style={{textAlign:"center"}}>
                <Button style={{width:"300px",margin:"60px auto 0"}}>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} /> 选择图片
                </Button>
            </div>

        );
        const imageUrl = this.state.imageUrl;
        const imgNormal=(
            <div className="imgbox">
            </div>
        )
        return (
        <div className="wrapperGrey">
            <Header place='北京' title='广告管理' codeShow={true}/>
            <div className="addadWrap">
                <p className="title ">上传图片要求</p>
                <p className="tip">图片尺寸为：750px*200px，文件小于500K，格式为jpg、png。</p>
                <div className="photo" >
                    <Upload
                        name="avatar"
                        listType="picture"
                        className="avatar-uploader"
                        showUploadList={false}
                        action={dataReq.globalUrl+"tools/upload-business-ad"}
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange.bind(this)}
                    >
                        {imageUrl ? <img className="imgbox" src={imageUrl} alt="avatar" /> : imgNormal}
                        {uploadButton}
                    </Upload>
                </div>
                <div style={{textAlign:"center"}}>
                    <Button type="primary" className="submit" onClick={this.submitFun.bind(this)}>提交</Button>
                </div>
            </div>
            <CarTabBar chosen=""/>

        </div>
    )
  }
}



const AddAdWrapper = createForm()(AddAd);
ReactDOM.render(<AddAdWrapper />, document.querySelector('#divId'));
