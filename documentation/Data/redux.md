# Redux

Template for what data persists across sessions in the visualization:

<pre>
{
    
    View1: {
        open: boolean,
        search: string,

        ShortcutInfoBar: {
          expanded: boolean,
        },
    },
    
    View2: {
        ```selectedFeature: string, ``` // used in Wheel.feature, ProjectMenu.selectedFeature, FeaturesMenu.selected, FeaturesLegend.selectedFeature
        ```mode: string,``` // used in Wheel.location, FeaturesLegend.isProjectLegend, BrowseByBtn.location

        SearchBar: {
          filterTab: boolean, // if false, show search content
        },

        TrendButton : {
          ```selectedFeature: string,``` // used in View2.selectedFeature
        },
        
        Wheel: {
            ```mode: string,``` // either company or location
            ```feature: string,``` // one of theme, instrument, phase, type, status, filing (only needed for location to determine charts in location)
        },
        
        ProjectMenu: {
            ```selectedFeature: string,``` // one of theme, instrument, phase, type, status, filing
        },
        
        FeaturesMenu: {
            ```selected: string,``` // one of theme, instrument, phase, type, status, filing
        },
        
        FeaturesLegend: {
            ```selectedFeature: string,``` // one of theme, instrument, phase, type, status, filing
            ```mode: string,``` // show different legends for company or location
        },
        
        BrowseByBtn: {
            ```mode: string,``` // one of location, company (based on location boolean)
        },
        
        DetailedView: {
            ```search: string,```
            ```selectedID: string,``` // condition/instrument id (in case ids overlap, might need to prefix ids)
            projectName: string, // blank for location view
        },
    },

    View3: {
        ```feature: string,``` // used in FeaturesMenu.selected, SmallMultiplesLegend.title
        subFeature: string, // used in SmallMultiplesLegend.selected, StreamGraph.chartTitle, InstrumentsLegend.selected, BubbleChart.chartTitle
        companyID: number, // used in V3.6
        
        FeaturesMenu: {
            ```selected: string,``` // one of theme, instrument, phase, type, status, filing
        },

        Chart: {
          notInstruments: boolean, // if not instruments, show the Streamgraph
        }
        
        // if View3.selected !== instrument
        SmallMultiplesLegend: {
            ```notInstruments: boolean,```
            ```title: string,``` // based on feature
            ```selected: string,``` // a sub feature
        },

        // in both cases (including V3.5 Feature Types Description)
        FeatureDescription: {
            feature: string,
        },

        BrowseByBtn: {
            ```mode: string,``` // one of location, company (based on location boolean)
        }
        
        DetailedView: {
            ```search: string,```
            projectName: string, // blank for location view
            open: boolean,
        },
    },

    Screenshot: {
      isShown: boolean // if false, then hide when in screenshot mode

}
</pre>

