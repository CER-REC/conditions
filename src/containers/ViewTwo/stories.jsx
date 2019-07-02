import React from 'react';
import withInteraction, { getInteractionProps } from 'storybook-addon-interaction';
import withGQL from '../../../.storybook/addon-graphql';
import { storiesForView } from '../../../.storybook/utils';
import ReadMe from './README.md';
import ViewTwoUnconnected from './ViewTwoUnconnected';
import { ViewTwoGraphQL } from './ViewTwoGraphQL';
import {
  searchData,
  conditionData,
  projectsData,
  conditionCountsByYear,
  displayOrder,
} from '../../mockData';
import { companyWheelData, relevantProjectLookup, filteredProjectLookup } from '../../components/Wheel/randomDataSample';
import locationData from '../../mockData/locationData';

const noop = () => {};
const year = {
  start: 2010,
  end: 2019,
};

const regionCompanyData = {
  companies: [
    { id: 12, name: 'Alberta Trans-Alta e' },
    { id: 11, name: '6720471 Canada Ltd.' },
    { id: 10, name: 'Abitibi-Consolidated Company of Canada.' },
    { id: 13, name: 'EnCana Corporation.' },
    { id: 14, name: 'Genesis Pipeline Canada Ltd.' },
    { id: 15, name: 'Husky Oil Operations Limited.' },
    { id: 1, name: 'Canada-Montana Pipe Line Company' },
  ],
  selectedConditionCompanies: [],
};

const categories = ['all', 'wildlife & habitat'];

const props = {
  projectsData,
  availableProjectYear: { year },
  availableCategories: { categories },
  suggestedKeywords: { searchData },
  years: Array(year.end - year.start + 1).fill(year.start).map((i, index) => i + index),
  projectYears: year,
  conditionDetails: {
    selectedProject: 'Project Name',
    data: conditionData,
  },
  browseBy: 'company',
  jumpToView1: noop,
  jumpToView3: noop,
  regionCompanyData,
  openProjectDetails: noop,
  conditionsPerYear: conditionCountsByYear.counts,
  wheelMotiontrigger: noop,
  searchResults: {
    companyIdLookup: [],
    conditionIdLookup: [],
    projectIdLookup: relevantProjectLookup,
  },
  filteredProjectLookup,
  displayOrder,
};

const connectedProps = {
  availableProjectYear: { year },
  availableCategories: { categories },
  suggestedKeywords: { searchData },
  years: Array(year.end - year.start + 1).fill(year.start).map((i, index) => i + index),
  conditionDetails: {
    selectedProject: 'Project Name',
    data: conditionData,
  },
  browseBy: 'company',
  jumpToView3: noop,
  jumpToView1: noop,
  regionCompanyData,
  conditionsPerYear: conditionCountsByYear.counts,
  wheelMotiontrigger: noop,
  searchResults: {
    companyIdLookup: [],
    conditionIdLookup: [],
    projectIdLookup: relevantProjectLookup,
  },
  filteredProjectLookup,
};

storiesForView('Containers|ViewTwo', module, ReadMe)
  .addDecorator(
    withInteraction({
      actions: {
        selectRay: () => () => ({}),
        setFindAny: () => e => ({ findAny: e }),
        setProjectYear: () => selectedYear => ({ projectYear: selectedYear }),
        setProjectStatus: () => status => ({ projectStatus: status }),
        setIncluded: () => words => ({ included: words }),
        setExcluded: () => words => ({ excluded: words }),
        setSelectedFeature: ({ selected }) => feature => ({ selected: { ...selected, feature } }),
        setSelectedCondition: ({ selected }) => selectedCondition => ({
          selected: { ...selected, condition: selectedCondition },
        }),
        setSelectedProject: ({ selected }) => project => ({ selected: { ...selected, project } }),
        setSelectedCompany: ({ selected }) => company => ({ selected: { ...selected, company } }),
        setSelectedRegion: ({ selected }) => region => ({ selected: { ...selected, region } }),
        openIntermediatePopup: () => () => ({}),
        openProjectDetails: () => () => ({}),
        setWheelMoving: () => moving => ({ wheelMoving: moving }),
      },
      state: {
        included: [],
        excluded: [],
        projectStatus: ['IN_PROGRESS', 'COMPLETED'],
        projectYear: year,
        findAny: true,
        selected: {
          feature: 'theme',
          condition: { instrumentIndex: 0, itemIndex: 0 },
          project: 1225,
          company: null,
          region: null,
        },
        wheelMoving: false,
      },
    }),
  )
  .add('default', () => <ViewTwoUnconnected {...props} wheelData={companyWheelData} {...getInteractionProps()} />)
  .add('location', () => <ViewTwoUnconnected {...props} browseBy="location" wheelData={locationData} {...getInteractionProps()} />)
  .add(
    'connected company',
    () => <ViewTwoGraphQL {...connectedProps} {...getInteractionProps()} />,
    { decorators: [withGQL] },
  )
  .add(
    'connected location',
    () => <ViewTwoGraphQL {...connectedProps} browseBy="location" {...getInteractionProps()} />,
    { decorators: [withGQL] },
  )
  .add('layout only', () => (
    <ViewTwoUnconnected layoutOnly {...props} {...getInteractionProps()} />
  ));
