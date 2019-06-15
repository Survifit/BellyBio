function buildGauge(freq) {
    // Enter a speed between 0 and 180
var level = freq;

// Trig to calc meter point
var degrees = 180 - (level*20),
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
   x: [0], y:[0],
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'washes',
    text: level,
    hoverinfo: 'text+name'},
  { values: [20, 20, 20, 20, 20, 20, 20, 20, 20, 180],
  rotation: 90,
  text: ['8-9', '7-8', '6-7', '5-6',
            '4-5', '3-4', '2-3', '1-2', '0-1'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(17, 85, 75, .5)', 'rgba(13, 110, 96, .5)', 'rgba(43, 128, 116, .5)',
                         'rgba(73, 147, 136, .5)', 'rgba(103, 165, 156, .5)',
                         'rgba(133, 184, 177, .5)', 'rgba(163, 202, 197, .5)',
                         'rgba(193, 221, 217, .5)', 'rgba(224, 240, 238, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['8-9', '7-8', '6-7', '5-6',
  '4-5', '3-4', '2-3', '1-2'],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];

var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: '<b>Belly Button Washing Frequency</b> <br> Scrubs per Week',
  height: 600,
  width: 600,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('gauge', data, layout);
}
