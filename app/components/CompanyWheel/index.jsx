import React from 'react';
import './styles.scss';

import Ring from './Ring';

const CompanyWheel = (props) => {
  return (
    <div className="wheelContainer" >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 650">
        <g id="Group_3" data-name="Group 3" transform="translate(-44 -125)">
          <g id="OuterCircle" className="cls-2" transform="translate(44 125)">
            <circle className="cls-8" cx="325" cy="325" r="325" />
            <circle className="cls-1" cx="325" cy="325" r="324.5" />
          </g>
          <Ring ringType={props.ringType} />
          {/* <RayLegend/> */}
          <g id="RayCircle" className="cls-2" transform="translate(109 190)">
            <circle className="cls-8" cx="260" cy="260" r="260" />
            <circle className="cls-1" cx="260" cy="260" r="259.5" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default CompanyWheel;
