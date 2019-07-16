import memoize from 'lodash.memoize';
import memoizeReference from './memoizeReference';

export default memoize(
  (allConditionsPerYear, feature) => {
    const { years: data, minYear, maxYear } = allConditionsPerYear;
    const emptyYears = Array(maxYear - minYear + 1).fill()
      .reduce((acc, _, i) => ({ ...acc, [minYear + i]: 0 }), {});
    // Turn from year[feature][subfeature] = count into subfeature[year] = count
    const grouped = data.reduce((acc, next) => {
      const featureData = next.aggregatedCount[feature];
      if (!featureData) { return acc; }
      featureData.forEach(({ name, count }) => {
        if (!acc[name]) { acc[name] = { ...emptyYears }; }
        acc[name][next.year] = count;
      });
      return acc;
    }, {});
    // Turn subfeature[year] = count into subfeature = [{ x: count, y: year }]
    return Object.entries(grouped).reduce((acc, [name, years]) => ({
      ...acc,
      [name]: Object.entries(years).map(([x, y]) => ({ x: parseInt(x, 10), y })),
    }), {});
  },
  (data, feature) => `${memoizeReference(data)}-${feature}`,
);
