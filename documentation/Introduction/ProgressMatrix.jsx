import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const getClass = stage => classNames({
  pending: stage === 0,
  started: stage === 1,
  halfway: stage === 2,
  mostly: stage === 3,
  finished: stage === 4,
});

// [Functionality, Data, Design]
const components = {
  BarContainer: [4, 4, 3],
  BrowseByBtn: [4, 4, 3],
  BubbleChart: [3, 2, 2],
  ChartIndicator: [4, 4, 3],
  CircleContainer: [4, 4, 4],
  ConditionDetails: [3, 2, 3],
  ConditionExplorer: [1, 2, 1],
  Dropdown: [4, 4, 4],
  FeatureDescription: [3, 3, 3],
  FeatureFlag: [4, 3, 4],
  FeatureTypesDescription: [3, 3, 3],
  FeaturesLegend: [4, 3, 3],
  FeaturesMenu: [4, 3, 3],
  Icon: [4, 4, 4],
  InstrumentsLegend: [3, 2, 3],
  List: [4, 4, 4],
  LocationWheelMinimap: [4, 3, 3],
  MainInfoBar: [2, 2, 2],
  Modal: [2, 2, 2],
  ProjectMenu: [3, 3, 2],
  RegionCompanies: [3, 3, 3],
  SearchBar: [4, 3, 3],
  SelectedGroupBar: [4, 4, 3],
  ShareIcon: [3, 4, 3],
  ShortcutInfoBar: [3, 3, 3],
  SmallMultiplesLegend: [4, 3, 3],
  StreamGraph: [4, 3, 3],
  TrendButton: [4, 2, 2],
  Wheel: [2, 2, 2],
};

// [Components Implemented, Interaction, Data, Design]
const views = {
  ViewOne: [3, 3, 2, 3],
  ViewTwo: [4, 3, 2, 2],
  ViewThree: [3, 3, 2, 3],
  Footer: [2, 3, 3, 2],
};

// [Architecture, Functionality, Deployment, Refinement]
const backends = {
  ETL: [3, 3, 2, 2],
  'DVI Webservice': [3, 3, 1, 1],
  'Conditions Webservice': [3, 3, 2, 2],
  'GraphQL Data API': [2, 1, 1, 0],
};

const getAverage = (input) => {
  const values = Object.values(input);
  const columns = values[0].length;
  return values
    .reduce(
      (acc, next) => acc.map((v, i) => (v + next[i])),
      Array(columns).fill(0),
    )
    .map(v => Math.round(v / values.length));
};

const ColorTable = ({ title, headers, data, className }) => (
  <div className={classNames('ColorTable', className)}>
    <h2>{title}</h2>
    <table cellPadding="4" cellSpacing="0">
      <thead>
        <tr>
          <th>Name</th>
          {headers.map(v => <th key={v}>{v}</th>)}
        </tr>
      </thead>
      <tbody>
        {Object.entries(data).map(([name, stage]) => (
          <tr key={name}>
            <td>{name}</td>
            {stage.map((v, i) => <td key={headers[i]} className={getClass(v)}>&nbsp;</td>)}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr>
          <td>Average</td>
          {getAverage(data).map((v, i) => <td key={headers[i]} className={getClass(v)}>&nbsp;</td>)}
        </tr>
      </tfoot>
    </table>
  </div>
);

ColorTable.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  className: PropTypes.string,
};

ColorTable.defaultProps = {
  className: '',
};

export default () => (
  <div className="ProgressMatrix">
    <h1>Progress Matrix</h1>

    <ColorTable
      title="Color Scale"
      headers={['Pending', 'Started', 'Half Way', 'Mostly Complete', 'Finished']}
      data={{ key: [0, 1, 2, 3, 4] }}
      className="key"
    />

    <div className="column">
      <ColorTable
        title="Components"
        headers={['Functionality', 'Data Connection', 'Design']}
        data={components}
      />
    </div>

    <div className="column">
      <ColorTable
        title="Views"
        headers={['Components Implemented', 'Interaction', 'Data Connection', 'Design']}
        data={views}
      />

      <ColorTable
        title="Backends"
        headers={['Architecture', 'Functionality', 'Deployment', 'Refinement']}
        data={backends}
      />
    </div>
  </div>
);
