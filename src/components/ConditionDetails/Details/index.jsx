import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ContentBlock from '../ContentBlock';

import './styles.scss';

class Details extends React.PureComponent {
  render() {
    return (
      <div className="Details">
        <div className="filler" />
        <div className="content">
          {!this.props.isInstrument
            ? (
              <React.Fragment>
                <FormattedMessage id="components.conditionDetails.selectedConditionFeature" tagName="h3" />
                <ContentBlock
                  id="common.features.theme"
                  content={
                    this.props.data.theme.map((theme, index) => (
                      index === this.props.data.theme.length - 1
                        ? <FormattedMessage key={`common.theme.${theme}`} id={`common.theme.${theme}`} />
                        : (
                          <React.Fragment>
                            <FormattedMessage key={`common.theme.${theme}`} id={`common.theme.${theme}`} />
                            <span>, </span>
                          </React.Fragment>
                        )
                    ))
                  }
                />
                <ContentBlock id="common.features.phase" content={<FormattedMessage id={`common.${this.props.data.phase}`} />} />
                <ContentBlock id="common.features.type" content={<FormattedMessage id={`common.${this.props.data.type}`} />} />
                <ContentBlock id="common.features.status" content={<FormattedMessage id={`common.${this.props.data.status}`} />} />
                <ContentBlock id="common.features.filing" content={<FormattedMessage id={`common.${this.props.data.filing}`} />} />
              </React.Fragment>
            )
            : null
          }
        </div>
      </div>
    );
  }
}

Details.propTypes = {
  isInstrument: PropTypes.bool,
  data: PropTypes.shape({
    theme: PropTypes.array.isRequired,
    phase: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    filing: PropTypes.string.isRequired,
  }),
};

Details.defaultProps = {
  isInstrument: false,
  data: {},
};

export default Details;
