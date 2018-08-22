// import geoJson = require("./133")
// import samplePairData  = require("./data")
// import sourceX = require("./sourceX")
// import sourceY = require( "./sourceY")
"use strict";
var fs = require("fs");
var getRealCordinate = function (x, calOption) {
    var a = calOption.a, b = calOption.b;
    return a * x + b;
};
var calculateOption = function (samplePair) {
    var one = samplePair.one, two = samplePair.two;
    var x1 = one.x;
    var y1 = one.y;
    var x2 = two.x;
    var y2 = two.y;
    var a = (y1 - y2) / (x1 - x2);
    var b = (x1 * y2 - y1 * x2) / (x1 - x2);
    var calOption = { a: a, b: b };
    return calOption;
};
//测试计算结果
var calculateOptionTask = function () {
    var result = calculateOption(samplePairData);
    fs.writeFileSync("./resultData.json", JSON.stringify(result));
    console.log("task finish !!!");
};
// calculateOptionTask()
var calculateOptionAboutX = function () {
    var sourceXStr = fs.readFileSync("./sourceData/sourceX.json", { encoding: "binary" });
    var sourceX = JSON.parse(sourceXStr);
    var result = calculateOption(sourceX);
    fs.writeFileSync("./result/resultX.json", JSON.stringify(result));
};
var calculateOptionAboutY = function () {
    var sourceYStr = fs.readFileSync("./sourceData/sourceY.json", { encoding: "binary" });
    var sourceY = JSON.parse(sourceYStr);
    var result = calculateOption(sourceY);
    fs.writeFileSync("./result/resultY.json", JSON.stringify(result));
};
var task = function () {
    calculateOptionAboutX();
    calculateOptionAboutY();
    return "task finish !!!";
};
// task()
var calThirdPoint = function (lng, lat) {
    var calOptionXStr = fs.readFileSync("./result/resultX.json", { encoding: "binary" });
    var calOptionX = JSON.parse(calOptionXStr);
    var calOptionYStr = fs.readFileSync("./result/resultY.json", { encoding: "binary" });
    var calOptionY = JSON.parse(calOptionYStr);
    var lntR = getRealCordinate(lng, calOptionX);
    var latR = getRealCordinate(lat, calOptionY);
    var result = { lntR: lntR, latR: latR };
    console.log(result);
    console.log("task finish !!!");
};
var taskR = function () {
    calThirdPoint(-17630, 6730);
};
taskR();
var calExternalPoint = function (lng, lat) {
    var calOptionX = { "a": 0.000005833373473949451, "b": 116.36259045415659 };
    var calOptionY = { "a": 0.000004496058479481112, "b": 39.873504132281035 };
    var lntR = getRealCordinate(lng, calOptionX);
    var latR = getRealCordinate(lat, calOptionY);
    var result = { lntR: lntR, latR: latR };
    // console.log(result)
    // console.log("task finish !!!")
    return result;
};
exports.calExternalPoint = calExternalPoint;
