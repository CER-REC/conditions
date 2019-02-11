# View Three

Actions in ViewThree will be used to compose the persisting sessions needed on the Trends Overlay view.

## Nested Components

* FeaturesMenu
* Chart
* SmallMultiplesLegend
* FeaturesDescription
* BrowseByBtn
* DetailedView

## Types

// one of theme, instrument, phase, type, status, filing
* SELECTED_FEATURE: string // used in Wheel, ProjectMenu, FeaturesMenu, and FeaturesLegend
// used in SmallMultiplesLegend.selected, StreamGraph.chartTitle, InstrumentsLegend.selected, BubbleChart.chartTitle
* SUB_FEATURE: string
* COMPANY_ID: number // used in V3.6

## Unit Testing

TODO: Provide table of automated unit test results and code coverage metrics.
