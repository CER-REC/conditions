import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import joinJsxArray from '../../../utilities/joinJsxArray';

import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';

import ContentBlock from '../ContentBlock';

import './styles.scss';

class Details extends React.PureComponent {
  detailBlock = type => (
    <ContentBlock
      id={`common.features.${type}`}
      content={(<AdvancedFormattedMessage id={`common.${this.props.data[type]}`} />)}
    />
  );

  render() {
    return (
      <div className="Details">
        <div className="filler" />
        <div className="content">
          {!this.props.isInstrument
            ? (
              <React.Fragment>
                <FormattedMessage
                  id="components.conditionDetails.selectedConditionFeature"
                  tagName="h3"
                />
                <ContentBlock
                  id="common.features.theme"
                  content={
                    joinJsxArray(
                      this.props.data.theme.map(theme => (
                        <AdvancedFormattedMessage
                          key={`common.theme.${theme}`}
                          id={`common.theme.${theme}`}
                        />
                      )),
                      ', ',
                    )
                  }
                />
                {this.detailBlock('phase')}
                {this.detailBlock('type')}
                {this.detailBlock('status')}
                {this.detailBlock('filing')}
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
