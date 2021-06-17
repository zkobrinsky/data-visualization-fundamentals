let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;
let padding = 5;
let dataset = [];
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

makeData(dataset, 30, 2, 600, true);
let max = Math.max(...dataset);
drawBarGraph();

function drawBarGraph() {
  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * (w / dataset.length))
    .attr("y", (d, i) => h - (h / max) * d)
    .attr("width", w / dataset.length - padding)
    .attr("height", (d, i) => {
      return (h / max) * d;
    })
    .style("fill", (d, i) => colorMap(d, max));
}

function colorMap(datum, max) {
  return `hsl(${(datum / max) * 360}, 80%, 70.5%)`;
}

function makeData(dataset, length, min, max, sorted = false) {
  for (let i = 0; i < length; i++) {
    dataset.push(Math.random() * (max - min) + min);
  }

  if (sorted) dataset.sort((a, b) => a - b);
}
