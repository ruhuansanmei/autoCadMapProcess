import {parseString, denormalise, groupEntitiesByLayer, toSVG } from 'dxf'
import * as fs from 'fs'


let test = () => {
  let parsedData = parseString(fs.readFileSync("./上图.dxf",{encoding:"utf-8"}))

  let entities = denormalise(parsedData)
  console.log(entities)
  let set = new Set()
  for(let entity of entities) {
    set.add(entity.type)
  }

  console.log(set)
  // console.log(entities.map(x => x.type))

  // console.log(parsedData)

}

test()