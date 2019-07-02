// eslint-disable-next-line no-unused-vars
import { features } from '../constants';

// eslint-disable-next-line no-unused-vars
export default (instruments, selectedFeature, displayOrder) => (
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
      documents,
    } = instrument;

    const formattedConditions = conditions.reduce((acc, condition) => {
      const counts = condition.aggregatedCount[selectedFeature]
        .reduce((countAcc, next) => ({ ...countAcc, [next.name]: next.count }), {});
      const fill = displayOrder[selectedFeature]
        .reduce((fillAcc, next, i) => (counts[next] === 0
          ? fillAcc
          : fillAcc.concat(selectedFeature === 'instrument' ? i : next)
        ), []);

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
      documentId: (documents.length) ? documents[0].documentId : '',
      conditions: formattedConditions,
    };
  }));
