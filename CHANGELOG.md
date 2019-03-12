## [0.2.1](http://neb-conditions-devdoc.s3-website.us-west-2.amazonaws.com/v0.2.1) (2019-03-01)


### viewTwo

* **Code Refactoring:** remove row styles (e42708c)
* **Code Refactoring:** remove styles for code consistency (5dce849)
* **Code Refactoring:** removed code for consistency with previous version (4e5a3a6)


### app/views

* **Bug Fixes:** fix left margin (2535593)


### App/view2 and 3

* **Bug Fixes:** fix header positioning (c9b8e45)


### Visualization

* **Code Refactoring:** button styles fixed (2ebb55c)
* **Code Refactoring:** removed background color for buttons (a922861)
* **Code Refactoring:** Reset h tags in visualization (a84d2c9)


### SearchBar

* **Code Refactoring:** refactored function (dd2c86a)
* **Documentation:** fixes bugs in storybook interactions (4e03c0c, NEBV-1320)


### View3, ConditionDetails

* **Features:** uses Redux actions for ConditionDetails, relocates mock data (fbd7fc6)

# [0.2.0](http://neb-conditions-devdoc.s3-website.us-west-2.amazonaws.com/v0.2.0) (2019-03-01)


### ViewTwo

* **Bug Fixes:** fixes PR concerns (96a66cf, NEBV-1320)
* **Code Refactoring:** switch back the selectRay to a function (e3f1f7e)


### ViewOne

* **Features:** updates sizing to match design doc (6acc730, NEBV-1263)
* **Features:** adds missing translations (f91e580, NEBV-1263)
* **Code Refactoring:** add back the onclick noop handler for the browsebybtn (8c6b1c4)


### App/View2

* **Bug Fixes:** fix the moon and sun delightful rendering (e81b495)


### CompanyWheel

* **Features:** integrates with ViewTwo stories (67fd46c, NEBV-1327)
* **Code Refactoring:** updated snapshots, and spelling fix (afd2f62, NEBV-1320)


### View2

* **Bug Fixes:** fix proptypes linting error (02108b7)


### Snapshots

* **Bug Fixes:** fixes out of date snapshots (9ec57e8, NEBV-1320)


### Deploy

* **Bug Fixes:** Very dirty hacks to get it working in the WET template (c6805a5)


### View 2, SearchBar

* **Features:** makes SearchBar display over-top of the view (b3cdf7f)


### View3/BubbleChartIndicator

* **Bug Fixes:** fix indicator on view3 (1324995)


### BubbleChart and view3

* **Bug Fixes:** adapting to new redux config (3c33a33)


### SearchBar

* **Features:** added prompt position change based on input focus (0f32ca7, NEBV-1308)
* **Features:** integrated searchBar with filter functionality (728f929, NEBV-1320)
* **Features:** updated snapshots (a98093a, NEBV-1308)
* **Features:** fixed PR comments (40f1502, NEBV-1308)
* **Features:** fixed PR comments (2053662, NEBV-1308)
* **Features:** improved suggestedKeyword arrow design (cd663bb, NEBV-1304)
* **Features:** added display of text on highlight (1f503ba, NEBV-1259)
* **Features:** added sort functionality, refactored proptypes, and added tests (e63684c, NEBV-1279)
* **Features:** added dropdown component for advanced search (ad88485, NEBV-1282)
* **Features:** normalized data and connected with storybook interaction (92620c3, NEBV-1308)
* **Features:** integrating searchbar components (d022654, NEBV-1308)
* **Features:** added searchbar component and trends button without styling (128e9f3, NEBV-1320)
* **Bug Fixes:** prop names fix to avoid prop name conflict during testing (d54adbb, NEBV-1282)
* **Bug Fixes:** reduced function calls, improved styles (69fcf9c, NEBV-1282)
* **Bug Fixes:** fixed bug with search popout (312e9cf, NEBV-1308)
* **Bug Fixes:** fixed rendering issue in storybook filterContent (b64233c, NEBV-1308)
* **Bug Fixes:** storybook props and naming fix (611116d, NEBV-1308)
* **Tests:** fixed test issues with propTypes (7098f58, NEBV-1308)
* **Code Formatting:** changed additional comments in colors styles (ddd3c29, NEBV-1304)
* **Code Formatting:** fixed linting error (f566e8d, NEBV-1279)
* **Code Formatting:** improved css styles (2198406, NEBV-1304)
* **Code Formatting:** removed extra div (3ff8501, NEBV-1304)
* **Code Refactoring:** added tests, and refactored code style from indexOf (7f26515, NEBV-1282)
* **Code Refactoring:** change proptypes to required, and simplify dropdown onchange (01cf6d9, NEBV-1282)
* **Code Refactoring:** change to internal state and data consistency with redux (c2d62cc, NEBV-1282)
* **Code Refactoring:** changed code to improve readability (398c8b9, NEBV-1282)
* **Code Refactoring:** changed stories code and styles (7a80d85, NEBV-1282)
* **Code Refactoring:** changed styles and simplified formattedMessage (1e5490e, NEBV-1304)
* **Code Refactoring:** changed translations,function arguments, classNames (b91b249, NEBV-1279)
* **Code Refactoring:** implemented PR feedback (6624aa6, NEBV-1259)
* **Code Refactoring:** improved actions in stories.jsx (043f96b, NEBV-1259)
* **Code Refactoring:** integrated dropdown component (d321159, NEBV-1282)
* **Code Refactoring:** propTypes change and tests update (0cd4b1d, NEBV-1279)
* **Code Refactoring:** refactored code and implemented feedback (25ae385, NEBV-1304)
* **Code Refactoring:** refactored code for react consistency, and improved test coverage, and reduce u (1b87356, NEBV-1282)
* **Code Refactoring:** refactored data structure for keywords (f02bf35, NEBV-1279)
* **Code Refactoring:** refactored sort and hierarchy to internal state (9b1c881, NEBV-1259)
* **Code Refactoring:** refactored suggestionWindow into a seperate keywords component (bd4ffac, NEBV-1259)
* **Code Refactoring:** refactored translations for french, and dropdown component (d400e4f, NEBV-1282)
* **Code Refactoring:** refactored translations, styles, and text transform styles (181f892, NEBV-1282)
* **Code Refactoring:** renamed components (9eea467, NEBV-1259)
* **Code Refactoring:** simplified keywordsText code and styles (4f7f06f, NEBV-1304)
* **Code Refactoring:** updated props passed in, and simplified code (f5448aa, NEBV-1308)
* **Code Refactoring:** updated unused tests and simplified logic (318fb4c, NEBV-1282)


### View 3

* **Features:** updates snapshots (e2139b8)
* **Features:** fixes errors from merge (3754378)
* **Features:** update styling to better match the design doc (4adef84)
* **Features:** update styling to better match the design doc (2860555)
* **Features:** updates styling to better match the design doc (b837eab)
* **Features:** updates styling to better match the design doc (452c81b)
* **Features:** adds basic ConditionDetails to the view (a67b43a)
* **Features:** updates styling to better match design doc (d144d14)


### Company Wheel tempory data spoofing

* **Features:** adds temporary randomized data for location wheel (7ccca0c, NEBV-1320)


### WebPack

* **Project Maintenance:** fixes build system importing ES modules into an unsupported environment (42ffc1d)


### BubbleChart

* **Features:** refactor indicator tracking before redux integration (a492f19, NEBV-1316)
* **Features:** uses design doc colours (944ab93, NEBV-1316)
* **Features:** combines InstrumentBubbles into one to support scaling (3438e44, NEBV-1316)
* **Features:** convert to using mock data (4f4ec6f, NEBV-1316)
* **Features:** use interaction for indicator/setIndicator logic (e269cd7, NEBV-1316)
* **Features:** adds scaling to viewport (a0d55c9, NEBV-1316)
* **Features:** reimplements drag support with event target attributes (d5c09b2, NEBV-1316)
* **Tests:** fixes all tests that were broken during refactors (85a0b1c, NEBV-1316)
* **Code Formatting:** inline logic instead of generating a function inside a map (4b1df2d, NEBV-1316)
* **Code Refactoring:** change as per PR requests (a7900ab)
* **Code Refactoring:** refactoring to simplify InstrumentBubble logic (4178ff0, NEBV-1316)


### ConditionDetails

* **Features:** adds an interaction for toggling the details section (8e4b808)
* **Features:** updates styling to match design docs (06f664e)
* **Features:** updates styling to match the design doc (1bb53b3)
* **Features:** adds stories for Content, fixes merge issues (e059c69)
* **Features:** adds missing prop tests to Details (ba47bca)
* **Features:** adds stories for subcomponents, moves CSS out of the parent component (87779be)
* **Features:** adds more stories for subcomponents, continues refactoring (a473eb8)
* **Features:** updates styling to match the design doc (6f6211a)
* **Features:** adds basic tests for subcomponents (96174dd)
* **Features:** adds text localization (0ea88eb)
* **Features:** adds basic interactions, display of selected list item, and 'expanded' flag (ba52fee)
* **Features:** adds interaction tests (35c3497)
* **Features:** adds the More/Less button (81c6799)
* **Features:** updates styling, documentation, and dummy content (940f97b)
* **Features:** adds more details prop shapes, implements multiple colors for the condition (05b42d1)
* **Features:** fixes View 2 issues (02e9a85)
* **Features:** splits content text into paragraphs (20fbe76)
* **Features:** finishes move away from CSS grid, adds popout animation (78040b3)
* **Bug Fixes:** adds more detailed prop types to fix validation errors (a04fe08)
* **Bug Fixes:** keeps gray bar when the Details component has no content (cd5c037)
* **Bug Fixes:** fixes a TypeError in the dummy instrumentPopup function (f3463da)
* **Tests:** updates snapshots (09354ba)
* **Tests:** updates snapshots (4869212)
* **Tests:** adds tests for ProjectHeader subcomponent (fd7d874)
* **Tests:** adds interaction tests (f623e65)
* **Tests:** updates snapshots (071a5b6)
* **Tests:** updates snapshots (0fa34dc)
* **Tests:** updates snapshots, fixes prop validation errors (af944fd)
* **Tests:** adds testing for single/multiple bar colors (f25fc07)
* **Tests:** adds another test for the toggle button (d4318b0)
* **Code Formatting:** removes commented code (7363c58)
* **Code Refactoring:** adds initial state to stories with interactions (25daea4)
* **Code Refactoring:** extracts several subcomponents (c5262b6)
* **Code Refactoring:** fixes naming and linting issues (95f32f3)
* **Code Refactoring:** moves off of CSS Grid in favor of block positioning (242b130)
* **Code Refactoring:** removes abandoned code in the /app folder (a307b9c)
* **Code Refactoring:** removes state, gets event handler data from props instead (a08ecef)
* **Code Refactoring:** rename vague data field, use CSS to size the list items (f36bd82)
* **Code Refactoring:** replaces invalid use of h4s with tagged spans (73cd6c4)
* **Code Refactoring:** stores data for its callback in state rather than as data attributes on (8e825f4)
* **Code Refactoring:** uses classNames and a default style in place of boolean classes (7a60a3c)
* **Code Refactoring:** uses keyed arrays instead of spreading elements into a Fragment (dbe4198)
* **Documentation:** adds documentation for the subcomponents (1b0a046)
* **Documentation:** adds note about missing animation (57175c1)


### View 3, StreamGraph

* **Features:** updates styling to better match design doc (f9a40a4)


### Redux

* **Features:** refactors action creators and tests for better clarity (993234b, NEBV-1320)


### App/View3

* **Bug Fixes:** fix bubblechart indicator state on redux (bc0dac0)


### BubbleChart/stories

* **Code Refactoring:** change knobs description (64e602d)


### View3

* **Bug Fixes:** fix no indicator on bubble chart (9ce778e)


### BubbleChart/index, spec, d3calcs

* **Features:** add functionality to render based on the commodity type (7cf8d1d)


### Browse By Reducer

* **Features:** fixes browseby reducer to work with valid structure (b103d83, NEBV-1320)


### Container View Two

* **Features:** added Dropdown Component (745b409)


### BrowseByData

* **Features:** adds some mock data for the proptype stucture for company and location (4a6f829, NEBV-1320)


### streamgraph

* **Code Refactoring:** lint issue cleanup (edb0038)


### TrendButton

