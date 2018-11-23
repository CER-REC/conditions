const sortChartData = (feature, data) => {
  const featureOrder = {
    Theme: ['Standard Condition', 'Integrity Management', 'Environmental Protection', 'Administrative', 'Sunset Clause', 'Enforcement', 'Emergency Management', 'Socio-Economic', 'Safety Management', 'Damage Prevention', 'Financial', 'Security', 'Management System', 'No Theme Indicated'],
    Instrument: ['Routing', 'Construction', 'Opening', 'Abandonment', 'Safety', 'Tarrifs', 'Miscellaneous'],
    Phase: [],
    Type: [],
    Status: [],
    Filing: [],
  };

  return data.sort((a, b) => (
    featureOrder[feature].indexOf(a.name) - featureOrder[feature].indexOf(b.name)));
};

export default sortChartData;
