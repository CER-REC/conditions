import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const Footer = (props) => {
  if (props.components.length === 0) return null;
  const { components } = props;
  return (
    <section className="Footer">
      <section className="a" style={{ background: '#F1F3F4' }}>
        { components[0] }
      </section>
    </section>
  );
};

Footer.propTypes = {
  components: PropTypes.arrayOf(PropTypes.node).isRequired,
};
export default Footer;
