import * as mockData from '../../mockData';

export const processConditionCounts = (counts) => {
  // TODO: Change to 'const' once the instrument hack below is removed
  // eslint-disable-next-line prefer-const
  let [instruments, notInstruments] = Object.entries(counts)
    .reduce((acc, [feature, featureCounts]) => {
      if (feature === 'year' || feature === '__typename') return acc;
      const pushTo = (feature === 'instrument') ? 0 : 1;

      Object.entries(featureCounts).forEach(([subFeature, subCounts]) => {
        if (subFeature === '__typename') return;
        const countObj = {
          feature,
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

  // TODO: Hack to keep things from breaking until we have live instrument data
  instruments = mockData.conditionCountsByYear.counts.filter(entry => entry.feature === 'instrument');

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

export const processDisplayOrder = (displayOrder) => {
  const displayOrderMap = {
    theme: 'theme',
    conditionStatus: 'status',
    conditionPhase: 'phase',
  };

  const processedOrder = { features: {} };
  Object.entries(displayOrder).forEach(([orderType, order]) => {
    if (orderType !== '__typename' && displayOrderMap[orderType]) {
      // TODO: Add locale checks or remove '.en' depending on how we solve that issue
      processedOrder.features[displayOrderMap[orderType]] = order.en;
    }
  });

  // TODO: Remove these when the ETL has them available
  processedOrder.features.filing = mockData.displayOrder.features.filing;
  processedOrder.features.type = mockData.displayOrder.features.type;

  return processedOrder;
};
