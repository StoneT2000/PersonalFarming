import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import SidebarFarm from './components/Sidebar/index.jsx';
import Header from './components/Header'
import Home from './components/Home/index';
import Dashboard from './components/Dashboard/index';
import Login from './components/Login/index';
import Explore from './components/Explore/index';
import Report from './components/Report/index';

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="App">
      <div className="App__Form">
        <Header visibleHandle = {setVisible} visible={visible} />
        <SidebarFarm visibleHandle = {setVisible} visible={visible}>
          <Router>
            <div>
              <Route exact path='/' component={Home} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/report' component={Report} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/explore' component={Explore} />
            </div>
          </Router>
          </SidebarFarm>
          </div>
      </div>

  );
}

//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Reports} />
export default App;
