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
      // const fill = Object.entries(condition.aggregatedCount[selectedFeature])
      //   .reduce((fillAcc, [subFeature, subCount]) => {
      //     if (subFeature === '__typename' || subCount <= 0) return fillAcc;
      //     fillAcc.push(features[selectedFeature][subFeature]);
      //     return fillAcc;
      //   }, []);

      const fill = ['red'];

      const details = {
        // TODO: Handle multiple themes (do any actually exist?)
        theme: `theme.${condition.theme[0]}`,
        phase: `phase.${condition.phase}`,
        type: `type.${(condition.standardCondition) ? 'STANDARD' : 'NON_STANDARD'}`,
        status: `status.${condition.status}`,
        filing: `filing.${(condition.filingRequired) ? 'REQUIRED' : 'NOT_REQUIRED'}`,
      };

      // TODO: keywords needs to be matched search keywords...
      acc.push({
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
