const csv = require("csv-parser");
const fs = require("fs");
const file = [];

fs.createReadStream("input_countries.csv")
  .pipe(csv())
  .on("data", (data) => file.push(data))
  .on('end',()=>{
    const title = ["country,year,population"];
    const Canada = [];
    const US = [];

    file.forEach((i) => {
      if (i.country === "Canada")
        Canada.push(`${i.country},${i.year},${i.population}`);
      if (i.country === "United States")
        US.push(`${i.country},${i.year},${i.population}`);
    });

    fs.writeFile("canada.txt", title.concat(Canada).join("\n"), (err) => {
      if (err) {
        console.log("Cannot write to canada.txt", err);
      } else {
        console.log(`Canada.txt save successfully`);
      }
    });

    fs.writeFile("usa.txt", title.concat(US).join("\n"), (err) => {
      if (err) {
        console.log("Cannot write to usa.txt", err);
      } else {
        console.log(`usa.txt save successfully`);
      }
    });
  })

