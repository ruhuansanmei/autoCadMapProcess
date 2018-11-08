import { bd09togcj02, gcj02tobd09, wgs84togcj02, gcj02towgs84 } from "coordtransform"
import * as fs from "fs"

let t84_02 = () => {
    let dataSource = fs.readFileSync('./haidian.geojson','utf-8')
    let data = JSON.parse(dataSource)  
    data.features.map(feature => {
      feature.geometry.coordinates.map(polygen => polygen.map(point => {
        let  newPoint =  wgs84togcj02(...point)
        point[0] = newPoint[0]
        point[1] = newPoint[1]
        console.log(point)
        // throw("break")

      }))
    })
    fs.writeFileSync('./rrr.json',JSON.stringify(data))
    console.log('finish')  
}
t84_02()