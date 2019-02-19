import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MainInfoBar from '../../components/MainInfoBar';
import './styles.scss';

const Footer = props => (
  <section className={classNames('Footer', { layoutOnly: props.layoutOnly })}>
    <section className="row">
      <section className="infoBar">
        <MainInfoBar />
      </section>
    </section>
  </section>
);

Footer.propTypes = {
  layoutOnly: PropTypes.bool,
};

Footer.defaultProps = {
  layoutOnly: PropTypes.false,
};

export default Footer;
