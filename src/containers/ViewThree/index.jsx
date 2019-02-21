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
          data={props.conditionCountsByYear.counts}
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
