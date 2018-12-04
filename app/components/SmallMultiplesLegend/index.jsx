import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import LegendItem from './LegendItem';

const SmallMultiplesLegend = (props) => {
  let legendList;
  const legendDataItems = props.data.map(conditionsData => (
    <LegendItem
      key={conditionsData.id}
      title={conditionsData.id}
      data={conditionsData.conditions}
    />
  ));
  const onItemChange = (index) => {
    if ((index === 0) && (legendDataItems.length > 1)) {
      props.onChange(null);

      return;
    }

    props.onChange(legendDataItems[index].props.title);
  };

  if (legendDataItems.length > 1) {
    legendDataItems.unshift(<LegendItem key={null} title={props.allLabel} />);
  }

  if (legendDataItems.length) {
    // TODO: Update List properties when the vertical feature is implemented
    legendList = <List items={legendDataItems} selected={0} onChange={onItemChange} />;
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
  /** A function that will receive an ID when a data item is selected
      or null if the all legend filter is selected */
  onChange: PropTypes.func.isRequired,
};

SmallMultiplesLegend.defaultProps = {
  allLabel: 'All',
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
