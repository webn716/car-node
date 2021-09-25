import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import axios from 'axios'
import qs from 'qs' 

import { List, Carousel, Button , InputItem, Grid, Card, Flex, ListView, WhiteSpace, WingBlank, NavBar, Picker, Icon, Toast} from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;


import CarTabBar from '../CarTabBar';
import Header from '../Header'

let globalData = require('../script/req');
require('../iconfont/iconfont.css');
let dataReq = require('../script/req');


// import { Select } from 'antd';
import Select from 'antd/lib/Select'
const Option = Select.Option;

import SearchBarHeader from '../SearchBarHeader';

const path = require('path');

require('./index.css');

let throttle;//函数节流使用


var x=document.getElementById("demo");

class App extends React.Component {
  
  constructor() {
    super() ;
    this.state = {
      initialHeight: 200,
      businessList:[],
      isLoadingShow:"block",


      page:1,
    }
  }

  componentDidMount() {
    const {page} = this.state
    this.getBusinessList(page)
  }
  getBusinessList(page){
    var that = this;
    axios({
      method: 'get',
      url: dataReq.globalUrl + "messages/list",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params: {
        token: dataReq.token,
        page:page,
      }
     
    }).then(function (response) {
          if(that.state.page >= response.data.data.count_page){
            that.setState({
              isLoadingShow:"none",
              businessList: that.state.businessList.concat(response.data.data.list),

            })
          }else{
            if(response.data.data.list&&response.data.data.list.length>0){
              that.setState({
                businessList: that.state.businessList.concat(response.data.data.list),
              });
            }
          }
      
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}
  
  loadingMore(){
    const that = this
    clearTimeout(throttle)
    throttle = setTimeout(()=>{
      that.setState({
        page:that.state.page + 1
      },()=>{
        const {page} = that.state
        that.getBusinessList(page)
      })
    },500)
  }

  readNews(id,url){
    console.log(url)
    var that = this;
    axios({
      method: 'post',
      url: dataReq.globalUrl + "messages/read-one",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        id: id,
      })

    }).then(function (response) {
          console.log(response);
        if(response.data.err==0){
          window.location.href = url;

        }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  readAll(){
    var that = this;
    axios({
      method: 'post',
      url: dataReq.globalUrl + "messages/read",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        token: dataReq.token,
      })

    }).then(function (response) {
          console.log(response);
          if(response.data.err==0){
            Toast.success('一键已读成功 !!!', 1);
            that.setState({
              businessList:[],
              page:1
            })
            that.getBusinessList(1)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
  }



  render() {
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <div className="wrapperGrey">
      <div id = 'container'></div>
          <Header place = '北京' title = '消息列表' codeShow = {true}/>
        <div className="first-line">
            <Button className="add-car" type="ghost" size="small" inline onClick={this.readAll.bind(this)}>一键已读</Button>
        </div>
          <div>
            <List className="my-list">
              {
                this.state.businessList && this.state.businessList.length==0 ?
                    <div key="nodata" id='noDataGrey'>暂无数据</div>
                    :
                    <div>
                      {
                        this.state.businessList.map((item, index) => {
                          return(
                            <Item key = {index} onClick = {this.readNews.bind(this,item.id,item.url)} align="top" thumb={item.read_status==1?<div className="grey"></div>:<div className="blue"></div>} multipleLine>
                              {item.content}
                              <Brief>{this.timestampToTime(item.time)}</Brief>
                            </Item>
                          )
                        })
                      }
                       <div style = {{'textAlign': 'center','padding':'16px 0',display:this.state.isLoadingShow}} onClick = {this.loadingMore.bind(this)}>点击加载更多...</div>
                    </div>
              }
            </List>
           
          </div>
          <CarTabBar chosen=""/>
      </div>
    );
  }
}
const ApplWrapper = createForm()(App);
ReactDOM.render(<App />, document.querySelector('#divId'));