* **Features:** added instrument bubble , styles, and removed unused images (2103bcb, NEBV-1315)
* **Features:** small adjustment to StreamGraph sizing in TrendButton (2ea4606, NEBV-1315)
* **Features:** adds more styling to BubbleChart in TrendButton (59aa80d, NEBV-1315)
* **Features:** adds more styling to StreamGraph in TrendButton (738b340, NEBV-1315)
* **Bug Fixes:** fix focus on click for streamgraph (50db880)
* **Bug Fixes:** improved styling to better incorporate streamgraph (9503edb, NEBV-1315)
* **Bug Fixes:** fixed outline issue on focus and simplified css styles (b5db36c, NEBV-1315)
* **Code Formatting:** changed code and tests styling (8a7caf5, NEBV-1315)
* **Code Refactoring:** changed proptypes to better match incoming graphQL data (33fefaa, NEBV-1315)
* **Code Refactoring:** changed styles to use variables instead of hex color codes (d777204, NEBV-1315)
* **Code Refactoring:** refactored code to match improved design doc (67cec9b, NEBV-1315)
* **Code Refactoring:** refactored with mock data (52e492f, NEBV-1315)
* **Documentation:** updated readme and storybook (7eb10be, NEBV-1315)


### View 3, ConditionDetails

* **Features:** makes ConditionDetails scaleable to fit the container (a86d45f)


### Project data

* **Code Refactoring:** adds additional structure to projects proptype data (23f3b96, NEBV-1320)


### Dependencies

* **Project Maintenance:** pin dependencies (278f89b)
* **Project Maintenance:** update babel monorepo to v7.3.3 (99bc48d)
* **Project Maintenance:** update babel monorepo to v7.3.4 (5821fb8)
* **Project Maintenance:** update dependency commitizen to v3.0.6 (372b4a1)
* **Project Maintenance:** update dependency commitizen to v3.0.7 (40f9f63)
* **Project Maintenance:** update dependency cssnano to v4.1.10 (c355d4f)
* **Project Maintenance:** update dependency enzyme-adapter-react-16 to v1.10.0 (960d8ae)
* **Project Maintenance:** update dependency eslint to v5.14.1 (f3f8c86)
* **Project Maintenance:** update dependency jest-junit to v6.3.0 (8c7907b)
* **Project Maintenance:** update dependency postcss-preset-env to v6.6.0 (8eafa32)
* **Project Maintenance:** update dependency react-test-renderer to v16.8.2 (afa6c5f)
* **Project Maintenance:** update dependency react-test-renderer to v16.8.3 (9fd984f)
* **Project Maintenance:** update dependency storybook-addon-interaction to v0.1.4 (7f2cdcd)
* **Project Maintenance:** update dependency storybook-addon-intl to v2.4.0 (235a51a)
* **Project Maintenance:** update dependency webpack to v4.29.5 (1cef8a1)
* **Project Maintenance:** update dependency webpack to v4.29.6 (6dfa40e)
* **Project Maintenance:** update dependency webpack-dev-middleware to v3.6.0 (c4b5506)
* **Project Maintenance:** update storybook monorepo to v4.1.12 (df336e3)
* **Project Maintenance:** update storybook monorepo to v4.1.13 (67a2452)


### StreamGraph

* **Features:** fixes proptypes issues with streamOnly mode (74ad28d, NEBV-1315)
* **Features:** fixes tests and adds proper colours for StreamGraph (e0c073b, NEBV-1316)
* **Code Formatting:** fixes capitalization to always be capital-S, capital-G (6e47825, NEBV-1315)


### Proptypes

* **Features:** adds proptype structure for mocking wheel and project menu data (0434aad, NEBV-1320)


### View 3, Condition Details

* **Features:** updates styling to fit in the View, adds popout interaction (ea5c6de)


### Search

* **Tests:** remove failing test temporarily (7b7d3ef)
* **Code Refactoring:** update snapshot (18c813b)


### View Two

* **Features:** connects View two to redux store and connects action creators (f565bd1, NEBV-1320)


### BubbleChart/InstrumentBubble

* **Bug Fixes:** fix tests by adding limit of 8 decimals to transform, y, and M A (3d63eb1)


### ViewThree

* **Bug Fixes:** fix props for BubbleChart (d04a82b, NEBV-1316)


### Legend item stories

* **Bug Fixes:** fixes interactions on story items (571fa98, NEBV-1316)


### Instrument Legend and Small Multiples interactions on story

* **Features:** adds interactions on storys (ad437e8, NEBV-1316)


### View 3 Components

* **Bug Fixes:** fixes linting issues (92a9ab0, NEBV-1316)


### View 3 storybook

* **Bug Fixes:** fixes view 3 storybook to use valid mock data (5cb0522, NEBV-1316)


### SmallMultiplesLegend

* **Features:** uses design doc colours and mockData (0648dbd, NEBV-1316)
* **Code Refactoring:** refactors to use a class and always render all (bdfeeca, NEBV-1316)


### Wheel

* **Features:** added company rendering on list and stop wheel animation instantly capabilities (6cdf709)
* **Features:** added stop trigger as per design doc specs (f0e1ff0)
* **Code Refactoring:** refactoring functions cause Josh said so (511197d)


### PullToSpin spec.js.snap

* **Code Refactoring:** update rendering viewbox and update snapshot (d2b18ea)


### Jest

* **Project Maintenance:** fixes Jest not detecting storybook snapshots (8f45350)
* **Project Maintenance:** support Jest 24 breaking changes to configuration (2117746)


### WheelList

* **Features:** adds proper layout and cropping to wheel radius (f9fc180)
* **Features:** adds interaction and wrap-around behavior (2e30e5e)
* **Tests:** adds interaction testing, updates story and snapshots (cf9e6e2)
* **Code Refactoring:** moves click handler into the class body to avoid re-declaring it (43aba83)
* **Documentation:** adds prop documentation (02ea76c)


### WheelRay

* **Bug Fixes:** fixes alignment direction and 0 coordinates index to item map (62b17c5)
* **Bug Fixes:** fix rendering index from 360 to 0 (a654f0c)
* **Documentation:** add todo for magic number (1813bac)


### Wheel/PullToSpin, WheelRay

* **Code Refactoring:** modified according to PR suggestions (e3532ac)


### Small Multiples Legend

* **Features:** adds selected subFeature tracking (f18b9fa, NEBV-1316)
* **Features:** adds new data and filter for legend items and conditionally renders in (412c4c2, NEBV-1316)


### Package lock conflict

* **Bug Fixes:** fixes the package lock json conflict (34b1f1b)


### Instruments Legend

* **Features:** adds data support for Instruments legend component WITHOUT TESTS (770d0f7, NEBV-1316)
* **Bug Fixes:** fixes bug with list not tracking the selected sub feature (d978b17, NEBV-1316)
* **Tests:** adds updated tests to support new data (156e847, NEBV-1316)


### Stream Graph

* **Features:** adds sub feature filter to the chart method (498ceae, NEBV-1316)
* **Features:** adds feature filter for the project data (80fb803, NEBV-1316)


### BarContainer

* **Features:** refactors BarContainer with simpler width/height logic (325a5bc, NEBV-1188)
* **Bug Fixes:** fixes undefined props from last commit (893cd12)
* **Tests:** updates snapshots (554741c)
* **Code Refactoring:** removes unused props, adds default values (ddc2da2)


### List

* **Features:** implements scrolling (54057d9)
* **Tests:** updates snapshots (171b462)
* **Code Formatting:** adjusts component formatting and extra data-selected prop (9e7afda, NEBV-1318)
* **Code Refactoring:** switches to a class component, removes onWheel from the render method (ffe88f2)


### Instrument Chart

* **Features:** adds mockData to be used by the instrument bubbles (2c07925, NEBV-1316)


### FeatureDescription

* **Features:** adds redux integration with translations (74c446d, NEBV-1316)


### WheelRay update readme

* **Documentation:** update readme, lint errors (661a496)


### Feature types description and redux reducer

* **Bug Fixes:** fixes linting error on feature types description a (cb85dff, NEBV-1316)


### Small Mulitples Legend

* **Features:** adds a selected sub feature to the stream graph and filters project da (ed0687a, NEBV-1316)


### FeatureTypesDescription

* **Features:** adds missing translation entries for features (d76e06f, NEBV-1316)
* **Features:** integrates with ViewThree and constants (1ecf052, NEBV-1316)


### App

* **Features:** begin integration of Redux in App container (570e6cf, NEBV-1316)


### redux/selected

* **Features:** fixes state generating incorrect keys and renames creators (e0e419d, NEBV-1316)


### FeaturesMenu

* **Features:** use constants for features instead of accepting a prop (7b6c43c, NEBV-1316)


### storybook-addon-interaction

* **Project Maintenance:** updates to fix bug with storyshots not detecting story changes (9a1e06f, NEBV-1316)


### Data

* **Features:** rename `standard` to `type` to match design doc (8e232a1, NEBV-1316)
* **Features:** rename `timing` to `phase` to match design doc (3176fe3, NEBV-1316)


### Component normalization and colours

* **Code Refactoring:** moved a function (f4a25a4)


### NPM

* **Project Maintenance:** removes unused dependencies following server cleanup (316ab44, NEBV-1317)
* **Project Maintenance:** reverts package-lock.json changes (0373a92)
* **Project Maintenance:** update React/React-DOM to 16.8.3) (64933d0)


### Build

* **Project Maintenance:** removes local server in favour of storybook (b37988e, NEBV-1317)


### Conditions build

* **Features:** adds scripts to run build (88bb1ce, NEBV-1317)


### Dropdown

* **Features:** added public dropdown component (7a85755, NEBV-1307)
* **Tests:** refactored tests (e39ac44, NEBV-1307)


### wheel list

* **Features:** adds styling (bd21c51, NEBV-1293)
* **Features:** adds untested wheel list first crack (a2a1cb7, NEBV-1293)
* **Documentation:** adds readme doc (3f4a64d, NEBV-1293)
* **Project Maintenance:** update package-lock (683dbd6, NEBV-1263)


### ConditionExplorer

* **Bug Fixes:** fix componentDidMount crash in Firefox (bb3ef69, NEBV-1263)


### ShortcutInfoBar

* **Code Refactoring:** inlines rendering and simplifies logic (21631cd, NEBV-1263)


### ESLint

* **Features:** fixes linting errors from colour and mockdata changes (05d3951, NEBV-1316)


### Views

* **Features:** fixes views to use design doc colours and enums (0311f21, NEBV-1316)


### RegionConditionSummary

* **Features:** uses design doc colours (f9d052c, NEBV-1316)


### InstrumentsLegend

* **Features:** uses design doc colours (06e2411, NEBV-1316)


### FeaturesLegend

* **Features:** uses design doc colours (7f88340, NEBV-1316)


### FeatureFlag

* **Features:** uses design doc colours (3b1eb11, NEBV-1316)


* **Code Refactoring:** fixes failing tests following enum changes (3425796, NEBV-1316)


### Storybook

* **Bug Fixes:** storybook decorator rearrangement for css styles (eae6fa2)
* **Tests:** updated spec snapshot (de4adae)


### SCSS

* **Features:** moves Feature colours into JS and imports into SCSS (b80bd14, NEBV-1316)


### GraphQL

* **Features:** preps StreamGraph for GraphQL data (39e264c, NEBV-1316)


### instruments bubble legend

* **Features:** adds offset for min ellipsis radius (ba93ef4, NEBV-1284)
* **Features:** adds min size for ellipsis and takes logic out of render (7310c3e, NEBV-1284)
* **Bug Fixes:** fixes radius logic (73b754a, NEBV-1284)
* **Code Refactoring:** adds transform in group tag (b68eecd, NEBV-1284)
* **Project Maintenance:** adds packages (1113e4e, NEBV-1284)


### View Containers

* **Features:** fixes grids in IE11 (8c9326d, NEBV-1263)
* **Features:** adjusts sizing and layout of grids (9404ce3, NEBV-1263)
* **Features:** list views in order of usage in Storybook (c8b560e, NEBV-1263)
* **Features:** refactors ViewThree to control components (e89c733, NEBV-1263)
* **Features:** refactors ViewThree to control components (7ea518a, NEBV-1263)
* **Features:** refactors ViewTwo to control components (243f795, NEBV-1263)
* **Features:** refactors ViewOne to control components (4f92612, NEBV-1263)
* **Documentation:** fix markdown checkboxes and viewport (b422838, NEBV-1263)


### Wheel Ring PullToSpin

* **Code Refactoring:** change css, Adjust readme to match TODO, adjust WheelRay to match c (50c2b6f)


### Wheel PullToSpin WheeRay

* **Bug Fixes:** fixes PullToSpin resize w container, Wheel sizing and tests (662b261)


### Wheel PullToSpin

* **Bug Fixes:** autosize and render of location bars implemented (9f4c6b2)


