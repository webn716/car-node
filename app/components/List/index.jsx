import React from 'react';
import ReactDOM from 'react-dom';
import {ListView} from 'antd-mobile';


var path = require('path');

require('./index.css');
var imgUrl = require('./i/star.icn.png');
var icnArrowDown = require('./i/arrow.down.png');

var dataReq = require('../script/req');
var listScript = require('./list');
const fourHeadString = ['\u5168\u90e8\u5546\u533a','\u5168\u90e8\u9891\u9053','\u667a\u80fd\u6392\u5e8f','\u7b5b\u9009'];
var listData = [];

var index = listData.length - 1;

var NUM_SECTIONS = 5;
var NUM_ROWS_PER_SECTION = 5;
var pageIndex = 0;
listData=[
      {
        "img": "http://cdn-img.easyicon.net/png/66/6600.gif",
        "title": "1北汽阎村4s服务管理中心",
        "des": "1京广联营汽车修配厂",
        "loc":"1卢沟桥",
        "task":"1维修保养",
        "distance":"2km"
      },
      {
        "img": "http://cdn-img.easyicon.net/png/74/7417.gif",
        "title": "京广联营汽车修配厂",
        "des": "博智自行车修配厂第二汽车轮胎修理厂",
        "loc":"良乡",
        "task":"前窗贴膜",
        "distance":"3.6km"
      },
      {
        "img": "http://cdn-img.easyicon.net/png/171/17169.gif",
        "title": "京广联营汽车修配厂",
        "des": "京广联营汽车修配厂",
        "loc":"望京科技园",
        "task":"补充机油",
        "distance":"6.6km"
      }
    ];
var promise = new Promise(function(resolve, reject) {
  dataReq.ajaxReq.start({
    url:'http://localhost:9090/site/ads',
    success:function(data){
      console.log('get first data');
      console.log(data);
        if(data && data.data && data.err==0){
          listData = data.data;
        }
    },
    error:function(){
      
    }
  });
  resolve(listData);
});

promise.then(function(value) {
 // success
 index = listData.length - 1;

 NUM_SECTIONS = 5;
 NUM_ROWS_PER_SECTION = 5;
 pageIndex = 0;
 // list end
}, function(value) {
 // failure
});
window.addEventListener('load',function(){
  // listScript.filterHeader(function(filterType){
  //     dataReq.ajaxReq.start({
  //       url:'http://localhost:3000/listData2'+'?filterType='+filterType,
  //       success:function(data){
            
  //           listData = data;
  //       },
  //       error:function(){
          
  //       }
  //     });
  // });
});
class App extends React.Component {

