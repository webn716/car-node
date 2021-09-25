import React from 'react';
import ReactDOM from 'react-dom';
import { TabBar, Icon } from 'antd-mobile';
require('../iconfont/iconfont.css');
/* eslint global-require: 0 */

class CarTabBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.chosen || '',
      hidden: false,
    };
  }

  renderContent(pageText) {
    return false;
    return (
      <div style={{ backgroundColor: 'white', height: '100%', textAlign: 'center' }}>
        <div style={{ paddingTop: 60 }}>你已点击“{pageText}” tab， 当前展示“{pageText}”信息</div>
        <a style={{ display: 'block', marginTop: 40, marginBottom: 600, color: '#108ee9' }} onClick={(e) => {
          e.preventDefault();
          this.setState({
            hidden: !this.state.hidden,
          });
        }}
        >
          点击切换 tab-bar 显示/隐藏
        </a>
      </div>
    );
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#108ee9"
        tintColor="#108ee9"
        barTintColor="#fff"
        unselectedTintColor = 'gray'
        hidden={this.state.hidden}
      >
        <TabBar.Item
          title="首页"
          key="首页"
          icon={
            <span className='icon-home' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
          selectedIcon={
            <span className='icon-home' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
          selected={this.state.selectedTab === 'indexTab'}
          // badge
          onPress={() => {
            this.setState({
              selectedTab: 'indexTab',
            });
            window.location.href="/index.html";
          }}
          // data-seed="logId"
        >
          {this.renderContent('首页')}
        </TabBar.Item>
        <TabBar.Item
          //icon={<Icon type="koubei-o" size="md" />}
          icon={
              <span className='icon-list' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
          selectedIcon={
              <span className='icon-list' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
          //selectedIcon={<Icon type="koubei" size="md" />}
          title="商家"
          key="商家"
          // badge={'new'}
          selected={this.state.selectedTab === 'businessTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'businessTab',
            });
            window.location.href="/businessList.html"
          }}
          // data-seed="logId1"
        >
          {this.renderContent('商家')}
        </TabBar.Item>
        <TabBar.Item
          icon={
              <span className='icon-heart' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
            selectedIcon={
              <span className='icon-heart' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
          title="保养"
          key="保养"
          selected={this.state.selectedTab === 'maintenanceTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'maintenanceTab',
            });
            window.location.href="/maintainitems.html"
          }}
        >
          {this.renderContent('保养')}
        </TabBar.Item>
        {/* <TabBar.Item
            icon={
              <div className="iconfont" style={{
                width: '0.44rem',
                height: '0.44rem'}}>&#xe895;</div>
            }
            selectedIcon={
              <div className="iconfont" style={{
                width: '0.44rem',
                height: '0.44rem'}}>&#xe895;</div>
            }
           
          title="商家"
          key="商家"
          selected={this.state.selectedTab === 'shopTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'shopTab',
            });
            window.location.href="/businessin.html";
          }}
        >
          {this.renderContent('商家')}
        </TabBar.Item> */}
        <TabBar.Item
          icon={
              <span className='icon-user' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
            selectedIcon={
              <span className='icon-user' style={{width: '0.44rem',height: '0.44rem','fontSize':'40px'}}></span>
          }
           
          title="我的"
          key="我的"
          selected={this.state.selectedTab === 'mineTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'mineTab',
            });
            window.location.href="/personcenter.html";
          }}
        >
          {this.renderContent('我的')}
        </TabBar.Item>
        {/* <TabBar.Item
            icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
            selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
            title="My"
            key="my"
            selected={this.state.selectedTab === 'yellowTab'}
            onPress={() => {
              this.setState({
                selectedTab: 'yellowTab',
              });
            }}
          >
            {this.renderContent('My')}
          </TabBar.Item> */}
      </TabBar>
    );
  }
}

//ReactDOM.render(<CarTabBar />,document.querySelector('#footer'));
export default CarTabBar;

