import React from 'react';
import { storiesForComponent } from '../../../.storybook/utils';
import FeatureDescription from '.';
import ReadMe from './README.md';

const description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a ullamcorper \nelit. Nulla vitae molestie mauris. Nulla placerat ullamcorper quam a ornare. Ut tempor orci sed arcu faucibus, eu mollis turpis lobortis. Vivamus fermentum neque id tincidunt sagittis. Morbi blandit orci eu augue semper pellentesque. Aenean eleifend quis quam id rhoncus. Etiam tristique hendrerit elit, sit amet tempor lacus gravida vitae. Proin viverra erat sed hendrerit convallis. Curabitur ut eros sit amet metus ornare porta. Mauris eget pretium ex. Aliquam pellentesque tincidunt tellus non sagittis. Nunc consequat convallis nulla eget condimentum. Sed dapibus justo sem, sit amet dictum lacus lobortis sit amet. Donec ultrices urna mauris, sit amet malesuada enim porta nec. Aliquam rhoncus eros eros, ut facilisis justo posuere at. Phasellus laoreet lacus eu ante posuere, at finibus magna venenatis. Praesent vehicula sed libero quis placerat. Phasellus vitae commodo mauris, eget iaculis urna. Aliquam suscipit risus ut nunc dictum aliquam.';
const feature = 'Feature title';

storiesForComponent('Components|FeatureDescription', module, ReadMe)
  .add('basic usage', () => (
    <FeatureDescription feature={feature} description={description} />
  ));

