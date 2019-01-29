import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const ViewOne = props => (
  <section
    className={
      classNames(
        'ViewOne',
        props.className,
        { focused: props.focused },
      )}
  >
    {props.children}
  </section>
);

ViewOne.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  focused: PropTypes.bool,
};

ViewOne.defaultProps = {
  className: '',
  focused: false,
};

export default ViewOne;
