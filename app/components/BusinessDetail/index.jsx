import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import axios from 'axios'
import qs from 'qs'

import CarTabBar from '../CarTabBar/index'
import {Card, TextareaItem, List, Button,Toast } from 'antd-mobile'

require('./index.css');
import Header from '../Header'
let dataReq = require('../script/req');
let businessId = ''
let throttle;
class BusinessDetail extends React.Component {
    constructor() {
        super() ;
        this.state={
            userInfo:{},
            commentList:[],
            page:1,
            isCollected:false,
            isLoadingShow:"block"
        }
    }
    componentDidMount(){
        console.log(dataReq.getUrlParam('id'))
         businessId = dataReq.getUrlParam('id')
        this.userInfo();
        this.commentList(this.state.page);

    }
    //商家地图
    userMap(longitude,latitude){
        var map = new AMap.Map('container', {
            center:[longitude,latitude],
            zoom:14
        });
        // 创建一个 Marker 实例：
        var marker = new AMap.Marker({
            position: new AMap.LngLat(longitude, latitude),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '北京'
        });

        // 将创建的点标记添加到已有的地图实例：
        map.add(marker);
    }
    //商家信息
    userInfo(){
        var that = this;
        axios({
            method: 'get',
            url: '/api/business/business-detail',
            params: {
                id:businessId,
            }
        }).then(function (res) {
                if (res) {
                    that.setState({
                        userInfo:res.data.data
                    },()=>{
                        that.userMap(res.data.data.longitude,res.data.data.latitude);
                    });
                    if(res.data.data.is_attention == 1){
                        that.setState({
                            isCollected : true
                        })
                    }else{
                        that.setState({
                            isCollected : false
                        })
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //关注/取消关注
    collection(num){
        var that = this;
        console.log(num)
        axios({
            method: 'post',
            url: dataReq.globalUrl + 'attention/attention',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                // token: dataReq.token,
                business_id:businessId,
                type:num,
            })
        }).then(function (res) {
            console.log(res)
                if (res) {
                    if(res.data.msg=="收藏成功"){
                        that.setState({
                            isCollected:true
                        });
                    }else{
                        that.setState({
                            isCollected:false
                        });
                    }

                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    commentList(page){
        var that = this;
        axios({
            method: 'GET',
            url: dataReq.globalUrl + 'comment/list',
            params: {
                // token: dataReq.token,
                business_id:businessId,
                page:page,
            }
        }).then(function (response) {

            if(that.state.page >= response.data.data.count_page){
                that.setState({
                    isLoadingShow:"none",
                    commentList: that.state.commentList.concat(response.data.data.list),

                })
            }else{
                if(response.data.data.list&&response.data.data.list.length>0){
                    that.setState({
                        commentList: that.state.commentList.concat(response.data.data.list),
                    });
                }
            }

            })
        .catch(function (error) {
            console.log(error);
        });
    }

    loadingMore(){
        const that = this
        clearTimeout(throttle)
        throttle = setTimeout(()=>{
          that.setState({
            page:that.state.page + 1
          },()=>{
            const {page} = that.state
            that.commentList(page)
          })
        },500)
      }

    comment(){
        var that = this;
        var comment=this.props.form.getFieldsValue().count;
        if(comment==""){
            Toast.fail('字数不能为空 !!!', 1);
            return;
        }
        axios({
            method: 'post',
            url: dataReq.globalUrl + 'comment/add',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify({
                token: dataReq.token,
                business_id:businessId,
                comment:comment
            })
        }).then(function (res) {
                if (res) {
                    if(res.data.err==0){
                        Toast.success('评论成功 !!!', 1);
                        that.setState({
                            commentList: [],
                            page:1,
                            isLoadingShow:"block",
                        });
                        that.commentList(1);
                        window.location.reload();
                    }else{
                        Toast.fail(res.data.msg+'!!!', 1);
                    }

                }
            }).catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const { getFieldProps } = this.props.form;
        const { userInfo, commentList } = this.state
        return (
            <div>
                <Header place = '北京' title = '商家详情' codeShow = {true}/>
                <div id = 'container'></div>
                <div>
                <Card>
                    <Card.Header
                    title={userInfo.name}
                    thumb={userInfo.img}
                    //   thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                    //extra={<span>距离很近</span>}
                    />
                    <Card.Body style={{'position':'relative'}}>
                    <div>{userInfo.service_type}</div>
                        <div>
                            {
                                this.state.isCollected ?  <img src=".././../../images/redHeart.svg" className="collection" onClick={this.collection.bind(this,2)} alt=""/> :  <span className="icon-heart collection" onClick={this.collection.bind(this,1)}></span>
                            }
                        </div>

                    </Card.Body>
                    <Card.Footer content={userInfo.address} extra={<div>电话：{userInfo.phone}</div>} />
                </Card>
                </div>
                <div style={{'padding':'30px 30px 0'}}>
                    评价
                </div>
                <div >
                    {
                        this.state.commentList.map((item, index)=>{
                            return(
                            <div key = {index} style = {{'padding': '15px', 'margin': '15px'}}>
                                <div>{item.comment}</div>
                                <div style = {{'display': 'flex'}}>
                                <div style = {{'flex': '1', 'textAlign': 'left'}}>评论人：{item.user_info.phone}</div>
                                <div style = {{'flex': '1', 'textAlign': 'right'}}>{item.ctime}</div>
                                </div>
                            </div>
                            )
                        })
                    }
                    <div  style = {{textAlign: 'center',padding:'16px 0',display:this.state.isLoadingShow}} onClick = {this.loadingMore.bind(this)}>点击加载更多...</div>
                </div>
                <div>
                <List renderHeader={() => ''}>
                <TextareaItem
                    {...getFieldProps('count', {
                    initialValue: '',
                    })}
                    rows={5}
                    count={100}
                    placeholder="对于这家店,我的意见是..."
                />
                </List>
                <div style={{'padding':'30px'}}>
                    <Button style = {{'marginBottom': '115px', 'marginTop': '15px', 'color':'#fff'}} type="primary"  onClick={this.comment.bind(this)}>确认提交</Button>
                </div>
                </div>
                <CarTabBar chosen="qzTab"/>
            </div>
        )
    }
}

const BusinessDetailWrapper = createForm()(BusinessDetail);
ReactDOM.render(<BusinessDetailWrapper />, document.querySelector('#divId'));
