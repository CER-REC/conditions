import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Streamgraph from '../StreamGraph';
import './styles.scss';
import handleInteraction from '../../utilities/handleInteraction';

const TrendButton = (props) => {
  return (
    <div className="TrendButton" {...handleInteraction(props.onClick)}>
      <div className="buttonText">
        { props.feature === 'instrument' ? null : (
          <Streamgraph
            projectData={props.projectData}
            chartTitle=""
          />
        )}
        <FormattedMessage id="components.trendButton.description">
          {text => (
            <span className="descriptionText">
              {text.split('\n')
                .map(string => <p key={string}>{string}</p>)}
            </span>
          )}
        </FormattedMessage>
        <svg className="trendArrow" width={10} viewBox="0 0 427.5 427.5">
          <path fill="#D1057A" d="M60.9,0l338.1,170.6v85.3L60.9,427.5l-32.5-68l295.5-146.2L28.4,69.1L60.9,0z" />
        </svg>
      </div>
    </div>
  );
};

export default TrendButton;

TrendButton.propTypes = {
  feature: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  projectData: PropTypes.arrayOf(PropTypes.shape({
    color: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    key: PropTypes.number.isRequired,
    graphData: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    })).isRequired,
  })).isRequired,
};
