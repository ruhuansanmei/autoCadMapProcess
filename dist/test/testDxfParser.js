"use strict";
var dxf_1 = require("dxf");
var fs = require("fs");
var test = function () {
    var parsedData = dxf_1.parseString(fs.readFileSync("./上图.dxf", { encoding: "utf-8" }));
    var entities = dxf_1.denormalise(parsedData);
    console.log(entities);
    var set = new Set();
    for (var _i = 0, entities_1 = entities; _i < entities_1.length; _i++) {
        var entity = entities_1[_i];
        set.add(entity.type);
    }
    console.log(set);
    // console.log(entities.map(x => x.type))
    // console.log(parsedData)
};
test();
