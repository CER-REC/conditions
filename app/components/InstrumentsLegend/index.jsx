import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import List from '../List';
import LegendItem from './LegendItem';
import './styles.scss';

// TODO: This is a mock, replace with the translation function
const t = searchList => searchList[2];

const title = 'Instrument';

const getFormattedData = (data) => {
  const categoryIndicators = {};

  data.forEach((instrument) => {
    const type = instrument.parentName;

    instrument.children.forEach((commodity) => {
      let indicators = categoryIndicators[commodity.category];

      if (!indicator) {
        indicators = {
          types: [],
          color: commodity.color,
        };
        categoryIndicators[commodity.category] = indicators;
      }

      indicators.types.push(type);
    });
  });

  // TODO: Sorting the formatted data
  const formattedData = Object.entries(categoryIndicators).map(([category, indicator]) => ({
    name: category,
    indicators: indicator.types,
    color: indicator.color,
  }));

  return formattedData;
};

const getLegendDataItems = (data, indicatorTypes) => {
  const items = data.map((indicatorsData) => {
    const indicators = indicatorTypes.map(indicator => (
      indicatorsData.indicators.includes(indicator)
    ));

    return (
      <LegendItem
        key={indicatorsData.name}
        title={indicatorsData.name}
        indicators={indicators}
        color={indicatorsData.color}
      />
    );
  });

  return items;
};

const InstrumentsLegend = (props) => {
  const indicatorTypes = props.data.map(instrument => instrument.parentName);
  const headers = indicatorTypes.map(type => (
    <span key={type} className="indicator">{t(['instrumentsLegend', 'title', type])}</span>
  ));
  const formattedData = getFormattedData(props.data);
  const dataIndex = formattedData.findIndex(indicatorsData => (
    indicatorsData.name === props.selected
  ));
  const selectedIndex = props.data.length === 1 ? 0 : dataIndex + 1;
  const legendDataItems = getLegendDataItems(formattedData, indicatorTypes);
  const onItemChange = (index) => {
    const legendItem = legendDataItems[index];
    const category = legendItem.props.all ? null : legendItem.props.title;

    props.onChange(category);
  };

  if (legendDataItems.length > 1) {
    legendDataItems.unshift((
      <LegendItem
        all
        // "all" cannot be an category in data
        key="all"
        title={title}
        indicators={[]}
        color=""
      />
    ));
  }

  return (
    <div className={classNames('InstrumentsLegend', props.className)}>
      <span className="headers">
        {headers}
      </span>
      <List
        items={legendDataItems}
        selected={selectedIndex}
        onChange={onItemChange}
        guideLine
      />
    </div>
  );
};

InstrumentsLegend.propTypes = {
  /** The data to render the indicators
      The headers are rendered in the provided order */
  data: PropTypes.arrayOf(PropTypes.shape({
    parentName: PropTypes.string.isRequired,
    children: PropTypes.arrayOf(PropTypes.shape({
      category: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    })).isRequired,
  })).isRequired,
  /** The name of the category to set as selected */
  selected: PropTypes.string,
  /** A function that will receive an name when a category is selected
      or null if the all legend filter is selected */
  onChange: PropTypes.func.isRequired,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

InstrumentsLegend.defaultProps = {
  selected: '',
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default InstrumentsLegend;
