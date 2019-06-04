import { features } from '../constants';

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
    // TODO: This will change when manali updates our GraphQL endpoint
    const bins = {
      S: 1,
      M: 2,
      L: 3,
    };

    const formattedConditions = conditions.reduce((acc, next) => {
      const subFeaturesWithValue = Object
        .entries(next.aggregatedCount[selectedFeature])
        .reduce((subAcc, [subFeature, subCount]) => {
          if (subFeature === '__typename' || !subCount) return subAcc;
          subAcc.fill.push(features[selectedFeature][subFeature]);
          // TODO: populate details values for `subFeaturesWithValue`
          return subAcc;
        },
        {
          fill: [],
          details: {
            theme: '',
            phase: '',
            type: '',
            status: '',
            filing: '',
          },
        });
      // TODO: keywords needs to be matched search keywords...
      // TODO: Handle translations for text
      acc.push({
        ...subFeaturesWithValue,
        binnedValue: bins[next.textLength],
        keywords: [''],
        text: next.text.en,
      });
      return acc;
    }, []);
    // TODO: handle multiple locations for `instrument.regions`
    return {
      instrumentNumber: number,
      issuanceDate: dateIssuance,
      effectiveDate: dateEffective,
      sunsetDate: dateSunset || 'null',
      status,
      location: regions[0] ? `${regions[0].name.en}, ${regions[0].province}` : '',
      activity: name,
      conditions: formattedConditions,
    };
  }));
