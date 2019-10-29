import React, {useEffect} from 'react';
import './index.css';
import {Chart, Line, Scatter } from 'react-chartjs-2';
import Default from '../Default';

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
const plantPreciptationDataset = {
  labels: generateDates(),
  datasets: [
    {
      label: 'Plant Preciptation',
      fill: false,
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
      data: [100, 102, 101, 98, 94, 91, 98, 102,100,100]
    }
  ]
};


let plantPHDataset = {
  labels: generateDates(),
  datasets: [
    {
      label: 'Plant pH Levels',
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
      data: [6.4,6.5,6.4,6.6,6.5,6.5,6.3,6.4, 6.4, 6.5, 6.6, 6.4]
    }
  ]
}

function Dashboard() {
  let chartReference = React.createRef();

  const plantPHDataset = (canvas, height) => {
    const ctx = canvas.getContext("2d")
    if (!height) {
      height = ctx.canvas.height/2;
    }
    //console.log(canvas.height);
    var gradientStroke = ctx.createLinearGradient(0, 0, 0, canvas.height);gradientStroke.addColorStop(0, "rgba(75,192,192,1)");gradientStroke.addColorStop(1, "rgba(75,192,192,0)");

    return {  labels: generateDates(),
      datasets: [
        {
          label: 'Plant pH Levels',
          showLine: true,
          lineTension: 0.5,
          backgroundColor: gradientStroke,
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
          data: [6.4,6.5,6.4,6.6,6.5,6.5,6.3,6.4, 6.4, 6.5, 6.6, 6.4]
        }
      ]
    }
  }
  Chart.pluginService.register({

  });
  let phGradient = [{
    afterLayout: function(chart, options) {
      // create a linear gradient with the dimentions of the scale
      var gradientStroke = chart.ctx.createLinearGradient(0, 0, 0, chart.height*0.6);
      gradientStroke.addColorStop(0, "rgba(75,192,192,0.7)");
      gradientStroke.addColorStop(1, "rgba(75,192,192,0)");
      chart.data.datasets[0].backgroundColor = gradientStroke;
    }
  }]
  window.addEventListener("resize", function(){
    console.log(chartReference);
    let canvas= chartReference.current.chartInstance.canvas;
    const ctx = canvas.getContext("2d")

});
  return (
      <Default>
        <div className="Dashboard">
            <div className="greeting">
            <h1>Your Dashboard</h1>
            Charts, data, reports etc., live data?
            </div>
            <div className="graphs">
            <Line data={plantPreciptationDataset} id='plant-preciptation-data'/>
            <Line data={plantPHDataset} id='plant-ph-data' ref={chartReference} plugins={phGradient}/>

            </div>
        </div>
    </Default>
  );
}
export default Dashboard;
