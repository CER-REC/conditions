import * as d3 from 'd3';

export default (instrumentChartData, width, height) => {
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
    .hierarchy(instrumentChartData)
    .sum(totalData => totalData.value)
    .sort((a, b) => b.value - a.value);

  const descendants = pack(root).descendants();
  return descendants;
};
