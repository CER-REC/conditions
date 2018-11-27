import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import SmallMultiplesLegendItem from './SmallMultiplesLegendItem';

const getLegendList = (allLabel, data) => {
  let legendList = null;
  let legendDataItems = [];

  if (data) {
    legendDataItems = data.map(conditionsData => (
      <SmallMultiplesLegendItem title={conditionsData.id} data={conditionsData.conditions} />
    ));
  }

  if (legendDataItems.length) {
    let legendItems = [];

    if (legendDataItems.length > 1) {
      const allItem = <SmallMultiplesLegendItem title={allLabel} />;

      legendItems = [allItem];
    }

    legendItems = legendItems.concat(legendDataItems);
    // TODO: Update List properties when the vertical feature is implemented
    legendList = <List items={legendItems} selected={0} />;
  }

  return legendList;
};

const SmallMultiplesLegend = props => (
  <div>
    <span>{props.title}</span>
    {getLegendList(props.allLabel, props.data)}
  </div>
);

SmallMultiplesLegend.propTypes = {
  title: PropTypes.string.isRequired,
  allLabel: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
  })),
};

SmallMultiplesLegend.defaultProps = {
  allLabel: 'All',
  data: null,
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
