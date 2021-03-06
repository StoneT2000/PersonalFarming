import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility,
} from 'semantic-ui-react'
import Background from './b5.jpg';

// Heads up!
// We using React Static to prerender our docs with server side rendering, this is a quite simple solution.
// For more advanced usage please check Responsive docs under the "Usage" section.
const getWidth = () => {
  const isSSR = typeof window === 'undefined'

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

var sectionStyle = {
  //width: "100%",
  width: "100vw",
  height: "calc(100vh - 40px)",
  backgroundSize: "cover",
  backgroundImage: `url(${Background})`
};
/* Heads up!
 * Neither Semantic UI nor Semantic UI React offer a responsive navbar, however, it can be implemented easily.
 * It can be more complicated, but you can create really flexible markup.
 */
class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <section style={ sectionStyle }>
        {children}
      </section>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

class MobileContainer extends Component {
  state = {}

  render() {

    return (
      <Responsive
        as={Sidebar.Pushable}
        getWidth={getWidth}
        maxWidth={Responsive.onlyMobile.maxWidth}
      >
      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Home = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '10em 0em' }} vertical>
      <Grid container stackable verticalAlign='left'>
        <Grid.Row>
          <Grid.Column width={8}>
          <p style={{ fontSize: '2.0em' }}>
              Welcome
            </p>
            <p style={{ fontSize: '1.33em' }}>
            The goal of our project was to improve farming at an urban scale, where mini hydroponics and gardens are more frequent in bustling urban cities like New York City.
            </p>
            <p style={{ fontSize: '1.33em' }}>
            Our project helps improve farming by automating parts of the farming process whilst also giving user feedback on how the plant is doing over time.
            </p>
            <p style={{ fontSize: '1.33em' }}>
              -  IEEE team113
            </p>
            <p>{"\n"}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
)
export default Home




/*
import React, {Component} from 'react';
import axios from "axios";
import './index.css';
import '../../App.css';
import Default from '../Default';
*/

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
/*
var sectionStyle = {
  //width: "100%",
  width: "1350px",
  height: "600px",
  backgroundImage: `url(${Background})`
};

function Home() {
  let [replaceWater, setReplaceWater] = useState(false);
  useEffect( () => {
    axios.get('/api/stats/replaceWater/?key=' + userKey,
    {
      validateStatus: function (status) {
        return status < 10000; // Reject only if the status code is greater than or equal to 500
      }
    })
    .then(function (res) {
      if (res.waterLevelAverage >= 250) {
        setReplaceWater(true);
      }
      else {
        setReplaceWater(false);
      }
    })
    .catch(function (error) {
      console.log(error);
    })
  }, []);
  return (
      <section style={ sectionStyle }>
      <Default>
        <div className="Home">
            <div className="greeting">
            <h1>How's your plant doing today?</h1>
            <p>No issues!</p>
            <h2>Hello It's the homepage</h2>
            </div>
        </div>
       </Default>
       </section>
  );
}*/


//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Other} />

//export default Home;
