"use strict";

var Test = require("./modules/newmodule"),
    Sample = require('./modules/sample'),
    sample = new Sample();

console.log("something");
console.log(Test);
console.log("something else");

sample.method();