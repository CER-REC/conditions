import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';

const Main = props => (
  <article
    {...props}
    style={{
      margin: 15,
      maxWidth: 600,
      lineHeight: 1.4,
      fontFamily: '"Helvetica Neue", Helvetica, "Segoe UI", Arial, freesans, sans-serif',
    }}
  />
);

const Code = ({ children }) => (
  <pre>
    {children}
  </pre>
);

const InlineCode = props => (
  <code
    {...props}
    style={{
      fontWeight: 600,
      padding: '2px 5px',
      border: '1px solid #eae9e9',
      borderRadius: 4,
      backgroundColor: '#f3f2f2',
      color: '#3a3a3a',
    }}
  />
);

const GettingStarted = () => (
  <Main>
    <h1>Getting Started</h1>
    <p>
      The NEB&apos;s Conditions Visualization design document may be found <a href="http://ilab.cpsc.ucalgary.ca/energyvis/designdocuments/conditions/" target="_blank" rel="noopener noreferrer">here</a>.
    </p>

    <h1>Architecture</h1>

    <h2>Components and Containers</h2>
    <p>
      We use the terms <InlineCode>Components</InlineCode> and <InlineCode>Containers</InlineCode>, despite both implementing the React component pattern, so that we can differentiate between reusable elements and visualization layout elements. Both of these implement a similar pattern, with the primary difference coming down to testability.
    </p>
    <p>
      React components should be written as pure components, regardless of whether they are class or functional components.
    </p>
    <Code>{`
class PureClassComponent extends React.PureComponent {}

// If the props or state changing doesn't necessarily trigger a render, we can
// further optimize the component by handling shouldComponentUpdate ourselves.
class ManualPureClassComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (...) { return true; }
    return false;
  }
}

const PureFunctionalComponent = React.memo(props => <div />);
    `}</Code>
    <p>
      Components should be stored in <InlineCode>app/components/ComponentName/</InlineCode> and Containers in <InlineCode>app/containers/ContainerName/</InlineCode>.
    </p>
    
    <h3>React Components</h3>
    <p>
      Each component that is intended for direct use (as opposed to supporting components that are only used in a single parent for a very specific purpose) should be in a folder as the default export from `index.jsx`. This will improve visibility into which components may be used, and help us ensure that those components do not have direct dependencies on the state.
    </p>
    <Code>{`
// app/components/CompanyWheel/index.jsx
export default class CompanyWheel extends React.PureComponent {}
    `}</Code>

    <h3>Containers</h3>
    <p>
      Since containers are primarily used for layout and configuration, they will typically have no (or few) interactable elements. They will serve as the connection point to the Redux state, providing properties to the components, including the Redux Action Creators that will be used on the component&apos;s interactive elements.
    </p>

    <h3>State</h3>
    <p>There are three areas where we may track the current visualization settings:</p>
    <ul>
      <li>Redux (Global application state)</li>
      <li>Component state</li>
      <li>Component properties</li>
    </ul>
    <p>As a general rule of thumb, the following steps will define the best location:</p>
    <ul>
      <li>If this data affects the screenshot or sharing: Redux</li>
      <li>If this data is used by multiple components that aren't parents/children of each other: Redux</li>
      <li>
        If this component or its children should rerender when it changes
        <ul>
          <li>If this data changes multiple times per second: Potentially property that debounces to state</li>
          <li>Caution should be used, as this may result in race conditions and render bugs. Always discuss this with the team first</li>
        </ul>
      </li>
      <li>If this data changes less than once a second: Component state</li>
    </ul>
    <p>
      When storing state in Redux, a wrapper component should be created with a matching path to that of the component inside <InlineCode>app/connected/</InlineCode>. This is done to ensure that the component may be used within design documents without needing a Redux store.
    </p>
    <Code>{`
// app/components/CompanyWheel/index.jsx
import React from 'react';
import './styles.scss';
export default class CompanyWheel extends React.PureComponent {}

// app/connected/CompanyWheel/index.jsx
import { connect } from 'react-redux';
import CompanyWheel from '../../components/CompanyWheel/';
export default connect(({ selectedCompany })=> ({ selectedCompany }))(CompanyWheel);
    `}</Code>

    <h3>CSS</h3>
    <p>
      Any styles that are required to display the component outside of the visualization should be added to a <InlineCode>styles.scss</InlineCode> file and imported into any files within the component folder that make use of it. All declarations within <InlineCode>styles.scss</InlineCode> should be grouped in a single class that is only used by this component.
    </p>
    <Code>{`
/* app/components/CompanyWheel/styles.scss */
.company-wheel {
  .company-name {
    font-weight: bold;
  }

  .pull-to-spin {
    position: absolute;
    top: 0;
    right: 0;
  }
}
    `}</Code>

    <h3>PropTypes</h3>
    <p>PropTypes should be added to props to reduce bugs in component usage.</p>

    <h3>Documentation</h3>
    <p>
      Each component should have a <InlineCode>README.md</InlineCode> to explain what the component is used for, and what its interaction, analytics, and accessibility requirements are, with reference links back to the design document.
    </p>

    <h2>Redux</h2>
    <p>Implementing a global state store with Redux can be broken down into four segments:</p>
    <ul>
      <li>Types: Identifier for what action is being done</li>
      <li>Action Creators: Functions that generate an Action object with the Action Type and the data required to execute the change</li>
      <li>Reducers: Functions that take a current state and an action, and return a new state</li>
      <li>Middleware: Functions that can respond to and prevent actions based on other state</li>
    </ul>
    <p>
      Since Types, Actions, and Reducers are closely related, we group these together in a single file in the <InlineCode>app/actions/</InlineCode> folder. There should be one file for each set of related state.
    </p>
    <Code>{`
// app/actions/findWords.js
export const Types = {
  UPDATE_SEARCH: 'findWords.updateSearch',
  UPDATE_RESULTS: 'findWords.updateResults',
  RESET_SEARCH: 'findWords.resetSearch',
};

export const updateSearchQuery = (newSearch = {}) => ({
  type: Types.UPDATE_SEARCH,
  payload: { query: newSearch },
});

export const updateSearchResults = (searchResults = []) => ({
  type: Types.UPDATE_RESULTS,
  payload: { results: searchResults },
});

export const resetSearch = () => ({
  type: Types.RESET_SEARCH,
});

export const reducer = (initialState = {}, action) => {
  switch (action.type) {
    case Types.UPDATE_SEARCH:
      return { ...initialState, query: action.payload.query };

    case Types.UPDATE_RESULTS:
      return { ...initialState, results: action.payload.results };

    case Types.RESET_SEARCH:
      return { ...initialState, query: {}, results: [] };
  }
};
    `}</Code>

    <h2>Testing</h2>
    <p>
      Every component should have a set of tests to ensure that it renders as designed and covers all of the interaction, analytics, and accessibility requirements.
    </p>
    <Code>{`
// TODO: Write test example and structure
    `}</Code>

    <h2>Retrieving data</h2>
    <p>
      Data for the visualization will be served by a GraphQL server running in the IIS visualization service. Queries can be executed with <InlineCode>react-apollo</InlineCode>, which will provide automatic caching and query execution when props change.
    </p>
  </Main>
);

storiesOf('Introduction', module)
  .add('Getting Started', () => <GettingStarted />);
