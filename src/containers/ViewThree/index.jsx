import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ViewThree = (props) => {
  if (props.components.length === 0) return null;
  const { components } = props;
  return (
    <section className="ViewThree">
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
      <section className="e" style={{ background: '#F1F3F4' }}>
        { components[4] }
      </section>
      <section className="f" style={{ background: '#F1F3F4' }}>
        { components[5] }
      </section>
      <section className="g" style={{ background: '#F1F3F4' }}>
        { components[6] }
      </section>
    </section>
  );
};

ViewThree.propTypes = {
  components: PropTypes.arrayOf(PropTypes.node).isRequired,
};
export default ViewThree;
