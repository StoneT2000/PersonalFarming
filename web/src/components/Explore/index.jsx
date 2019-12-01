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
import Background from './b2.jpg';
import Cilantro from './cilantro_2.jpg';
import Spearmint from './spearmint_2.jpg';
import ResizeImage from 'react-resize-image'

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
  backgroundImage: `url(${Background})`,
  display: "flex",
  justifyContent: "center",
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

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

const Explore = () => (
  <ResponsiveContainer>
    <Segment style={{ padding: '10em 0em' }} vertical>
      <Grid container stackable verticalAlign='left'>
        <Grid.Row>
           <div class="ui special cards">
            <div class="card">
              <div class="blurring dimmable image">
                <div class="ui dimmer">
                  <div class="content">
                    <div class="center">
                      <div class="ui primary button">Add Friend</div>
                    </div>
                  </div>
                </div>
                <a href="https://google.com" class="ui medium image">
                  <img src={Spearmint} />
                </a>
              </div>
              <div class="content">
                <a class="header">Spearmint</a>
                <div class="meta">
                <span class="date">
                    <p style={{ fontSize: '0.75em' }}>
                    Created in Nov 2019
                    </p>
                  </span>
                  <p style={{ fontSize: '1em' }}>
                    Light: Full Sun ~ Part Shadow (390 ~ 470 Microvolt)
                  </p>
                  <p style={{ fontSize: '1.05em' }}>
                    Temperature: 22.0 ~ 25.0 °C
                  </p>
                  <p style={{ fontSize: '1.05em' }}>
                    Humidity: 70.0 ~ 75.0 %
                  </p>
                  <p style={{ fontSize: '1.05em' }}>
                    Moisture: Slightly soggy (60% ~ 80%)
                  </p>
                  </div>
                </div>
                <div class="extra content">
                <button class="ui disabled button">
                  Added
                </button>
                </div>
              </div>
            <div class="card">
              <div class="blurring dimmable image">
                <div class="ui inverted dimmer">
                  <div class="content">
                    <div class="center">
                      <div class="ui primary button">Add Friend</div>
                    </div>
                  </div>
                </div>
                  <img src={Cilantro} />
              </div>
              <div class="content">
                <a class="header">Cilantro</a>
                <div class="meta">
                  <span class="date">
                    <p style={{ fontSize: '0.75em' }}>
                    Created in Nov 2019
                    </p>
                  </span>
                  <p style={{ fontSize: '1em' }}>
                    Light: Part Sun ~ Indirect Sun
                  </p>
                  <p style={{ fontSize: '1.05em' }}>
                    Temperature: 23.5 ~ 28.0 °C
                  </p>
                  <p style={{ fontSize: '1.05em' }}>
                    Humidity: 25.0 ~ 30.0 %
                  </p>
                  <p style={{ fontSize: '1.05em' }}>
                    Moisture: Airy (35% ~ 56%)
                  </p>
                </div>
              </div>
              <div class="extra content">
              <button class="ui disabled button">
                  Added
                </button>
                </div>
            </div>
          <div class="card">
              <div class="blurring dimmable image">
                <div class="ui inverted dimmer">
                  <div class="content">
                    <div class="center">
                      <div class="ui primary button">Add Friend</div>
                    </div>
                  </div>
                </div>
                <div class="ui small image">
                  <svg width="150" height="160">
                  </svg>
                </div>
                </div>

              <div class="content">
                <a class="header">-----</a>

              </div>
              <div class="extra content">
                  <Button kind="Dark" onClick={() => console.log("clicked!")}>
                    Add this to my plants
                  </Button>
                </div>
                </div>
            </div>
        </Grid.Row>
      </Grid>
    </Segment>
  </ResponsiveContainer>
)


export default Explore;
