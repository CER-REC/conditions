# Location Wheel Minimap

This component is part of the Location Wheel component. It displays the select province and region, updating when the user selects a new region in the Location Wheel.

## Requirements

- [x] Draws an outline of the current province
  - Scaled to fill the height of its container
- [x] Colors in the current region
- [x] Updates when the selected region changes
- [x] Uses TopoJSON data to draw the map

## TopoJSON processing

- Reproject the original shapefile from UTM to WGS 84 (lat. + long.) I used QGIS as per [this article](http://blog.mastermaps.com/2013/06/converting-shapefiles-to-topojson.html). _Important:_ The exported file's text needs to remain encoded as ISO-8859-1 for accented characters to survive.
- `topojson -p -o economic_regions_2016_latlng_topo.json economic_regions_2016_latlng.shp`
- `toposimplify -n -S 1e-1 -F economic_regions_2016_latlng_topo.json -o economic_regions_2016_latlng_simplified.json`

  (1e-1 was the most I could simplify while keeping PEI reasonably intact)
