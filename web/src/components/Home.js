import React from 'react';
import Header from './Header';

function Home() {
  return (
    <div className="App">
      <Header />
      <h1>Hello!</h1>
    </div>
  );
}
//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Other} />
export default Home;
