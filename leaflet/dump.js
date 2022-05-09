var canvas
var download
var imageTime = 300
const dumpData = (time=imageTime) => {
    const catArr = [...categories]
    for(let c in catArr) {
        c = Number(c)
        setTimeout(saveCategory, time * c, catArr[c])
    }
}

const saveCategory = async (cat) => {
    dumpCategory(cat)
    canvas = document.querySelector('canvas')
    download = document.querySelector('a.download')
    hidden = document.querySelector('.imgdump')
    // save canvas as image
    setTimeout(() => {
        const data = canvas.toDataURL('image/png')
        const image = document.createElement('img')
        image.id = cat
        image.src = data
        hidden.appendChild(image)
    }, 50)
}

const dumpCategory = (cat) => {
    const [mainCat, subcat] = cat.split('-')
    if(cat == '*') {
        geojson.setStyle((feature) => {
            return { color: "#f0f", fillOpacity: 1, width: highwayWidth() }
        })
        map.invalidateSize()
        return
    }

    geojson.setStyle(feature => {
        const prop = feature.properties[mainCat]
        if(prop && (prop == subcat || subcat == '*')) {
            return { color: "#f0f", fillOpacity: 1 }
        } else {
            return { fillOpacity: 0, opacity: 0 }
        }
    })
    map.invalidateSize()
}