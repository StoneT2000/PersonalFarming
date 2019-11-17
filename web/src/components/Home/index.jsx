import React, {Component} from 'react';
import axios from "axios";
import './index.css';
import '../../App.css';
import Default from '../Default';

//import Registration from "../Registration";
//import Login from "../Login";


//export default class Home extends Component {
  /*
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/dashboard");
  }

  handleLogoutClick() {
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true })
      .then(response => {
        this.props.handleLogout();
      })
      .catch(error => {
        console.log("logout error", error);
      });
  }

  render() {
    return (
      <Default>
      <div className="Home">
        <h1>Home</h1>
        <h1>Status: {this.props.loggedInStatus}</h1>
        <button onClick={() => this.handleLogoutClick()}>Logout</button>
        <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
        <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
      </div>
      </Default>
    );
  }
}*/
function Home() {
  return (
      <Default>
        <div className="Home">
            <div className="greeting">
            <h1>How's your plant doing today?</h1>
            add some basic charts using chart components or data components here
            <h2>Hello It's the homepage</h2>
            </div>
        </div>
    </Default>
  );
}


//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Other} />

export default Home;
