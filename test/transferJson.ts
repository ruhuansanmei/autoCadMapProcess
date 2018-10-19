import { bd09togcj02, gcj02tobd09, wgs84togcj02, gcj02towgs84 } from "coordtransform"
import * as fs from "fs"

let task = () => {
  let sourceDataStr = fs.readFileSync("./shuju.geojson", { encoding: "utf-8" })
  let source = JSON.parse(sourceDataStr)
  console.log(source)
  source.features.map(x => {
    let gcjCor = wgs84togcj02(...x.geometry.coordinates)
    let bdCor = gcj02tobd09(...gcjCor)
    x.geometry.coordinates = bdCor
  })
  fs.writeFileSync("./result.geojson",JSON.stringify(source))
}


task()