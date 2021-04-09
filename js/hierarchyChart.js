let svg = d3.select('svg'),
  width = +svg.attr('width'),
  height = +svg.attr('height'),
  g = svg.append('g').attr('transform', 'translate(40,0)')


const tree = d3.tree()
  .size([height, width - 160]);

const stratify = d3.stratify()
  .parentId((d) => { return d.id.substring(0, d.id.lastIndexOf(".")); });

d3.csv("data/tree.csv").then(data => {
  const root = stratify(data)
    .sort((a, b) => { return (a.height - b.height) || a.id.localeCompare(b.id); });

  // Add the links (given by calling tree(root), which also adds positional x/y coordinates) for the nodes
  const link = g.selectAll(".link")
    .data(tree(root).links())
    .enter().append("path")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
      .x((d) => { return d.y; })
      .y((d) => { return d.x; })
    );

  // Add groups for each node in the hierarchy with circles and text labels
  let node = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
    .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
    .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
    .attr("r", 2.5);

  node.append("text")
    .attr("dy", 3)
    .attr("x", function (d) { return d.children ? -8 : 8; })
    .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
    .text(function (d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
}).catch(e => {
  console.log('error: ', e);
});


















// var svg = d3.select("svg"),
//   width = +svg.attr("width"),
//   height = +svg.attr("height"),
//   g = svg.append("g").attr("transform", "translate(40,0)");

// var tree = d3.tree()
//   .size([height, width - 160]);

// var stratify = d3.stratify()
//   .parentId(function (d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

// d3.csv("data/tree.csv", function (error, data) {
//   if (error) throw error;

//   var root = stratify(data)
//     .sort(function (a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

//   // Add the links (given by calling tree(root), which also adds positional x/y coordinates) for the nodes
//   var link = g.selectAll(".link")
//     .data(tree(root).links())
//     .enter().append("path")
//     .attr("class", "link")
//     .attr("d", d3.linkHorizontal()
//       .x(function (d) { return d.y; })
//       .y(function (d) { return d.x; })
//     );

//   // Add groups for each node in the hierarchy with circles and text labels
//   var node = g.selectAll(".node")
//     .data(root.descendants())
//     .enter().append("g")
//     .attr("class", function (d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
//     .attr("transform", function (d) { return "translate(" + d.y + "," + d.x + ")"; })

//   node.append("circle")
//     .attr("r", 2.5);

//   node.append("text")
//     .attr("dy", 3)
//     .attr("x", function (d) { return d.children ? -8 : 8; })
//     .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
//     .text(function (d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
// });