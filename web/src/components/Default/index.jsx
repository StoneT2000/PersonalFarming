import React from 'react';
import Header from '../Header/index.jsx';
import './index.css';
//import Default from '../Default/index.jsx';
function Default(props) {
  return (
     <div className='Default'>
        <Header />
        <div className='container'>
            {props.children}
        </div>
     </div>
  );
}
export default Default;
