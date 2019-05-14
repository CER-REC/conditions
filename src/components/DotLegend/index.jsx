import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

import ProjectDot from '../ProjectDot';

const DotLegend = () => (
  <div className="DotLegend">
    <svg height="10" width="10">
      <ProjectDot cx={5} cy={5} r={3} />
    </svg>
    <FormattedMessage id="components.dotLegend.text">
      {text => <p>{text}</p>}
    </FormattedMessage>
  </div>
);

export default DotLegend;
