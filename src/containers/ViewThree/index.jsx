import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import FeaturesMenu from '../../components/FeaturesMenu';
import SmallMultiplesLegend from '../../components/SmallMultiplesLegend';
import StreamGraph from '../../components/StreamGraph';
import FeatureDescription from '../../components/FeatureDescription';
import SelectedGroupBar from '../../components/SelectedGroupBar';
import BrowseByButton from '../../components/BrowseByBtn';
import './styles.scss';

const features = ['theme', 'instrument', 'phase', 'type', 'status', 'filing'];

const basicUsageData = [{
  name: 'security',
  graphData: [{
    date: 2018,
    count: 1,
  }, {
    date: 2019,
    count: 30,
  }, {
    date: 2020,
    count: 20,
  }, {
    date: 2021,
    count: 84,
  }, {
    date: 2022,
    count: 3,
  }],
  color: 'red',
}, {
  name: 'managementSystem',
  graphData: [{
    date: 2018,
    count: 43,
  }, {
    date: 2019,
    count: 22,
  }, {
    date: 2020,
    count: 56,
  }, {
    date: 2021,
    count: 1,
  }, {
    date: 2022,
    count: 56,
  }],
  color: 'blue',
}, {
  name: 'financial',
  graphData: [{
    date: 2018,
    count: 5,
  }, {
    date: 2022,
    count: 5,
  }],
  color: 'green',
}, {
  name: 'damagePrevention',
  graphData: [{
    date: 2018,
    count: 46,
  }, {
    date: 2022,
    count: 4,
  }],
  color: 'yellow',
}];

const chartTitle = 'Themes Across All Conditions';

const description = 'components.featureDescription.theme';
const feature = 'theme';

const noop = () => {};

const ViewThree = props => (
  <section className={classNames('ViewThree', { layoutOnly: props.layoutOnly })}>
    <section className="row">
      <section className="features">
        <FeaturesMenu features={features} onChange={noop} />
      </section>
      <section className="legend">
        <SmallMultiplesLegend
          title="theme"
          data={basicUsageData}
          onChange={noop}
        />
      </section>
      <section className="chart">
        <StreamGraph projectData={props.conditionCountsByYear.counts} chartTitle={chartTitle} />
      </section>
    </section>
    <section className="row">
      <section className="featureDescription">
        <FeatureDescription feature={feature} description={description} />
      </section>
      <section className="typesDescription">
        <FeatureDescription feature={feature} description={description} />
      </section>
    </section>
    <section className="row">
      <section className="selectedCompany">
        <SelectedGroupBar
          group="components.companyWheel.wheelRay.title"
          groupItem="groupItem"
          groupSize={16}
          groupItemSize={16}
          backgroundColor="lightgrey"
        >
          Company Name
        </SelectedGroupBar>
        <BrowseByButton mode="company" onClick={noop} />
      </section>
      <section className="conditionDetails">
        <span style={{ fontSize: '50px', marginLeft: '45%' }}>6</span>
      </section>
    </section>
  </section>
);

ViewThree.propTypes = {
  layoutOnly: PropTypes.bool,
};

ViewThree.defaultProps = {
  layoutOnly: PropTypes.false,
};

export default ViewThree;
