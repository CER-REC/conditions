import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import WheelList from '.';

const companyList = [
  { company_name: 'Company A' },
  { company_name: 'Company B' },
  { company_name: 'Company C' },
  { company_name: 'Company D' },
  { company_name: 'Company E' },
  { company_name: 'Company F' },
  { company_name: 'Company G' },
  { company_name: 'Company H moreThan15Characters' },
  { company_name: 'Company I' },
  { company_name: 'Company J' },
  { company_name: 'Company K' },
  { company_name: 'Company L' },
  { company_name: 'Company M' },
];

const locationList = [
  { region_name: 'Calgary' },
  { region_name: 'Camrose--Drumheller' },
  { region_name: 'Edmonton' },
  { region_name: 'Lethbridge--Medicine Hat' },
  { region_name: 'Red Deer' },
  { region_name: 'Wood Buffalo--Cold Lake' },
];

const magenta = '255, 0, 255';
const exampleDivProps = {
  height: '100%',
  border: `1px dashed rgba(${magenta}, 0.4)`,
  boxShadow: `0 0 0px 32px rgba(${magenta}, 0.05)`,
  borderRadius: '50%',
};

const onChange = () => index => ({ selected: index });

storiesForComponent('Components|Wheel/WheelList', module, ReadMe)
  .addDecorator(withInteraction({ actions: ['onChange'] }))
  .addDecorator(withStatus({
    name: 'underReview',
  }))
  .add('with company data', () => (
    <div style={exampleDivProps} className="MovingContainer">
      <WheelList
        wheelType="company"
        listContent={companyList}
        textClippingRadius="75%"
        {...getInteractionProps()}
      />
    </div>
  ), { interaction: { state: { selected: 4 }, actions: { onChange } } })
  .add('with location data', () => (
    <div style={exampleDivProps} className="interactiveItems">
      <WheelList
        wheelType="location"
        listContent={locationList}
        textClippingRadius="75%"
        {...getInteractionProps()}
      />
    </div>
  ), { interaction: { state: { selected: 2 }, actions: { onChange } } });

