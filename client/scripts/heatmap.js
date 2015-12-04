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
    var i    = Math.min(Math.floor(eggtimer_pos.get() * data.length), data.length-1);
    data.forEach(d => {
      d.data1 = +d.data1;
      d.data2 = +d.data2;
      d.data3 = +d.data3;
      d.data4 = +d.data4;
      d.data5 = +d.data5;
      d.data6 = +d.data6;
    });
    console.log(data, i);

    data = sampleToDataset(data[i]);

    // data join
    var dots = svg.selectAll('.dot')
      .data(data);
    // update
    dots.style('fill', d => { return color(d.intensity); });
    // new elements
    dots.enter().append('circle')
      .attr('class', 'dot')
      .attr('r', 10)
      .attr('cx', d => { return d.x; })
      .attr('cy', d => { return d.y; })
      .style('fill', d => { return color(d.intensity); });
    // exiting elements
    dots.exit().remove();
  });
});

/**
 * Convert one sample into it's own dataset, plottable on the
 * scatterplot
 */
function sampleToDataset(d) {
  return [
    {
      x: 315,
      y: 45,
      intensity: d.data1,
    },
    {
      x: 300,
      y: 80,
      intensity: d.data2,
    },
    {
      x: 345,
      y: 60,
      intensity: d.data3,
    },
    {
      x: 380,
      y: 105,
      intensity: d.data4,
    },
    {
      x: 350,
      y: 200,
      intensity: d.data5,
    },
    {
      x: 345,
      y: 300,
      intensity: d.data6,
    },
  ];
}
