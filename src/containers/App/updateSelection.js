import { batch } from 'react-redux';

import getTreeFromCondition from '../../queries/getTreeFromCondition';
import getTreeFromInstrument from '../../queries/getTreeFromInstrument';
import getTreeFromProject from '../../queries/getTreeFromProject';
import getTreeFromCompany from '../../queries/getTreeFromCompany';
import getTreeFromRegion from '../../queries/getTreeFromRegion';
import getKeywordConditions from '../../queries/getKeywordConditions';

const randomArrayValue = array => array[Math.floor(Math.random() * array.length)];

export default (app, client) => {
  // Update any/all values in selected.__ at once to avoid multiple renders
  // Only updates the store for values that have changed
  const updateSelection = (newSelection) => {
    if (!newSelection) { return; }

    batch(() => {
      Object.entries(newSelection).forEach(([key, val]) => {
        const action = app.props[`setSelected${key}`];
        if (action && (val !== app.props.selected[key.toLowerCase()])) {
          action(val);
        }
      });
    });
  };

  const getSelectionFromProject = id => client.query({
    query: getTreeFromProject,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const project = response.data.getProjectById;
    const company = randomArrayValue(project.companyIds);
    const instrument = project.instruments[0].id;
    const region = project.instruments[0].regionIds[0];

    return {
      Condition: 0,
      Instrument: instrument,
      Region: region,
      Project: id,
      Company: company,
    };
  });

  const getSelectionFromRegion = id => client.query({
    query: getTreeFromRegion,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const region = response.data.getRegionById;
    const instrument = randomArrayValue(region.instruments);
    const project = instrument.project.id;
    const company = randomArrayValue(instrument.project.companyIds);

    return {
      Condition: 0,
      Instrument: instrument.id,
      Region: id,
      Project: project,
      Company: company,
    };
  });

  const getSelectionFromCompany = id => client.query({
    query: getTreeFromCompany,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const company = response.data.getCompanyById;
    const project = company.projects[0].id;
    const instrument = company.projects[0].instruments[0].id;
    const region = randomArrayValue(company.projects[0].instruments[0].regionIds);

    return {
      Condition: 0,
      Instrument: instrument,
      Region: region,
      Project: project,
      Company: id,
    };
  });

  const getSelectionFromInstrument = id => client.query({
    query: getTreeFromInstrument,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const instrument = response.data.getInstrumentById;
    const company = randomArrayValue(instrument.project.companyIds);
    const region = instrument.regionIds[0];

    return {
      Condition: 0,
      Instrument: id,
      Project: instrument.projectId,
      Region: region,
      Company: company,
    };
  });

  const getSelectionFromCondition = id => client.query({
    query: getTreeFromCondition,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const condition = response.data.getConditionById;
    const company = randomArrayValue(condition.instrument.project.companyIds);
    const region = condition.instrument.regionIds[0];

    return {
      Condition: id,
      Instrument: condition.instrumentId,
      Project: condition.instrument.projectId,
      Region: region,
      Company: company,
    };
  });

  const getSelectionFromKeyword = (id, keyword) => client.query({
    query: getKeywordConditions,
    variables: { keywords: [keyword] },
  }).then((response) => {
    const { conditionIds } = response.data.findSearchResults;
    if (!conditionIds.length) {
      // TODO: Better error checking
      console.error(`There are no conditions matching "${keyword}"`);
      return null;
    }

    const randomId = randomArrayValue(conditionIds);
    const newSelection = getSelectionFromCondition(randomId);

    return { ...newSelection, KeywordId: id };
  });

  return {
    fromProject: (id) => {
      if (id !== -1) {
        getSelectionFromProject(id).then(updateSelection);
      } else {
        updateSelection({ Project: -1 });
      }
    },
    fromRegion: id => getSelectionFromRegion(id).then(updateSelection),
    fromCompany: id => getSelectionFromCompany(id).then(updateSelection),
    fromCondition: id => getSelectionFromCondition(id).then(updateSelection),
    fromConditionListItem: (instrumentId, conditionId) => {
      getSelectionFromInstrument(instrumentId).then((newSelection) => {
        updateSelection({ ...newSelection, Condition: conditionId });
      });
    },
    fromKeyword: (id, keyword) => getSelectionFromKeyword(id, keyword).then(updateSelection),
  };
};
