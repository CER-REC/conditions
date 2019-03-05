import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import List from '../List';
import LegendItem from './LegendItem';
import BubbleLegend from './BubbleLegend';
import { allConditionsByCommodityOrInstrument } from '../../proptypes';
import './styles.scss';

class InstrumentsLegend extends React.PureComponent {
  getIndicatorTypes = () => (this.props.data.reduce((acc, next) => {
    next.commodity.forEach((com) => {
      if (acc.indexOf(com) < 0) { acc.push(com); }
    });
    return acc;
  }, []));

  getFormattedData = () => {
    const indicatorTypes = this.getIndicatorTypes();
    return Object.entries(this.props.data.reduce((acc, next) => {
      if (!acc[next.type]) {
        acc[next.type] = indicatorTypes.map(() => false);
      }
      next.commodity.forEach((com) => { acc[next.type][indicatorTypes.indexOf(com)] = true; });
      return acc;
    }, {}));
  };

  onItemChange = index => this.props
    .onChange(index === 0 ? '' : this.getFormattedData()[index - 1][0]);

  render() {
    const { selected, className } = this.props;
    const indicatorTypes = this.getIndicatorTypes();
    const headers = indicatorTypes.map(type => (
      <FormattedMessage key={type} id={`common.instrumentCommodityType.${type}`}>
        {text => <span className="indicator">{text}</span>}
      </FormattedMessage>
    ));

    const formattedData = this.getFormattedData();
    // Add one to account for 'all
    const selectedIndex = formattedData.findIndex(([key]) => selected === key) + 1;
    const legendDataItems = formattedData.map(([type, indicators]) => (
      <LegendItem
        key={type}
        title={type}
        indicators={indicators}
      />
    ));

    legendDataItems.unshift((
      <LegendItem
        all
        // "all" cannot be an category in data
        key="all"
        title=""
        indicators={[]}
      />
    ));

    return (
      <div className={classNames('InstrumentsLegend', className)}>
        <span className="headers">
          {headers}
        </span>
        <List
          items={legendDataItems}
          selected={selectedIndex}
          onChange={this.onItemChange}
          guideLine
        />
        <BubbleLegend className="BubbleLegend" maxConditions={1600} radiusOfMaxBubble={100} />
      </div>
    );
  }
}

InstrumentsLegend.propTypes = {
  /** The data to render the indicators
      The headers are rendered in the provided order */
  data: allConditionsByCommodityOrInstrument.isRequired,
  /** The name of the category to set as selected */
  selected: PropTypes.string.isRequired,
  /** A function that will receive an name when a category is selected
      or null if the all legend filter is selected */
  onChange: PropTypes.func.isRequired,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

InstrumentsLegend.defaultProps = {
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default InstrumentsLegend;
