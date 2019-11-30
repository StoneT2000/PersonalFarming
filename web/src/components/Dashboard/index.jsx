import React, {useEffect, useState} from 'react';
import './index.scss';
import {Chart, Line, Scatter } from 'react-chartjs-2';
import Default from '../Default';
import axios from 'axios';
import { Message } from 'semantic-ui-react'

function useForceUpdate(){
    const [value, setValue] = useState(true); //boolean state
    return () => setValue(!value); // toggle the state to force render
}

let lineData = [{
    x: 10,
    y: 20
}, {
    x: 15,
    y: 10
}]
function generateDates() {
  let dateLabels = [];
  let now = new Date();
  for (let i = 0; i < 10; i++) {

    dateLabels.push((new Date(now - i*24*3600*1000)).toLocaleDateString());

  }
  return dateLabels;

}
Chart.defaults.global.animation.duration = 0;
let dataSetOptions = {
  labels: [],
  datasets: [
    {
      label: 'Plant Preciptation',
      fill: true,
      fontColor: 'white',
      showLine: true,
      lineTension: 0.5,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 3,
      pointHitRadius: 10,
      data: []
    }
  ]
}

let lightDataset = JSON.parse(JSON.stringify(dataSetOptions));
lightDataset.datasets[0].label = "Plant Light Levels";
let humidityDataset = JSON.parse(JSON.stringify(dataSetOptions));
humidityDataset.datasets[0].label = "Humidity Levels";
let tempDataset = JSON.parse(JSON.stringify(dataSetOptions));
tempDataset.datasets[0].label = "Temperature Levels";
let soilMoistureDataset = JSON.parse(JSON.stringify(dataSetOptions));
soilMoistureDataset.datasets[0].label = "Soil Moisture Levels";

function Dashboard(props) {
  let [replaceWater, setReplaceWater] = useState(false);
  let [_lightDataset, setLight] = useState(lightDataset);
  let [_tempDataset, setTemp] = useState(tempDataset);
  let [_humidityDataset, setHumidity] = useState(humidityDataset);
  let [_soilMoistureDataset, setSoilMoisture] = useState(soilMoistureDataset);

  let chartReference = React.createRef();
  let chartReferenceLight = React.createRef();
  let chartReferenceHumidity = React.createRef();
  let chartReferenceTemp = React.createRef();
  let chartReferenceSoilMoisture = React.createRef();
  let userKey = "Helloplants!"; // props.user.key
  const updateCharts = (res) => {
    lightDataset = JSON.parse(JSON.stringify(dataSetOptions));
    lightDataset.datasets[0].label = "Plant Light Levels";
    humidityDataset = JSON.parse(JSON.stringify(dataSetOptions));
    humidityDataset.datasets[0].label = "Humidity Levels";
    tempDataset = JSON.parse(JSON.stringify(dataSetOptions));
    tempDataset.datasets[0].label = "Temperature Levels";
    soilMoistureDataset = JSON.parse(JSON.stringify(dataSetOptions));
    soilMoistureDataset.datasets[0].label = "Soil Moisture Levels";
    for (let i = 0; i < res.data.length; i++) {
      let rowDate = (new Date(res.data[i].timestamp)).toTimeString().substring(0,8);

      if (res.data[i].humidity) {
        humidityDataset.datasets[0].data.unshift(parseFloat(res.data[i].humidity.$numberDecimal));
        humidityDataset.labels.unshift(rowDate);
      }
      if (res.data[i].light) {
        lightDataset.datasets[0].data.unshift(parseFloat(res.data[i].light.$numberDecimal));
        lightDataset.labels.unshift(rowDate);
      }
      if (res.data[i].temperature) {
        tempDataset.datasets[0].data.unshift(parseFloat((res.data[i].temperature.$numberDecimal)));
        tempDataset.labels.unshift(rowDate);
      }
      if (res.data[i].soilMoisture) {
        soilMoistureDataset.datasets[0].data.unshift(parseFloat((res.data[i].soilMoisture.$numberDecimal)));
        soilMoistureDataset.labels.unshift(rowDate);
      }
    }
    //chartReferenceLight.current.chartInstance.clear(); // avoid ui issues
    setLight(lightDataset);

    setHumidity(humidityDataset);
    //chartReferenceHumidity.current.chartInstance.clear();
    setTemp(tempDataset);
    setSoilMoisture(soilMoistureDataset);
  }
  const getDataAndUpdate = () => {
    axios.get('/api/record/' + userKey,
    {
      validateStatus: function (status) {
        return status < 10000; // Reject only if the status code is greater than or equal to 500
      }
    })
    .then(function (res) {
      updateCharts(res);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }
  const getWarnings = () => {
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
  };
  useEffect(() => {
    getDataAndUpdate();
    setInterval(function() {
      getDataAndUpdate();
    },1000)
  }, []);


  // pseudo data generator
  /*
  setInterval(function(){
    //setLight(lightDataset);
    let ld = lightDataset;
    ld.datasets[0].data.push((Math.random()/5 + 3).toFixed(1));
    let d = new Date();
    ld.labels.push( d.getHours() + ":" + d.getMinutes() + ":" + (d).getSeconds());
    setLight(ld);
    console.log(ld);
    chartReferenceLight.current.chartInstance.update();
  }, 5000)*/
  let phGradient = [{
    afterLayout: function(chart, options) {
      // create a linear gradient with the dimentions of the scale
      var gradientStroke = chart.ctx.createLinearGradient(0, 0, 0, chart.height*0.6);
      gradientStroke.addColorStop(0, "rgba(75,192,192,0.7)");
      gradientStroke.addColorStop(1, "rgba(75,192,192,0)");
      chart.data.datasets[0].backgroundColor = gradientStroke;
    }
  }]
  let chartOptions = {
    title: {
      fontColor: "white"
    },
    legend: {
      labels: {
        fontColor: "white"
      }
    },
    scales: {
      yAxes: [{ticks: {
        fontColor: "whitew",
        suggestedMax: 3.4
      }
    }],
    xAxes: [{ticks: {
      fontColor: "whitew"
    }
  }]
    }
  }
  return (
      <Default>
        <div className="Dashboard">
            <div className="greeting">
            <h1>Dashboard</h1>

            <div className="graphs">
            </div>
            {replaceWater && <Message
    warning
    header='Warning, water is filling up at the bottom of plants'
    content=''
  />}
            <h2>Plant Light Levels</h2>
            <Line data={_lightDataset} id='plant-light-data' ref={chartReferenceLight} plugins={phGradient} options={chartOptions}/>
            <h2>Plant Temperature Levels</h2>
            <Line data={_tempDataset} id='plant-temp-data' ref={chartReferenceTemp} plugins={phGradient} options={chartOptions}/>
            <h2>Plant Humidity Levels</h2>
            <Line data={_humidityDataset} id='plant-humidity-data' ref={chartReferenceHumidity} plugins={phGradient} options={chartOptions}/>
            <h2>Soil Moisture Levels</h2>
            <Line data={_soilMoistureDataset} id='plant-soil-data' ref={chartReferenceSoilMoisture} plugins={phGradient} options={chartOptions}/>
            </div>
        </div>
    </Default>
  );
}
export default Dashboard;
