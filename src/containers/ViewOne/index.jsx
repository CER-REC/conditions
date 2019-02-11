import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ViewOne = (props) => {
  if (props.components.length === 0) return null;
  const { components } = props;
  return (
    <section className="ViewOne">
      <section className="a" style={{ background: '#F1F3F4' }}>
        { components[0] }
      </section>
      <section className="b" style={{ background: '#F1F3F4' }}>
        { components[1] }
      </section>
      <section className="c" style={{ background: '#F1F3F4' }}>
        { components[2] }
      </section>
      <section className="d" style={{ background: '#F1F3F4' }}>
        { components[3] }
      </section>
    </section>
  );
};

ViewOne.propTypes = {
  components: PropTypes.arrayOf(PropTypes.node).isRequired,
};
export default ViewOne;
