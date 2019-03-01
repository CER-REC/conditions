import * as d3 from 'd3';

export default (instrumentChartData, width, height) => {
  const structuredData = instrumentChartData.reduce((acc, next) => {
    const commodity = next.commodity.length > 1
      ? 'ANY_COMMODITY_TYPES'
      : next.commodity[0];
    const group = (commodity === 'ANY_COMMODITY_TYPES' || commodity === 'NOT_SPECIFIED')
      ? 'other'
      : 'commodity';
    if (!acc[group][commodity]) { acc[group][commodity] = []; }
    acc[group][commodity][next.prefix] = { value: next.value, category: next.type };

    return acc;
  }, { commodity: {}, other: {} });

  const data = {
    name: 'data',
    children: Object.entries(structuredData).map(([sectionName, sectionChildren]) => ({
      name: sectionName,
      children: Object.entries(sectionChildren).map(([topName, children]) => ({
        name: topName,
        children: Object.entries(children).map(([prefix, value]) => ({
          name: prefix,
          children: [],
          ...value,
        })),
      })),
    })),
  };
  // d3 pack generates a function to
  // fit data into tightly packed circles.
  const pack = d3
    .pack()
    .size([width, height])
    .padding(node => (node.depth === 0 ? 0 : 5))
    .radius((node) => {
      // Calculation for rendering larger circle based on text length
      const characterWidth = 8;
      const textLength = node.data.name.length * characterWidth;
      const textHeight = 15;
      const textLengthExceeds = node.value * 2 <= textLength;
      if (textLengthExceeds) {
        return node.value + textLength; // buffer
      }
      if (node.value < textHeight) {
        return node.value + textHeight;
      }
      return node.value;
    });
  // creates the root node using
  // d3 hierarchy similar to a tree layout
  const root = d3
    .hierarchy(data)
    .sum(totalData => totalData.value)
    .sort((a, b) => b.value - a.value);

  const descendants = pack(root).descendants();
  return descendants;
};
