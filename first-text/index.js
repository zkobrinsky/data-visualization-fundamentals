let w = document.documentElement.clientWidth * 0.99;
let h = document.documentElement.clientHeight * 0.98;
let padding = 2;
let dataset = [];
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

makeData(dataset, 20, 30, 900, true);
let max = Math.max(...dataset) + padding * 10;

svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attrs({
    x: (d, i) => i * (w / dataset.length),
    y: d => h - (h / max) * d,
    width: w / dataset.length - padding,
    height: (h / max) * max,
    fill: d => `rgb(${(255 * d) / max}, 0, 0)`,
  });

svg
  .selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .text(d => d)
  .attrs({
    "text-anchor": "middle",
    x: (d, i) => (i * w) / dataset.length + (w / dataset.length - padding) / 2,
    y: d => h - (h / max) * d - padding + 20,
    fill: "white",
    "font-family": "sans-serif",
  });

function makeData(dataset, length, min, max, sorted = false) {
  for (let i = 0; i < length; i++) {
    dataset.push(parseInt(Math.random() * (max - min) + min));
  }

  if (sorted) dataset.sort((a, b) => a - b);
}
