var map = L.map('map', {
    // zoomControl: false,
    // dragging: false
    preferCanvas: true
}).setView([42.26632, -83.015534], 15);

// map.on('click', event => {})

// stackoverflow.com/a/54024653/6174259
function HSV(h,s,v) {                              
  let f= (n,k=(n+h/60)%6) => v - v*s*Math.max( Math.min(k,4-k,1), 0);     
  let c = n => Math.floor(255*n).toString(16).padStart(2, 0)
  return '#' + [f(5),f(3),f(1)].map(c).join('');
}

const categories = new Set()
categories.add('anything')

var stylePretty = feature => {
    const { highway, building, amenity, leisure } = feature.properties
    for(const item of ["highway", "building", "amenity", "leisure"]) {
        if(feature.properties[item]) categories.add(`${item}-${feature.properties[item]}`)
    }

    const config = {
        color: HSV(0, 1, 1),
        fillOpacity: 1
    }

    // meter-pixel ratio, 111000m ~= 1 degree latitude
    var bounds = map.getBounds()
    var scale = (Math.abs(bounds._southWest.lat - bounds._northEast.lat) * 111000) / innerHeight

    if(highway) {
        config.color = HSV(0, 0, 0.2)
        config.weight = 0.8 * scale
        if(highway == "primary" || highway == "secondary") config.weight = 1.2 * scale
    } else if(building) {
        config.color = HSV(20, 1, 1)
        if(building == 'retail') config.color = HSV(0, 1, 0.5)
    } else if(amenity) {
        config.color = HSV(230, 1, 1)
        if(amenity == 'parking') config.color = HSV(230, 1, 0.5)
        if(amenity == 'place_of_worship') config.color = HSV(230, 0.5, 1)
        if(amenity == 'school') config.color = HSV(230, 0.5, 0.5)
    } else if(leisure) {
        config.color = HSV(120, 0.6, 1)
    }
    return config
}

dataset = 'nycmicro.geojson'
area = [0, 0]
if(location.hash) dataset = location.hash.replace('#','') + '.geojson'

if(dataset == 'suburb.geojson') area = [42.26632, -83.015534] 
if(dataset.startsWith('nyc')) area = [40.73, -74.00]

map.setView(area, 15)

var geojson

fetch(dataset)
    .then(r => r.json())
    .then(geo => {
        geo.features = geo.features.filter(e => e.geometry.type != "Point")
        geojson = L.geoJSON(geo, { style: stylePretty }).addTo(map)
    })
