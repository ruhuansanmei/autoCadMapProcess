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

/**
 * 带自定义偏移的石景山转换
 * @param fileName 
 */
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
/**
 * 带自定义偏移的石景山转换
 * @param fileName 
 */
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

let toButtomMap = (fileName) => {
  let dataSource = fs.readFileSync(`${fileName}`,'utf-8')
  let data = JSON.parse(dataSource) 
  let changeK = (k,prop, origin, short) => {
    if ( k == origin) {
      prop[short] = prop[k]
      delete prop[k]
    }
  } 
  data.features.map(feature => {
    let properties = feature.properties
    for (let i in properties) {
      changeK(i,properties,"专指平台序号","专指号")
      changeK(i,properties,"疏解腾退空间类别","腾退类别")
      changeK(i,properties,"台账项目名称","台账名称")
      changeK(i,properties,"六个一批类型","六个一批")
      changeK(i,properties,"第一批拆违序号","拆违序号")
      changeK(i,properties,"点位实施单位","实施单位")
      changeK(i,properties,"再利用方向","再利用")
      changeK(i,properties,"联席会议牵头单位","牵头单位")
      changeK(i,properties,"再利用项目名称","再利用")
      changeK(i,properties,"主要任务类别","任务类别")
    }
    feature.geometry.coordinates.map(multi => {
      if (feature.geometry.type == "Polygon") {
      multi.map(point => {
        // point[0] = point[0] * 1.2685314685322508 - 32.073255153808205
        // point[1] = point[1] * 0.9688979905287494 + 37.239365591321075
        // console.log(point)
        // throw("break")
        let newPoint = gcj02towgs84(...point)
        point[0] = newPoint[0]
        point[1] = newPoint[1]
      })
    } else {
      multi.map((ll) =>{
        ll.map(point => {
          // point[0] = point[0] * 1.2685314685322508 - 32.073255153808205
          // point[1] = point[1] * 0.9688979905287494 + 37.239365591321075
          // console.log(point)
          // throw("break")
          let newPoint = gcj02towgs84(...point)
          point[0] = newPoint[0]
          point[1] = newPoint[1]
        })
      })
    }
    })
  })
  fs.writeFileSync(`${fileName}.result`,JSON.stringify(data))
  console.log('finish')  
}

toButtomMap("./园林.json")


// addOriginData("./园林绿化局.json")

/**
 * 通州数据的84转02
 */

let tongzhou84_02 = (fileName) => {
  let dataSourceStr = fs.readFileSync(`./${fileName}`,'utf-8')
  let dataSource = JSON.parse(dataSourceStr)
  dataSource.features.map(feature => {
    feature.geometry.coordinates.map(l1 => {
      l1.map(l2 => {
        l2.map(l3 => {
          console.log(l3)
          let resultPoint = wgs84togcj02(...l3)
          l3[0] = resultPoint[0]
          l3[1] = resultPoint[1]
        })
      })
    })
  })
  fs.writeFileSync(`./${fileName}.result.json`,JSON.stringify(dataSource))
  console.log("task finished")
}


// tongzhou84_02("./tongzhou.geojson")


