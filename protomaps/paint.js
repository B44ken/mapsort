const colors = {
    "water": "steelblue",
    "buildings": "darkgrey",
    "roads": "black",
    "landuse": "mediumseagreen"
}


const paintRules = [
    {
        "dataLayer": "water",
        "symbolizer": new protomaps.PolygonSymbolizer({ "fill": "steelblue" })
    }, {
        "dataLayer": "landuse",
        "symbolizer": new protomaps.PolygonSymbolizer({ "fill": "mediumseagreen" })
    }, {
        "dataLayer": "roads",
        "symbolizer": new protomaps.LineSymbolizer({ "stroke": "black", "width": 8 })
    }, {
        "dataLayer": "buildings",
        "symbolizer": new protomaps.PolygonSymbolizer({ "fill": "darkgrey" })
    }
]