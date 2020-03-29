function init() {
  var sample_names=d3.select("#selDataset");
  d3.json("/samples.json").then((data) => {
      var snames = data.names;

      snames.forEach((sample) => {
          sample_names.append("option").text(sample).property("value",sample);
      });
      var firstsample = snames[0];
      build_table(firstsample);
  });
}
function build_table(sample){
  d3.json("/samples.json").then((data) => {
      var smetadata = data.metadata;

      var filterdata=smetadata.filter(x => x.id == sample);
      var filter_data = filterdata[0];
      var sample_mdata=d3.select("#sample-metadata");

      Object.entries(filter_data).forEach(([key, value]) => {
          sample_mdata.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });        
      });
  }

function optionChanged(newID){
    build_table(newID);
    build_charts(newID);
}

function build_charts(sample) {
    d3.json("/samples.json").then((data) => {
      var plotdata = data.samples;
      var sampledata = plotdata.filter(x => x.id == sample);

      // =========== BAR CHART ==============

      var sampleValues = sampledata[0].sample_values
      var otuIds = sampledata[0].otu_ids
      var otuLabels = sampledata[0].otu_labels
     
      // Trace1 for the Bar Chart
      var trace1 = {
        x: sampleValues.slice(0, 10),
        y: otuIds.map(x => `OTU ${x}`).slice(0,10),
        hovertext: otuLabels.slice(0,10),
        type: "bar",
        orientation: "h"
      };

      // data
      var barData = [trace1];

      // Apply the group bar mode to the layout
      var layout = {
        title: "Top 10 OTUs Bar Chart",
        yaxis: {autorange: "reversed"},
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };

      // Render the plot to the div tag 
      Plotly.newPlot("bar", barData, layout);

      // =========== BUBBLE CHART ==============

      var x_axis = dsampledata[0].otu_ids;
      var y_axis = sampledata[0].sample_values;
      var size = sampledata[0].sample_values;
      var color = sampledata[0].otu_ids;
      var texts = sampledata[0].otu_labels;

      var bubble = {
          x: x_axis,
          y: y_axis,
          text: texts,
          mode: `markers`,
          marker: {
            size: size,
            color: color
          }
        };

      var bubbleData = [bubble];
      var layout = {
          title: "Belly Button Bacteria",
          xaxis: {title: "OTU ID"},
          yaxis: {title: "Sample Values"}
        };
      Plotly.newPlot("bubble", bubbleData);      
  });

      // =========== PIE CHART ==============  
      
      var values = sampledata[0].sample_values.slice(0,10);
      var labels = sampledata[0].otu_ids.slice(0,10);
      var display = sampledata[0].otu_labels.slice(0,10);

      var pie_chart = [{
        title: "Top 10 OTUs Pie Chart",
        values: values,
        lables: labels,
        hovertext: display,
        type: "pie"
      }];
      Plotly.newPlot('pie',pie_chart);
  };
;


init();