  constructor(props) {
    //listScroll
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.dataBlob = {};
    this.sectionIDs = [];
    this.rowIDs = [];
    this.genData = (pIndex = 0) => {
      for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        this.sectionIDs.push(sectionName);
        this.dataBlob[sectionName] = sectionName;
        this.rowIDs[ii] = [];

        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
          const rowName = `S${ii}, R${jj}`;
          this.rowIDs[ii].push(rowName);
          this.dataBlob[rowName] = rowName;
        }
      }
      // new object ref
      this.sectionIDs = [].concat(this.sectionIDs);
      this.rowIDs = [].concat(this.rowIDs);
    };

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(this.dataBlob, this.sectionIDs, this.rowIDs),
      isLoading: true,
      listData:listData
    };
  }

  clickHandler(e) {
    //debugger;
    var _this = this;
    var currentTarget = e.currentTarget;
    var type = currentTarget.dataset.filtertype;

    var arrHeader = document.querySelectorAll('#headerFilter div');
    for(var j=0,jLen=arrHeader.length;j<jLen;j++){
      arrHeader[j].classList.remove('show-arrow');
    }
    currentTarget.classList.add('show-arrow');            

    dataReq.ajaxReq.start({
      url:'http://localhost:3000/listData2'+'?filterType='+type,
      success:function(data){
          
          _this.setState({listData:data});
          _this.render();
      },
      error:function(){
        
      }
    });
    console.log('rtyuiop end');
  }
  componentDidMount() {
    let _this = this;
    // simulate initial Ajax  for list scroll
    setTimeout(function(){
      _this.genData();
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRowsAndSections(_this.dataBlob, _this.sectionIDs, _this.rowIDs),
        isLoading: false,
      });
    }, 600);
  }

  //for list scroll

  onEndReached(event) {
    let _this = this;
    console.log(this.state);
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(function(){
      _this.genData(++pageIndex);
      _this.setState({
        dataSource: _this.state.dataSource.cloneWithRowsAndSections(_this.dataBlob, _this.sectionIDs, _this.rowIDs),
        isLoading: false,
      });
    }, 1000);
  }
  render() {
    //for list scroll begin
    const separator = (sectionID, rowID) => (
      <div key={`${sectionID}-${rowID}`} style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
       // index = listData.length - 1;

      }

      const obj = this.state.listData[index--];
      //console.log('===================================index='+index);
      var rowCls=index<0?'last-row':'';
      if(obj){
        return (
        <div key={rowID} className={'row '+rowCls}>
          <div className="flex-container row-unit" style={{ display: '-webkit-box', display: 'flex', padding: '0.3rem 0' }}>
            <img style={{ height: '1.28rem', marginRight: '0.3rem' ,maxWidth: '128px' }} src={obj.img} className="sub-flex-ave"/>
            <div className="row-text sub-flex-ave">
              <div style={{ marginBottom: '0.16rem', fontWeight: 'bold' ,color:'#888'}}>{obj.des}</div>
              <div className="evalute">
                  <img src={imgUrl} alt=""/>
                  <img src={imgUrl} alt=""/>
                  <img src={imgUrl} alt=""/>
              </div>
              <div className="address">
                  <span>{obj.loc}</span>&nbsp;&nbsp;<span>{obj.task}</span>
              </div>
              <em className="distance-v">{obj.distance}</em>
            </div>
          </div>
        </div>
      );
      }else{
        return (<div style={{display: "none"}}></div>);
      }
    };
    //for list scroll end
    const hProp = this.state.initialHeight ? { height: this.state.initialHeight } : {};
    return (
      <div className="wrapper">
          <ListView ref="lv"
            dataSource={this.state.dataSource}
            renderHeader={() => <section id="headerFilter" className="header header-filter">
              <div className="filter-child" data-filtertype="bizz" onClick={this.clickHandler.bind(this)}>
              <span className="item">{fourHeadString[0]}</span>
              <em style={{ background: 'url('+icnArrowDown+')',backgroundSize: '60px 60px'
}} className="icn-down-arrow"></em>
              </div>
              <div className="filter-child" data-filtertype="chan" onClick={this.clickHandler.bind(this)}>
                <span className="item">{fourHeadString[1]}</span>
                <em style={{ background: 'url('+icnArrowDown+')',backgroundSize: '22px 12px'
}} className="icn-down-arrow"></em>
              </div>
              <div className="filter-child" data-filtertype="auto" onClick={this.clickHandler.bind(this)}>
                <span className="item">{fourHeadString[2]}</span>
                <em style={{ background: 'url('+icnArrowDown+')',backgroundSize: '22px 12px'
}} className="icn-down-arrow"></em>
              </div>
              <div className="filter-child" data-filtertype="filter" onClick={this.clickHandler.bind(this)}>
                <span className="item">{fourHeadString[3]}</span>
                <em style={{ background: 'url('+icnArrowDown+')',backgroundSize: '22px 12px'
}} className="icn-down-arrow"></em>
              </div>
            </section>}
            renderFooter={() => <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? '加载中...' : '加载完毕'}
            </div>}
            renderSectionHeader={sectionData => (
              <div>{`任务 ${sectionData.split(' ')[1]}`}</div>
            )}
            renderRow={row}
           // renderSeparator={separator}
            className="am-list"
            pageSize={4}
            scrollEventThrottle={20}
            onScroll={() => { console.log('scroll'); }}
            onEndReached={this.onEndReached.bind(this)}
            onEndReachedThreshold={10}
            stickyHeader
            stickyProps={{
              stickyStyle: { zIndex: 999, WebkitTransform: 'none', transform: 'none' },
              // topOffset: -43,
               isActive: false // 关闭 sticky 效果
            }}
            stickyContainerProps={{
              className: 'for-stickyContainer-demo',
            }}
          />
      </div>
    );
  }
}
export default App;


