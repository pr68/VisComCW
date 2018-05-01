var svg;
var g;
var width;
var height;
var projection;
var path;

function init() {
  width = 460;
  height = 650;

  svg = d3.select('#map')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  g = svg
      .append('g')
      .attr('class', 'main');

  projection = d3.geoAlbers()
      .rotate([0,0]);

  path = d3.geoPath()
      .projection(projection);


  d3.queue()
      .defer(d3.json, '/data/open_pubs.csv')
      .defer(d3.csv, '/data/topo_wpc.json')
      .await(function(error, pubs, boundaries) {
          drawMap(boundaries);
      });
}

function drawMap(wpcs) {
  projection
      .scale(1)
      .translate([0,0]);

  var areas = g.selectAll(".area")
      .data(topojson.feature(wpcs, wpcs.objects["wpc"].features));

  areas
      .enter()
      .append('path')
      .attr('class', 'area')
      .attr('d', 'path');
}

init();
