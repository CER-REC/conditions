import { batch } from 'react-redux';

import getTreeFromCondition from '../../queries/getTreeFromCondition';
import getTreeFromInstrument from '../../queries/getTreeFromInstrument';
import getTreeFromProject from '../../queries/getTreeFromProject';
import getTreeFromCompany from '../../queries/getTreeFromCompany';
import getTreeFromRegion from '../../queries/getTreeFromRegion';
import getKeywordConditions from '../../queries/getKeywordConditions';
import handleQueryError from '../../utilities/handleQueryError';

const randomArrayValue = array => array[Math.floor(Math.random() * array.length)];

const defaultSelection = {
  Condition: 0,
  Instrument: 0,
  Region: 0,
  Project: 0,
  Company: 0,
};

const selectionPaths = {
  Project: {
    query: getTreeFromProject,
    // TODO: Can we replace props with the previous selection?
    selections: (project, props) => {
      const result = project.instruments.length === 0 ? {} : {
        Instrument: project.instruments[0].id,
        Condition: project.instruments[0].conditions[0].id,
        // TODO: Confirm with Adam about original logic
        // This sets the key `0` to an array of regionIds?
        // [newSelection.Region] = project.instruments[0].regionIds;
        Region: project.instruments[0].regionIds,
      };
      result.Company = project.companyIds.includes(props.selected.company)
        ? props.selected.company
        : randomArrayValue(project.companyIds);
      return result;
    },
  },

  Region: {
    query: getTreeFromRegion,
    selections: (region, props) => {
      if (region.instruments.length === 0) { return {}; }
      const selectedInstrumentInRegion = region.instruments
        .find(({ id }) => id === props.selected.instrument);
      // If the selected instrument is in this region, don't reset other values
      if (selectedInstrumentInRegion) {
        return {
          Condition: props.selected.condition,
          Instrument: props.selected.instrument,
          Project: props.selected.project,
          Company: props.selected.company,
        };
      }

      // Select a random instrument, and the related condition/project/company
      const instrument = randomArrayValue(region.instruments);
      return {
        Condition: instrument.conditions[0].id,
        Instrument: instrument.id,
        Project: instrument.project.id,
        Company: randomArrayValue(instrument.project.companyIds),
      };
    },
  },

  Company: {
    query: getTreeFromCompany,
    selections: (company, props) => {
      if (!company.projects.length) { return {}; }
      const selectedProjectInCompany = company.projects
        .find(({ id }) => id === props.selected.project);

      if (selectedProjectInCompany) {
        return {
          Project: props.selected.project,
          Instrument: props.selected.instrument,
          Condition: props.selected.condition,
          Region: props.selected.region,
        };
      }

      const project = company.projects[0];
      if (!project.instruments.length) { return { Project: project.id }; }

      return {
        Project: project.id,
        Instrument: project.instruments[0].id,
        Condition: project.instruments[0].conditions[0].id,
        Region: randomArrayValue(project.instruments[0].regionIds),
      };
    },
  },

  Instrument: {
    query: getTreeFromInstrument,
    selection: (instrument, props) => ({
      Condition: instrument.conditions[0].id,
      Project: instrument.projectId,
      Company: instrument.project.companyIds.includes(props.selected.company)
        ? props.selected.company
        : randomArrayValue(instrument.project.companyIds),
      Region: instrument.regionIds.includes(props.selected.region)
        ? props.selected.region
        : randomArrayValue(instrument.regionIds),
    }),
  },

  Condition: {
    query: getTreeFromCondition,
    selection: (condition, props) => {
      const { instrument } = condition;
      return {
        Instrument: condition.instrumentId,
        Project: instrument.projectId,
        Company: instrument.project.companyIds.includes(props.selected.company)
          ? props.selected.company
          : randomArrayValue(instrument.project.companyIds),
        Region: instrument.regionIds.includes(props.selected.region)
          ? props.selected.region
          : randomArrayValue(instrument.regionIds),
      };
    },
  },

  Keyword: {
    query: getKeywordConditions,
    selection: ({ conditionIds }, props, { keywords }, getNewSelection) => {
      if (conditionIds.length === 0) {
        // TODO: Leaving this here until the ETL search is fixed
        console.error(`There are no conditions matching "${keywords[0]}"`);
        return null;
      }
      return getNewSelection('Condition', { id: randomArrayValue(conditionIds) });
    },
  },
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

  const getNewSelection = (from, variables) => {
    const { query, selection } = selectionPaths[from];
    return client.query({ query, variables })
      .then((result) => {
        handleQueryError(result);
        // Strip off the name of the query, and just return the data
        const data = Object.values(result.data)[0];
        return Promise.resolve(selection(data, app.props, variables, getNewSelection))
          .then((newSelection) => {
            if (!newSelection) { return; }
            updateSelection({ ...defaultSelection, ...newSelection });
          });
      });
  };

  return {
    fromProject: (id) => {
      if (id !== -1) {
        getNewSelection('Project', { id });
      } else {
        updateSelection({ Project: -1 });
      }
    },
    fromRegion: id => getNewSelection('Region', { id }),
    fromCompany: id => getNewSelection('Company', { id }),
    fromCondition: id => getNewSelection('Condition', { id }),
    fromConditionListItem: (instrumentId, conditionId) => (
      getNewSelection('Instrument', { id: instrumentId })
        .then(() => updateSelection({ Condition: conditionId }))
    ),
    fromKeyword: (id, keyword) => getNewSelection('Keyword', { keywords: [keyword] })
      .then(() => updateSelection({ KeywordId: id })),
  };
};
