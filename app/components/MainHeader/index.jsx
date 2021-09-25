import React from 'react';
import ReactDOM from 'react-dom';
import {ListView,Icon,Button} from 'antd-mobile';


var path = require('path');
var icnArrowDown = require('./i/arrow.down.png');
require('./index.css');

var carLogoInfoArr = [
    {
        "code": "京·11111",
        "icnurl": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1243184786,2147762373&fm=58"
    },
    {
        "code": "沪·22222",
        "icnurl": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2935756859,2034280470&fm=58"
    },
    {
        "code": "豫·33333",
        "icnurl": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1035327740,1943444682&fm=58"
    },
    {
        "code": "晋·66666",
        "icnurl": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=1035327740,1943444682&fm=58"
    },
    {
        "code": "津·77777",
        "icnurl": "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=1182615319,1889538672&fm=58"
    },
    {
        "code": "鲁·88888",
        "icnurl": "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2933871810,2016820785&fm=58"
    },
    {
        "code": "川·99999",
        "icnurl": "https://ss2.baidu.com/6ONYsjip0QIZ8tyhnq/it/u=2981178005,2107141171&fm=58"
    }
];
class Oli extends React.Component {

  chooseCar(e){
    var oUl = document.querySelector('.car-item-position');
    oUl.classList.add('no-show');
    var oConstainer = document.querySelector('#carLogoItem');
    oConstainer.innerHTML = e.currentTarget.innerHTML;
    //console.log(e.currentTarget.innerHTML);
  }
  render(){
    var list = (arrCarList) => {
              var res = [],style ;
              for(var i = 0; i < arrCarList.length; i++) {
                var item = arrCarList[i];
                if(item.icnurl){
                  style = {background: 'url('+item.icnurl+') no-repeat 0 0',backgroundSize: '60px 60px'};
                }else{
                  style={};
                }
                
                res.push(<li key={"li"+i} onClick={this.chooseCar.bind(this)}>
                            <em className="car-icon" style={style}></em>
                            <span className="car-number">{arrCarList[i].code}</span>
                         </li>);
              }
              return res;
            }
    return (
        <ul className="car-item-position no-show">
            {list(carLogoInfoArr)}
        </ul>
      );
  }
}
class App extends React.Component {

  constructor(props) {
    //listScroll
    super(props);
  }

  updateAllDis(e){
    alert('更新里程');
  }
  componentDidMount() {
    let _this = this;
  }
  //for list scroll
  showCarList(e){
    var oUl = document.querySelector('.car-item-position');
    oUl.classList.remove('no-show');
  }
  render() {
    
    return (

        <div className="car-detail">
    {/**<div className="main-common-header">
          <div className="car-item" id="carLogoItem" onClick={this.showCarList.bind(this)}>
              <em className="car-icon"style={{ background:"url('https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=2933871810,2016820785&fm=58') 0 0 no-repeat",backgroundSize: '60px 60px'}}></em>
              <span className="car-number">京P·55555</span>
              <em style={{ background: 'url('+icnArrowDown+')',backgroundSize: '22px 12px'
              }} className="icn-down-arrow"></em>
          </div>
          <Oli/>
          
          <div className="cur-state">
              <span className="label">当前<br/>行程</span>
              <span className="distance">0012345</span>
              <span className="btn-update"onClick={this.updateAllDis.bind(this)}>更新<br/>里程</span> 
          </div>
      </div>**/}
          <div style = {{'width':'100%', 'display': 'flex'}}>
              <div style = {{'flex':'1','display':'flex','lineHeight':'80px'}}>
                  <img style = {{'width':'60px','height':'60px','margin':'10px 16px 0 0', 'display': 'flex'}} src="../../../images/alipay.png" alt=""/>
                  <div>大众</div>
              </div>
              <div style = {{'flex':'1'}} className="shopListFiter">
                  <Icon type="down" className="icon" />
                  <select name="" id="" style = {{'width': '100%'}}>
                      <option defaultValue="1" selected="selected">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
              </div>
          </div>
          <div  style = {{'width':'100%', 'display': 'flex'}} className="detailBox">
              <div className="name">公里数：</div>
              <div className="input">
                  <input type="number" placeholder = '请输入公里数'/>
              </div>
          </div>
          <div  style = {{'width':'100%', 'display': 'flex'}} className="detailBox">
              <div className="name">OBD编号：</div>
              <div className="input"><input type="number" placeholder = '请输入OBD编号'/></div>
          </div>
          <Button style = {{'marginBottom': '15px', 'marginTop': '40px'}} type="ghost">确认修改</Button>
      </div>
    );
  }
}
export default App;


