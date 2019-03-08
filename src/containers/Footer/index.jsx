import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MainInfoBar from '../../components/MainInfoBar';
import './styles.scss';

const Footer = props => (
  <section className={classNames('Footer', { layoutOnly: props.layoutOnly })}>
    <section className="row">
      <section className="infoBar">
        <MainInfoBar
          {...props.mainInfoBar}
        />
      </section>
    </section>
  </section>
);

Footer.propTypes = {
  layoutOnly: PropTypes.bool,
  mainInfoBar: PropTypes.shape({
    activeDialog: PropTypes.oneOf(['about', 'methodology', 'downloads']),
    expanded: PropTypes.bool,
    setActiveDialog: PropTypes.func.isRequired,
    toggleExpanded: PropTypes.func.isRequired,
    openDataModal: PropTypes.func.isRequired,
    openScreenshotModal: PropTypes.func.isRequired,
  }).isRequired,
};

Footer.defaultProps = {
  layoutOnly: PropTypes.false,
};

export default Footer;
