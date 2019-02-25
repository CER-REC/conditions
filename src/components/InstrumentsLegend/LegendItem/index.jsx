import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import './styles.scss';
import { features } from '../../../constants';

const LegendItem = (props) => {
  let indicators = null;
  const id = props.all ? 'components.instrumentsLegend.all' : `common.instrument.category.${props.title}`;

  if (!props.all) {
    indicators = props.indicators.map((indicator, index) => {
      const style = indicator
        ? { backgroundColor: features.instrument[props.title] }
        : {};

      // eslint-disable-next-line react/no-array-index-key
      return <div key={index} className="indicator" style={style} />;
    });
  }

  return (
    <div className={classNames('LegendItem', props.className)}>
      <span className="indicators">
        {indicators}
      </span>
      <FormattedMessage id={id} />
    </div>
  );
};

LegendItem.propTypes = {
  /** The text beside the indicators */
  title: PropTypes.string.isRequired,
  /** The list of flags to toggle the display of the indicators */
  indicators: PropTypes.arrayOf(PropTypes.bool).isRequired,
  /** The flag to determine if the component renders as a all filter item */
  all: PropTypes.bool,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

LegendItem.defaultProps = {
  all: false,
  className: '',
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
