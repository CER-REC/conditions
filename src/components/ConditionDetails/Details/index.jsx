import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import joinJsxArray from '../../../utilities/joinJsxArray';
import AdvancedFormattedMessage from '../../AdvancedFormattedMessage';
import ContentBlock from '../ContentBlock';
import './styles.scss';

/* eslint-disable react/prop-types */
const DetailBlocks = ({ data }) => (
  <React.Fragment>
    <ContentBlock
      id="common.features.phase"
      content={(<AdvancedFormattedMessage id={`common.${data.phase}`} />)}
    />
    <ContentBlock
      id="common.features.type"
      content={(<AdvancedFormattedMessage id={`common.${data.type}`} />)}
    />
    <ContentBlock
      id="common.features.status"
      content={(<AdvancedFormattedMessage id={`common.${data.status}`} />)}
    />
    <ContentBlock
      id="common.features.filing"
      content={(<AdvancedFormattedMessage id={`common.${data.filing}`} />)}
    />
  </React.Fragment>
);
/* eslint-enable react/prop-types */

const Details = ({ data, isInstrument }) => (
  <div className="Details">
    <div className="filler" />
    <div className="content">
      {!isInstrument
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
                  data.theme.map(theme => (
                    <AdvancedFormattedMessage
                      key={`common.theme.${theme}`}
                      id={`common.theme.${theme}`}
                    />
                  )),
                  ', ',
                )
              }
            />
            <DetailBlocks data={data} />
          </React.Fragment>
        )
        : null}
    </div>
  </div>
);

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

export default React.memo(Details);
