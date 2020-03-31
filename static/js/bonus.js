function init() {
    var sample_names=d3.select("#selDataset");
    d3.json("samples.json").then((data) => {
        var snames = data.names;
  
        snames.forEach((sample) => {
            sample_names.append("option").text(sample).property("value",sample);
        });
        var firstsample = snames[0];
        build_table(firstsample);
        build_charts(firstsample);

    });
  }
  function build_table(sample){
    d3.json("samples.json").then((data) => {
        var smetadata = data.metadata;
  
        var filterdata=smetadata.filter(x => x.id == sample);
        var filter_data = filterdata[0];
        var sample_mdata=d3.select("#sample-metadata");
  
        Object.entries(filter_data).forEach(([key, value]) => {
            sample_mdata.append("h6").text(`${key.toUpperCase()}: ${value}`);
          });        
        build_Gauge(filter_data.wfreq);
    });
    }
  
  function optionChanged(newID){
      build_table(newID);
      build_charts(newID);
  }
  
  function build_charts(sample) {
      d3.json("samples.json").then((data) => {
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
        var layout1 = {
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
        Plotly.newPlot("bar", barData, layout1);
  
        // =========== BUBBLE CHART ==============
  
        var x_axis = sampledata[0].otu_ids;
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
        var bubbleLayout = {
            title: "Belly Button Bacteria",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
          };
        Plotly.newPlot("bubble", bubbleData, bubbleLayout);      
    
  
        // =========== PIE CHART ==============  
        
        var values = sampledata[0].sample_values.slice(0,10);
        var labels = sampledata[0].otu_ids.slice(0,10);
        var display = sampledata[0].otu_labels.slice(0,10);
  
        var pie_chart = [{
          title: " <br>Top 10 OTUs Pie Chart</b> <br>  </b>",
          values: values,
          lables: labels,
          hovertext: display,
          type: "pie"
        }];
        Plotly.newPlot('pie',pie_chart);
    });
  };
  
  
  
  init();

  function build_Gauge(wfreq) {  
    // Enter the washing frequency between 0 and 180  
    var level = parseFloat(wfreq) * 20;

    // Define meter point  
      var degrees = 180 - level;  
      var radius = 0.5;
      var radians = (degrees * Math.PI) / 180;
      var x = radius * Math.cos(radians);
      var y = radius * Math.sin(radians);

    // Define mainPath 
    var mainPath = "M -.0 -0.05 L .0 0.05 L ";  
    var pathX = String(x);  var space = " ";  
    var pathY = String(y);  var pathEnd = " Z";  
    var path = mainPath.concat(pathX, space, pathY, pathEnd);

    var data = [
        {type: "scatter",
         x: [0], y: [0], 
         marker: { size: 12, color: "850000" }, 
         showlegend: false, 
         name: "Freq", 
         text: level, 
         hoverinfo: "text+name"
        },
        {
            values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
            rotation: 90,
            text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            textinfo: "text",
            textposition: "inside",
            marker: {
                colors: [
                    "rgba(0, 105, 11, .5)",
                    "rgba(10, 120, 22, .5)",
                    "rgba(14, 127, 0, .5)",
                    "rgba(110, 154, 22, .5)",
                    "rgba(170, 202, 42, .5)",
                    "rgba(202, 209, 95, .5)",
                    "rgba(210, 206, 145, .5)",
                    "rgba(232, 226, 202, .5)",
                    "rgba(240, 230, 215, .5)",
                    "rgba(255, 255, 255, 0)"]
                },
            labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
            hoverinfo: "label",      
            hole: 0.5,      
            type: "pie",      
            showlegend: false    
        }
      ];
    var gaugeLayout = {
        shapes: [{type: "path",        
        path: path,        
        fillcolor: "850000",        
        line: {
            color: "850000"
           }      
        }    
        ],    
        title: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week</b>",    
        height: 500,    
        width: 500,    
        xaxis: {      
            zeroline: false,      
            showticklabels: false,      
            showgrid: false,      
            range: [-1, 1]    },    
            yaxis: {      
                zeroline: false,      
                showticklabels: false,      
                showgrid: false,      
                range: [-1, 1]    }  
            };
    var Diagram = document.getElementById("gauge");  
    Plotly.newPlot(Diagram, data, gaugeLayout);
}

 