import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import Ring from './Ring';

const CompanyWheel = ({ ringType }) => {
  if (typeof ringType === 'undefined') { return null; }

  return (
    <div className="wheelContainer" >
      <button >Spin the wheel</button>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 650 650">
        <g id="Group_3" data-name="Group 3" transform="translate(-44 -125)">
          <g id="OuterCircle" className="cls-2" transform="translate(44 125)">
            <circle className="cls-8" cx="325" cy="325" r="325" />
            <circle className="cls-1" cx="325" cy="325" r="324.5" />
          </g>
          <Ring ringType={ringType} />
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

CompanyWheel.propTypes = {
  ringType: PropTypes.string.isRequired,
};

export default CompanyWheel;
