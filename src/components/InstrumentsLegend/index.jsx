import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import List from '../List';
import LegendItem from './LegendItem';
import BubbleLegend from './BubbleLegend';
import './styles.scss';

const getFormattedData = (data) => {
  const categoryIndicators = {};

  data.forEach((instrument) => {
    const type = instrument.parentName;

    instrument.children.forEach((commodity) => {
      let indicators = categoryIndicators[commodity.category];

      if (!indicators) {
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
    <FormattedMessage key={type} id={`common.instrument.type.${type}`}>
      {text => <span className="indicator">{text}</span>}
    </FormattedMessage>
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
        title=""
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
      <BubbleLegend className="BubbleLegend" maxConditions={1600} />
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
