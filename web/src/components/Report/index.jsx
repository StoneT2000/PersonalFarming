import React, {Component, useEffect, useState} from 'react';
import PropTypes from 'prop-types'
import Default from '../Default';
import {Chart, Line, Scatter } from 'react-chartjs-2';
import axios from 'axios';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Loader,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Message,
  Visibility,
  Dimmer
} from 'semantic-ui-react'
import Background from './b4.jpg';

Chart.defaults.global.animation.duration = 0;
let dataSetOptions = {
  labels: [],
  datasets: [
    {
      label: 'Plant Preciptation',
      fill: false,
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

let minDataset =
  {
    label: 'Minimum',
    fill: false,
    fontColor: 'white',
    showLine: true,
    lineTension: 0.5,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(145,152,232,1)',
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
let maxDataset =
  {
    label: 'Maximum',
    fill: false,
    fontColor: 'white',
    showLine: true,
    lineTension: 0.5,
    backgroundColor: 'rgba(75,192,192,0.4)',
    borderColor: 'rgba(195,75,75,1)',
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

let lightDataset = JSON.parse(JSON.stringify(dataSetOptions));
lightDataset.datasets[0].label = "Plant Light Levels";
let humidityDataset = JSON.parse(JSON.stringify(dataSetOptions));
humidityDataset.datasets[0].label = "Humidity Levels";
let tempDataset = JSON.parse(JSON.stringify(dataSetOptions));
tempDataset.datasets[0].label = "Temperature Levels";
let soilMoistureDataset = JSON.parse(JSON.stringify(dataSetOptions));
soilMoistureDataset.datasets[0].label = "Soil Moisture Levels";

// max and mins
const lightBounds = {max: 470, min: 390};
const tempBounds = {max: 25, min: 22};
const humidityBounds = {max: 75, min: 70};
const soilMoistureBounds = {max: 80, min: 60};
let lightMaxDataset = JSON.parse(JSON.stringify(maxDataset));
lightMaxDataset.data.push(lightBounds.max, lightBounds.max);
let humidityMaxDataset = JSON.parse(JSON.stringify(maxDataset));
humidityMaxDataset.data.push(humidityBounds.max, humidityBounds.max);
let tempMaxDataset = JSON.parse(JSON.stringify(maxDataset));
tempMaxDataset.data.push(tempBounds.max, tempBounds.max);
let soilMoistureMaxDataset = JSON.parse(JSON.stringify(maxDataset));
soilMoistureMaxDataset.data.push(soilMoistureBounds.max, soilMoistureBounds.max);

let lightMinDataset = JSON.parse(JSON.stringify(minDataset));
lightMinDataset.data.push(lightBounds.min, lightBounds.min);
let humidityMinDataset = JSON.parse(JSON.stringify(minDataset));
humidityMinDataset.data.push(humidityBounds.min, humidityBounds.min);
let tempMinDataset = JSON.parse(JSON.stringify(minDataset));
tempMinDataset.data.push(tempBounds.min, tempBounds.min);
let soilMoistureMinDataset = JSON.parse(JSON.stringify(minDataset));
soilMoistureMinDataset.data.push(soilMoistureBounds.min, soilMoistureBounds.min);



const Explore = () => {
  let [loadingData, setLoadingData] = useState(true);
  let [_lightDataset, setLight] = useState(lightDataset);
  let [_tempDataset, setTemp] = useState(tempDataset);
  let [_humidityDataset, setHumidity] = useState(humidityDataset);
  let [_soilMoistureDataset, setSoilMoisture] = useState(soilMoistureDataset);
  let [warnings, setWarnings] = useState([]);
  let chartReferenceLight = React.createRef();
  let chartReferenceHumidity = React.createRef();
  let chartReferenceTemp = React.createRef();
  let chartReferenceSoilMoisture = React.createRef();
  let userKey = "Helloplants!"; // props.user.key
  let [averages, setAverages] = useState({});
  const getAveragesAndUpdate = () => {
    axios.get('/api/stats/aggregate/?key=' + userKey,
    {
      validateStatus: function (status) {
        return status < 10000; // Reject only if the status code is greater than or equal to 500
      }
    })
    .then(function (res) {
      setAverages(res.data);
      console.log(res.data);
      lightDataset = JSON.parse(JSON.stringify(dataSetOptions));
      lightDataset.datasets[0].label = "Plant Light Levels";
      lightDataset.datasets[0].data.push(res.data.lightAvg, res.data.lightAvg);
      lightDataset.datasets.push(lightMaxDataset);
      lightDataset.datasets.push(lightMinDataset);
      lightDataset.labels.push("0", "1");

      soilMoistureDataset = JSON.parse(JSON.stringify(dataSetOptions));
      soilMoistureDataset.datasets[0].label = "Soil Moisture Levels";
      soilMoistureDataset.datasets[0].data.push(res.data.soilMoistureAvg, res.data.soilMoistureAvg);
      soilMoistureDataset.datasets.push(soilMoistureMaxDataset);
      soilMoistureDataset.datasets.push(soilMoistureMinDataset);
      soilMoistureDataset.labels.push("0", "1");

      tempDataset = JSON.parse(JSON.stringify(dataSetOptions));
      tempDataset.datasets[0].label = "Soil Moisture Levels";
      tempDataset.datasets[0].data.push(res.data.temperatureAvg, res.data.temperatureAvg);
      tempDataset.datasets.push(tempMaxDataset);
      tempDataset.datasets.push(tempMinDataset);
      tempDataset.labels.push("0", "1");

      humidityDataset.datasets[0].label = "Soil Moisture Levels";
      humidityDataset.datasets[0].data.push(res.data.humidityAvg, res.data.humidityAvg);
      humidityDataset.datasets.push(humidityMaxDataset);
      humidityDataset.datasets.push(humidityMinDataset);
      humidityDataset.labels.push("0", "1");
      setLight(lightDataset);
      setSoilMoisture(soilMoistureDataset);
      setHumidity(humidityDataset);
      setTemp(tempDataset);

      if (soilMoistureBounds.max < res.data.soilMoistureAvg || soilMoistureBounds.min > res.data.soilMoistureAvg) {
        let w = warnings;
        w.push("Soil moisture is out of optimal region!");
        setWarnings([...warnings]);
      }
      if (lightBounds.max < res.data.lightAvg || lightBounds.min > res.data.lightAvg) {
        let w = warnings;
        w.push("Light levels are out of optimal region!");
        setWarnings([...warnings]);
      }
      if (tempBounds.max < res.data.temperatureAvg || tempBounds.min > res.data.temperatyreAvg) {
        let w = warnings;
        w.push("Temperature is out of optimal region!");
        setWarnings([...warnings]);
      }
      if (humidityBounds.max < res.data.humidityAvg || humidityBounds.min > res.data.humidityAvg) {
        let w = warnings;
        w.push("Humidity is out of optimal region!");
        setWarnings([...warnings]);
      }
      console.log(warnings);
      setLoadingData(false);

    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  }
  useEffect( () => {
    getAveragesAndUpdate();

  }, []);

  let chartOptionsL = {
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
        suggestedMax: 3.4,
      },
      scaleLabel: {
        display: true,
        labelString: 'Microvolts',
        fontColor: "whitew",
        font: 'Helvetica'
      }
    }],
    xAxes: [{ticks: {
      fontColor: "whitew",
      display: false
    },
    scaleLabel: {
      display: false,
      labelString: '',
      fontColor: "whitew",
      font: 'Helvetica'
    }
  }]
    }
  }

  let chartOptionsT = {
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
        suggestedMax: 3.4,
      },
      scaleLabel: {
        display: true,
        labelString: 'Celsius',
        fontColor: "whitew",
        font: 'Helvetica'
      }
    }],
    xAxes: [{ticks: {
      fontColor: "whitew",
      display: false
    },
    scaleLabel: {
      display: false,
      labelString: 'Time',
      fontColor: "whitew",
      font: 'Helvetica'
    }
  }]
    }
  }

  let chartOptionsH = {
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
        suggestedMax: 3.4,
      },
      scaleLabel: {
        display: true,
        labelString: '%',
        fontColor: "whitew",
        font: 'Helvetica'
      }
    }],
    xAxes: [{ticks: {
      fontColor: "whitew",
      display: false
    },
    scaleLabel: {
      display: false,
      labelString: 'Time',
      fontColor: "whitew",
      font: 'Helvetica'
    }
  }]
    }
  }

  let chartOptionsM = {
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
        suggestedMax: 3.4,
      },
      scaleLabel: {
        display: true,
        labelString: '%',
        fontColor: "whitew",
        font: 'Helvetica'
      }
    }],
    xAxes: [{ticks: {
      fontColor: "whitew",
      display: false
    },
    scaleLabel: {
      display: false,
      labelString: 'Time',
      fontColor: "whitew",
      font: 'Helvetica'
    }
  }]
    }
  }

  return (
    <Default>

    <div style={{ padding: '3em 0em'}}>
    <h1 style={{ textAlign:"left"}}>View averages on temperature, light, humidity and more in the past day</h1>

    {loadingData === false ? <div>{warnings.map( (warning) => {
      console.log(warning);
      return (<Message
  warning
  header={warning}
  content=''
  />)
    })}
    {warnings.length === 0 && <p>Everything looks great! No issues today</p>}
    <h2>Plant Light Levels</h2>
          <Line data={_lightDataset} id='plant-light-data' ref={chartReferenceLight} options={chartOptionsL}/>

          <h2>Plant Temperature</h2>
          <Line data={_tempDataset} id='plant-temp-data' ref={chartReferenceTemp} options={chartOptionsT}/>
          <h2>Plant Humidity</h2>
          <Line data={_humidityDataset} id='plant-humidity-data' ref={chartReferenceHumidity}options={chartOptionsH}/>
          <h2>Soil Moisture</h2>
          <Line data={_soilMoistureDataset} id='plant-soil-data' ref={chartReferenceSoilMoisture} options={chartOptionsM}/></div> : <Dimmer active>
      <Loader />
    </Dimmer>}
    </div>
    </Default>
)
}
export default Explore
