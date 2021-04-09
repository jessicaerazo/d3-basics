// d3 barchart using json file for the data

const margin = 80;
const width = 1000 - 2 * margin;
const height = 800 - 2 * margin;

d3.json("data/popular-lang-2018.json").then(data => {
  data.forEach(d => {
    d.value = Number(d.value)
  });

  const svg = d3.select("#barChart-area").append("svg")
    .attr("width", width)
    .attr("height", 850)

  const chart = svg.append('g')
    .attr('transform', `translate(${margin}, ${margin})`);

  const xScale = d3.scaleBand()
    .range([0, 760])
    .domain(data.map((s) => s.language))
    .padding(0.3)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 100]);

  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  chart.append('g')
    .call(d3.axisLeft(yScale));

  chart.append('g')
    .attr('class', 'grid')
    .call(d3.axisLeft()
      .scale(yScale)
      .tickSize(-width, 0, 0)
      .tickFormat(''))

  const barGroups = chart.selectAll()
    .data(data)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('x', (g) => xScale(g.language))
    .attr('y', (g) => yScale(g.value))
    .attr('height', (g) => height - yScale(g.value))
    .attr('width', xScale.bandwidth())
    .attr('fill', (g) => g.color)

  barGroups
    .append('text')
    .attr('class', 'value')
    .attr('x', (a) => xScale(a.language) + xScale.bandwidth() / 2)
    .attr('y', (a) => yScale(a.value) + 30)
    .attr('text-anchor', 'middle')
    .text((a) => `${a.value}%`)

  svg
    .append('text')
    .attr('class', 'label')
    .attr('x', -(height / 2) - margin)
    .attr('y', margin / 2.4)
    .attr('transform', 'rotate(-90)')
    .attr('text-anchor', 'middle')
    .text('Meter (%)')

  svg.append('text')
    .attr('class', 'label')
    .attr('x', width / 2 + margin)
    .attr('y', height + margin * 1.7)
    .attr('text-anchor', 'middle')
    .text('Languages')

  svg.append('text')
    .attr('class', 'title')
    .attr('x', width / 2 + margin)
    .attr('y', 40)
    .attr('text-anchor', 'middle')
    .text('Most loved programming languages in 2018')
}).catch(e => {
  console.log('error: ', e);
})

