import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import './styles.scss';

const FeatureFlag = (props) => {
  const { intl } = props;

  const flagSize = `calc(18px * ${Math.min(props.count, 10) / 10})`;

  let title;

  if (props.chartType === 'legend') {
    title = intl.formatMessage({ id: `common.legend.${props.name}` });
  } else {
    title = [
      intl.formatMessage({ id: `common.features.${props.chartType}` }),
      intl.formatMessage({ id: `common.${props.chartType}.${props.name}` }),
      props.count,
    ].join(' - ');
  }

  const bar = (
    <div
      className={classNames('Bar', { withTip: (props.count > 10) })}
      style={{ backgroundColor: props.color, width: flagSize, borderLeftColor: props.color }}
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
  /** CSS color */
  color: PropTypes.string.isRequired,
};

export default injectIntl(React.memo(FeatureFlag));
