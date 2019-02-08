import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

import { geoConicConformal, geoPath } from 'd3-geo';
import { feature, mergeArcs } from 'topojson-client';

import Request from 'client-request/promise';

const topoObj = 'economic_regions_2016_latlng_simplified';

// Hardcoding for now so I can work on the component
import topoJSON from './economic_regions_2016_latlng_simplified';



// This should use the same dimensions as the component's div to avoid scaling
// the svg's stroke width.
const viewBox = { width: 100, height: 100 };

const projectFeature = feat => geoConicConformal()
  // Rotate the province w.r.t Canada's longitudinal center
  // i.e. how we're used to seeing them on maps
  .rotate([96, 0])
  .fitExtent([[2, 2], [viewBox.width - 4, viewBox.height - 4]], feat);

class LocationWheelMinimap extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      topoData: {},
      regions: [],
    };
  }

  componentDidMount() {
    Promise.resolve({ body: topoJSON })
      .then(({ body: topoData }) => {
        this.setState({
          regions: feature(topoData, topoData.objects[topoObj]).features,
          topoData,
        });
      });
  }

  // Returns a Feature for the given region name
  regionData(name) {
    return this.state.regions.find(region => region.properties.ERNAME.match(name));
  }

  // Returns a Feature aggregating all regions in the given province
  provinceData(province) {
    const regions = this.state.topoData.objects[topoObj].geometries
      .filter(region => region.properties.PRNAME.match(province));

    return feature(this.state.topoData, mergeArcs(this.state.topoData, regions));
  }

  render() {
    if (!this.props.region || !this.state.topoData.objects) { return null; }

    const regionData = this.regionData(this.props.region);
    const provinceData = this.provinceData(regionData.properties.PRNAME);

    const projection = geoPath().projection(projectFeature(provinceData));

    const regionPath = projection(regionData);
    const provincePath = projection(provinceData);

    return (
      <svg className="LocationWheelMinimap">
        <g className="regions">
          <path d={regionPath} className="region" />
          <path d={provincePath} className="province" />
        </g>
      </svg>
    );
  }
}

LocationWheelMinimap.propTypes = {
  /** Economic region, e.g. 'Vancouver Island and Coast' */
  region: PropTypes.string,
};

LocationWheelMinimap.defaultProps = {
  region: null,
};

export default LocationWheelMinimap;
