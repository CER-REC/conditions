import React from 'react';
import { FormattedMessage } from 'react-intl';
import './styles.scss';

import ProjectDot from '../ProjectDot';

const DotLegend = () => (
  <div className="DotLegend">
    <svg height="10" width="10">
      <ProjectDot cx={5} cy={5} r={1.5} id={0} />
    </svg>
    <FormattedMessage id="components.dotLegend.text" tagName="p" />
  </div>
);

export default React.memo(DotLegend);
