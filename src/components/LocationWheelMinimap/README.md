# Location Wheel Minimap

This component is part of the Location Wheel component. It displays the select province and region, updating when the user selects a new region in the Location Wheel.

## Requirements

- [ ] Draws an outline of the current province
  - Scaled to fill the height of its container
- [ ] Colors in the current region
- [ ] Updates when the selected region changes
- [ ] Uses GeoJSON data to generate the map
- [ ] Is hidden when the wheel is in the Company mode

## TopoJSON processing

- Used QGIS to reproject the original shapefile from UTM to WGS 84 (lat. + long.)
  - http://blog.mastermaps.com/2013/06/converting-shapefiles-to-topojson.html
- `topojson -p -o ler_000b16a_e_latlng.json ler_000b16a_e_latlng.shp`
- `toposimplify -n -S 1e-1 -F ./ler_000b16a_e_latlng.topojson -o ./output/toposimplify.json`

  (1e-1 was the most I could simplify while keeping PEI reasonably intact)
