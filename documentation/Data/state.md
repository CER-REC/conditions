# State

Template of data for component states:

<pre>
{
    
    search: string, // used in View1.search, View2.search, View3.DetailedView.search
    location: boolean, // used in View2.location, View3.BrowseByBtn.mode
    companyID: number, // used in View2.Wheel.selectedID, View3.companyID
    instrumentCondition: number, // used in View2.DetailedView.selectedID, View3.DetailedView.selectedID
    
    View1: {
        page: number,
        open: boolean,
        x: number,
        y: number,
        search: string,
    },
    
    View2: {
        selectedFeature: string, // used in Wheel.feature, ProjectMenu.selectedFeature, FeaturesMenu.selected, FeaturesLegend.selectedFeature
        location: boolean, // used in Wheel.location, FeaturesLegend.isProjectLegend, BrowseByBtn.location
        search: string, // used in Wheel.search, ProjectMenu.search, DetailedView.search
        
        Wheel: {
            *location: boolean,
            *search: string,
            *feature: string, // one of theme, instrument, phase, type, status, filing (only needed for location to determine charts in location)
            selectedID: number, // company/region id (assuming region id is a number)
            filterYears: [number],
            filterStatus: [string], // one of open, closed, canceled, draft?
        },
        
        ProjectMenu: {
            *selectedFeature: string, // one of theme, instrument, phase, type, status, filing
            *search: string, // searched terms or ... should be highlighted if possible
            selectedProjectID: number,
        },
        
        FeaturesMenu: {
            *selected: string, // one of theme, instrument, phase, type, status, filing
        },
        
        FeaturesLegend: {
            *selectedFeature: string, // one of theme, instrument, phase, type, status, filing
            *isProjectLegend: boolean, // inverse of wheel location boolean
        },
        
        BrowseByBtn: {
            *mode: string, // one of location, company
        },
        
        DetailedView: {
            *search: string,
            *selectedID: number, // condition/instrument id
            scroll: number, // needed?
            projectName: string, // blank for location view
        },
    }

    View3: {
        feature: string, // used in FeaturesMenu.selected, SmallMultiplesLegend.title
        subFeature: string, // used in SmallMultiplesLegend.selected, StreamGraph.chartTitle, InstrumentsLegend.selected, BubbleChart.chartTitle
        companyID: number, // used in V3.6
        
        FeaturesMenu: {
            *selected: string, // one of theme, instrument, phase, type, status, filing
        },
        
        // if View3.selected !== instrument
        SmallMultiplesLegend: {
            *title: string, // based on feature
            *selected: string, // a sub feature
        },

        BubbleChart: {
            *chartTitle: string, // based on sub-feature
            selectedCategory: string,
        },

        // if View3.selected === instrument
        InstrumentsLegend : {
            selected: string, // one of routing, construction, opening, abandonment, safety, tariffs, misc (misc might be blank)
        },

        StreamGraph : {
            *chartTitle: string, // based on feature/sub-feature
            selectedYear: number,
        },

        // in both cases (including V3.5 Feature Types Description)
        FeatureDescription: {
            description: string,
            feature: string,
            scroll: number, // needed?
        },

        BrowseByBtn: {
            *mode: string, // one of location, company
        }
        
        DetailedView: {
            *search: string,
            *selectedID: number, // condition/instrument id
            scroll: number, // needed?
            projectName: string, // blank for location view
            open: boolean,
        },
    }
    
}
</pre>

