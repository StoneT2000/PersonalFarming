import React from 'react';

import { Header, Icon, Image, Menu, Segment, Sidebar } from 'semantic-ui-react'
import './index.scss';
//import Default from '../Default/index.jsx';
function Default(props) {
  return (
     <div className='Default'>
        <div className='container'>
            {props.children}
        </div>
     </div>
  );
}
export default Default;
