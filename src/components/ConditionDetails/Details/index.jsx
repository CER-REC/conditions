import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ContentBlock from '../ContentBlock';

import './styles.scss';

class Details extends React.PureComponent {
  render() {
    return (
      <div className="Details">
        <FormattedMessage id="components.conditionDetails.selectedConditionFeature" tagName="h3" />
        <ContentBlock id="common.features.theme" content={<FormattedMessage id={`common.${this.props.theme}`} />} />
        <ContentBlock id="common.features.instrument" content={<FormattedMessage id={`common.${this.props.instrument}`} />} />
        <ContentBlock id="common.features.phase" content={<FormattedMessage id={`common.${this.props.phase}`} />} />
        <ContentBlock id="common.features.type" content={<FormattedMessage id={`common.${this.props.type}`} />} />
        <ContentBlock id="common.features.status" content={<FormattedMessage id={`common.${this.props.status}`} />} />
        <ContentBlock id="common.features.filing" content={<FormattedMessage id={`common.${this.props.filing}`} />} />
      </div>
    );
  }
}

Details.propTypes = {
  theme: PropTypes.string.isRequired,
  instrument: PropTypes.string.isRequired,
  phase: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  filing: PropTypes.string.isRequired,
};

export default Details;
