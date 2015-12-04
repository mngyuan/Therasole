Template.heatmapgraph.onRendered(function() {
  // let's draw a scatterplot, but hide the axes, and hardcode
  // the sensor positions, then use time and d3 transitions as the
  // indepedent variable and color as the dependent variable
  var margin = { top: 20, right: 20, bottom: 30, left: 40 };
  var width  = 600 - margin.left - margin.right;
  var height = 400 - margin.top - margin.bottom;

  var xScale = d3.scale.linear().range([0, width]);
  var yScale = d3.scale.linear().range([0, height]);

  var color = d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

  var svg = d3.select("#heatmapgraph")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

  var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

  Deps.autorun(_ => {
    var data = MockData.find().fetch();
    data.forEach(d => {
      d.data1 = +d.data1;
      d.data2 = +d.data2;
      d.data3 = +d.data3;
      d.data4 = +d.data4;
      d.data5 = +d.data5;
      d.data6 = +d.data6;
    });
    console.log(data);

    data = sampleToDataset(data[0]);

    svg.selectAll('.dot')
      .data(data)
      .enter().append('circle')
        .attr('class', 'dot')
        .attr('r', 10)
        .attr('cx', d => { return d.x * 20; })
        .attr('cy', d => { return d.y * 20; })
        .style('fill', d => { return color(d.intensity); });
  });
});

/**
 * Convert one sample into it's own dataset, plottable on the
 * scatterplot
 */
function sampleToDataset(d) {
  return [
    {
      x: 0,
      y: 0,
      intensity: d.data1,
    },
    {
      x: 1,
      y: 0,
      intensity: d.data2,
    },
    {
      x: 1,
      y: 1,
      intensity: d.data3,
    },
    {
      x: 2,
      y: 1,
      intensity: d.data4,
    },
    {
      x: 2,
      y: 2,
      intensity: d.data5,
    },
    {
      x: 3,
      y: 2,
      intensity: d.data6,
    },
  ];
}
