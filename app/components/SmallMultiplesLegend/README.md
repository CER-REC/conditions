# SmallMultiplesLegend

The SmallMultiplesLegend component is a component used in view 3 as the corresponding stream
graph's legend and filter control. (Refer to V3.2 in the Conditions Design Doc)

## Requirements

* [x] Renders a title
* [x] Renders List component with a list of LegendItem components and a "All" LegendItem
 * [x] Creates the "All" item
 * [x] Creates a list of LegendItem components from passed in data
* [ ] Account for empty list
* [x] List component onChange triggers the SmallMultiplesLegend component onChange
* [ ] Highlights a specified item
 * [x] Sets all other items to be transparent
 * [ ] Sets List component controls to be transparent
