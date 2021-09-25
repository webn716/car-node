import React from 'react';
import ReactDOM from 'react-dom';
import { NavBar, Icon } from 'antd-mobile';

// class CarTabBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selectedTab: 'indexTab',
//       hidden: false,
//     };
//   }
// }

ReactDOM.render(
  <div>
      <NavBar
          mode="light" leftContent={[]}
          icon={<Icon type="left" />}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
        <Icon key="1" type="ellipsis" />,
      ]}
      >NavBar</NavBar>
  </div>
, document.querySelector('#header'));
