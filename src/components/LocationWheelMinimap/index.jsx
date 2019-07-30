import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { geoConicConformal, geoPath } from 'd3-geo';
import { feature, mergeArcs } from 'topojson-client';
import AdvancedFormattedMessage from '../AdvancedFormattedMessage';
import './styles.scss';

const topoObj = 'economic_regions_2016_latlng_simplified';

// This should use the same dimensions as the component's div to avoid scaling
// the svg's stroke width.
const viewBox = { width: 96, height: 96 };

const projectFeature = feat => geoConicConformal()
  // Rotate the province w.r.t Canada's longitudinal center
  // i.e. how we're used to seeing them on maps
  .rotate([96, 0])
  .fitExtent([[2, 2], [viewBox.width - 4, viewBox.height - 4]], feat);

class LocationWheelMinimap extends React.Component {
  constructor() {
    super();
    this.state = {
      topoData: {},
      regions: [],
    };
  }

  componentDidMount() {
    this.isCurrentlyMounted = true;
  }

  componentWillUnmount() {
    this.isCurrentlyMounted = false;
  }

  loadTopoData = () => import('./economic_regions_2016_latlng_simplified')
    .then((topoData) => {
      if (!this.isCurrentlyMounted) { return; }
      this.setState({
        regions: feature(topoData, topoData.objects[topoObj]).features,
        topoData,
      });
    });

  // Returns a Feature for the given region name
  regionData(name) {
    return this.state.regions.find(region => region.properties.ERNAME.match(name));
  }

  // Returns a Feature aggregating all regions in the given province
  provinceData(province) {
    const regions = this.state.topoData.objects[topoObj].geometries
      .filter(region => region.properties.PRNAME === province);

    return feature(this.state.topoData, mergeArcs(this.state.topoData, regions));
  }

  render() {
    if (!this.props.region || !this.state.topoData.objects) {
      this.loadTopoData();
      return null;
    }

    const regionData = this.regionData(this.props.region.name);
    if (!regionData) { return null; }
    const provinceData = this.provinceData(regionData.properties.PRNAME);
    if (!provinceData) { return null; }

    const projection = geoPath().projection(projectFeature(provinceData));

    const regionPath = projection(regionData);
    const provincePath = projection(provinceData);

    return (
      <div className={classNames('LocationWheelMinimap', this.props.className)}>
        <svg viewBox={`0 0 ${viewBox.width} ${viewBox.height}`}>
          <g className="regions">
            <path d={regionPath} className="region" />
            <path d={provincePath} className="province" />
          </g>
        </svg>
        <AdvancedFormattedMessage
          id={`provinces.${this.props.region.province}`}
          className="provinceName"
        />
      </div>
    );
  }
}

LocationWheelMinimap.propTypes = {
  /** Economic region, e.g. 'Vancouver Island and Coast' */
  region: PropTypes.shape({
    province: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  /** A class to hide or show the component according to the movement of the wheel */
  className: PropTypes.string,
};

LocationWheelMinimap.defaultProps = {
  region: {
    name: '',
    province: '',
  },
  className: '',
};

export default LocationWheelMinimap;
