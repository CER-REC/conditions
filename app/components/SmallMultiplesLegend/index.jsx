import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import LegendItem from './LegendItem';

const SmallMultiplesLegend = (props) => {
  let legendList;
  const legendDataItems = props.data.map(conditionsData => (
    <LegendItem title={conditionsData.id} data={conditionsData.conditions} />
  ));

  if (legendDataItems.length) {
    let legendItems = [];

    if (legendDataItems.length > 1) {
      const allItem = <LegendItem title={props.allLabel} />;

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
  /** The title to be displayed at the top */
  title: PropTypes.string.isRequired,
  /** The text to show for the all legend filter */
  allLabel: PropTypes.string,
  /** The data to render the stream graphs
      The items rendered in the provided order */
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};

SmallMultiplesLegend.defaultProps = {
  allLabel: 'All',
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
