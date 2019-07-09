import PropTypes from 'prop-types';
import { isValidElementType } from 'react-is';
import { features } from './constants';

export const featureTypes = PropTypes.oneOf(Object.keys(features));

export const conditionsPerYear = PropTypes.shape({
  feature: featureTypes.isRequired,
  subFeature: PropTypes.string.isRequired,
  rank: PropTypes.number, // Used for instrument ordering
  years: PropTypes.objectOf(PropTypes.number).isRequired,
});

export const featureData = PropTypes.shape({
  instrument: PropTypes.objectOf(PropTypes.number).isRequired,
  theme: PropTypes.objectOf(PropTypes.number).isRequired,
  phase: PropTypes.objectOf(PropTypes.number).isRequired,
  status: PropTypes.objectOf(PropTypes.number).isRequired,
  type: PropTypes.objectOf(PropTypes.number).isRequired,
  filing: PropTypes.objectOf(PropTypes.number).isRequired,
});

export const company = PropTypes.shape({
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const location = PropTypes.shape({
  primary: PropTypes.string.isRequired,
  secondary: PropTypes.string.isRequired,
  data: featureData.isRequired,
});

export const project = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  shortName: PropTypes.string.isRequired,
  numberOfConditions: PropTypes.number.isRequired,
  aggregatedCount: featureData.isRequired,
});

export const allConditionsPerYearType = PropTypes.arrayOf(conditionsPerYear);