### redux

* **Code Refactoring:** changes to intial states in search action (f6bd0e6, NEBV-1285)


### SCSS variables

* **Features:** adds a variable for Fira Sans Condensed Bold (df39b76)


### BREAKING CHANGES

* **Wheel PullToSpin WheeRay:** deleted WheelRayLegend

# [0.1.0](http://neb-conditions-devdoc.s3-website.us-west-2.amazonaws.com/v0.1.0) (2019-02-13)


### Storybook

* **Project Maintenance:** fixes IE11+react-spring for storybook (954642d)


### ConditionExplorer

* **Features:** adds initial test of Matter.js physics (3bb46ef, NEBV-1271)
* **Features:** adds French characters to text sizing (acdb3ed, NEBV-1271)
* **Features:** adds bars for keywords (8cf43eb, NEBV-1271)
* **Features:** improves collisions and resetting placeholders (3757152, NEBV-1271)
* **Features:** first-pass resetting of placeholder positions (8e46837, NEBV-1271)
* **Features:** adjusts positioning of text and outline (d0fe300, NEBV-1271)
* **Features:** adds basic placeholder and text physics logic (52d854b, NEBV-1271)
* **Features:** adds draggable circle that exposes keywords (3c8f06e, NEBV-1271)
* **Features:** adds keyword hover transitions and fonts (82e98e0, NEBV-1271)
* **Features:** adds random (memoized) keyword placeholder fill (b08c6ed, NEBV-1271)
* **Features:** adds better circle/rect collision detection (5403fff, NEBV-1271)
* **Features:** improves drag handling when moving fast (1a3b1b3, NEBV-1271)
* **Features:** adds initial word-packing logic for condition keywords (7e172d6, NEBV-1271)
* **Bug Fixes:** remove spec.jsx to solve merge and pipe conflict (368e0af)
* **Tests:** updates snapshots and prevents getBBox Jest crash (70df3a1, NEBV-1271)
* **Project Maintenance:** adds additional keywords to fill out story (206ad7d, NEBV-1271)
* **Project Maintenance:** Better proptypes for keywords (75f75a7, NEBV-1271)
* **Project Maintenance:** Split ConditionExplorer into Physics and Fallback components (1d11c58, NEBV-1271)


### redux

* **Features:** adds view two components to redux (01fe00b, NEBV-1285)
* **Features:** added immutable and handles state for wheel (0ec99e5, NEBV-1285)
* **Features:** adds testing and file structure (82d9870, NEBV-1285)
* **Features:** adds store for view one and two (5e1af58, NEBV-1285)
* **Features:** adds store and reducer (0a3b448, NEBV-1285)
* **Features:** adds for view three (252757d, NEBV-1285)
* **Features:** adds actions with their tests (2069a50, NEBV-1285)
* **Features:** adds folders for project menu, trend button, and wheel (fb26a6c, NEBV-1285)
* **Features:** adds new architecture for redux without the tests :P (8a0a485, NEBV-1285)
* **Tests:** adds test for selectedFeature (a12bf84, NEBV-1285)
* **Code Refactoring:** adds new architecture and selectedFeature action folder (3aea865, NEBV-1285)
* **Documentation:** fixed typo (6a45c7d, NEBV-1285)


### MatterJS

* **Project Maintenance:** updates MatterJS to latest fork with Firefox support (0204173, NEBV-1271)


### WheelRay

* **Bug Fixes:** fix index spin when rotation < 0 (c17b004)


### Git

* **Bug Fixes:** fixes *.PNG gitattribute to be a binary filetype (d28d004)
* **Code Formatting:** adds .gitattributes to force line endings to LF (8ba750a)
* **Project Maintenance:** fix gitattributes for shp files (08dc40b)


### SearchBar

* **Features:** added highlightSummary tests, content, and stories (652450c, NEBV-1304)
* **Features:** added Tab Component for SearchBar Parent (e1c0187, NEBV-1265)
* **Features:** added design and functionality for FilterContent (8771b08, NEBV-1282)
* **Features:** added SearchContent with design and functionality (0ca15a0, NEBV-1282)
* **Features:** added initial setup of SuggestionWindow in SearchBar (f9e8eff, NEBV-1259)
* **Features:** suggestedKeywords added styles, tests, and props (17b1ab5, NEBV-1304)
* **Features:** add initial setup of suggestedKeywords (1636e92, NEBV-1304)
* **Features:** added functionality for suggestionWindow (f4d0c52, NEBV-1259)
* **Features:** added different mode, refactored code, added tests (23a6c24, NEBV-1282)
* **Bug Fixes:** changed color to a darker gray to match design doc (0383993, NEBV-1265)
* **Bug Fixes:** linting fix and scss styles (ed1ef39, NEBV-1265)
* **Bug Fixes:** fixed filterYear styling to match design doc (776bafd, NEBV-1282)
* **Bug Fixes:** added english json change to french json (48181fd, NEBV-1265)
* **Bug Fixes:** styles change and readme docs updated (0d211fd, NEBV-1282)
* **Bug Fixes:** formattedMessage render fix, and prop error fix (e75dc11, NEBV-1282)
* **Bug Fixes:** fixed formatted message component and some tests (ef58d94, NEBV-1282)
* **Tests:** added tests in filterContent (d05c895, NEBV-1282)
* **Tests:** added additional tests from previously adding more logic to component (ede3b75, NEBV-1282)
* **Code Formatting:** fixing linting errors (6d91e56, NEBV-1282)
* **Code Refactoring:** added tests , fixed classNames, refactored code, removed unnecessary comments (3591a46, NEBV-1282)
* **Code Refactoring:** changed styles, tests, and storybook rendering (7f92155, NEBV-1282)
* **Code Refactoring:** changed two ternary into one function (9ba9c28, NEBV-1265)
* **Code Refactoring:** refactored code to reduce functions and redux actions (bd2fdda, NEBV-1282)
* **Code Refactoring:** refactored functionality on searchBar and seperated to two stories (4b4b969, NEBV-1265)
* **Code Refactoring:** refactored searchContent (542aef1, NEBV-1282)
* **Code Refactoring:** simplified code and improved reset functionality (b641e7a, NEBV-1282)
* **Code Refactoring:** updated projectStatus to enum text in json (0aba7f0, NEBV-1282)
* **Code Refactoring:** updated proptypes, improved tests, and refactored code (46c5b7f, NEBV-1282)


### SuggestionWindow

* **Features:** altered proptypes, tests, and styles. (819285c, NEBV-1259)


### Dependencies

* **Bug Fixes:** update dependency react-spring to v8 (c689b33)
* **Project Maintenance:** pin dependencies (33eb16b)
* **Project Maintenance:** pin dependencies (ccfdfbd)
* **Project Maintenance:** update all dependencies to latest versions (6bf5226)
* **Project Maintenance:** update babel monorepo (ef112ab)
* **Project Maintenance:** update dependency @babel/plugin-proposal-object-rest-spread to v7.3.2 (82b3524)
* **Project Maintenance:** update dependency babel-plugin-macros to v2.5.0 (ad14ef8)
* **Project Maintenance:** update dependency babel-plugin-react-docgen to v2.0.2 (1c32955)
* **Project Maintenance:** update dependency codecov to v3.2.0 (55dbc74)
* **Project Maintenance:** update dependency enzyme-adapter-react-16 to v1.8.0 (6a9fdc7)
* **Project Maintenance:** update dependency enzyme-adapter-react-16 to v1.9.1 (2fa44c3)
* **Project Maintenance:** update dependency eslint to v5.12.1 (767ed14)
* **Project Maintenance:** update dependency eslint to v5.13.0 (617cc1b)
* **Project Maintenance:** update dependency eslint-plugin-import to v2.15.0 (5a7c4a6)
* **Project Maintenance:** update dependency eslint-plugin-import to v2.16.0 (338f90b)
* **Project Maintenance:** update dependency eslint-plugin-jsx-a11y to v6.2.0 (52328fa)
* **Project Maintenance:** update dependency eslint-plugin-jsx-a11y to v6.2.1 (c2a9f31)
* **Project Maintenance:** update dependency eslint-plugin-react to v7.12.4 (a8a0bf1)
* **Project Maintenance:** update dependency jest-junit to v6.1.0 (5dbee82)
* **Project Maintenance:** update dependency jest-junit to v6.2.1 (abb6e04)
* **Project Maintenance:** update dependency react-test-renderer to v16.8.1 (0e909fb)
* **Project Maintenance:** update dependency storybook-addon-interaction to v0.1.0 (7905f7f)
* **Project Maintenance:** update dependency storybook-addon-interaction to v0.1.1 (abb50b6)
* **Project Maintenance:** update dependency storybook-addon-interaction to v0.1.2 (8b23a5e)
* **Project Maintenance:** update dependency storybook-addon-interaction to v0.1.3 (75cf0df)
* **Project Maintenance:** update dependency storybook-readme to v4.0.5 (52b3bce)
* **Project Maintenance:** update dependency webpack to v4.28.4 (d8b407d)
* **Project Maintenance:** update dependency webpack to v4.29.0 (c1daa31)
* **Project Maintenance:** update dependency webpack to v4.29.1 (cc5de37)
* **Project Maintenance:** update dependency webpack to v4.29.3 (8086936)
* **Project Maintenance:** update dependency webpack-dev-middleware to v3.5.1 (eea26f7)
* **Project Maintenance:** update dependency webpack-dev-middleware to v3.5.2 (4a7ce16)
* **Project Maintenance:** update node.js (6ef47fd)
* **Project Maintenance:** update node.js (32d9a11)
* **Project Maintenance:** update storybook monorepo to v4.1.11 (2984945)
* **Project Maintenance:** update storybook monorepo to v4.1.6 (c44e7a4)
* **Project Maintenance:** update storybook monorepo to v4.1.7 (ebc7544)
* **Project Maintenance:** update storybook monorepo to v4.1.9 (72b0d83)


### ConditionExplorer refactor

* **Code Refactoring:** split into private components (4448c00)


### ConditionDetails

* **Features:** displays condition information, fixes linting errors (dc69c03)
* **Features:** displays list of condition bars (09fafec)


### npm

* **Project Maintenance:** removes audit support for GitLab (3dbc587)


### instruments bubble legend

* **Features:** removes unneccessary test (5906681, NEBV-1284)
* **Features:** adds in new default values given by design team (06d20ff, NEBV-1284)
* **Features:** add stylesheet for fills on text and ellipsis (419427b, NEBV-1284)
* **Features:** add changes to readme (02c2295, NEBV-1284)
* **Features:** implementation (d9b2455, NEBV-1284)
* **Features:** implementation (3b49ddc, NEBV-1284)
* **Code Formatting:** adds newline at end of style file (2c665a3)
* **Documentation:** added feedback from design team (8b43905, NEBV-1284)
* **Documentation:** elaborates on bubble legend cases (ef8bc1b, NEBV-1284)


### instruments bubble chart

* **Features:** adds dynamic bubble items (83fcf72, NEBV-1284)


### react-spring

* **Tests:** fixes react-spring imports in Jest (ba389a4)
* **Project Maintenance:** removes .cjs import now that spring 8.0.7 is released (3c9c21c)


### WheelRay & Wheel

* **Bug Fixes:** fix plot for rotation > 0, bug remains at rotation < 0 (6409172)


### LocationWheelMinimap

* **Features:** draws regions with correct position and orientation (9ee8505)
* **Features:** draws regions with correct position and orientation (6f1a10a)
* **Features:** displays and scales to the current region and province (9fa7144)
* **Features:** renders the province and region (5333715)
* **Features:** adds a basic component (6b38c2f)
* **Features:** adds a basic component (f557f0d)
* **Features:** displays and scales to the current region and province (814659e)
* **Features:** renders the province and region (4771cd1)
* **Bug Fixes:** fixes incorrect filename (e72ff4e)
* **Bug Fixes:** fixes a memory issue with Promises + React's lifecycle (876bfb5)
* **Documentation:** adds more detailed requirements (ca1a55c)
* **Documentation:** adds requirement to hide when in Company mode (2372f98)
* **Documentation:** adds requirements (718cd21)
* **Documentation:** includes the source shapefile for generating TopoJSON (ff95d4e)


### FeatureTypesDescription

