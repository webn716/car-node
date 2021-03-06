import React from 'react';
import ReactDOM from 'react-dom';

import { Menu, Icon } from 'antd-mobile';

require('./index.css');

const data = [
  {
    value: '1',
    label: 'All Categories',
    isLeaf: true,
  }, 
  {
    value: '2',
    label: 'Food',
    children: [
      {
        label: 'All Foods',
        value: '22',
        disabled: false,
      },
      {
        label: 'Chinese Food',
        value: '21',
      }, {
        label: 'Hot Pot',
        value: '23',
      }, {
        label: 'Buffet',
        value: '24',
      }, {
        label: 'Fast Food',
        value: '25',
      }, {
        label: 'Snack',
        value: '26',
      }, {
        label: 'Bread',
        value: '27',
      }, {
        label: 'Fruit',
        value: '28',
      }, {
        label: 'Noodle',
        value: '29',
      }, {
        label: 'Leisure Food',
        value: '210',
      }],
  }, 
  {
    value: '3',
    label: 'Supermarket',
    children: [
      {
        label: 'All Supermarkets',
        value: '31',
      }, {
        label: 'Supermarket',
        value: '32',
        disabled: true,
      }, {
        label: 'C-Store',
        value: '33',
      }, {
        label: 'Personal Care',
        value: '34',
      }],
  },
];

class MenuHeader extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      initData: '',
      show: false,
    };
  }
 
  onChange(value) {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
  }

  handleClick(e) {
    e.preventDefault(); // Fix event propagation on Android
    this.setState({
      show: !this.state.show,
    });
    // mock for async data loading
    if (!this.state.initData) {
      setTimeout(() => {
        this.setState({
          initData: data,
        });
      }, 500);
    }
  }

  render() {
    const { initData, show } = this.state;
    const menuEl = (
      <Menu
        className="foo-menu"
        data={initData}
        value={['2', '22']}
        onChange={this.onChange}
        height={document.documentElement.clientHeight * 0.6}
      />
      );
    const loadingEl = (
      <div style={{ width: '100%', height: document.documentElement.clientHeight * 0.6, display: 'flex', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </div>
    );
    return (
      <div className={show ? 'menu-active' : ''}>
        <div>
          <NavBar
            leftContent="Menu"
            mode="light"
            //iconName={require('./menu.svg')}
            iconName=''
            onLeftClick={this.handleClick}
            className="top-nav-bar"
          >
            Here is title
          </NavBar>
        </div>
        {show ? initData ? menuEl : loadingEl : null}
      </div>
    );
  }
}

ReactDOM.render(<MenuHeader />, document.querySelector('#header'));


