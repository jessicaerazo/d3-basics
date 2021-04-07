// d3 barchart using json file for the data

const margin = 80;
const width = 1000 - 2 * margin;
const height = 800 - 2 * margin;

d3.json("/data/popular-lang-2018.json").then(data => {
  data.forEach(d => {
    d.value = Number(d.value)
  });

  const svg = d3.select("#chart-area2").append("svg")
    .attr("width", width)
    .attr("height", 1000)

  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(data.map((s) => s.language))
    .padding(0.4)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.append('g')
    .call(d3.axisLeft(yScale));

  const barGroups = chart.selectAll()
    .data(data)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(g.language))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth())

}).catch(e => {
  console.log(e);
})

