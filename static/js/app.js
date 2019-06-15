function buildMetadata(sample) {
  console.log("Build metadata"); 

  // Use `d3.json` to fetch the metadata for a sample
  var selector = d3.select("#sample-metadata");
  var url = `/metadata/${sample}`;
  
  d3.json(url).then((sampleMetadata) => {
    console.log(sampleMetadata);
    selector.html("");
    Object.entries(sampleMetadata).forEach(([key, value]) => {
      selector.append("H4").text(`${key}: ${value}`);
    });
    
    //console.log(sampleMetadata.WFREQ);
    buildGauge(sampleMetadata.WFREQ);
  });

}

function buildCharts(sample) {
  console.log("Build new chart");

  var url = `/samples/${sample}`;

// @TODO: Build a Pie Chart
  d3.json(url).then((sample) => {
    
    var pieLabel = sample.otu_ids.slice(0,10);
    var pieValue = sample.sample_values.slice(0,10);
    var pieHover = sample.otu_labels.slice(0,10);
    //console.log(pieHover);

    var data = [{
      values: pieValue,
      labels: pieLabel,
      hoverinfo: pieHover,
      type: 'pie'
    }];

    var layout = {
      title: "Top Ten"
    };

    Plotly.newPlot("pie", data, layout);
  });

// @TODO: Build a Bubble Chart using the sample data
  d3.json(url).then((sample) => {

    var trace1 = {
      x: sample.otu_ids,
      y: sample.sample_values,
      mode: 'markers',
      marker: {
        size: sample.sample_values,
        color: sample.otu_ids  
      },
      text: sample.otu_labels
    };

    var data = [trace1];

    var layout = {
      title: 'Bellybutton Bubble Chart',
      xaxis: {
        title: {
          text: 'OTU ID'
        }
      }
    };

    Plotly.newPlot('bubble', data, layout);
  });

    
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
