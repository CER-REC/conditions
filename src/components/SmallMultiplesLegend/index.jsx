import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';
import { allConditionsPerYear } from '../../proptypes';

const getMaxCount = (data) => {
  const counts = data.reduce((countAggregate, conditionsData) => (
    countAggregate.concat(Object.values(conditionsData.years))
  ), []);
  const max = Math.max(...counts);
  return (!Number.isFinite(max)) ? null : max;
};

const getLegendDataItems = (data, feature, hasHighlight, highlightName) => {
  const maxCount = getMaxCount(data);
  const items = data.map(conditionsData => (
    <LegendItem
      key={conditionsData.subfeature}
      title={conditionsData.subfeature}
      feature={feature}
      data={conditionsData}
      color={conditionsData.color}
      max={maxCount}
      faded={hasHighlight && (conditionsData.subfeature !== highlightName)}
    />
  ));

  return items;
};

const SmallMultiplesLegend = (props) => {
  const dataIndex = props.data.findIndex(conditionsData => (
    conditionsData.subfeature === props.selected
  ));
  const hasHighlight = !!props.data.find(conditionsData => (
    conditionsData.subfeature === props.highlightName
  ));
  const selectedIndex = props.data.length === 1 ? 0 : dataIndex + 1;
  const legendDataItems = getLegendDataItems(
    props.data,
    props.title,
    hasHighlight,
    props.highlightName,
  );
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
        feature={props.title}
        color=""
        max={0}
        faded={hasHighlight}
      />
    ));
  }

  return (
    <div className={classNames('SmallMultiplesLegend', props.className)}>
      <List
        className={classNames({ faded: hasHighlight })}
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
  data: allConditionsPerYear.isRequired,
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
