import React, {Component, useState, useEffect} from 'react';
import axios from "axios";
import './index.css';
import '../../App.css';
import Default from '../Default';
const userKey ="Helloplants!";
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
      <Default>
        <div className="Home">
            <div className="greeting">
            <h1>How's your plant doing today?</h1>
            <p>No issues!</p>
            <h2>Hello It's the homepage</h2>
            </div>
        </div>
    </Default>
  );
}


//<Route path='/show-book/:id' component={Dashboard} />
//<Route path='/show-book/:id' component={Other} />

export default Home;
