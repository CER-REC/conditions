import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import './styles.scss';

const FeatureFlag = (props) => {
  const { intl } = props;
  // max flag size is 30px
  const sizePerUnit = (30 / 10); // 30px of space, and 10 units is a full flag
  const flagSize = Math.min(props.count * sizePerUnit, 30);

  const bar = (
    <div
      className="Bar"
      style={{ backgroundColor: props.color, content: '', width: `${flagSize}px` }}
      title={`${intl.formatMessage({ id: `common.features.${props.chartType}` })} - ${intl.formatMessage({ id: `common.${props.chartType}.${props.name}` })} - ${props.count}`}
    />
  );

  const tip = (<div className="FlagTip" style={{ borderLeftColor: props.color }} />);

  return <div className="FeatureFlag">{bar}{props.count > 10 ? tip : null}</div>;
};

FeatureFlag.propTypes = {
  /** For translations */
  intl: intlShape.isRequired,
  /** The selected feature */
  chartType: PropTypes.string.isRequired,
  /** The name of the condition */
  name: PropTypes.string.isRequired,
  /** The amount of conditions */
  count: PropTypes.number.isRequired,
  /** color of the flag item */
  color: PropTypes.string.isRequired,
};

export default injectIntl(FeatureFlag);
