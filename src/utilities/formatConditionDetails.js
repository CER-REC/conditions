// eslint-disable-next-line no-unused-vars
import { features } from '../constants';

// eslint-disable-next-line no-unused-vars
export default (instruments, selectedFeature) => (
  instruments.map((instrument) => {
    const {
      number,
      dateIssuance,
      dateEffective,
      dateSunset,
      status,
      regions,
      name,
      conditions,
    } = instrument;

    const formattedConditions = conditions.reduce((acc, condition) => {
      const fill = Object.entries(condition.aggregatedCountArray[`${selectedFeature}Enum`])
        .reduce((fillAcc, [index, subFeature]) => {
          if (condition.aggregatedCountArray[selectedFeature][index] === 0) { return fillAcc; }

          fillAcc.push(features[selectedFeature][(selectedFeature === 'instrument')
            ? index
            : subFeature
          ]);
          return fillAcc;
        }, []);

      const { id } = condition;

      const details = {
        theme: condition.theme.filter((v, i, a) => a.indexOf(v) === i),
        phase: `phase.${condition.phase}`,
        type: `type.${(condition.standardCondition) ? 'STANDARD' : 'NON_STANDARD'}`,
        status: `status.${condition.status}`,
        filing: `filing.${(condition.filingRequired) ? 'REQUIRED' : 'NOT_REQUIRED'}`,
      };

      // TODO: keywords needs to be matched search keywords...
      acc.push({
        id,
        fill,
        details,
        binnedValue: condition.textLength,
        keywords: [''],
        text: condition.text,
      });
      return acc;
    }, []);

    // This is used to show all regions belonging to an instrument
    const allLocations = regions.reduce((acc, next) => {
      acc.push(`${next.name}, ${next.province} `);
      return acc;
    }, []);

    return {
      instrumentNumber: number,
      issuanceDate: dateIssuance,
      effectiveDate: dateEffective,
      sunsetDate: dateSunset || 'null',
      status,
      location: allLocations,
      activity: name,
      conditions: formattedConditions,
    };
  }));
