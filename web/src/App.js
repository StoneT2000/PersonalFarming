import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home/index';
import Dashboard from './components/Dashboard/index';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={Home} />
           <Route exact path='/dashboard' component={Dashboard} />
      </div>
      </Router>
    </div>
  );
}
//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Reports} />
export default App;
