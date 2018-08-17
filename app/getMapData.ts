import geoJson = require("./133")
import samplePairData  = require("./data")
// import sourceX = require("./sourceX")
// import sourceY = require( "./sourceY")

import * as fs from 'fs'
// console.log(geoJson)

// y = ax + b

interface CalOption {
  a: number
  b: number
}

interface Sample {
  x: number
  y: number
}

interface SamplePair {
  one : Sample
  two : Sample
}

let getRealCordinate = (x: number, calOption: CalOption) => {
  let { a, b } = calOption
  return a * x + b
}

let calculateOption = (samplePair:SamplePair):CalOption =>  {
  let {one , two} = samplePair
  let x1 = one.x
  let y1 = one.y
  let x2 = two.x
  let y2 = two.y
  let a = ( y1 - y2) / (x1 - x2)
  let b = (x1*y2 - y1 * x2) / (x1 - x2)
  let calOption : CalOption = {a,b}
  return calOption
}

//测试计算结果
let calculateOptionTask = () => {
  let result = calculateOption(samplePairData)
  fs.writeFileSync("./resultData.json",JSON.stringify(result))
  console.log("task finish !!!")
}

calculateOptionTask()


let calculateOptionAboutX = () => {
  let sourceXStr = fs.readFileSync("./sourceData/sourceX.json",{encoding:"binary"})
  let sourceX = JSON.parse(sourceXStr)
  let result = calculateOption(sourceX)
  fs.writeFileSync("./result/resultX.json",JSON.stringify(result))
}

let calculateOptionAboutY = () => {
  let sourceYStr = fs.readFileSync("./sourceData/sourceY.json",{encoding:"binary"})
  let sourceY = JSON.parse(sourceYStr)
  let result = calculateOption(sourceY)
  fs.writeFileSync("./result/resultY.json", JSON.stringify(result))
}

let task = () => {
  calculateOptionAboutX()
  calculateOptionAboutY()
  return "task finish !!!"
}

// task()
let calThirdPoint = (lng:number, lat: number) => {
  let calOptionXStr  = fs.readFileSync("./result/resultX.json",{encoding:"binary"})
  let calOptionX = JSON.parse(calOptionXStr) 
  let calOptionYStr = fs.readFileSync("./result/resultY.json",{encoding:"binary"}) 
  let calOptionY = JSON.parse(calOptionYStr)
  let lntR = getRealCordinate(lng,calOptionX)
  let latR = getRealCordinate(lat, calOptionY)
  let result = {lntR, latR}
  console.log(result)
  console.log("task finish !!!")
}

let taskR = () => {
  calThirdPoint(-17630,6730)
}

taskR()

















