# Redux

For this visualization, the actions folder for Redux holds individual files for the Types that
will be used by multiple components in the visualization.

For actions that will be used consistently throughout the visualization, a unique folder will be
made using the standard process of an index, spec, and README file. The README will note what 
components will use this action.

Actions that are related be grouped together in a single folder. For example, the SearchBar
folder will hold the search actions. These values will be used in the Wheel, ProjectMenu,
ConditionDetails, etc. 

In Redux, we have an action type (string), the action creator (function that generates an object), and
action reducer (function that combines the current state with an action to give a new state). These
work together to generate the action message and turn it into our final Redux state.

Check /documentation/Data/redux.md to get a full list of actions
