import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';
import { features } from '../../constants';

const FeatureFlag = (props) => {
  const { intl } = props;

  const flagSize = `calc(20px * ${Math.min(props.count, 10) / 10})`;

  const title = props.chartType === 'legend'
    ? intl.formatMessage({ id: `common.legend.${props.name}` })
    : `${intl.formatMessage({ id: `common.features.${props.chartType}` })} - ${intl.formatMessage({ id: `common.${props.chartType}.${props.name}` })} - ${props.count}`;

  const color = props.chartType === 'legend'
    ? 'transparent'
    : features[props.chartType][props.name];

  const bar = (
    <div
      className={classNames('Bar', { withTip: (props.count > 10) })}
      style={{ backgroundColor: color, width: flagSize, borderLeftColor: color }}
      title={title}
    />
  );
  return <div className="FeatureFlag">{bar}</div>;
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
};

export default injectIntl(FeatureFlag);
