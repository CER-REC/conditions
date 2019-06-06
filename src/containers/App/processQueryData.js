// Exporting a const with the expectation that more functions will be added here,
// such as our display order logic.

// eslint-disable-next-line import/prefer-default-export
export const processConditionCounts = (counts) => {
  // TODO: Change to 'const' once the instrument hack below is removed
  // eslint-disable-next-line prefer-const
  let [instruments, notInstruments] = Object.entries(counts)
    .reduce((acc, [feature, featureCounts]) => {
      if (feature === 'year' || feature === '__typename') return acc;
      const pushTo = (feature === 'prefix') ? 0 : 1;

      Object.entries(featureCounts).forEach(([subFeature, subCounts]) => {
        if (subFeature === '__typename' || !subCounts.length) return;
        const countObj = {
          feature: (feature === 'prefix') ? 'instrument' : feature,
          subFeature,
          years: {},
          total: 0,
        };

        subCounts.forEach((count, idx) => {
          countObj.years[counts.year[idx]] = count;
          countObj.total += count;
        });

        acc[pushTo].push(countObj);
      });

      return acc;
    }, [[], []]);

  instruments.sort((a, b) => (b.total - a.total));

  const minorInstrumentYears = instruments.slice(9)
    .reduce((aggregatedYears, entry) => Object.entries(entry.years)
      .reduce((acc, [year, count]) => {
        acc[year] = (acc[year] || 0) + count;

        return acc;
      }, aggregatedYears),
    {});

  const instrumentsOut = instruments.slice(0, 9);
  instrumentsOut.push({
    feature: 'instrument',
    subFeature: 'OTHER',
    years: minorInstrumentYears,
  });

  const prefixOrder = instruments.reduce((acc, cur) => {
    acc.push(cur.subFeature);
    return acc;
  }, []);

  // We need to know their order here for the StreamGraph's colors
  instrumentsOut.forEach((_, idx) => { instrumentsOut[idx].rank = idx; });

  return {
    conditionCounts: [...instrumentsOut, ...notInstruments],
    prefixOrder,
    years: counts.year,
  };
};
