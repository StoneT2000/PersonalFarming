
import React, {useState} from 'react'
import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'

const SidebarFarm = (props) => {

  return (
    <Sidebar.Pushable className="SidebarFarm">
      <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        vertical
        visible={props.visible}
        width='thin'
      >
        <Menu.Item as='a' href="/">
          <Icon name='home' />
          Home
        </Menu.Item>
        <Menu.Item as='a' href="/dashboard">
          <Icon name='chart area' />
          Dashboard
        </Menu.Item>
        <Menu.Item as='a' href="/report">
          <Icon name='sticky note outline' />
          Reports
        </Menu.Item>
        <Menu.Item as='a' href="/explore">
          <Icon name='globe' />
          Explore
        </Menu.Item>
        <Menu.Item as='a' href="/login">
          <Icon name='user' />
          Login
        </Menu.Item>
      </Sidebar>

      <Sidebar.Pusher onClick={() => {
        props.visibleHandle(false)}}>

          {props.children}

      </Sidebar.Pusher>
    </Sidebar.Pushable>
  )
}
export default SidebarFarm
