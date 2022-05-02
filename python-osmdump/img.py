import cv2, numpy

BBOX=(40.69899090674369,-74.02055740356445,40.74101426921151,-73.96820068359375)

def new_img(xsize, ysize):
    return numpy.empty((xsize, ysize, 3), dtype=int)

def draw_polygon(image, coords, color):
    box = BBOX
    size = image.shape[0]
    scaled = [scale(c, box, size) for c in coords]
    cv2.fillPoly(image, [numpy.array(scaled, dtype=int)], color)

def draw_polyline(image, coords, color, thick):
    box = BBOX
    size = image.shape[0]
    scaled = [scale(c, box, size) for c in coords]
    cv2.polylines(image, [numpy.array(scaled, dtype=int)], False, color, thick)

def draw_circle(image, coords, color, radius):
    box = BBOX
    size = image.shape[0]
    scaled = scale(coords, box, size)
    cv2.circle(image, scaled, radius, color, -1)

def scale(coord, box, size):
    x = size - int((coord[1] - box[0]) / (box[2] - box[0]) * size)
    y = int((coord[0] - box[1]) / (box[3] - box[1]) * size)
    return y, x

# write raster to building.png
def save_img(raster):
    # Image.fromarray(numpy.array(raster)).save('building.png')
    cv2.imwrite('building.png', raster)
    cv2.imwrite