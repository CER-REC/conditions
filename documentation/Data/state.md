# State

Template of data for component states:
Asertisks in the doc denote states that can be found one level up the architecture.
  For example, *location in the Wheel can be found in View 2

<pre>
{
    
    search: string, // used in View1.search, View2.search, View3.DetailedView.search
    location: boolean, // used in View2.location, View3.BrowseByBtn.mode
    companyID: number, // used in View2.Wheel.selectedID, View3.companyID
    instrumentCondition: string, // used in View2.DetailedView.selectedID, View3.DetailedView.selectedID
    feature: string, // used in View2.selectedFeature, View3.feature
    
    View1: {
        page: number,
        open: boolean,
        x: number,
        y: number,
        *search: string,

        ShortcutInfoBar: {
          expanded: boolean,
        }
    },
    
    View2: {
        *selectedFeature: string, // used in Wheel.feature, ProjectMenu.selectedFeature, FeaturesMenu.selected, FeaturesLegend.selectedFeature
        *location: boolean, // used in Wheel.location, FeaturesLegend.isProjectLegend, BrowseByBtn.location
        *search: string, // used in Wheel.search, ProjectMenu.search, DetailedView.search

        SearchBar: {
          keywords: [string],
          exceptKeywords: [string]
          findAny: boolean,
          yearRange: { number, number},
          projectStatus: [string], // one of open, closed, or cancelled
          filterTab: boolean, // if false, show search content
        },

        TrendButton : {
          *selectedFeature: string, // used in View2.selectedFeature
        },
        
        Wheel: {
            *location: boolean,
            *search: string,
            *feature: string, // one of theme, instrument, phase, type, status, filing (only needed for location to determine charts in location)
            selectedID: number, // company/region id (assuming region id is a number)
            filterYears: [number],
            *projectStatus: [string], // used in SearchBar.projectStatus
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
            *mode: string, // one of location, company (based on location boolean)
        },
        
        DetailedView: {
            *search: string,
            *selectedID: string, // condition/instrument id (in case ids overlap, might need to prefix ids)
            scroll: number, // needed?
            projectName: string, // blank for location view
        },
    },

    View3: {
        *feature: string, // used in FeaturesMenu.selected, SmallMultiplesLegend.title
        subFeature: string, // used in SmallMultiplesLegend.selected, StreamGraph.chartTitle, InstrumentsLegend.selected, BubbleChart.chartTitle
        companyID: number, // used in V3.6
        
        FeaturesMenu: {
            *selected: string, // one of theme, instrument, phase, type, status, filing
        },
        
        // if View3.selected !== instrument
        StreamGraph : {
            *chartTitle: string, // based on feature/sub-feature
            selectedYear: number,
        },
        
        // if View3.selected !== instrument
        SmallMultiplesLegend: {
            *title: string, // based on feature
            *selected: string, // a sub feature
        },

        // if View3.selected === instrument
        BubbleChart: {
            *chartTitle: string, // based on sub-feature
            selectedCategory: string,
        },

        // if View3.selected === instrument
        InstrumentsLegend : {
            selected: string, // one of routing, construction, opening, abandonment, safety, tariffs, misc (misc might be blank)
        },

        // in both cases (including V3.5 Feature Types Description)
        FeatureDescription: {
            description: string,
            feature: string,
            scroll: number, // needed?
        },

        BrowseByBtn: {
            *mode: string, // one of location, company (based on location boolean)
        }
        
        DetailedView: {
            *search: string,
            *selectedID: string, // condition/instrument id (in case ids overlap, might need to prefix ids)
            scroll: number, // needed?
            projectName: string, // blank for location view
            open: boolean,
        },
    },

    Footer: {
      selectedTextBox: string, // one of 'About', 'Methodology', or 'Downloads'
    },

    Screenshot: {
      nebLogo: boolean
      bitlyUrl: '',

      // if ViewOne
      viewOneScreenshot: {
        page: number,
        open: boolean,
        x: number,
        y: number,
        *search: string,
      },

      // if ViewTwo
      viewTwoScreenshot : {
        *selectedFeature: string, // used in Wheel.feature, ProjectMenu.selectedFeature, FeaturesMenu.selected, FeaturesLegend.selectedFeature
        *location: boolean, // used in Wheel.location, FeaturesLegend.isProjectLegend, BrowseByBtn.location
        *search: string, // used in Wheel.search, ProjectMenu.search, DetailedView.search
      },

      // if ViewThree
      viewThreeScreenshot: {
        *feature: string, // used in FeaturesMenu.selected, SmallMultiplesLegend.title
        subFeature: string, // used in SmallMultiplesLegend.selected, StreamGraph.chartTitle, InstrumentsLegend.selected, BubbleChart.chartTitle
        companyID: number, // used in V3.6
      },
    },

}
</pre>

