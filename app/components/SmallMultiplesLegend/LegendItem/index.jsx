import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { VictoryArea } from 'victory';
import './styles.scss';

const LegendItem = (props) => {
  let stream;
  const type = props.all ? 'all' : 'title';

  if (!props.all) {
    stream = (
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <VictoryArea
          data={props.data.map(condition => ({ x: condition.date, y: condition.count }))}
          maxDomain={{ y: props.max }}
          style={{ data: { fill: props.color } }}
          interpolation="natural"
          standalone={false}
          width={100}
          height={100}
          padding={0}
        />
      </svg>
    );
  }

  return (
    <div className={`LegendItem ${props.className} ${props.all ? 'all' : ''} ${props.faded ? 'faded' : ''}`}>
      <span className="stream">
        {stream}
      </span>
      <FormattedMessage id={`components.smallMultiplesLegend.${type}.${props.title}`} />
    </div>
  );
};

LegendItem.propTypes = {
  /** The text beside the stream graph */
  title: PropTypes.string.isRequired,
  /** The data to render the stream graph */
  data: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  /** The color of the stream graph */
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
};

// TODO: Wrap in React.memo when testing issue fixed
export default LegendItem;
