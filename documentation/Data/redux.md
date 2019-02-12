# Redux

Template for what data persists across sessions in the visualization:

<pre>
{


    ```selectedFeature: string, ``` // used in Wheel, ProjectMenu, FeaturesMenu, FeaturesLegend, 
    TrendButton, DetailedView, ViewThree, FeatureDescription
    ```mode: string, ``` // used in Wheel, FeaturesLegend, BrowseByBtn, ViewTwo
    ```selectedSubFeature: string``` // used in SmallMultiplesLegend, Streamgraph, InstrumentsLegend, BubbleChart

    expandGuide: boolean, // used for viewOne guide
    expandDetailView: boolean, // used for the Detail View
    notInstruments: boolean, // used for the SmallMultiplesLegend
    isShown: boolean, // used for the Screenshot mode
    position: number, // used in Project Menu
    companyId: number, // used in View 3.6

    DetailedView: {
      ```selectedID: string,``` // condition/instrument id (in case ids overlap, might need to prefix ids)
      projectName: string, // blank for location view
    },


}
</pre>

