import React from 'react';
import PropTypes from 'prop-types';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';

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

const getLegendDataItems = (data, hasHighlight, highlightName) => {
  const maxCount = getMaxCount(data);
  const items = data.map(conditionsData => (
    <LegendItem
      key={conditionsData.name}
      title={conditionsData.name}
      data={conditionsData.graphData}
      color={conditionsData.color}
      max={maxCount}
      faded={hasHighlight && (conditionsData.name !== highlightName)}
    />
  ));

  return items;
};

const SmallMultiplesLegend = (props) => {
  const dataIndex = props.data.findIndex(conditionsData => (
    conditionsData.name === props.selected
  ));
  const hasHighlight = !!props.data.find(conditionsData => (
    conditionsData.name === props.highlightName
  ));
  const selectedIndex = props.data.length === 1 ? 0 : dataIndex + 1;
  const legendDataItems = getLegendDataItems(props.data, hasHighlight, props.highlightName);
  const onItemChange = (index) => {
    const legendItem = legendDataItems[index];
    const category = legendItem.props.all ? null : legendItem.props.title;

    props.onChange(category);
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
        faded={hasHighlight}
      />
    ));
  }

  return (
    <div className={`SmallMultiplesLegend ${props.className}`}>
      <List
        className={`${hasHighlight ? 'faded' : ''}`}
        items={legendDataItems}
        selected={selectedIndex}
        onChange={onItemChange}
        guideLine
      />
    </div>
  );
};

SmallMultiplesLegend.propTypes = {
  /** The title to be displayed in the all filter item */
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
  /** The name of the data element to set as selected */
  selected: PropTypes.string,
  /** The name of the data element to highlight */
  highlightName: PropTypes.string,
  /** A function that will receive an name when a data item is selected
      or null if the all legend filter is selected */
  onChange: PropTypes.func.isRequired,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

SmallMultiplesLegend.defaultProps = {
  selected: '',
  highlightName: null,
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default SmallMultiplesLegend;
