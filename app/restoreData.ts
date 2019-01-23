import { bd09togcj02, gcj02tobd09, wgs84togcj02, gcj02towgs84 } from "coordtransform"
import * as fs from "fs"

let t84_02 = () => {
    let dataSource = fs.readFileSync('./haidian.geojson','utf-8')
    let data = JSON.parse(dataSource)  
    data.features.map(feature => {
      feature.geometry.coordinates.map(multi => {
        multi.map(polygen => polygen.map(point => {
          let  newPoint =  wgs84togcj02(...point)
          if (!newPoint[0]) {
            console.log(point)
          }
          point[0] = newPoint[0] + 0.0014163143596789814
          point[1] = 0.9999995194772249 * newPoint[1] + 0.0000520958819648871
          // console.log(point)
          // throw("break")
        }))
      })
    })
    fs.writeFileSync('./rrr.json',JSON.stringify(data))
    console.log('finish')  
}
// t84_02()


let t02_84 = (fileName) => {
  let dataSource = fs.readFileSync(`${fileName}`,'utf-8')
  let data = JSON.parse(dataSource)  
  data.features.map(feature => {
    feature.geometry.coordinates.map(multi => {
      multi.map(point => {
        point[0] = (point[0] +   34.905883856996464)/1.292791325934339
        point[1] = (point[1] - 37.16198140447259)/0.9976295236001904
        let  newPoint =  gcj02towgs84(...point)
        if (!newPoint[0]) {
          console.log(newPoint)
        } else {
          console.log(newPoint)  
        }
        point[0] = newPoint[0] 
        point[1] = newPoint[1] 
        // console.log(point)
        // throw("break")
      })
    })
  })
  fs.writeFileSync(`${fileName}.result`,JSON.stringify(data))
  console.log('finish')  
}


// t02_84("./geo2.json")

let addOriginData = (fileName) => {
  let originDataStr = fs.readFileSync(`./originData.json`,'utf-8')
  let originData = JSON.parse(originDataStr)
  let dataSource = fs.readFileSync(`${fileName}`,'utf-8')
  let data = JSON.parse(dataSource)  
  let count = 0
  let exchangeData = (featureArg, originDataArg) => {
    for (let ft of originDataArg.features) {
      if (featureArg.properties["artificial_id"] == ft.properties['attributeI']) {
        featureArg.geometry = ft.geometry  
        ++count
        break
      }
    }
  }
  data.features.forEach(feature => {
    exchangeData(feature,originData)
  })

  fs.writeFileSync(`${fileName}.result`,JSON.stringify(data))
  console.log('finish')  
  console.log(count)
}

addOriginData("./园林绿化局.json")
