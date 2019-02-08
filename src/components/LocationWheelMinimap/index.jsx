import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import { geoConicConformal, geoAlbers, geoPath, geoBounds } from 'd3-geo';
import { feature, mergeArcs } from 'topojson-client';
import Request from 'client-request/promise';

import topoJSON from './toposimplify_1e1';

const viewBox = { width: 300, height: 300 };

const getBounds = (featureData) => {
  const out = {};
  [[out.x1, out.y1], [out.x2, out.y2]] = geoBounds(featureData);

  return out;
};

const minMax = (...args) => [Math.min(...args), Math.max(...args)];

const projectToBounds = (bounds) => {
  const dataBox = {
    cx: (bounds.x1 + bounds.x2) / 2,
    cy: (bounds.y1 + bounds.y2) / 2,
    width: bounds.x2 - bounds.x1,
    height: bounds.y2 - bounds.y1,
  };

  const baseScale = Math.min(
    viewBox.width / dataBox.width,
    viewBox.height / dataBox.height,
  );

  console.log(dataBox.cx);

  let projection = geoConicConformal()
    .parallels([49, 77])
    // .rotate([-dataBox.cx, 0]);
    .rotate([0, 0]);

  // Center and scale so that the viewport contains the bounding box
  projection = projection.scale(baseScale);
  const xy1 = projection([bounds.x1, bounds.y2]); // northwest
  const xy2 = projection([bounds.x2, bounds.y1]); // southeast
  const xyCenter = [(xy1[0] + xy2[0]) / 2, (xy1[1] + xy2[1]) / 2];

  const xy3 = projection([bounds.x1, bounds.y1]); // southwest
  const xy4 = projection([bounds.x2, bounds.y2]); // northeast
  const xy5 = projection([(bounds.x1 + bounds.x2) / 2, bounds.y1]); // due south

  const [xMin, xMax] = minMax(xy1[0], xy2[0], xy3[0], xy4[0], xy5[0]);
  const [yMin, yMax] = minMax(xy1[1], xy2[1], xy3[1], xy4[1], xy5[1]);

  const xySize = [xMax - xMin, yMax - yMin];
  const center = projection.invert(xyCenter);
  // const center = xyCenter;

  const scale = Math.min(
    viewBox.width / xySize[0],
    viewBox.height / xySize[1],
  // ) * baseScale * 1.25;
  ) * baseScale;

  console.dir({bounds,dataBox,baseScale,xy1,xy2,xy3,xy4,xy5,xMin,xMax,yMin,yMax,xySize,center,scale,viewBox});

  return projection
    .center([center[0], center[1]])
    .scale(scale)
    .translate([(viewBox.width / 2), (viewBox.height / 2)])
    .precision(0.2);
};

class LocationWheelMinimap extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      topoData: {},
      regions: [],
    };
  }

  componentDidMount() {
    // Hardcoding for now just so I can work on the component
    Promise.resolve({ body: topoJSON })
      .then(({ body: topoData }) => {
        this.setState({
          regions: feature(topoData, topoData.objects.ler_000b16a_e_latlng).features,
          topoData,
        });
      });
  }

  regionData(name) {
    return this.state.regions.find(region => region.properties.ERNAME.match(name));
  }

  provinceData(province) {
    const regions = this.state
      .topoData.objects.ler_000b16a_e_latlng.geometries
      .filter(region => region.properties.PRNAME.match(province));

    return feature(this.state.topoData, mergeArcs(this.state.topoData, regions));
  }

  render() {
    if (!this.state.topoData.objects) { return null; }

    const regionData = this.regionData(this.props.region);
    const provinceData = this.provinceData(regionData.properties.PRNAME);

    const bounds = getBounds(provinceData);
    // console.dir(bounds);
    const projection = geoPath().projection(projectToBounds(bounds));
    const regionPath = projection(regionData);
    const provincePath = projection(provinceData);

    return (
      <div className="LocationWheelMinimap">
        <svg width="100%" height="100%" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}>
          <g className="regions" transform="translate(0 -80)">
            <path
              d={regionPath}
              className="region"
              fill="rgb(239,182,82)"
            />
            <path
              d={provincePath}
              className="province"
              fill="none"
              stroke="rgb(153,153,153)"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    );
  }
}

LocationWheelMinimap.propTypes = {
  region: PropTypes.string.isRequired,
};

export default LocationWheelMinimap;
