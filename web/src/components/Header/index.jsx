import React from 'react';
import {Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import './index.scss';
function Header(props) {

  return (
    <Menu stackable className="Header">
       <Menu.Item id='menu-bars-wrapper'>
         <Icon name="bars" id='menu-bars' onClick={() => {
           props.visibleHandle(!props.visible)
         }}/>
       </Menu.Item>
       </Menu>
  );
}

export default Header;
