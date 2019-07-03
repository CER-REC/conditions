/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { browseByType } from '../../../proptypes';
import LocationRay from '../LocationRay';
import handleInteraction from '../../../utilities/handleInteraction';

import flagLayoutCalculation from '../CompanyFlag/flagLayoutCalculation';
import CompanyFlag from '../CompanyFlag';

class WheelRay extends React.Component {
  static propTypes = {
    onChangeRay: PropTypes.func.isRequired,
    onChangeDot: PropTypes.func.isRequired,
    wheelType: browseByType.isRequired,
    degreesPerItem: PropTypes.number.isRequired,
    reservedDegrees: PropTypes.number.isRequired,
    rotation: PropTypes.number.isRequired,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    currentIndex: PropTypes.number.isRequired,
    relevantProjectLookup: PropTypes.arrayOf(PropTypes.bool),
    filteredProjectLookup: PropTypes.arrayOf(PropTypes.bool),
  }

  static defaultProps = {
    relevantProjectLookup: [],
    filteredProjectLookup: [],
  };

  constructor(props) {
    super(props);

    // TODO: This shouldn't be in the constructor; load the data and prompt a
    // re-render.
    const flagData = props.wheelType === 'company' ? this.props.items.map(company => company.projectIds) : [];
    const calc = flagLayoutCalculation(flagData);
    this.flagLayouts = calc.flagLayouts;
    this.flagScale = calc.flagScale;
  }

  shouldComponentUpdate(nextProps) {
    return (this.props.currentIndex !== nextProps.currentIndex
      || this.props.wheelType !== nextProps.wheelType
      || this.props.items !== nextProps.items);
  }

  render() {
    const { props } = this;
    // eslint-disable-next-line object-curly-newline
    const { items, degreesPerItem, reservedDegrees, rotation,
      currentIndex, wheelType,
    } = props;
    const width = '19%';
    const halfReservedDegrees = reservedDegrees / 2;
    let legendTracker = null;

    const rays = items.map((item, index) => {
      let position = rotation;
      const plotIndex = currentIndex - index;
      if (plotIndex < 0) {
        position -= (plotIndex * degreesPerItem) - halfReservedDegrees;
      } else if (plotIndex > 0) {
        position -= halfReservedDegrees + (plotIndex * degreesPerItem);
      }

      const transform = `rotate(${(position % 360).toFixed(2)})`;

      const componentToReturn = wheelType === 'company'
        ? (
          <g key={`${item.id}CompanyRay`} transform={transform} className="companyRay" {...handleInteraction(props.onChangeDot, index)}>
            {/* This rect will be used to denote the letter separation in the location wheel
            also to can be used to mark the search */}
            <text className="textLabels" transform="translate(28.75) rotate(90)" {...handleInteraction(props.onChangeRay, index)}>
              { item.name.charAt(0) !== legendTracker ? item.name.charAt(0) : null }
            </text>
            {(this.flagLayouts)
              ? (
                <CompanyFlag
                  y={-65}
                  flagLayout={this.flagLayouts[index]}
                  svgHeight={100}
                  dotWidth={0.8 * this.flagScale}
                  dotSpacing={this.flagScale}
                  rotation={90}
                  relevantProjectLookup={this.props.relevantProjectLookup}
                  filteredProjectLookup={this.props.filteredProjectLookup}
                />
              )
              : null
            }
          </g>
        )
        : (
          <g key={`${item.id}LocationRay`} transform={transform} className="locationRay" {...handleInteraction(props.onChangeRay, index)}>
            <LocationRay
              items={items[index].aggregatedCount}
              height={degreesPerItem * 0.5}
              width={width}
              searched
              adjustRotationReference={degreesPerItem / 2}
            />
            { item.province !== legendTracker
              ? (
                <React.Fragment>
                  <line
                    className="regionDivider"
                    transform="translate(28.75) rotate(90)"
                    x1="0"
                    y1="0.6"
                    x2="0"
                    y2="-2"
                  />
                  <text className="textLabels" transform="translate(28.75) rotate(94)" textAnchor="right" {...handleInteraction(props.onChange, index)}>
                    &nbsp;{item.province}
                    <title>
                      {item.province}
                    </title>
                  </text>
                </React.Fragment>
              ) : null }
          </g>
        );
      legendTracker = props.wheelType === 'company'
        ? item.name.charAt(0)
        : item.province;
      return index === currentIndex ? null : componentToReturn;
    });

    return (
      <svg className="WheelRay" width="100%" height="100%" viewBox="-50 -50 100 100 ">
        {rays}
      </svg>
    );
  }
}

export default WheelRay;
