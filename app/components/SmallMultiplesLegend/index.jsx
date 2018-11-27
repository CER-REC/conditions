import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import SmallMultiplesLegendItem from './SmallMultiplesLegendItem';

const SmallMultiplesLegend = (props) => {
  let legendList;
  let legendDataItems = [];

  if (props.data) {
    legendDataItems = props.data.map(conditionsData => (
      <SmallMultiplesLegendItem title={conditionsData.id} data={conditionsData.conditions} />
    ));
  }

  if (legendDataItems.length) {
    let legendItems = [];

    if (legendDataItems.length > 1) {
      const allItem = <SmallMultiplesLegendItem title={props.allLabel} />;

      legendItems = [allItem];
    }

    legendItems = legendItems.concat(legendDataItems);
    // TODO: Update List properties when the vertical feature is implemented
    legendList = <List items={legendItems} selected={0} />;
  }

  return (
    <div>
      <span>{props.title}</span>
      {legendList}
    </div>
  );
};

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

export default SmallMultiplesLegend;
