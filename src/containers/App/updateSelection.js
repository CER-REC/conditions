import { batch } from 'react-redux';

import getTreeFromCondition from '../../queries/getTreeFromCondition';
import getTreeFromInstrument from '../../queries/getTreeFromInstrument';
import getTreeFromProject from '../../queries/getTreeFromProject';
import getTreeFromCompany from '../../queries/getTreeFromCompany';
import getTreeFromRegion from '../../queries/getTreeFromRegion';
import getKeywordConditions from '../../queries/getKeywordConditions';

const randomArrayValue = array => array[Math.floor(Math.random() * array.length)];

const defaultSelection = {
  Condition: 0,
  Instrument: 0,
  Region: 0,
  Project: 0,
  Company: 0,
};

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
    const newSelection = { ...defaultSelection, Project: id };

    const project = response.data.getProjectById;

    const hasSelectedCompany = (project.companyIds.indexOf(app.props.selected.company) > -1);
    newSelection.Company = (hasSelectedCompany)
      ? app.props.selected.company
      : randomArrayValue(project.companyIds);

    if (project.instruments.length) {
      newSelection.Instrument = project.instruments[0].id;
      newSelection.Condition = project.instruments[0].conditions[0].id;
      [newSelection.Region] = project.instruments[0].regionIds;
    }

    return newSelection;
  });

  const getSelectionFromRegion = id => client.query({
    query: getTreeFromRegion,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const newSelection = { ...defaultSelection, Region: id };

    const region = response.data.getRegionById;

    if (region.instruments.length) {
      const selectedInstrumentInRegion = region.instruments.find(inst => (
        inst.id === app.props.selected.instrument
      ));

      if (selectedInstrumentInRegion) {
        newSelection.Condition = app.props.selected.condition;
        newSelection.Instrument = app.props.selected.instrument;
        newSelection.Project = app.props.selected.project;
        newSelection.Company = app.props.selected.company;
      } else {
        const instrument = randomArrayValue(region.instruments);

        newSelection.Condition = instrument.conditions[0].id;
        newSelection.Instrument = instrument.id;
        newSelection.Project = instrument.project.id;
        newSelection.Company = randomArrayValue(instrument.project.companyIds);
      }
    }

    return newSelection;
  });

  const getSelectionFromCompany = id => client.query({
    query: getTreeFromCompany,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const newSelection = { ...defaultSelection, Company: id };

    const company = response.data.getCompanyById;

    if (company.projects.length) {
      const selectedProjectInCompany = company.projects.find(proj => (
        proj.id === app.props.selected.project
      ));

      if (selectedProjectInCompany) {
        newSelection.Project = app.props.selected.project;
        newSelection.Instrument = app.props.selected.instrument;
        newSelection.Condition = app.props.selected.condition;
        newSelection.Region = app.props.selected.region;
      } else {
        const project = company.projects[0];

        newSelection.Project = project.id;

        if (project.instruments.length) {
          newSelection.Instrument = project.instruments[0].id;
          newSelection.Condition = project.instruments[0].conditions[0].id;
          newSelection.Region = randomArrayValue(project.instruments[0].regionIds);
        }
      }
    }

    return newSelection;
  });

  const getSelectionFromInstrument = id => client.query({
    query: getTreeFromInstrument,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const newSelection = { ...defaultSelection, Instrument: id };

    const instrument = response.data.getInstrumentById;

    newSelection.Condition = instrument.conditions[0].id;
    newSelection.Project = instrument.projectId;

    const instrumentInSelectedCompany = (
      instrument.project.companyIds.indexOf(app.props.selected.company) > -1
    );

    newSelection.Company = (instrumentInSelectedCompany)
      ? app.props.selected.company
      : randomArrayValue(instrument.project.companyIds);

    const instrumentInSelectedRegion = (
      instrument.regionIds.indexOf(app.props.selected.region) > -1
    );

    newSelection.Region = (instrumentInSelectedRegion)
      ? app.props.selected.region
      : randomArrayValue(instrument.regionIds);

    return newSelection;
  });

  const getSelectionFromCondition = id => client.query({
    query: getTreeFromCondition,
    variables: { id },
  }).then((response) => {
    // TODO: Error checking
    const newSelection = { ...defaultSelection, Condition: id };
    const condition = response.data.getConditionById;

    newSelection.Instrument = condition.instrumentId;
    const { instrument } = condition;

    newSelection.Project = instrument.projectId;

    const instrumentInSelectedCompany = (
      instrument.project.companyIds.indexOf(app.props.selected.company) > -1
    );

    newSelection.Company = (instrumentInSelectedCompany)
      ? app.props.selected.company
      : randomArrayValue(instrument.project.companyIds);

    const instrumentInSelectedRegion = (
      instrument.regionIds.indexOf(app.props.selected.region) > -1
    );

    newSelection.Region = (instrumentInSelectedRegion)
      ? app.props.selected.region
      : randomArrayValue(instrument.regionIds);

    return newSelection;
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

    return getSelectionFromCondition(randomId)
      .then(newSelection => ({ ...newSelection, KeywordId: id }));
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