* **Features:** adds scrolling to headings based on a given prop (9216be7)
* **Features:** adds scrolling to headings based on a given prop (bbeba42)
* **Features:** adds French placeholders for type descriptions (dc00c94)
* **Features:** adds French placeholders for type descriptions (6e3ee23)
* **Bug Fixes:** fixes a broken story knob (b3c9aa2)
* **Bug Fixes:** update snapshots, fix React build warnings (18c09cc)
* **Tests:** adds a test for forced scrolling (f5cd3d4)
* **Tests:** adds a test for forced scrolling (376df4d)
* **Code Formatting:** moves component files to /app to match changes in dev branch (9470747)
* **Code Formatting:** moves component to /src to match changes in development branch (106967b)
* **Code Formatting:** removes commented or unused code (d543db0)
* **Code Formatting:** removes unused/unnecessary test code (d368713)
* **Code Refactoring:** condenses methods and JSX, removes unnecessary test code (073ded6)
* **Code Refactoring:** moves the element creation to a separate function (a064d0d)
* **Code Refactoring:** moves the element creation to a separate function (f403956)
* **Code Refactoring:** reduces usage of keys, uses standard .ComponentClassName (69a4b18)
* **Code Refactoring:** reimplements scrolling to avoid excessive createRef()s (5208721)
* **Code Refactoring:** removes hardcoded data (7249692)
* **Code Refactoring:** removes hardcoded data (59db108)
* **Code Refactoring:** renames all related variables to use FeatureType[s]Description fo (6fa39ca)
* **Code Refactoring:** renames all related variables to use FeatureType[s]Description fo (9194a35)
* **Code Refactoring:** replaces a class check with shouldBehaveLikeAComponent (ee6a3d2)
* **Code Refactoring:** replaces hardcoded text with actual locale strings (a5def6a)
* **Code Refactoring:** replaces string refs with the createRef() syntax (d17eb34)
* **Code Refactoring:** replaces string refs with the createRef() syntax (61abae0)
* **Code Refactoring:** uses FormattedMessage components rather than injectIntl (8566efb)
* **Code Refactoring:** uses SASS vars for Instrument code colors rather than hardcoding (297d394)
* **Code Refactoring:** uses SASS vars for Instrument code colors rather than hardcoding (35a5a04)
* **Documentation:** adds missing knob for the Instrument story (e55cebf)
* **Documentation:** adds missing knob for the Instrument story (57dc247)
* **Documentation:** adds more detailed requirements as per Brandon (5dc6b78)
* **Documentation:** adds more detailed requirements as per Brandon (76727b8)


### redux doc

* **Features:** adds actions for redux (d95f910, NEBV-1269)
* **Features:** adds type for projectmenu position (d148095, NEBV-1269)
* **Features:** simplifies redux actions (d0a03ba, NEBV-1269)


### View Containers

* **Features:** added footer container (3d3b0f9, NEBV-1263)
* **Features:** added view one and three (86acc71, NEBV-1263)
* **Features:** added view three (8b74cec, NEBV-1263)


### Company Wheel and Pull to spin

* **Bug Fixes:** fixes the imports for the spring library (e1ee88a)


### Tab

* **Bug Fixes:** fixed clipping of findIcon (e5672b3, NEBV-1265)
* **Code Refactoring:** refactored code to better mimic design doc (9df5eee, NEBV-1265)
* **Code Refactoring:** removed unused tests, and refactored code in stories (c3ae474, NEBV-1265)


### state data doc

* **Features:** missed a comment :P (8416c5f, NEBV-1269)


### redux and state docs

* **Features:** pr comments (24d6f04, NEBV-1269)


### bubble legend

* **Features:** adds fixes from pr (c9987e8, NEBV-1284)
* **Code Refactoring:** move to src file (5532136)
* **Documentation:** adjusted requirements according to feedback (cb32fb9, NEBV-1284)
* **Documentation:** fix requirements from pr input (97de152, NEBV-1284)


### Loading Pipe

* **Documentation:** adds documentation for the Loading pipe component (04b0570, NEBV-1291)
* **Documentation:** fixes typo in README (ec04775, NEBV-1291)
* **Documentation:** removes Accessibility Requirements (799c1cc, NEBV-1291)


### state data

* **Code Refactoring:** add line break (17235fc, NEBV-1269)
* **Code Refactoring:** fixes typos and adds backticks to state data doc (7683c5f, NEBV-1269)
* **Documentation:** adds doc for redux (f57515b, NEBV-1269)
* **Documentation:** adds state to storybook and component states to state.md (c564f76, NEBV-1269)


### Grid and scrolling

* **Features:** added view two demo grid (cb8c48c)


### refactored code

* **Code Refactoring:** changed formattedMessage, styles, and tests. (6a347e3, NEBV-1265)


### reduz

* **Features:** adds searchBar and viewThree (906f454, NEBV-1285)


### Renovate

* **Project Maintenance:** adds "Awaiting Review" label to renovate PRs (af868de)


### Remove App folder

* **Bug Fixes:** remove app folder (fbb3f8e)


### instrument bubble legend

* **Code Refactoring:** add to docs and adds props to legend for future use when scaling (602a12e, NEBV-1284)


### Wheel/LegendRay

* **Documentation:** adds/Initial architectural commit (4ec22af)


### Tests/Utilities

* **Features:** exports 'intl' for tests that need to check locale text (89392da)
* **Code Formatting:** adds missing semicolon (4bfeb8a)
* **Code Formatting:** adds missing semicolon (4f1c200)


### Architect Containers

* **Documentation:** fixed change requests (24bbc69)


### region condition summary

* **Features:** add styling to the chart box and scaled bars inside container (98ca002, NEBV-1268)
* **Features:** private region condition chart component with tests, stories, and mo (f6cdb4b, NEBV-1268)
* **Code Refactoring:** add changes from pr comments (1faae22, NEBV-1268)
* **Code Refactoring:** add formattedMessage test and refactor to remove unnecessary cla (05c7bc2, NEBV-1268)
* **Code Refactoring:** combined region condition chart and region condition summary int (43523a4, NEBV-1268)
* **Code Refactoring:** import colours scss (75ecd4f, NEBV-1268)
* **Documentation:** create readme doc for requirements and component overview (f4fbb14, NEBV-1268)


### Architect Grid and Views

* **Documentation:** change requests done (2fc439a)


### View and Grid

* **Documentation:** made chage requests (bc49a58)


### Archtiect App Container

* **Documentation:** add a new component: App Container' (c6fd277)


### Grid Layout

* **Documentation:** fixed change requests (55b2b7c)


### Languages

* **Features:** adds the first formatted message for language support (75d6663, NEBV-1262)
* **Bug Fixes:** fixes a spelling mistake (7e83e65)
* **Bug Fixes:** fixes a spelling mistake (ba95d44)


### Tests/MountWithIntl

* **Code Refactoring:** makes 'MountWithIntl' return the root element instead of its first ch (3c26b5b)
* **Code Refactoring:** makes 'MountWithIntl' return the root element instead of its first ch (62f02e9)


### FeatureTypeDescription

* **Features:** adds a blank component from _template (168ec81)
* **Features:** adds Jest tests (42b77c2)
* **Features:** adds color coding to the Instrument codes (b7c8471)
* **Features:** show feature-specific content (0e1c743)
* **Features:** adds a blank component from _template (81f4ee8)
* **Features:** adds Jest tests (0b49f6f)
* **Features:** adds color coding to the Instrument codes (8e9879c)
* **Features:** show feature-specific content (03f5ace)
* **Code Refactoring:** refactors the component and fixes linting errors (90022d2)
* **Code Refactoring:** refactors the component and fixes linting errors (617b818)
* **Documentation:** adds README text (9ebea02)
* **Documentation:** adds README text (657280b)


### Removed Control

* **Bug Fixes:** removed control component (a9db50c)


### Jest

