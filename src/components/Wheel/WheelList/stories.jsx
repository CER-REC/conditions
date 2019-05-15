import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import { storiesForComponent } from '../../../../.storybook/utils';
import withStatus from '../../../../.storybook/addon-status';
import ReadMe from './README.md';
import WheelList from '.';

const companyList = [
  { name: 'Company A' },
  { name: 'Company B' },
  { name: 'Company C' },
  { name: 'Company D' },
  { name: 'Company E' },
  { name: 'Company F' },
  { name: 'Company G' },
  { name: 'Company H moreThan15Characters' },
  { name: 'Company I' },
  { name: 'Company J' },
  { name: 'Company K' },
  { name: 'Company L' },
  { name: 'Company M' },
];

const locationList = [
  { name: 'Calgary' },
  { name: 'Camrose--Drumheller' },
  { name: 'Edmonton' },
  { name: 'Lethbridge--Medicine Hat' },
  { name: 'Red Deer' },
  { name: 'Wood Buffalo--Cold Lake' },
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
  ), { interaction: { state: { selected: 2 }, actions: { onChange } } })
  .add('with no data', () => (
    <div style={exampleDivProps} className="interactiveItems">
      <WheelList
        wheelType="company"
        listContent={[]}
        textClippingRadius="75%"
        {...getInteractionProps()}
      />
    </div>
  ));

