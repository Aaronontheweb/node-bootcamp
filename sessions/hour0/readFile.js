
/** NODE.JS **/
var fs = require("fs");
var filePath = __dirname + "/README.md";
fs.readFile(filePath, "utf-8", function(err, data) {
    if (err)
        return console.log("Could not read file " + filePath);
    console.log(data);
});