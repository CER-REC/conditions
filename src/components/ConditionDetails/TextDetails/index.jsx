import React from 'react';
import PropTypes from 'prop-types';
import SelectedGroupBar from '../../SelectedGroupBar';
import './styles.scss';

const TextDetails = (props) => {
  const { condition } = props;
  const assign = Object.entries(condition[0].condition);
  const listItems = assign.map((item) => {
    const key = item[0];
    const value = item[1];
    const listItem = (
      <SelectedGroupBar
        group={key}
        groupItem={value}
        groupSize={16}
        groupItemSize={14}
        backgroundColor=""
      >
        { value.toString() }
      </SelectedGroupBar>
    );
    return listItem;
  });
  return (listItems);
};

TextDetails.propTypes = {
  condition: PropTypes.node.isRequired,
};

export default TextDetails;
