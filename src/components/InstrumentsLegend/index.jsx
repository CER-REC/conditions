import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import List from '../List';
import LegendItem from './LegendItem';
import BubbleLegend from './BubbleLegend';
import { allConditionsByCommodityOrInstrument } from '../../proptypes';
import './styles.scss';

const getFormattedData = (data, indicatorTypes) => data.reduce((acc, next) => {
  if (!acc[next.type]) {
    acc[next.type] = indicatorTypes.map(() => false);
  }
  next.commodity.forEach((com) => { acc[next.type][indicatorTypes.indexOf(com)] = true; });
  return acc;
}, {});

const InstrumentsLegend = (props) => {
  const indicatorTypes = props.data.reduce((acc, next) => {
    next.commodity.forEach((com) => {
      if (acc.indexOf(com) < 0) { acc.push(com); }
    });
    return acc;
  }, []);

  const headers = indicatorTypes.map(type => (
    <FormattedMessage key={type} id={`common.instrumentCommodityType.${type}`}>
      {text => <span className="indicator">{text}</span>}
    </FormattedMessage>
  ));
  const formattedData = getFormattedData(props.data, indicatorTypes);
  const dataIndex = Object.keys(formattedData).indexOf(props.selected);
  const selectedIndex = props.data.length === 1 ? 0 : dataIndex + 1;
  const legendDataItems = Object.entries(formattedData).map(([type, indicators]) => (
    <LegendItem
      key={type}
      title={type}
      indicators={indicators}
    />
  ));
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
      <BubbleLegend className="BubbleLegend" maxConditions={1600} radiusOfMaxBubble={100} />
    </div>
  );
};

InstrumentsLegend.propTypes = {
  /** The data to render the indicators
      The headers are rendered in the provided order */
  data: allConditionsByCommodityOrInstrument.isRequired,
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
