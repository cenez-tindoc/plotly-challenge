var data = [{ type: ‘category’,
x: [0], y:[0],
marker: {size: 28, color:‘850000’},
showlegend: false,
name: ‘speed’,
text: level,
hoverinfo: ‘text+name’},
{ values: [5,4,3,1,2, 15],
rotation: 90,

text: [‘ML5’, ‘ML4’, ‘ML3’, ‘ML2’,
‘ML1’, ‘’],
textinfo: ‘text’,
textposition:‘inside’,
marker: {colors:[‘rgba(14, 127, 0, .5)’, ‘rgba(110, 154, 22, .5)’,
‘rgba(170, 202, 42, .5)’, ‘rgba(202, 209, 95, .5)’,
‘rgba(210, 206, 145, .5)’,
‘rgba(255, 255, 255, 0)’]},
labels: [‘4.5-5’, ‘3.5-4.49’, ‘2.5-3.49’, ‘1.5-2.49’, ‘1-1.49’],
hoverinfo: ‘label’,
hole: .5,
type: ‘pie’,
showlegend: false
}];

var layout = {
shapes:[{
type: ‘path’,
path: path,
fillcolor: ‘850000’,
line: {
color: ‘850000’
}
}],
title: ‘Maturity Total Score 1-5’,
height: 500,
width: 600,
xaxis: {type:‘category’,zeroline:false, showticklabels:false,
showgrid: false, range: [-1, 1]},
yaxis: {type:‘category’,zeroline:false, showticklabels:false,
showgrid: false, range: [-1, 1]}
};

Plotly.newPlot(‘myDiv’, data, layout);