* **Tests:** converts tests from Sinon spys to Jest mocks (9cc6886)
* **Tests:** fixes broken tests following Jest conversion (77ee0e1)
* **Code Formatting:** changes \`test( (a9b94d2)
* **Project Maintenance:** adds code coverage reporting via Jest (e75879c)
* **Project Maintenance:** adds Jest snapshotting based on Storybook stories (9c50d99)
* **Project Maintenance:** adds junit output for GitLab (1f9d21b)
* **Project Maintenance:** converts from Mocha/Chai to Jest (a250fb0)
* **Project Maintenance:** fixes Jest looking at the app folder instead of src (88a79dd)
* **Project Maintenance:** fixes proptypes and translations for Jest (9c27eb3)


### Changed folder name from 'app' to 'src'

* **Documentation:** changed the base folder name from 'app' to 'src' to d (d688117)


### Architect the view containers and the footer container

* **Documentation:** the documents describe the requirement (0f1ade7, NEBV-1263)


### architect the views and the footer.

* **Features:** add the requirements for all of the views and the footer (63e4fde)


### 1263 Grid & Scroll plus  View containers

* **Features:** this is the architectural documents for the views (512a5f3)


### 1263 Grid and Scrolling

* **Features:** archtiecture of views (3482d6e)


### Bubble Legend

* **Documentation:** readme doc architecting out component requirements (7bd3971, NEBV-1284)


### component ConditionDetails

* **Features:** added the requirements docs, and changed the component structure (7de059f)


* **Features:** Updated shallow mount test function to accept translation messages (53a9081, NEBV-1270)
* **Tests:** Updated test utility to add functionality to shallow render components with internationalization context (e224742, NEBV-1262)
* **Tests:** Updated tests to check formatted message classes (3b4a921, NEBV-1262)
* **Code Formatting:** fixes PR comments (c7edcfc)
* **Documentation:** Added a translations read me (00a9dc3, NEBV-1270)
* **Documentation:** Added readme for state data (20ad3ec, NEBV-1269)
* **Documentation:** Fixed translation code examples (3bc70f0, NEBV-1270)
* **Documentation:** Minor fixes (99aec15, NEBV-1269)
* **Documentation:** Moved GraphQL Storybook files (1689863, NEBV-1269)
* **Documentation:** Updated state data template (f99d460, NEBV-1269)
* **Documentation:** Updated translation test example for clarification (bf7e58f, NEBV-1270)
* **Project Maintenance:** Updated contributors (137c99b)


### component Grid

* **Features:** added views for the grid (f5778b3)
* **Features:** cSS Grid for view, and autoprefixer (1156f99)


### component Grid and GridItem

* **Features:** this component will be the basic grid layout for the views and co (4bab6e2)


### region condition chart

* **Features:** chart component tests and stories (9e1f783, NEBV-1268)
* **Code Refactoring:** snap shot update (84d9e50, NEBV-1268)


### component template spec

* **Code Refactoring:** change to update to jest (ab685e1)


### ShareIcon

* **Tests:** fixes tests and PR comments (9d019fb, NEBV-1195)


### info bar

* **Features:** pr comments (a6a86f5, NEBV-1195)
* **Features:** renaming to fix linting errors (016744f, NEBV-1195)
* **Features:** add knobs for switching between text boxes (91213b1, NEBV-1195)
* **Tests:** test added after refactor (a9e858e, NEBV-1195)
* **Tests:** add tests (b02c164, NEBV-1195)
* **Code Refactoring:** pr changes + one failing test (f53a896)
* **Code Refactoring:** shortcut info bar test added (f396799, NEBV-1195)


### fixed prop type warning

* **Code Refactoring:** for info bar components (85fda19, NEBV-1195)


### Testing

* **Documentation:** updates testing docs to indicate that we use Jest instead of Mocha/Sinon/Chai (14ef519)


### legend item; features legend

* **Code Refactoring:** removed space for checkmark boxes (d4b40e1, NEBV-1273)


### BubbleChart

* **Features:** added label, fixed drag interaction, styled code (ed990f0, NEBV-1258)
* **Features:** shifted text display, and improved styling (b7a5d03, NEBV-1232)
* **Features:** added initial implementation for onClick interaction (425a489, NEBV-1258)
* **Features:** adds more language support to the bubble chart component (477983f, NEBV-1262)
* **Features:** added keyboard interaction and initial drag interaction (df69360, NEBV-1258)
* **Bug Fixes:** added indicator state for tests (ca05ae6, NEBV-1258)
* **Bug Fixes:** renamed stories file and increased svg size (d1fc5b2, NEBV-1232)
* **Bug Fixes:** updated props, storybook, and jest conversion (280849d, NEBV-1258)
* **Bug Fixes:** fixed storybook display (1dc2513, NEBV-1258)
* **Bug Fixes:** changed from returning null (99269e9, NEBV-1258)
* **Bug Fixes:** fixed existing tests and removed unused props (8a22198, NEBV-1258)
* **Bug Fixes:** fixed storybook rendering issue with chart indicator (3bfd2cd, NEBV-1258)
* **Bug Fixes:** storbook rendering for instrument bubble (467c0dd, NEBV-1258)
* **Bug Fixes:** chartIndicator display fix (436d728, NEBV-1258)
* **Bug Fixes:** changed stories to reflect the appropriate variables (681cf84, NEBV-1258)
* **Tests:** added keypress tests (270fe0a, NEBV-1258)
* **Tests:** Improved testing coverage (c40b7c2, NEBV-1232)
* **Tests:** added additional tests to increase codecoverage (f2647f6, NEBV-1258)
* **Tests:** added test for chartIndicator position (9f4a364, NEBV-1258)
* **Tests:** added test to detect chartIndicator (e3b39a1, NEBV-1258)
* **Code Formatting:** changed code style and rearranged variables (bd706f3, NEBV-1258)
* **Code Formatting:** fixed linting error for comma (7ad4ca7, NEBV-1258)
* **Code Formatting:** fixed styles and removed unused tabIndex (a49bc1d, NEBV-1232)
* **Code Formatting:** Removed console statements (1351afc, NEBV-1232)
* **Code Refactoring:** added props, reduced duplicate code (0e32c4b, NEBV-1258)
* **Code Refactoring:** added scss file and ternary (7479043, NEBV-1232)
* **Code Refactoring:** altered file location for d3Calculation, refactored code (3555852, NEBV-1258)
* **Code Refactoring:** changed from map function to reduce function (0b62bb1, NEBV-1258)
* **Code Refactoring:** changed instrumentBubble and bubbleChart (e2ce267, NEBV-1258)
* **Code Refactoring:** refactored to cleaner code, and added edge cases for keypress (81013eb, NEBV-1258)
* **Code Refactoring:** removed duplicate code, styled sentences, changed type of variable (3527807, NEBV-1258)
* **Documentation:** added prop explanation in Readme (2e2fff3, NEBV-1258)
* **Documentation:** updated readme docs (fc87d39, NEBV-1258)
* **Documentation:** updated readme file (3f2a650, NEBV-1232)


### wheel/ring

* **Code Refactoring:** update snapshots (8e81240, NEBV-1273)


### main info bar

* **Code Refactoring:** jest conversion (dc2a2d3, NEBV-1195)
* **Code Refactoring:** test fixes (6aca98a, NEBV-1195)


### BarContainer

* **Tests:** updates tests to use Jest (17dacab)
* **Code Formatting:** renames index.*.jsx to *.jsx (d9f68ca)


### jest conversion

* **Code Refactoring:** for downloads textbox (0a88dac, NEBV-1195)
* **Code Refactoring:** for shortcutinfo bar (a0c8e03, NEBV-1195)


### methodology text box

* **Code Refactoring:** jest conversion (9a2d43d, NEBV-1195)


### about text box

* **Code Refactoring:** jest conversion (3e5bed5, NEBV-1195)


### share icon

* **Features:** add component shareicon (4a0c686, NEBV-1184)
* **Code Refactoring:** jest conversion (29e52c0, NEBV-1195)


### minfobar

* **Code Refactoring:** pr comments (672d27e, NEBV-1195)


### ChartIndicator

* **Features:** merges ChartIndicator and Control components (7136575, NEBV-1209)
* **Documentation:** tweaks story knobs to provide additional context (2f48bd8)


### update spec.js.snap

* **Tests:** updating snapshot (8db6008)


### BrowseByBtn spec.jsx

* **Bug Fixes:** remove unnecessary nesting of browsebybtn on the test description (21b35b6)
* **Code Refactoring:** refactor test to match jest implementation (5b748ea)


### component BarContainer

* **Features:** changed multiple files for change requests (6e07156)
* **Features:** fixed propType errors in tests (6ff0874)
* **Features:** fixed change request issues (5fa2d91)
* **Features:** added new null test, changed render flow (062f229)
* **Features:** removed a not needed prop (a4e2920)
* **Features:** forgot 2nd eslint ignore (b5574aa)
* **Features:** fixed linting issues (31e1bbe)
* **Features:** made change requests (8db812a)
* **Features:** Added the README files for the compoenents and the version status for (c11b1c4)
* **Features:** holds multiple bars (3be36cb)
* **Features:** general container for bar shapes (acdd9dd)


### selected group bar

* **Features:** added knobs to stories (aace7ab, NEBV-1273)


### wheel; list; projectMenu; RegionCompanies; circleContainer

* **Code Refactoring:** fixing docs and adding knobs (b081d1b, NEBV-1273)


### bubble chart, chart indicator, circle container

* **Code Refactoring:** updated readme docs and added knobs to ci (76988d6, NEBV-1273)


### BrowseByBtn index and stories

* **Bug Fixes:** modifies the story to add a simulation of the parent toggle depe (13bc1fd)


### control

* **Code Refactoring:** changed to a functional component (3df819b, NEBV-1209)
* **Code Refactoring:** remove duplicate component (850a88d, NEBV-1273)


### BrowseByBtn

* **Features:** adding the BrowseByBtn, architect and prototype (2a388b8, NEBV-1264)
* **Code Refactoring:** matches PR suggestions (1737103)


### Region Companies

* **Features:** wIP adds new component Region Companies (be8e863, NEBV-1267)
* **Bug Fixes:** adds fixes for merge requests (181080f, NEBV-1267)
* **Code Formatting:** adds overflow scroll to list of company names (f494a90, NEBV-1267)


### infobar

* **Features:** refactor components and update tests (48525e4, NEBV-1195)
* **Features:** fix pr comments (204f801, NEBV-1195)


### Regional Companies

* **Bug Fixes:** fixup for PR issue (3dad863, NEBV-1267)
* **Code Refactoring:** fixes suggestions for PR (b181e43, NEBV-1267)


### BitBucket Pipelines

* **Project Maintenance:** removes unused bitbucket pipelines config (54e8904)


### BrowseByBtn and english.json

* **Code Refactoring:** implement internationalization and tweak wording as per desi (a3aaf04)


### ESLint

* **Code Formatting:** autofixes linting errors from jest-codemod (50cc3f3)
* **Code Formatting:** fixes linting errors introduced by package updates (7805ccb)
* **Project Maintenance:** uses more specific glob to avoid linting JSON (28eeb08)


### Storyshots

* **Tests:** fixes bugs with storybook storyshots having proptype issues (afa828a)


### BrowseByBtn/index

* **Code Refactoring:** implement rendering function parsedmessage (fa5c330)


### RegionCompanies

* **Features:** refactors company data to support ids and button clicks (14b991e, NEBV-1267)


### Modal

* **Features:** adds a new Modal component (e5edf09, NEBV-1182)
* **Bug Fixes:** fixes typo in README (a439b73, NEBV-1182)
* **Tests:** adds Tests and refactors jsdom to workaround polyfill (2c6ef09, NEBV-1182)
* **Tests:** adds tests for toggling modal open / closed (00dc551, NEBV-1182)
* **Code Formatting:** fixes linting errors in Modal (4ed21c3, NEBV-1262)
* **Code Refactoring:** changes Modal component into a dialog window (72d709b, NEBV-1182)
* **Code Refactoring:** fixes PropType error in tests (09ce22d)
* **Code Refactoring:** refactors for pull request (3ca54e4, NEBV-1182)
* **Code Refactoring:** refactors refs for PR change (73ae1fe, NEBV-1182)
* **Code Refactoring:** separates Modal from ModalContent to prevent test crashes (27f2582, NEBV-1182)


### Mocha

* **Project Maintenance:** removes remainder of code related to Mocha/Chai (1624755)


### FeaturesMenu

* **Features:** Added translation to the titles (615ccff, NEBV-1262)
* **Tests:** fixup tests for component refactor (c7afb49, NEBV-1262)
* **Documentation:** fixes story for selected prop (ac68422)


### Package

* **Documentation:** updates contributor information for visualization code (c788b0c)


### StackGroupProps

* **Tests:** adds test to check props inversion for StackGroup (8080d29, NEBV-1209)


### Regional Companies (WIP)

* **Features:** adds a new feature Regional Companies (d6f7bb2, NEBV-1267)


### streamgraph

* **Features:** fix stackprops to match component (674a847, NEBV-1209)
* **Features:** fix PR comments (527bb75, NEBV-1209)
* **Features:** change stackgroup tests to pending and mock yHeight calculation (ef3e48a, NEBV-1209)
* **Features:** added props in control and stack group components (72bc58a, NEBV-1209)
* **Bug Fixes:** linting (5d1f3ae, NEBV-1209)
* **Code Refactoring:** change component name from VictoryStackReplacement to StackGroupProps (43c90bf, NEBV-1209)
* **Code Refactoring:** fixed calculations for Control positioning based on size of chart (ae00dc5, NEBV-1209)
* **Code Refactoring:** private component for victorystackreplacement (d12e64f, NEBV-1209)
* **Code Refactoring:** refactored props in Control component and fixed bug in arrow key interaction (c23e260, NEBV-1209)
* **Code Refactoring:** tests and refactor math (8178d81, NEBV-1209)


### Intl

* **Tests:** fixes failing tests due to FormattedMessage (6fc516a, NEBV-1262)


### Language Support

* **Features:** adds language support to the Feature flag title attribute (28d5c78, NEBV-1262)
* **Features:** adds language support for the Selected group bar (520089d, NEBV-1262)
* **Features:** wIP Adding language support to Selected Group bar (04f1bb9, NEBV-1262)
* **Features:** adds multi language support to the Feature Description component (7aba890, NEBV-1262)
* **Features:** adds language support to Features Menu component (f0ebbfe, NEBV-1262)
* **Code Refactoring:** fixes for PR changes (b6f67e2, NEBV-1262)


### features legend

* **Code Refactoring:** add changes for location wheel legend and added test (72e57fd, NEBV-1266)
* **Code Refactoring:** changed footer to a variable (c178a48, NEBV-1266)
* **Code Refactoring:** rename project legend to features legend (954eb25, NEBV-1266)


### Feature Description

* **Tests:** adds test coverage for the heading (e8eedb1, NEBV-1262)


### CompanyWheel and WheelRay

* **Features:** rough implementation of company wheel animation (805c211)


### Feature Flag

* **Tests:** fixes for feature flag and intl tests (4e03192, NEBV-1262)


### StreamGraph

* **Features:** uses Victory props to calculate ChartIndicator position and label (332b398, NEBV-1209)
* **Code Refactoring:** removes unused functions and simplifies logic (fe6d08b, NEBV-1209)
* **Code Refactoring:** reverts testing changes for stream graph component (0bf5b1e, NEBV-1262)


### TrendButton

* **Features:** Added translation to the button label (d848f5f, NEBV-1262)


### StreamLayer/StackGroup

* **Tests:** adds tests for StackGroup (5416ed5, NEBV-1209)


### refactored to conditional rendering

* **Code Refactoring:** refactored for a change request (6704a66)


### InstrumentsLegend

* **Features:** Added translation messages (e0e5c6c, NEBV-1262)
* **Features:** Added rendering of the LegendItem private component (8dda5e3, NEBV-1189)
* **Features:** Added rendering of the component and legend items after processing the data (2326dcf, NEBV-1246)
* **Features:** Updated styles for the component (58b7540, NEBV-1246)
* **Features:** Fixed another unique key array/iterator warning (b3ba994, NEBV-1246)
* **Features:** Fixed unique key array/iterator warning (450fd64, NEBV-1246)
* **Tests:** Updated shouldBehaveLikeAComponent arguments (750d5f8, NEBV-1189)
* **Tests:** Added tests for the rendering of the component (554cd30, NEBV-1246)
* **Code Formatting:** Updated filenames to conform to new structure (5f444fc, NEBV-1246)
* **Code Refactoring:** Cleaned up instruments data processing (e8ceb94, NEBV-1246)
* **Code Refactoring:** Defaulted render variables to null instead of undefined (fb29a17, NEBV-1246)
* **Code Refactoring:** Fixed missing s in variable reference (1c04600, NEBV-1246)
* **Code Refactoring:** Updated instrument data iteration variable name for better clarity (88447a9, NEBV-1246)
* **Code Refactoring:** Updated to use classnames module (0f33855, NEBV-1246)
* **Documentation:** Added storybook cases (9a471e3, NEBV-1189)
* **Documentation:** Added storybook cases for basic usage and select prop (7a78cb3, NEBV-1246)


### shortcut info bar

* **Features:** added basic component and tests; update docs for main info bar (9b4853c, NEBV-1194)
* **Tests:** add tests (abc2822, NEBV-1195)


### Stream Graph

* **Features:** adding intl to Stream Graph component (93f00f7, NEBV-1262)
* **Bug Fixes:** fixup dom structure to pass test checking for title (1256aeb, NEBV-1262)


### i18n

* **Tests:** adds react-intl support for tests (c24eae9, NEBV-1262)


### SmallMultiplesLegend

* **Features:** Added translation messages (7e66b70, NEBV-1262)
* **Features:** Added message formatting/translation (37adf04, NEBV-1262)
* **Code Refactoring:** Updated SmallMultiplesLegend code to match up with InstrumentsLegend (f8df617, NEBV-1246)
* **Documentation:** Updated storybook example data to use translation messages (4b906d5, NEBV-1262)


### Project Legend

* **Features:** adds more language support for the project legend component (aace394, NEBV-1262)


### FeaturesMenu tests

* **Code Refactoring:** removes unused import (5260f27)


### SCSS

* **Bug Fixes:** fixes all broken SCSS references for colours (6edf133, NEBV-1240)


### PullToSpin

* **Features:** architect and initial implementation of pull to spin (1196a91, NEBV-1218)
* **Bug Fixes:** fixes not rendering in firefox (7739bd9)


### CompanyWheel WheelRayLegend

* **Tests:** adding tests for reservation of the degrees in the wheel (3f604de)


### Interaction

* **Documentation:** adds documentation on interactions addon (3406501)


### Controller

* **Features:** added Initial code (ecf7f8c, NEBV-1260)
* **Features:** added circle feature for BubbleChart and text (58d396d, NEBV-1260)
* **Features:** added option to include/exclude circle for compatability (857308e, NEBV-1260)
* **Bug Fixes:** fixes the nested svgs to use g tag for rendering (bf94e19, NEBV-1260)
* **Bug Fixes:** fixed storybook issue with rendering and styles (d0f53a9, NEBV-1260)
* **Bug Fixes:** fixed chartIndicator className test (19c2d32, NEBV-1260)
* **Tests:** added texts to improve coverage (c829125, NEBV-1260)
* **Code Formatting:** changed styling to remove linting errors (f4322f9, NEBV-1260)
* **Code Refactoring:** changed component name, style changes (867c98f, NEBV-1260)
* **Code Refactoring:** changed the name to ChartIndicator and fixed linting error (f0e612a, NEBV-1260)
* **Code Refactoring:** refactored tests and code (4a6620e, NEBV-1260)


### Conflicts

* **Bug Fixes:** accidentially commit some conflicts (c1d9297, NEBV-1262)


### Language support modal

* **Bug Fixes:** refactors formatted text to not break test (7c6b11a, NEBV-1262)


### Language support

* **Features:** adds Formatted text support to modal, bubble chart and project legend (f49a405, NEBV-1262)
* **Features:** adding language support for storybook WIP (3ba5155, NEBV-1262)


### addon-interaction

* **Documentation:** moves storybook-addon-interaction into separate repository (badd480)


### BarContainer component

* **Features:** A container for multiple recangles (5a53462)


### Addon/interaction

* **Documentation:** adds easier API and loading indicator (43e0795)
* **Documentation:** indicates if interactions aren't used (c203182)
* **Documentation:** remove faulty loading indicator (d10dff6)
* **Documentation:** rename getProps to getInteractionProps (6258742)
* **Documentation:** renames addon-state-reducer to addon-interaction (ab9167b)


### shareicon

* **Features:** added folder with docs, storybook, and basic tests (5de5e7e, NEBV-1184)


### CompanyWheel, PullToSpin components

* **Bug Fixes:** rename story and tests to new specs (917878b)


### utilities/handleInteraction.js

* **Features:** add cursor pointer to the handle interaction utility to show t (3bf4b8b)


### Addon/state-reducer

* **Documentation:** adds babel for addon and sets up package (6c1d476)
* **Documentation:** adds state and action logging (b93519c)
* **Documentation:** removes old code (27e707a)


### Addon/State

* **Documentation:** adds WIP state/action addon for storybook (36260d8)


### PullToSpin and ProjectDot

* **Code Refactoring:** pullToSpin refactor for lines, shadows, focus, text. ProjectDot (845a80f)


### StoryBook InteractionFeedbackProposal

* **Features:** feedback on interaction for components in storybook (5211a90)


### streamgraph/stackgroup

* **Features:** test added for Control component (b4ac7ff, NEBV-1209)
* **Tests:** handled branch test (e294fee, NEBV-1209)


### BREAKING CHANGES

* **Modal:** `modalAction` is now a func, instead of `{ task: () => {}, text: '' }`
* **ChartIndicator:** ChartIndicator props and position calculations have changed
* **BrowseByBtn index and stories:** mode addition to the specs, changes the way the button information is conditionally rendered
* **streamgraph:** n
* **PullToSpin:** none
* **StoryBook InteractionFeedbackProposal:** none
* **PullToSpin:** none
* **CompanyWheel and WheelRay:** Refactoring of wheelraylegend and dummy functions on the randomdatasample which the stories are
pulling from
* **CompanyWheel, PullToSpin components:** Renaming of files
* **Stream Graph:** Tests

## [0.0.1](http://neb-conditions-devdoc.s3-website.us-west-2.amazonaws.com/v0.0.1) (2019-01-04)


### Storybook

* **Features:** Adds support for building storybook for S3 (e6f4bf8, NEBV-1237)
* **Code Refactoring:** Updates the nesting of storybook private components (434cbe8, NEBV-1176)
* **Documentation:** Adds parent components as classnames for private component style scoping (e00f657, NEBV-1206)
* **Project Maintenance:** fixes storybook compilation bug with classname hierarchy (3086775)


### BubbleChart

* **Features:** Added circle size change for text (f855da1, NEBV-1232)
* **Features:** Added second instrument bubble (3a723ca, NEBV-1232)
* **Features:** Divided into public and private component (0c0a184, NEBV-1232)
* **Features:** Altered Data to group energybubbles (31bb070, NEBV-1232)
* **Features:** Added some accessibility features (b3f3e47, NEBV-1232)
* **Features:** Added some initial interaction on the charts (8447068, NEBV-1232)
* **Features:** Code refactor to use d3 for nested bubbles (31a1bc2, NEBV-1232)
* **Features:** tests, readme and setup (b03934a, NEBV-1232)
* **Tests:** Fixed tests to reflect changes in doc (450f8f8, NEBV-1232)
* **Documentation:** ReadMe Docs update (29aceb7, NEBV-1232)


### InstrumentsLegend

* **Features:** Initial setup for the InstrumentsLegend and it's LegendItem private component (84fcad1, NEBV-1189)
* **Tests:** Added tests for rendering of LegendItem (5e9c5ed, NEBV-1189)
* **Documentation:** Added requirements for the InstrumentsLegend and it's LegendItem private component (f1c6aa7, NEBV-1189)


### Testing

* **Documentation:** Adds documentation for testing process (eeec53f, NEBV-1257)
* **Documentation:** Fixes PR concerns (6ab1fc9)
* **Documentation:** Fixes PR concerns and typos (2a23d2b, NEBV-1257)
* **Documentation:** Fixes PR concerns with testing process doc (85bcc21, NEBV-1257)


### shouldBehaveLikeAComponent

* **Tests:** ensures component name is still className (f9e0930)
* **Code Refactoring:** moves wrapper instantiation into beforeEach (fb555ad)
* **Code Refactoring:** refactors arguments to work with beforeEach (764e3f2)


* **Tests:** adds missing glob for app/utilities/*.spec.js (d09536f)
* **Project Maintenance:** Upgrade babel from v6 to v7 (579798d)


### VSCode/Mocha-Sidebar

* **Project Maintenance:** fixes VSCode Mocha-Sidebar not finding the test configuration (a8edaee)


### streamgraph

* **Features:** added basic tests to component (39f8d39, NEBV-1209)
* **Features:** docs updated, new architecture for victory, wip (2f75848, NEBV-1178)
* **Features:** tests added; fix max condition value (f1ef98a, NEBV-1178)
* **Features:** updates readme docs (c63d110, NEBV-1178)
* **Features:** arrow keys and drag handling (81886df, NEBV-1209)
* **Features:** click to change location support (0ec3c3a, NEBV-1209)
* **Features:** code clean up and testing (d69c96a, NEBV-1209)
* **Features:** added click handler for streamgraph control (5d39417, NEBV-1209)
* **Features:** updated design and docs to match new design doc (c396297, NEBV-1178)
* **Bug Fixes:** removed duplicate control (ce359cb, NEBV-1209)
* **Tests:** setting up format for crosshair (ff90353)
* **Code Refactoring:** basic look of streamgraph control (b708252, NEBV-1209)
* **Code Refactoring:** changed to a class to accomodate new design components (c99dd1b, NEBV-1178)
* **Code Refactoring:** first part of pr changes (d726e34, NEBV-1209)
* **Code Refactoring:** made Control a public component (f72c016, NEBV-1209)
* **Code Refactoring:** pr changes (ce761dc, NEBV-1209)
* **Code Refactoring:** private component for Control (a02a266, NEBV-1209)
* **Code Refactoring:** remove unneccessary streamlayer component (29cf74b, NEBV-1178)


### PropTypes

* **Bug Fixes:** fixes proptypes for some of the tests (45035cb)


### Component Structure

* **Project Maintenance:** removes \`index.\` from spec and stories filenames (8c101d4)


### info bar

* **Features:** imported Icon public component to be used for share icons in info bar (a7a754a, NEBV-1195)
* **Features:** basic tests, storybook, and styles added for text box components (90473d4, NEBV-1195)
* **Features:** private components for about, methodology, and downloads text (79608f3, NEBV-1195)
* **Code Refactoring:** removed unnecessary files and clarified readme docs (13855a7, NEBV-1195)


### Data

* **Documentation:** Adds initial docs on data structure and queries (1947c09)
* **Documentation:** Cleans up unused data documentation and fixes PR comments (602cae7, NEBV-1226)


### Lint

* **Code Formatting:** Fixes react/jsx-curly-spacing in CircleContainer story (1fb2330)


### Introduction

* **Documentation:** Adds better introduction and cleans up some inaccurate lines (b298f42, NEBV-1257)


### View2

* **Project Maintenance:** Removes unused View2 container (5320360, NEBV-1257)


### Status

* **Documentation:** Adds status banner to all stories for iLab/NEB (5c77053, NEBV-1257)


### CompanyWheel/Ring/index.jsx

* **Code Refactoring:** trimming dull code (e1986dc)


### Commitizen

* **Project Maintenance:** adds cz-customizable instead of cz-conventional-changelog (5c2e6c0)


### Feature Flag

* **Features:** Adds boilerplate for the FeatureFlag component (8bab1e1, NEBV-1176)
* **Tests:** Adds tests for feature flag (b5f9fa6, NEBV-1210)
* **Code Refactoring:** Refactors feature flag to a public component (929d698)
* **Documentation:** Fixes typo (ad9e4d8, NEBV-1176)


### Project Legend

* **Features:** Adds a new project legend for project conditions (0a06011, NEBV-1206)
* **Features:** Adds boilerplate for project legend component (25a77a6, NEBV-1206)
* **Features:** Updates project legend to accept items instead of a selected feature (3ab46cb, NEBV-1176)
* **Tests:** Updates rendering tests for the project legend (d753415, NEBV-1176)
* **Code Refactoring:** Fixups for merge request (9852933, NEBV-1206)
* **Code Refactoring:** Part one of PR refactor (6b0ce6c, NEBV-1206)
* **Code Refactoring:** Renames all Project Legend to Legend to follow template spec (1cd9245, NEBV-1176)


### colors.scss

* **Code Formatting:** added common and other colors (cdd3da9)
* **Code Formatting:** refactor of scss structure (9ab8348, NEBV-1240)
* **Code Refactoring:** mmodify standard color structure, fix mistakes (a3f5573)


### InstrumentBubble

* **Features:** BubbleChart simplification (3057ac1, NEBV-1234)
* **Features:** Changed Component Structure (c55d44c, NEBV-1234)
* **Tests:** Added Tests (0801de7, NEBV-1234)
* **Tests:** Moved data to a prop for test cases (4623e51, NEBV-1234)
* **Code Formatting:** Added comments with todo (aafbdcd, NEBV-1234)
* **Code Formatting:** className change to PascalCase (db74692, NEBV-1234)
* **Code Formatting:** Fixed linting errors and styling (4b213c8, NEBV-1234)
* **Code Refactoring:** Added descriptions and reduced duplicate code (ad14bec, NEBV-1234)
* **Code Refactoring:** Changed to accept props (729b1fe, NEBV-1234)
* **Code Refactoring:** Moved data to props in Storybook (9d7775e, NEBV-1234)
* **Code Refactoring:** Refactored Code to use data as props (bbfde1e, NEBV-1234)
* **Code Refactoring:** Refactored pickColor function (2d4819f, NEBV-1234)
* **Documentation:** Added extra description (7026f30, NEBV-1234)
* **Documentation:** Changed Readme docs (3d94a97, NEBV-1234)
* **Documentation:** Changed README docs (a342ba3, NEBV-1234)
* **Documentation:** Docs changed with to do description (db3490e, NEBV-1234)
* **Documentation:** Modified docs to reflect the code structure change (1f77507, NEBV-1234)
* **Documentation:** Package.json and package-lock (5ee6eee, NEBV-1234)


### WheelRayLegend

* **Tests:** increasing test coverage, much more to be done. (a4cf755)
* **Code Refactoring:** Fixing for the merge review comments and other linting issues. (57f5ad0)


### List

* **Features:** Adds keyboard interaction and prop to disable (424e117, NEBV-1173)
* **Features:** Adds support for component items (47620c3, NEBV-1173)
* **Features:** Updated components using List to provided applicable properties (b796348, NEBV-1245)
* **Features:** Uses item index as onChange value instead of rendered component (edfe96a, NEBV-1173)
* **Features:** Updated styles and icons for horizontal and vertical rendering (6854e61, NEBV-1245)
* **Features:** Updated interaction element to avoid previous and next buttons getting focus (56cafda, NEBV-1245)
* **Features:** Adds previous/next arrow button placeholders (aa528f1, NEBV-1183, NEBV-1173)
* **Features:** Adds className prop to List (517c9af, NEBV-1173)
* **Tests:** Fixed prop warnings (409808f, NEBV-1245)
* **Tests:** Added tests previous and next button click events (1f669b3, NEBV-1245)
* **Tests:** Added tests for vertical and horizontal rendering (2891129, NEBV-1245)
* **Code Formatting:** Moved SVG out of FeaturesMenu styles and updated FeaturesMenu styles for use with updated List styles (1d6f6cf, NEBV-1245)
* **Code Refactoring:** Updated quotes used in scss (8882d68, NEBV-1245)
* **Documentation:** Added example with the guide line (29d682a, NEBV-1245)
* **Documentation:** Adds propTypes descriptions to List (a9c2ded, NEBV-1173)
* **Documentation:** Updates docs to match currently supported List functionality (8590312, NEBV-1173)


### FeaturesMenu

* **Features:** Initial setup for the FeaturesMenu (83390d3, NEBV-1187)
* **Features:** Changed drop down to set the default value in select to match the state of other components (a8cefa9, NEBV-1236)
* **Features:** Added rendering of the component for drop down and no drop down modes (9dccb6e, NEBV-1236)
* **Features:** Added selected prop for setting a default selected feature (bbca72e, NEBV-1236)
* **Tests:** Added test for checking no option is rendered with selected (bb8736b, NEBV-1236)
* **Tests:** Added tests for the rendering of the component (2c7266e, NEBV-1187)
* **Tests:** Added tests for the selected prop (9f0f113, NEBV-1236)
* **Tests:** Updated tests for selected property on drop downs to look at option elements (cbfb061, NEBV-1236)
* **Code Formatting:** Added styling for view 2 drop down mode (7b0848c, NEBV-1236)
* **Code Formatting:** Added styling for view 3 list mode (4f44d40, NEBV-1236)
* **Code Refactoring:** Moved the list menu and drop down creation into the component definition (d942ff8, NEBV-1236)
* **Documentation:** Added examples to storybook (42e715d, NEBV-1236)
* **Documentation:** Added requirements for the FeaturesMenu (1f08d1a, NEBV-1187)
* **Documentation:** Added selected example (08878c3, NEBV-1236)
* **Documentation:** Added storybook knobs for selected and drop down mode (51cd29b, NEBV-1245)
* **Documentation:** Updated knob for drop down mode (5f9a21b, NEBV-1245)
* **Reverts:** Updated tests for selected property on drop downs to look at option elements (f36d5f2, NEBV-1236)


### ESLint

* **Tests:** Fixes `npm run lint` not working with latest version of ESLint (f90d1a8)
* **Tests:** Fix linting errors and improve linting config (f910eed, NEBV-1149)
* **Code Formatting:** Fixes linting issues after package updates (8a4155f)
* **Code Refactoring:** Fix missing button type linting issue (6f436c0)
* **Project Maintenance:** Fixes range of null linting error (b2b3780)
* **Project Maintenance:** Fixes Windows error with single-quotes in npm script (d096ee2)


### SmallMultiplesLegend

* **Features:** Initial setup for the SmallMultiplesLegend (ca1fcf7, NEBV-1177)
* **Features:** Added rendering of the title for the component (f84a305, NEBV-1177)
* **Features:** Removed the rendering of the title (4b029b6, NEBV-1224)
* **Features:** Handled a non-matching highlight name (853f929, NEBV-1224)
* **Features:** Added rendering of the legend items (bf9ae93, NEBV-1177)
* **Features:** Initial setup for the SmallMultiplesLegendItem private component (d97466f, NEBV-1177)
* **Features:** Updated data property to be required (4788db3, NEBV-1177)
* **Features:** Added on change event for the component (87d11d0, NEBV-1177)
* **Features:** Added unhighlighting of LegendItem (1904dde, NEBV-1177)
* **Features:** Added selected property for setting the selected list item (8fafd5a, NEBV-1245)
* **Features:** Update style and layout to reflect changes in design (e4a1616, NEBV-1224)
* **Features:** Added highlight ability (401259f, NEBV-1177)
* **Features:** Added rendering of the title for items in the SmallMultiplesLegend (ba80ddb, NEBV-1177)
* **Features:** Removed all label and replaced with mock for translation (7cb8251, NEBV-1177)
* **Features:** Added rendering of charts for the legend items (b117737, NEBV-1224)
* **Features:** Added placeholders for graph in the items private component (6c095a9, NEBV-1177)
* **Features:** Added search for the max data value and passed that to LegendItem (3d693bb, NEBV-1224)
* **Features:** Added class name property for component (e9c38df, NEBV-1224)
* **Tests:** Added tests for LegendItem unhighlight (aadc26f, NEBV-1177)
* **Tests:** Updated tests for component property changes (aa8d93f, NEBV-1224)
* **Tests:** Added test for rendering the list of legend items (d602c9b, NEBV-1177)
* **Tests:** Finished tests for rendering the chart (ead4f04, NEBV-1224)
* **Tests:** Added tests for setting the component class (e40333c, NEBV-1224)
* **Tests:** Updated test to include color in data (e0e0ed5, NEBV-1224)
* **Tests:** Added tests for setting a selected data item (86fddfd, NEBV-1245)
* **Tests:** Added test for invalid highlight name (810c6ad, NEBV-1224)
* **Tests:** Added test for rendering the title of the component (063b93f, NEBV-1177)
* **Tests:** Added test for rendering the title of items in the SmallMultiplesLegend (fede342, NEBV-1177)
* **Tests:** Added tests the component class (9b5353c, NEBV-1177)
* **Tests:** Added tests for on change events (7512464, NEBV-1177)
* **Tests:** Added tests for component highlighting (53915f1, NEBV-1177)
* **Tests:** Add test for title rendering when the data is provided (12ede3d, NEBV-1177)
* **Tests:** Added tests for getting and passing the max value to the LegendItem (205194f, NEBV-1224)
* **Code Formatting:** Fixed linting error (2245944, NEBV-1177)
* **Code Formatting:** Fixed linting errors (cb8071c, NEBV-1177)
* **Code Refactoring:** Added changes from feedback (5d6faca, NEBV-1224)
* **Code Refactoring:** Added key property to LegendItems and shortten code to create LegendItems (d86e829, NEBV-1177)
* **Code Refactoring:** Flatten tests (9b2cd14, NEBV-1224)
* **Code Refactoring:** Flatten tests in private component (c4ebcb5, NEBV-1224)
* **Code Refactoring:** Moved List component creation out of constructor (80ea8cc, NEBV-1177)
* **Code Refactoring:** Moved the getLegendList functionality back into SmallMultiplesLegend definition (b7b7add, NEBV-1177)
* **Code Refactoring:** Removed test reference object (f6f89b8, NEBV-1224)
* **Code Refactoring:** Renamed component properties to match StreamGraph (2ba9271, NEBV-1177)
* **Code Refactoring:** Renamed data id property to name (6e90dbc, NEBV-1224)
* **Code Refactoring:** Replacing mount with shallow in test (8132dd1, NEBV-1224)
* **Code Refactoring:** Shortened name of private component SmallMultiplesLegendItems (667d885, NEBV-1177)
* **Documentation:** Added an example for LegendItem unhighlighting (6c7f9a5, NEBV-1177)
* **Documentation:** Added descriptions for properties (db557c4, NEBV-1177)
* **Documentation:** Added example for highlighting a data item (95cf2b3, NEBV-1177)
* **Documentation:** Added requirements for the SmallMultiplesLegend (62d27d6, NEBV-1177)
* **Documentation:** Added requirements for the SmallMultiplesLegendItem (ea0d974, NEBV-1177)
* **Documentation:** Added storybook knobs for selected and highlight (a0d59eb, NEBV-1245)
* **Documentation:** Fixed class name descriptions (323c710, NEBV-1224)
* **Documentation:** Fixed grammar (ef0751f, NEBV-1224)
* **Documentation:** Updated completed task items (123b353, NEBV-1224)
* **Documentation:** Updated component stories with the new properties (c823095, NEBV-1224)
* **Documentation:** Updated component usage (78befc9, NEBV-1177)
* **Documentation:** Updated example to include the on change event (bd51a15, NEBV-1177)
* **Documentation:** Updated highlight property name (8f9a2c5, NEBV-1224)
* **Documentation:** Updated private component Storybook position (cd14a6f, NEBV-1177)


### NPM

* **Project Maintenance:** Fixes HTTP/HTTPS mismatch in package-lock.json (a9bcc9d)
* **Project Maintenance:** Updates all package dependencies to their latest version (b3011b5)


### ProjectDot, Spelling and formatting

* **Code Refactoring:** refactoring of projectdot to accept props differently (ca2ca9c)


### handleInteraction

* **Features:** Adds memoization to handleInteraction using memoizeReference (9433443)
* **Features:** Adds check for callback and returns {} when missing (a1d0162)
* **Bug Fixes:** Adds lodash.memoize dependency that was removed in another PR (282adb2)


### shouldHaveInteractionProps

* **Tests:** Adds test utilitiy for verifying that interactions are accessible (952b4a1)


### memoizeReference

* **Features:** Adds memoizeReference for generating unique identifiers for functions, objec (f25ae71)


### CompanyWheel

* **Bug Fixes:** Further tweaks on dynamic spacing of wheel (a0fec54)
* **Bug Fixes:** Fix wheel wabble on rotation (a2ee1d1)


### CircleContainer

* **Features:** changed minor lint issues and spelling errors (3267e11)
* **Documentation:** Adds a TODO item to the CircleContainer component (f18e40e, NEBV-1210)


### Project Chart

* **Features:** Adds temporary feature flags to the project chart (c373a5c, NEBV-1176)
* **Features:** Adds boilerplate for Project Chart component (c4922ca, NEBV-1176)
* **Tests:** Fixes tests for Project Chart after refactor (14c074f, NEBV-1176)
* **Tests:** Adds some tests for project chart and refactors long line (5864f48, NEBV-1176)
* **Code Refactoring:** Move story structure to private component and fix up ref (a70dbe9, NEBV-1176)
* **Code Refactoring:** Refactors how the condition count is generated (a0e68f5)
* **Documentation:** Adds Knob for ProjectChart selection (7d06c44, NEBV-1210)


### Icons

* **Code Refactoring:** Removes the spread of handle interactions and moves styling for icons to its own fi (9874ab8, NEBV-1210)


### CompanyWheel/ProjectDot - RayLegend

* **Code Refactoring:** stories, css and code simplification (77e638e)


### Project Menu

* **Features:** Updates project menu and its private components (197df92, NEBV-1210)
* **Features:** Adds project tracking to project menu (84fc783, NEBV-1176)
* **Features:** Updates what project menu should be passing to the project legend (af7dc8a, NEBV-1176)
* **Features:** Adds logic for selected project chart flag colours and Adds testing (a9dc6e2, NEBV-1210)
* **Features:** (bug on safari) keep centered selected project (962eb3f, NEBV-1210)
* **Features:** Angled styling for the project menu (05b50e2, NEBV-1210)
* **Bug Fixes:** Fixes typo in props (af5a1e9, NEBV-1176)
* **Bug Fixes:** Changes list items to be nodes to be passed down to the list component (bc80c77, NEBV-1176)
* **Bug Fixes:** Adds pull request fixes (f3f0302, NEBV-1210)
* **Tests:** Adds a couple of basic tests (d45abdb, NEBV-1176)
* **Code Formatting:** Adds more styling for the ConditionCount and the pipelines (e474364, NEBV-1210)
* **Code Formatting:** Adds styling to the ProjectChart and FeatureFlag (3703b2a, NEBV-1210)
* **Code Formatting:** Fixes indentation of styling (172a102, NEBV-1210)
* **Code Refactoring:** PR fixes (adds newline) (b2430cd, NEBV-1210)
* **Code Refactoring:** PR fixes making props required and removing story (e7f0d8d, NEBV-1176)
* **Code Refactoring:** Remove sinon until needed (b8a71f8, NEBV-1176)
* **Code Refactoring:** Removes Project legend from the project menu component (72588ae, NEBV-1176)
* **Code Refactoring:** Removes utility for sorting (a5f7ee0, NEBV-1176)
* **Code Refactoring:** Updates the project menu to pass the selected proeject ID to its passed in o (5ad02a2, NEBV-1176)
* **Documentation:** Adds descriptions to props (beae8c1, NEBV-1176)
* **Documentation:** Adds more stories for the FeatureFlag component (9686f05, NEBV-1210)
* **Documentation:** Adds tests for Project menu and boilerplate for Project Legend (ccf469c, NEBV-1176)
* **Documentation:** Creates a new story component for the ProjectMenu (173042c, NEBV-1176)
* **Documentation:** Updates docs to have multiple story links (b2b7cc4, NEBV-1176)
* **Documentation:** Updates Project Menu and private components stories (2504e01, NEBV-1176)
* **Documentation:** Updates README docs for the ProjectMenu component (6042ec9, NEBV-1176)


### All around

* **Code Formatting:** changes to mostly the classes name to be in line with the UpperCamelCase standard (33ac647)


### FeatureDescription

* **Documentation:** Fixes typo (omit -> emit) (b706c1c, NEBV-1190)


### ProjectMenu

* **Code Formatting:** Fixes Safari and IE11 styling of ProjectMenu with blank bars (ca97e61, NEBV-1210)


### SelectedGroupBar component

* **Features:** changed prop name (f08716f)
* **Features:** Changed png (90ad5f6)
* **Features:** changed tests and proptyle (a905358)
* **Features:** fixed the image path for displaying readme image (46fda55)
* **Features:** Changed path for example image (8b2dac5)
* **Features:** Removed no breaking space (0383f47)
* **Features:** Fixed stories (1b82ad8)
* **Features:** Fixed broken tests for isses with props (84d0ee7)
* **Features:** fixed and PR comments, and an extra stroy for color (2563f4b)
* **Features:** removed Sinon import and Enzyme { mount } import in test file (a1312fe)
* **Features:** removed extra mocha params (a4d2a4d)
* **Features:** Created component, added tests, and stories (c0f6e91, NEBV-1205)


### CompanyWheel WheelRayLegend

* **Bug Fixes:** modify responsibility of render and degree calculation (d8b2453)


### Tests

* **Code Refactoring:** Pulling out shared test (940d017)
* **Project Maintenance:** Moved test folder to app/tests (d406243)


### SelectedGroupBar Component

* **Features:** Changed the example image (c490e29)


### Storybook Styles Addon

* **Features:** Adds styles decorator to storybook for providing iLab-like status indi (b03b549, NEBV-1239)


### SelectedGroupBar

* **Features:** Added better README.md, changed tests to reflect removal of nonbreaking spac (774e785)


### FileSetup for BubbleChart

* **Features:** Documents set up (cae114e, NEBV-1193)


### feature-description

* **Code Refactoring:** make required props and remove unneccessary test (e47ed4c, NEBV-1190)


### NYC

* **Project Maintenance:** Fixes NYC not running tests in BitBucket Pipelines (458a0f3)


### CompnayWheel, docs

* **Code Refactoring:** Wheel animation, Wheel data structure, dot style (89da6c6)


### feature description

* **Features:** added styles (eeaa474, NEBV-1190)
* **Features:** basic tests added for feature description (d5fd2c4, NEBV-1190)


### TrendButton

* **Bug Fixes:** Proper Display of TrendButton in storybook (fcba082, NEBV-1174)
* **Bug Fixes:** Fixed render issue with Firefox (d5aed6e, NEBV-1174)
* **Tests:** Removes inaccurate test for TrendButton+StreamGraph (cf9c0d6, NEBV-1178)
* **Tests:** Changed function name and prop (57496cd, NEBV-1174)
* **Code Formatting:** Changed spacing and styling in scss file (38ea3ef, NEBV-1174)
* **Code Formatting:** Fixed spacing in Readme doc (4a5ae60, NEBV-1174)
* **Code Formatting:** Fixed styling (93cb5c3, NEBV-1174)
* **Code Formatting:** Syntax Fix (131bc5d, NEBV-1174)
* **Code Refactoring:** Changed onClick prop and steamGraphData (a7eccfb, NEBV-1174)
* **Code Refactoring:** Changed proptypes and unused parameters (0736c19, NEBV-1174)
* **Code Refactoring:** Refactored code, test file, and storybook (b623042, NEBV-1174)
* **Code Refactoring:** Removes reference to StreamGraphs, which will be implemented differently in t (9c0d1da, NEBV-1178)
* **Documentation:** Changed docs (1ba9fce, NEBV-1174)
* **Documentation:** Fixed style in code docs (dfafffa, NEBV-1174)
* **Documentation:** Update README docs for TrendButton Component (5a96aa0)
* **Project Maintenance:** Added Opn-cli for OS consistency (64c2203, NEBV-1174)
* **Project Maintenance:** Modify storybook to use knobs (54e87e7, NEBV-1174)


### CircleContainer compoenent

* **Features:** pack.lock.json merge conflict (ac52819)


### CircleContainer component

* **Features:** Made PR comment changes to merge (b87e27c)
* **Features:** spelling (5db80b8)
* **Features:** fixed spelling errors in the read me (fc3a6e4)
* **Features:** Fixed too long line character line lengths in files (0ec392b)
* **Features:** Made the component a React.memo(component) (1842898, NEBV-1183)
* **Features:** Return a memoized compoenet, fixed tests breaking (155724d, NEBV-1183)
* **Features:** Added className prop with tests (1e77ec8, NEBV-1183)


### Dependencies

* **Project Maintenance:** Removes direct dependency on d3/d3-scale since they aren't used (43de5ac, NEBV-1178)


### Icon component

* **Features:** removed line (5f6be8a)
* **Features:** made default props null (d958f74)
* **Features:** fixed spelling, fixed ESLint error issue (c43c8a0)
* **Features:** fixed spelling, changed line length (6d7a2ba)
* **Features:** Removed sinon import in test file (14a8915)
* **Features:** Removed extra mocha params for single test (8d90a24)
* **Features:** Fixed spelling errors, Removed classnames import and useage (541146d, NEBV-1207)
* **Features:** Changed CSS, refactored tests and added new elements (078f539, NEBV-1227)
* **Features:** added classnames, refactored tests (79cfcee, NEBV-1205)
* **Features:** Created Component, added tests, and stories (41972b7, NEBV-1184)


### Icon compnent

* **Features:** Changed where Icons were added to tests and stories (0a6f227)


### CircleContainer compoenet

* **Features:** Removed usage of React.memo (a230643, NEBV-1183)


### ProjectDot

* **Features:** architect and initial implementation of project dot (33b46fe, NEBV-1215)


### CompanyWheel animation

* **Features:** implementation of company wheel (ea1d3bc)


### SelectedGroupBar componenet

* **Features:** Fixed broken test due to spacing (33594d7, NEBV-1205)


### stream graph

* **Features:** logging previous design streamgraph functionality (5e07d0e, NEBV-1178)


### WheelRayLegend private component and some logic

* **Features:** This is a rough implementation no TDD (652273c)


### streamlayer

* **Features:** architect streamlayer public component (d3f3a81, NEBV-1208)


### Merge conflict issue

* **Bug Fixes:** Fixed merge conflict (6eea351, NEBV-1183)


### Forgot to pull current dev branch

* **Bug Fixes:** Not following gitflow (bda34cc, NEBV-1183)


### Changed component name to CircleContainer and added the classnames package

* **Features:** Name Change Circle (63d489e)


### streamLayer

* **Features:** created a public component for the streamLayer (fa665f2, NEBV-1208)


### Company wheel and Ring

* **Documentation:** append tests and fix some todos for the upcoming components feedback i (5d271f9)


### Ring and company wheel

* **Code Refactoring:** change rendering responsibility, fix docs, and test (c9b6fc4)


### Ring component

* **Features:** implementation (139361a)


### Git Standards

* **Documentation:** Adds example of bugfix branch naming guideline (df53301)


### Standards/Git

* **Documentation:** Added guidelines for feature branch naming (46ba902)
* **Documentation:** Adds Conventional Commits as a commit standard (4455660, NEBV-1147)


### Architecture/Component

* **Documentation:** Updated private component folder structure (3aff36e)
* **Documentation:** Updated private component folder structure (210146c)


### Removed redundant test, Added Test documentation folder

* **Code Refactoring:** Removed Test, Added Documentation (f705a8d, NEBV-1183)


### Coverage

* **Tests:** Fixes `npm run test` on Windows (d1dbf07)
* **Tests:** Fix coverage reports for NYC+Mocha (b240af5)


### IconSelector

* **Features:** added tests, changed component (b31a37b, NEBV-1183)
* **Features:** added tests, changed component (2da600f)
* **Features:** Adds initial scaffolding of IconSelector (fd17e09, NEBV-1183)


### README

* **Project Maintenance:** Added reference to the ticket for the nyc issue (cd4ec95)
* **Project Maintenance:** Added root README (5357856)


### (TrendButton)

* **Documentation:** Changed Readme and Storybook (c8312cc, NEBV-1174)


### editorconfig

* **Code Formatting:** Adds editorconfig and VSCode config for 2-space indentation (5deafaf)


### NEBV-1174(TrendButton)

* **Features:** Placeholder StreamGraph and basic Storybook setup (01943a3, NEBV-1174)
* **Features:** Added basic component setup and tests (66b3876, NEBV-1174)
* **Tests:** Test Fixes (a476a8e, NEBV-1174, NEBV-1174)
* **Tests:** Fixing test issues with png files (3d24a35)
* **Code Formatting:** Style Fix (a349ba3, NEBV-1174)
* **Documentation:** Changed styling of readme docs to properly render (4892d3d, NEBV-1174)
* **Documentation:** Updated Readme and describe content in test file (67dd512, NEBV-1174)
* **Project Maintenance:** Add imgs and change text in placeholder component (d72cbe9, NEBV-1174)
* **Project Maintenance:** Added styles (e52bc87, NEBV-1174)
* **Project Maintenance:** Changed storybook component (935665b, NEBV-1174)


### Legend

* **Code Refactoring:** Naming refactor for Legend to be consistent (e596a6a, NEBV-1176)


### Sort utility

* **Tests:** Removes un-nessisary check (dba6a0d, NEBV-1176)


### EditorConfig

* **Project Maintenance:** Added a EditorConfig file for basic code formatting (9ce9948)
* **Project Maintenance:** Fixed trailing lines exception for all markdown files (7231b90)


### SCSS

* **Tests:** Adds css/scss to ignore path in Mocha test execution (ddcf73c)
* **Tests:** Adds css/scss to ignore path in Mocha test execution (b7cdd4f)


### utilities/handleInteraction

* **Features:** Adds handleInteraction helper to bind event listeners and tabInde (3d8307d, NEBV-1173)


### VSCode

* **Tests:** Fix mocha-sidebar support (90539eb)
* **Tests:** Commit .vscode/settings.json for preconfigured mocha (459bb27)


### Mocha

* **Project Maintenance:** Fixes jsdom loading to not pollute node globals (c4bfeb0)


### Component Template

* **Documentation:** Replace placeholder components with template (52fe6ed, NEBV-1149)


### eslint

* **Tests:** Fixes `npm run lint` command (c248c3f, NEBV-1147)


### BREAKING CHANGES

* **List:** <List onChange={...} /> emits index instead of value
* **CompanyWheel animation:** addition of react-spring to the project
* **IconSelector:** Changed component PropTypes
* **IconSelector:** Changed PropTypes
* **colors.scss:** name of colors, structure changed

