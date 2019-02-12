# Redux

For this visualization, the actions folder for Redux holds individual files for the Types that
will be used by multiple components in the visualization.

For actions that will be used consistently throughout the visualization, a unique folder will be
made using the standard process of an index, spec, and README file. The README will note what 
components will use this action.

Actions that will influence the same component will be grouped together in a single folder. An
example will be actions needed in the Search. The types will be defined inside the file but the
folder itself will be called Search.

Check /documentation/Data/redux.md to get a full list of actions