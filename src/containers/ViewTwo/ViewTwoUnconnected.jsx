import React from 'react';
import { viewTwo } from '../../proptypes';
import { features } from '../../constants';
import ViewTwo from './index';

const ViewTwoUnconnected = (props) => {
  let wheelParsedData = [];
  let legendItems = [];
  if (props.browseBy === 'company') {
    wheelParsedData = props.wheelData;
    legendItems = props.selected.company
      ? Object.entries(props.projectsData.find(
        // eslint-disable-next-line react/prop-types
        proj => proj.id === props.selected.project,
      )
        .aggregatedCount[props.selected.feature])
        .map(([key, value]) => ({
          feature: props.selected.feature,
          description: key,
          disabled: value <= 0,
          count: value,
          value,
          fill: features[props.selected.feature][key],
        }))
      : [];
  } else {
    wheelParsedData = props.wheelData.length > 0
      ? props.wheelData
        .sort((a, b) => (a.province < b.province ? -1 : 1))
        .map(region => (
          {
            ...region,
            // TODO: REMOVE THE TWO FOLLOWING LINES '.en' ON DEFAULT LOCALE INTEGRATION SETUP
            name: region.name.en,
            province: region.province,
            aggregatedCount: Object.entries(region.aggregatedCount[props.selected.feature])
              .reduce((acc, [key, val]) => {
                if (key !== '__typename') {
                  acc.push({
                    feature: props.selected.feature,
                    description: key,
                    disabled: val <= 0,
                    count: val,
                    value: val,
                    fill: features[props.selected.feature][key],
                    id: region.id,
                  });
                }
                return acc;
              }, []),
          }))
      : [];
    legendItems = props.selected.region
      ? wheelParsedData.find(
        region => region.id === props.selected.region,
      ).aggregatedCount
      : [];
  }
  return (
    <ViewTwo
      {...props}
      wheelData={wheelParsedData}
      legendItems={legendItems}
    />
  );
};
ViewTwoUnconnected.propTypes = viewTwo;

export default ViewTwoUnconnected;
