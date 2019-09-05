import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import MainInfoBar from '../../components/MainInfoBar';
import Disclaimer from '../../components/Disclaimer';

import './styles.scss';

const Footer = props => (
  <section className={classNames('Footer', { layoutOnly: props.layoutOnly })}>
    <section className="infoBar">
      <MainInfoBar
        pane={props.mainInfoBarPane}
        setPane={props.setMainInfoBarPane}
        openDataModal={props.openDataModal}
      />
    </section>
    <Disclaimer />
  </section>
);

Footer.propTypes = {
  layoutOnly: PropTypes.bool,
  mainInfoBarPane: PropTypes.oneOf(['', 'about', 'methodology', 'download']).isRequired,
  setMainInfoBarPane: PropTypes.func.isRequired,
  openDataModal: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  layoutOnly: PropTypes.false,
};

export default React.memo(Footer);
