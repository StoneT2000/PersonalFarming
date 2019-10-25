import React from 'react';
import './index.css';
import Default from '../Default';
function Home() {
  return (
      <Default>
        <div className="Home">
            <div className="greeting">
            <h1>How's your plant doing today?</h1>
            add some basic charts using chart components or data components here
            </div>
        </div>
    </Default>
  );
}
//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Other} />
export default Home;
