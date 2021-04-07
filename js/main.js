
const sample = [
  {
    language: 'Rust',
    value: 78.9,
    color: '#000000'
  },
  {
    language: 'Kotlin',
    value: 75.1,
    color: '#00a2ee'
  },
  {
    language: 'Python',
    value: 68.0,
    color: '#fbcb39'
  },
  {
    language: 'TypeScript',
    value: 67.0,
    color: '#007bc8'
  },
  {
    language: 'Go',
    value: 65.6,
    color: '#65cedb'
  },
  {
    language: 'Swift',
    value: 65.1,
    color: '#ff6e52'
  },
  {
    language: 'JavaScript',
    value: 61.9,
    color: '#f9de3f'
  },
  {
    language: 'C#',
    value: 60.4,
    color: '#5d2f8e'
  },
  {
    language: 'F#',
    value: 59.6,
    color: '#008fc9'
  },
  {
    language: 'Clojure',
    value: 59.6,
    color: '#507dca'
  }
];

const margin = 80;
const width = 1000 - 2 * margin;
const height = 800 - 2 * margin;

const svg = d3.select("#chart-area").append("svg")
  .attr("width", width)
  .attr("height", 1000)

const chart = svg.append('g')
  .attr('transform', `translate(${margin}, ${margin})`);

const xScale = d3.scaleBand()
  .range([0, width])
  .domain(sample.map((s) => s.language))
  .padding(0.4)

const yScale = d3.scaleLinear()
  .range([height, 0])
  .domain([0, 100]);

const makeYLines = () => d3.axisLeft()
  .scale(yScale)

chart.append('g')
  .attr('transform', `translate(0, ${height})`)
  .call(d3.axisBottom(xScale));

chart.append('g')
  .call(d3.axisLeft(yScale));


const barGroups = chart.selectAll()
  .data(sample)
  .enter()
  .append('g')

barGroups
  .append('rect')
  .attr('class', 'bar')
  .attr('x', (g) => xScale(g.language))
  .attr('y', (g) => yScale(g.value))
  .attr('height', (g) => height - yScale(g.value))
  .attr('width', xScale.bandwidth())