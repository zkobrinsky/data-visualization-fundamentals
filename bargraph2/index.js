let w = document.documentElement.clientWidth;
let h = document.documentElement.clientHeight;
let padding = 2;
let dataset = [];
let svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

makeData(dataset, 20, 30, 900, true);
let max = Math.max(...dataset);

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

function makeData(dataset, length, min, max, sorted = false) {
  for (let i = 0; i < length; i++) {
    dataset.push(parseInt(Math.random() * (max - min) + min));
  }

  if (sorted) dataset.sort((a, b) => a - b);
}
