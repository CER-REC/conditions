import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const ViewTwo = (props) => {
  if (props.components.length === 0) return null;
  const { components } = props;
  return (
    <section className="ViewTwo">
      <section className="searchHeader" style={{ background: '#F1F3F4' }}>
        { components[0] }
      </section>
      <section className="wheel" style={{ background: '#F1F3F4' }}>
        { components[1] }
      </section>
      <section className="companyBreakdown" style={{ background: '#F1F3F4' }}>
        { components[2] }
      </section>
      <section className="menus" style={{ background: '#F1F3F4' }}>
        { components[3] }
      </section>
      <section className="conditions" style={{ background: '#F1F3F4' }}>
        { components[4] }
      </section>
    </section>
  );
};

ViewTwo.propTypes = {
  components: PropTypes.arrayOf(PropTypes.node).isRequired,
};
export default ViewTwo;
