import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import { geoConicConformal, geoPath } from 'd3-geo';
import { feature, mergeArcs } from 'topojson-client';
import Request from 'client-request/promise';

import topoJSON from './toposimplify_1e1';

const viewBox = { width: 300, height: 300 };

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

  projection() {
    const { bbox } = this.state.topoData.objects.ler_000b16a_e_latlng;

    const dataBox = {
      cx: (bbox[0] + bbox[2]) / 2,
      cy: (bbox[1] + bbox[3]) / 2,
      width: bbox[2] - bbox[0],
      height: bbox[3] - bbox[1],
    };

    const baseScale = Math.min(
      viewBox.width / dataBox.width,
      viewBox.height / dataBox.height,
    );

    console.log(dataBox.cx);

    let projection = geoConicConformal()
      .parallels([49, 77])
      .rotate([-dataBox.cx + 90, 0]);

    // Center and scale so that the viewport contains the bounding box
    projection = projection.scale(baseScale);
    const xy1 = projection([bbox[0], bbox[3]]); // northwest
    const xy2 = projection([bbox[2], bbox[1]]); // southeast
    const xyCenter = [(xy1[0] + xy2[0]) / 2, (xy1[1] + xy2[1]) / 2];

    const xy3 = projection([bbox[0], bbox[1]]); // southwest
    const xy4 = projection([bbox[2], bbox[3]]); // northeast
    const xy5 = projection([(bbox[0] + bbox[2]) / 2, bbox[1]]); // due south

    const xMin = Math.min(xy1[0], xy2[0], xy3[0], xy4[0], xy5[0]);
    const xMax = Math.max(xy1[0], xy2[0], xy3[0], xy4[0], xy5[0]);
    const yMin = Math.min(xy1[1], xy2[1], xy3[1], xy4[1], xy5[1]);
    const yMax = Math.max(xy1[1], xy2[1], xy3[1], xy4[1], xy5[1]);

    const xySize = [xMax - xMin, yMax - yMin];
    const center = projection.invert(xyCenter);

    // console.dir({bbox,dataBox,baseScale,xy1,xy2,xy3,xy4,xy5,xMin,xMax,yMin,yMax,xySize,center});

    const scale = Math.min(
      viewBox.width / xySize[0],
      viewBox.height / xySize[1],
    ) * baseScale * 1.25;

    return projection
      .center([0, center[1]])
      .scale(scale)
      .translate([(viewBox.width / 2) - 300, viewBox.height / 2 + 300])
      .precision(0.2);
  }

  regionData(name) {
    return this.state.regions.find(region => region.properties.ERNAME.match(name));
  }

  provinceData(province) {
    const regions = this.state.topoData.objects.ler_000b16a_e_latlng.geometries.filter(region => region.properties.PRNAME.match(province));
    return mergeArcs(this.state.topoData, regions);
  }

  render() {
    if (!this.state.topoData.objects) { return null; }
    const projection = geoPath().projection(this.projection());

    // const AB_regions = this.state.regions.filter(region => region.properties.PRNAME.match('Alberta'));
    // const AB_outline = this.provinceData('Alberta');
    // const regions = this.state.regions;

    // console.dir({regions, AB_regions, AB_outline});

    const regionData = this.regionData(this.props.region);
    const provinceData = this.provinceData(regionData.properties.PRNAME);

    return (
      <div className="LocationWheelMinimap">
        <svg width="100%" height="100%" viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}>
          <g className="regions" transform="translate(0 -80)">
            <path
              d={projection(regionData)}
              className="region"
              fill="rgb(239,182,82)"
            />
            <path
              d={projection(feature(this.state.topoData, provinceData))}
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
