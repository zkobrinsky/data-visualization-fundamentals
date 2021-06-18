let w = document.documentElement.clientWidth * 0.99;
let h = document.documentElement.clientHeight * 0.99;

let monthlySales = generateData(20);
let maxMonth = Math.max(...monthlySales.map(obj => obj.month));
let maxSales = Math.max(...monthlySales.map(obj => obj.sales));
let yPadding = 20;
let xPadding = 30;
let textOffsetX = 10;

let lineChart = d3.svg
  .line()
  .x((d, i) => {
    let elementWidth =
      w / monthlySales.length +
      w / monthlySales.length / monthlySales.length +
      -(xPadding / monthlySales.length);
    return elementWidth * (d.month / 10) - elementWidth;
  })
  .y(d => {
    let multiplier = h / maxSales;
    if (h + yPadding - d.sales * multiplier >= h) return h;
    return h + yPadding - d.sales * multiplier;
  })
  .interpolate("linear");

let svg = d3.select("body").append("svg").attr({
  width: w,
  height: h,
});

let viz = svg.append("path").attr({
  d: lineChart(monthlySales),
  stroke: "purple",
  "stroke-width": 2,
  fill: "none",
});

let labels = svg
  .selectAll("text")
  .data(monthlySales)
  .enter()
  .append("text")
  .text(d => d.sales)
  .attr({
    x: (d, i) => {
      let elementWidth =
        w / monthlySales.length +
        w / monthlySales.length / monthlySales.length +
        -(xPadding / monthlySales.length);
      return elementWidth * (d.month / 10) - elementWidth + textOffsetX;
    },
    y: d => {
      let multiplier = h / maxSales;
      let initialY = h + yPadding - d.sales * multiplier;
      if (initialY < h / 2) initialY = initialY - yPadding / 4;
      if (initialY >= h) return h;
      return initialY;
    },
    "font-size": "14px",
    "font-family": "sans-serif",
    "font-weight": (d, i) => {
      return i === 0 || i === monthlySales.length - 1 ? "bold" : "normal";
    },
  });

function generateData(length) {
  let output = [];
  for (i = 1; i <= length; i++) {
    output.push({ month: i * 10, sales: Math.floor(Math.random() * 100) });
  }

  return output;
}

console.log(monthlySales);