export const displayOrder = PropTypes.shape({
  filing: PropTypes.arrayOf(PropTypes.string).isRequired,
  phase: PropTypes.arrayOf(PropTypes.string).isRequired,
  status: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.arrayOf(PropTypes.string).isRequired,
  theme: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const allConfigurationDataType = PropTypes.shape({
  displayOrder: displayOrder.isRequired,
  instrumentYearRange: PropTypes.shape({
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
  }).isRequired,
  lastUpdated: PropTypes.string.isRequired,
});

export const ConditionsByCommodityOrInstrument = PropTypes.shape({
  prefix: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  commodity: PropTypes.arrayOf(PropTypes.string).isRequired,
});

export const allConditionsByCommodityOrInstrument = PropTypes.arrayOf(
  ConditionsByCommodityOrInstrument,
);

export const browseByType = PropTypes.oneOf(['company', 'location']);

export const allCompanyData = PropTypes.arrayOf(
  company,
);

export const allLocationData = PropTypes.arrayOf(
  location,
);

export const yearRangeType = PropTypes.shape({
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
});

export const suggestedKeywordsObject = PropTypes.objectOf(
  PropTypes.shape({
    conditions: PropTypes.number.isRequired,
    category: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
);

export const conditionData = PropTypes.arrayOf(PropTypes.shape({
  instrumentNumber: PropTypes.string.isRequired,
  issuanceDate: PropTypes.string.isRequired,
  effectiveDate: PropTypes.string.isRequired,
  sunsetDate: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  location: PropTypes.array.isRequired,
  activity: PropTypes.string.isRequired,
  conditions: PropTypes.arrayOf(PropTypes.shape({
    binnedValue: PropTypes.number.isRequired,
    fill: PropTypes.arrayOf(PropTypes.string).isRequired,
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
    text: PropTypes.string.isRequired,
    details: PropTypes.shape({
      theme: PropTypes.array.isRequired,
      phase: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      filing: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
}));

export const viewTwo = {
  layoutOnly: PropTypes.bool,
  browseBy: browseByType.isRequired,
  wheelData: PropTypes.arrayOf(PropTypes.any),
  regionCompanyData: PropTypes.shape({
    companies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })),
    selectedConditionCompanies: PropTypes.arrayOf(
      PropTypes.number,
    ),
  }),
  legendItems: PropTypes.arrayOf(PropTypes.shape({
    disabled: PropTypes.bool,
    description: PropTypes.string.isRequired,
  })),
  selected: PropTypes.shape({
    company: PropTypes.number,
    region: PropTypes.number,
    project: PropTypes.number,
    feature: featureTypes.isRequired,
    condition: PropTypes.shape({
      instrumentIndex: PropTypes.number.isRequired,
      itemIndex: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  projectMenuLoading: PropTypes.bool,
  projectsData: PropTypes.arrayOf(project),
  projectYear: yearRangeType.isRequired,
  included: PropTypes.arrayOf(PropTypes.string).isRequired,
  excluded: PropTypes.arrayOf(PropTypes.string).isRequired,
  projectStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
  findAny: PropTypes.bool.isRequired,
  setFindAny: PropTypes.func.isRequired,
  setProjectYear: PropTypes.func.isRequired,
  setProjectStatus: PropTypes.func.isRequired,
  setIncluded: PropTypes.func.isRequired,
  setExcluded: PropTypes.func.isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  setSelectedProject: PropTypes.func.isRequired,
  setSelectedCompany: PropTypes.func.isRequired,
  setSelectedRegion: PropTypes.func.isRequired,
  setSelectedCondition: PropTypes.func.isRequired,
  jumpToView1: PropTypes.func.isRequired,
  jumpToView3: PropTypes.func.isRequired,
  projectYears: PropTypes.shape({
    start: PropTypes.number,
    end: PropTypes.number,
  }),
  searchResults: PropTypes.shape({
    companyIdLookup: PropTypes.arrayOf(PropTypes.bool),
    conditionIdLookup: PropTypes.arrayOf(PropTypes.bool),
    projectIdLookup: PropTypes.arrayOf(PropTypes.bool),
  }),
  filteredProjectLookup: PropTypes.arrayOf(PropTypes.bool),
  displayOrder: displayOrder.isRequired,
  availableCategories: PropTypes.arrayOf(PropTypes.string),
};
// Used in Keyword List (SuggestedKeywords)
// Example: [ ["safety", { conditions: 1200, category: ['category1', 'category2']}],
// ["emissions", { conditions: 400, category: ['category2', 'category3]}]]

export const suggestedKeywordsArrayType = PropTypes
  .arrayOf((props, propName, componentName, _, propFullName) => {
    const value = props[propName];
    if (!Array.isArray(value) || value.length !== 2) {
      return new Error(
        `Invalid prop \`${propFullName}\` supplied to \`${componentName}\`. Expected keyword tuple.`,
      );
    }
    if (typeof value[0] !== 'string') {
      return new Error(
        `Invalid prop \`${propFullName}[0]\` supplied to \`${componentName}\`. Expected keyword tuple.`,
      );
    }
    return PropTypes.checkPropTypes({
      conditions: PropTypes.number.isRequired,
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
    }, value[1], `${propFullName}[1]`, componentName);
  });

export const nullableNumber = (props, propName, componentName) => {
  if (typeof props[propName] === 'undefined') { return undefined; }
  return nullableNumber.isRequired(props, propName, componentName);
};

nullableNumber.isRequired = (props, propName, componentName) => {
  if (props[propName] === null || typeof props[propName] === 'number') { return undefined; }
  return new Error(
    `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Validation failed.`,
  );
};

// "is a component" check borrowed from React Router:
// https://github.com/ReactTraining/react-router/blob/6a99c9362d46f768d93bbf9b9bc657ca7ce683be/packages/react-router/modules/Route.js#L82
export const componentType = (props, propName, componentName) => {
  if (props[propName] === undefined) { return null; }
  return componentType.isRequired(props, propName, componentName);
};

componentType.isRequired = (props, propName, componentName) => {
  if (!props[propName]) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` is marked as required.`,
    );
  }

  if (!isValidElementType(props[propName])) {
    return new Error(
      `Invalid prop \`${propName}\` supplied to \`${componentName}\`. \`${propName}\` expected a React component.`,
    );
  }

  return null;
};
