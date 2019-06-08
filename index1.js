var Parser = require('./parser');
var fs = require('fs');
var Tracer = require('pegjs-backtrace');
var {Tracer} =  require('./script');

var input = "2 * (3 + 4)";

var tracer = new Tracer(input);

Parser.parse(input, {tracer: tracer});
// var tracer = new Tracer(input,{
//     parent: new Parser.DefaultTracer()
//   });

// Parser.parse(input, {tracer: tracer});
// //console.log();

fs.writeFile('./result.json', JSON.stringify(tracer.getResult(), null, 2), function(err) {
    if(err) throw err;
});