import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';

// TODO: This is a mock, replace with the translation function
const t = (searchList) => {
  if (searchList[1] === 'all') {
    return `All ${searchList[2]}s`;
  }

  return searchList[2];
};

const SmallMultiplesLegend = (props) => {
  let legendList;
  const legendDataItems = props.data.map(conditionsData => (
    <LegendItem
      key={conditionsData.id}
      title={conditionsData.id}
      data={conditionsData.conditions}
      unhighlight={props.highlightID && (conditionsData.id !== props.highlightID)}
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
    legendDataItems.unshift((
      <LegendItem
        key={null}
        title={t(['smallMultiplesLegend', 'all', props.title])}
        unhighlight={Boolean(props.highlightID)}
      />
    ));
  }

  if (legendDataItems.length) {
    // TODO: Update List properties when the vertical feature is implemented
    legendList = <List className={`${props.highlightID ? 'unhighlight' : ''}`} items={legendDataItems} selected={0} onChange={onItemChange} />;
  }

  return (
    <div className="SmallMultiplesLegend">
      <span>{t(['smallMultiplesLegend', 'title', props.title])}</span>
      {legendList}
    </div>
  );
};

SmallMultiplesLegend.propTypes = {
  /** The title to be displayed at the top */
  title: PropTypes.string.isRequired,
  /** The data to render the stream graphs
      The items rendered in the provided order */
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    conditions: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.instanceOf(Date).isRequired,
      number: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
  /** The ID of the data element to highlight */
  highlightID: PropTypes.string,
  /** A function that will receive an ID when a data item is selected
      or null if the all legend filter is selected */
  onChange: PropTypes.func.isRequired,
};

SmallMultiplesLegend.defaultProps = {
  highlightID: null,
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
