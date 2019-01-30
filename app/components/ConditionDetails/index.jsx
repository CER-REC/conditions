import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import SelectedGroupBar from '../SelectedGroupBar';
import List from '../List';
import BarContainer from '../BarContainer';

const ConditionDetails = (props) => {
  const { conditions, maxValue, listWidth } = props;

  const items = conditions.map((bar, index) => {
    const value = bar.value / maxValue * listWidth;
    const colorWidth = value / bar.fill.length;
    // what if the values for the bar aren't just based on bun values?
    const values = bar.fill.map(color => ({ value: colorWidth, fill: color }));

    const Bar = <BarContainer key={index.toString()} items={values} maxWidth={listWidth} desc="" title="" size={12} />;
    return Bar;
  });
  return (
    <section className="ConditionDetails">
      <List items={items} onChange={handleInteraction} selected={0} />
    </section>
  );
};
ConditionDetails.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.object).isRequired,
  maxValue: PropTypes.number,
  listWidth: PropTypes.number.isRequired,
};

ConditionDetails.defaultProps = {
  maxValue: 3,
};

export default ConditionDetails;
