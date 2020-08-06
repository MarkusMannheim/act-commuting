const d3 = require("d3"),
      fs = require("fs");

console.log("loading data ...");
fs.readFile("commuteActive.csv", "utf8", function(error, data) {
  if (error) throw error;
  data = d3.csvParse(data);
  fields = data.columns;
  console.log("parsing and formatting data ...");
  data.forEach(function(d) {
    fields.slice(1)
      .forEach(function(e) {
        d[e] = +d[e];
      });
  });
  console.log("filtering small suburbs ...");
  data = data
    .filter(function(d) {
      return d.Total >= 30;
    });
  console.log("filtering null workplaces ...");
  workplaces = [];
  fields.slice(1, -1)
    .forEach(function(d) {
      if (d3.sum(data, function(e) { return e[d]; }) > 0) workplaces.push(d);
    });
  console.log(workplaces);
});
