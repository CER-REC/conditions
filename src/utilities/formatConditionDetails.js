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
          // this variable is used for no-param-reassign
          const reformatted = subAcc;
          if (subFeature === '__typename' || subCount <= 0) return reformatted;
          reformatted.fill.push(features[selectedFeature][subFeature]);
          // TODO: bring top level feature into this nested reduce
          Object
            .entries(next.aggregatedCount)
            .filter(feature => feature[0] !== '__typename')
            .forEach((feature) => {
              const test = Object.entries(feature[1])
                .filter(sub => sub[0] !== '__typename')
                .filter(sub => sub[1] > 0)
                .flat();
              reformatted.details[feature[0]] = `${feature[0]}.${test[0]}`;
            });
          return reformatted;
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
      acc.push({
        ...subFeaturesWithValue,
        binnedValue: bins[next.textLength],
        keywords: [''],
        text: next.text.en,
      });
      return acc;
    }, []);

    // This is used to show all regions belonging to an instrument
    const allLocations = regions.reduce((acc, next) => {
      // for param reassign
      let string = acc;
      string = string.concat(`${next.name.en}, ${next.province} `);
      return string;
    }, '');

    return {
      instrumentNumber: number,
      issuanceDate: dateIssuance,
      effectiveDate: dateEffective,
      sunsetDate: dateSunset || 'null',
      status,
      location: allLocations || '',
      activity: name,
      conditions: formattedConditions,
    };
  }));
