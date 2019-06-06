import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { VictoryArea } from 'victory';
import './styles.scss';
import { conditionsPerYear } from '../../../proptypes';

const LegendItem = (props) => {
  let caption;
  if (props.all) {
    caption = (
      <FormattedMessage id={`components.smallMultiplesLegend.all.${props.feature}`}>
        {text => <span className="text">{text}</span>}
      </FormattedMessage>
    );
  } else if (props.feature === 'instrument' && props.subFeature !== 'OTHER') {
    caption = <span className="text">{props.subFeature}</span>;
  } else {
    caption = (
      <FormattedMessage id={`common.${props.feature}.${props.subFeature}`}>
        {text => <span className="text">{text}</span>}
      </FormattedMessage>
    );
  }

  const stream = (!props.all)
    ? (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <VictoryArea
          data={Object.entries(props.data.years).map(([x, y]) => ({ x, y }))}
          maxDomain={{ y: props.max }}
          style={{ data: { fill: props.color } }}
          interpolation="natural"
          standalone={false}
          width={100}
          height={100}
          padding={0}
        />
      </svg>
    ) : (
      null
    );

  return (
    <div
      className={classNames(
        'LegendItem',
        props.className,
        { all: props.all, faded: props.faded },
      )}
    >
      <span className="stream">{stream}</span>
      {caption}
    </div>
  );
};

LegendItem.propTypes = {
  /** Current subfeature */
  subFeature: PropTypes.string.isRequired,
  /** The feature of which to look up the translations */
  feature: PropTypes.string.isRequired,
  /** The data to render the stream graph */
  data: conditionsPerYear,
  /** What color to use for the graph (CSS) */
  color: PropTypes.string.isRequired,
  /** The y-axis height to set the graph */
  max: PropTypes.number.isRequired,
  /** The flag to determine if the component renders as a all filter item */
  all: PropTypes.bool,
  /** The flag to determine if the component renders with the faded class */
  faded: PropTypes.bool,
  /** Additional className to add to the component */
  className: PropTypes.string,
};

LegendItem.defaultProps = {
  all: false,
  faded: false,
  className: '',
  data: null,
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
