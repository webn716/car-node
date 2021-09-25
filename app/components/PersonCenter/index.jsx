import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import qs from 'qs'

import {WhiteSpace,Toast,Modal} from 'antd-mobile';
import CarTabBar from '../CarTabBar'; 
import Header from '../Header'
// import { Upload, Icon } from 'antd';
import Upload from 'antd/lib/Upload'
import Icon from 'antd/lib/Icon'
const alert = Modal.alert;

require('./index.css');

let dataReq = require('../script/req');
console.log(dataReq.token)

function getBase64(img, callback) {
    console.log(2131231231)
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


class BasicInputExample extends React.Component {
    constructor() {
        super();
        this.state = {
            resultMap :[],
            userObj:{
                emailNum :'0'
            },
            loading: false,
        }
    }
    handleChange(info){
        console.log(info)
        
        const that = this
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
        console.log('info.file.status === done')
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => that.setState({
            imageUrl,
            loading: false,
        },()=>{
            console.log(123123123131)
            // console.log(that.state.imageUrl)
            // axios({
            //     method: 'post',
            //     url: "/api/tools/upload-headimg",
            //     headers: {
            //       'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     data: qs.stringify({
            //       data:that.state.imageUrl//base64 头像
            //     })
            //   }).then(function (response) {
            //     if(response){
            //        console.log(response)
            //     }
                
            //   })
            //   .catch(function (error) {
                
            //     console.log(error);
            //   });
        }));
        }
    }

    componentDidMount() {
        this.menuList();
    }
    menuList(){
        var that = this;
        axios({
            method: 'GET',
            url: dataReq.globalUrl + 'user/menu',
            params: {
                token: dataReq.token

            }
        }).then(function (res) {
                if (res) {
                    that.setState({
                        resultMap:res.data.data.menu_list,
                        userObj:{
                            emailNum :res.data.data.unread_num,
                            phone:res.data.data.phone
                        },
                        imageUrl:res.data.data.headimg,

                    });
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    goOut(){
        alert('提示', '真的要退出吗???', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确定',
                onPress: () =>
                    new Promise((resolve) => {
                        window.localStorage.setItem("token","");
                        window.location.href = '/login.html'
                    }),
            },
        ])
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const imageUrl = this.state.imageUrl;
        return (
            <div className="wrapperGrey">
                <Header place='北京' title='个人中心' codeShow={true}/>
                <div className="photo-area">
                    <div className="photo" >
                        <Upload
                            // name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={dataReq.globalUrl+"tools/upload-headimg"}
                            name = "data"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange.bind(this)}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                    </div>
                    <div className="personal-info">
                        <span className="line-2">{this.state.userObj.phone}</span>
                    </div>
                    <div className="email-num  icon-mail"
                         onClick={(e) => {window.location.href = '/messageList.html'; }}>
                        <span className="number">{this.state.userObj.emailNum}</span>
                    </div>
                </div>
                {/* <div onClick={(e) => {window.location.href = '/carmanage.html'; }}>
                    车辆管理
                </div>
                <div onClick={(e) => {window.location.href = '/collectionList.html'; }}>
                    我的收藏
                </div>
                <div onClick={(e) => {window.location.href = '/businessin.html'; }}>
                    商家入驻
                </div>
                <div onClick={(e) => {window.location.href = '/busichange.html'; }}>
                    商家修改资料
                </div> */}
                <section key="perList" className="part-1 fun-area">
                    {
                        this.state.resultMap.map(function (itemName,index) {
                        return <a href={itemName[1]} key={index} className="eve-line">
                            <span className="txt-lt">{itemName[0]}</span>
                            <span className="txt-rt"></span>
                        </a>
                    })}
                </section>
                <div className="goOut" onClick={this.goOut.bind(this)}><span className="txt-lt" >退出</span></div>
                <section className="part-2 fun-area" style={{display: 'none'}}>
                    <div className="eve-line">
                        <span className="txt-lt">我的点评</span>
                        <span className="txt-rt"></span>
                    </div>
                    <div className="eve-line">
                        <span className="txt-lt">最近浏览</span>
                        <span className="txt-rt"></span>
                    </div>
                    <div className="eve-line">
                        <span className="txt-lt">联系客服</span>
                        <span className="txt-rt"></span>
                    </div>
                    <div className="eve-line">
                        <span className="txt-lt">设置</span>
                        <span className="txt-rt"></span>
                    </div>
                </section>

                <section className="part-2 fun-area" style={{display: 'none'}}>
                    <div className="eve-line">
                        <span className="txt-lt">我是商家</span>
                        <span className="txt-rt"></span>
                    </div>
                </section>
                <WhiteSpace />
                <CarTabBar chosen="mineTab"/>
            </div>
        );
    }
}

ReactDOM.render(<BasicInputExample />, document.querySelector('#divId'));
