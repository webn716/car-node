import React from 'react';
import ReactDOM from 'react-dom';
import { createForm } from 'rc-form';
import Header from '../Header'

import { Button , InputItem, WhiteSpace,WingBlank,NavBar,Picker, Icon,Toast} from 'antd-mobile';
import { List } from 'antd-mobile';
const Item = List.Item;
const Brief = Item.Brief;
import axios from 'axios'
let dataReq = require('../script/req');
import qs from 'qs'

import CarTabBar from '../CarTabBar';
import SearchBarHeader from '../SearchBarHeader';

require('./index.css');

let businessId = ''
let throttle;
class CollectionList extends React.Component {
  constructor() {
    super() ;
    this.state={
      resultMap:[],
      page:1,
      isLoadingShow:"block"
    }
  }
  componentDidMount() {
    console.log(dataReq.getUrlParam('id'))
    businessId = 10
    this.collectionList(1);
  }
  //收藏列表
  collectionList(page){
    const that = this;
    axios({
      method: 'GET',
      url: dataReq.globalUrl + 'attention/list',
      params: {
        token: dataReq.token,
        page:page,
      }
    }).then(function (response) {
      if(that.state.page >= response.data.data.count_page){
        that.setState({
          isLoadingShow:"none",
          resultMap: that.state.resultMap.concat(response.data.data.list),

        })
      }else{
        if(response.data.data.list&&response.data.data.list.length>0){
          that.setState({
            resultMap: that.state.resultMap.concat(response.data.data.list),
          });
        }
      }
    }).catch(function (error) {
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
        const { page } = that.state
        that.collectionList(page)
      })
    },500)
  }

  //关注/取消关注
  cancelCollection(){
    const that = this;
    axios({
      method: 'post',
      url: '/api/attention/attention',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify({
        token: dataReq.token,
        type:2,
        business_id:businessId,
      })
    }).then(function (res) {
      if (res) {
        if(res.data.msg == "取消收藏成功"){
          Toast.success('取消收藏成功 !!!', 1);
          that.setState({
            resultMap: [],
            page:1
          });
          that.collectionList(1)
        }
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  render() {
    var that = this;
    return (
        <div className="wrapperGrey">
          <Header place = '北京' title = '收藏列表' codeShow = {true}/>
          {/***<SearchBarHeader/>**/}
          {
            this.state.resultMap && this.state.resultMap.length==0 ?
                <div key="nodata" id='noDataGrey'>暂无数据</div>
                :
                <List className="my-list">
                  {
                    this.state.resultMap.map(function (item,index) {
                      return (<div key = {index} style = {{'display': 'flex', 'width':'100%'}}>
                        <Item style = {{'flex': '1'}}  extra="" align="top" thumb={item.img} multipleLine>
                          {item.name}
                          <Brief>{item.service_type}</Brief>
                        </Item>
                        <Button style = {{'margin': 'auto','marginRight':'10px'}} type="ghost" size="small" activeStyle = 'true' onClick = { that.cancelCollection.bind(that)}>
                          取消收藏
                        </Button>
                      </div>)
                    })
                  }
                  <div style = {{'textAlign': 'center','padding':'16px 0',display:this.state.isLoadingShow}} onClick = {this.loadingMore.bind(this)}>点击加载更多...</div>
                </List>
          }
          <CarTabBar chosen="qzTab"/>
        </div>
    )
  }
}

const CollectionListWrapper = createForm()(CollectionList);
ReactDOM.render(<CollectionListWrapper />, document.querySelector('#divId'));
