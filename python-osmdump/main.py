
from csv import excel_tab
import numpy
import json
from msilib import type_binary
from tarfile import ENCODING
import img

FILENAME='maps/nyclower.geojson'
BBOX = (40.69899090674369,-74.02055740356445,40.74101426921151,-73.96820068359375)
SIZE = 2048

raster = img.new_img(SIZE, SIZE)
xmin, ymin, xmax, ymax = BBOX

geojson = json.load(open(FILENAME, encoding='utf-8'))

def classify(feature):
    props = feature['properties']
    # "@id": "way/1234"
    if props['@id'].split('/')[0] != 'way':
        return None 
    for category in ['highway', 'amenity', 'leisure', 'building']:
        if category in props:
            return category + '_' + props[category]

def draw_specific(item, coords, raster):
    if item[0] == 'building':
        img.draw_polygon(raster, coords, (255, 255, 255))
    elif item[0] == 'highway':
        img.draw_polyline(raster, coords, (255, 0, 255), 3)
    elif item[0] == 'leisure':
        img.draw_polygon(raster, coords, (0, 255, 0))
    elif item[0] == 'amenity':
        img.draw_polygon(raster, coords, (0, 0, 255))

for feat in geojson['features']:
    item = classify(feat)
    if not item:
        continue
    item = item.split('_')
    coords = feat['geometry']['coordinates'][0]
    try:
        draw_specific(item, coords, raster)
    except TypeError:
        pass

img.save_img(raster)