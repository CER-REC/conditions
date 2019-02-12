import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';
import TextDetails from './TextDetails';
import List from '../List';
import BarContainer from '../BarContainer';

const ConditionDetails = (props) => {
  const {
    conditions,
    maxValue,
    maxWidth,
    searched,
    selectedCondition,
  } = props;
  const condition = conditions[selectedCondition];
  const items = conditions.map((bar, index) => {
    const value = maxValue ? maxWidth / maxValue : 1;
    const colour = searched[index] ? 'tomato' : 'white';
    const highlight = [{ value: 15, fill: colour }];
    const Bar = (
      <div key={index.toString()}>
        <BarContainer
          key="SearchBar"
          items={highlight}
          desc=""
          title=""
          size={10}
        />
        <BarContainer
          key="BarValues"
          items={bar}
          maxWidth={maxWidth}
          maxValue={value}
          desc=""
          title=""
          size={10}
        />
      </div>
    );
    return Bar;
  });
  return (
    <section className="ConditionDetails">
      <div className="header" />
      <div className="list"><List items={items} onChange={handleInteraction} selected={selectedCondition} /></div>
      <div className="blank" />
      <div className="content" />
      <div className="details" />

    </section>
  );
};
ConditionDetails.propTypes = {
  conditions: PropTypes.arrayOf(PropTypes.array).isRequired,
  maxValue: PropTypes.number,
  maxWidth: PropTypes.number.isRequired,
  searched: PropTypes.arrayOf(PropTypes.number),
  selectedCondition: PropTypes.number,
};

ConditionDetails.defaultProps = {
  maxValue: undefined,
  searched: false,
  selectedCondition: 1,
};

export default ConditionDetails;
