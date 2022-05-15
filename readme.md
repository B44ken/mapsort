# mapsort

## what?
i wanted to know what % of my city was road/building/etc, so i made an app for it

## how?
predownloaded geojson datasets are in `geo/`. use it by putting the name in a browser hash, like [p27.ca/mapsort#sanantonio](https://p27.ca/mapsort#sanantonio). datasets can be downloaded from [overpass-turbo.eu](https://overpass-turbo.eu).
once a dataset is downloaded, pan the map so the whole thing is visible, and click `dump`. a bunch of images will be created at the bottom of the page.
at this point, the pixels in these images would be counted for a % of total image reading.
