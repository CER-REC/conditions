import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';

// TODO: This is a mock, replace with the translation function
const t = searchList => searchList[2];

const getMaxCount = (data) => {
  const getCount = graphDataItem => graphDataItem.count;
  const counts = data.reduce((countAggregate, conditionsData) => {
    const nextCounts = conditionsData.graphData.map(getCount);

    return countAggregate.concat(nextCounts);
  }, []);
  const max = Math.max(...counts);

  if (!Number.isFinite(max)) {
    return null;
  }

  return max;
};

const SmallMultiplesLegend = (props) => {
  let legendList;
  const maxCount = getMaxCount(props.data);
  const legendDataItems = props.data.map(conditionsData => (
    <LegendItem
      key={conditionsData.name}
      title={conditionsData.name}
      data={conditionsData.graphData}
      color={conditionsData.color}
      max={maxCount}
      faded={props.highlightName && (conditionsData.name !== props.highlightName)}
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
        all
        // "all" cannot be an name in data
        key="all"
        title={props.title}
        data={[]}
        color=""
        max={0}
        faded={!!props.highlightName}
      />
    ));
  }

  if (legendDataItems.length) {
    // TODO: Update List properties when the vertical feature is implemented
    legendList = (
      <List
        className={`${props.highlightName ? 'faded' : ''}`}
        items={legendDataItems}
        selected={0}
        onChange={onItemChange}
      />
    );
  }

  return (
    <div className={`SmallMultiplesLegend ${props.className}`}>
      <span>{`${t(['smallMultiplesLegend', 'title', props.title])}:`}</span>
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
    name: PropTypes.string.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
    color: PropTypes.string.isRequired,
  })).isRequired,
  /** The name of the data element to highlight */
  highlightName: PropTypes.string,
  /** A function that will receive an name when a data item is selected
      or null if the all legend filter is selected */
  onChange: PropTypes.func.isRequired,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

SmallMultiplesLegend.defaultProps = {
  highlightName: null,
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
