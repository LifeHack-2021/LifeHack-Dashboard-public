let API_KEY = "AIzaSyBpRTg2qHFjwD2f7dO0upMRrvjbkCc8cwU"
let axios = require('axios')

let randomSgCoord = () => {
    let lngDiff = (104.03050544597075 - 103.63920895308122) / 4
    let latDiff = (1.4643992538631734 - 1.2623355324310437) / 4
    let lngCoord, latCoord
    if (Math.random() < 0.5) {
      lngCoord = Math.random() * lngDiff + 103.8198
    } else {
      lngCoord = -Math.random() * lngDiff + 103.8198
    }
  
    if (Math.random() < 0.5) {
      latCoord = Math.random() * latDiff + 1.3521
    } else {
      latCoord = -Math.random() * latDiff + 1.3521
    }
    
    return { lat: latCoord, lng: lngCoord }
  }

const getAddr = async (obj) => {
    try {
      let addUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${obj.lat},${obj.lng}&key=${API_KEY}`
      let res = await axios.get(addUrl)
      let origin = await res.data.results[0].formatted_address
      return origin
    
    }
    catch (err) {
      console.log(err)
      return false
    }    
}
    
const getPath = async (node1, node2) => {
  let origin = await getAddr(node1)
  let destination = await getAddr(node2)
  
  console.log(origin, '|', destination)
  let pathUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${API_KEY}`
  let data = await axios.get(pathUrl)
  //distance in metres
  let distance = data.data.routes[0].legs[0].distance.value
  
  //duration in seconds
  let time = data.data.routes[0].legs[0].duration.value
  
  console.log(`from (${origin}) to (${destination})`)
  console.log('distance: ', distance, 'time: ', time)
}

module.exports = { randomSgCoord, getPath }