import React from 'react';
import { shallow } from 'enzyme';
import BubbleChart from '.';

const instrumentChartData2 = {
  name: 'data',
  children: [{
    parentName: 'anyCommodityTypes',
    children: [
      {
        name: 'MO',
        children: [],
        value: 40,
        category: 'misc',
      }, {
        name: 'AO',
        children: [],
        value: 40,
        category: 'misc',
      },
      {
        name: 'ZO',
        children: [],
        value: 20,
        category: 'routing',
      },
    ],
  },
  {
    parentName: 'notSpecified',
    children: [
      {
        name: 'XC',
        children: [],
        value: 10,
        category: 'construction',
      },
      {
        name: 'CO',
        children: [],
        value: 10,
        category: 'misc',
      },
    ],
  }],
};

const instrumentChartData1 = {
  name: 'data',
  children: [{
    parentName: 'gas',
    children: [
      {
        name: 'XG',
        children: [],
        value: 40,
        category: 'construction',
      }, {
        name: 'GC',
        children: [],
        value: 30,
        category: 'construction',
      },
      {
        name: 'GPSO',
        children: [],
        value: 10,
        category: 'opening',
      },
      {
        name: 'SG',
        children: [],
        value: 20,
        category: 'safety',
      },
      {
        name: 'GPLO',
        children: [],
        value: 5,
        category: 'opening',
      },
      {
        name: 'TG',
        children: [],
        value: 10,
        category: 'tariffs',
      },
    ],
  },
  {
    parentName: 'power',
    children: [
      {
        name: 'EC',
        children: [],
        value: 10,
        category: 'construction',
      },
      {
        name: 'EPE',
        children: [],
        value: 15,
        category: 'construction',
      },
    ],
  },
  {
    parentName: 'oil',
    children: [{
      name: 'XO',
      children: [],
      value: 40,
      category: 'construction',
    },
    {
      name: 'SO',
      children: [],
      value: 30,
      category: 'safety',
    }, {
      name: 'OC',
      children: [],
      value: 40,
      category: 'construction',
    }, {
      name: 'OPLO',
      children: [],
      value: 10,
      category: 'opening',
    }, {
      name: 'OPSO',
      children: [],
      value: 10,
      category: 'opening',
    }],
  }],
};

describe('Components|BubbleChart', () => {
  describe('without a selectedCategory equal to Instrument', () => {
    test('should not render a div', () => {
      const wrapper = shallow(<BubbleChart
        selectedCategory="test"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
      expect(wrapper.type()).toBeNull();
    });
  });
  describe('with a selectedCategory', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
    });
    test('should render a div', () => {
      expect(wrapper.type()).toBe('div');
    });

    test('should render a bubbleChart class', () => {
      expect(wrapper.find('.BubbleChart')).toHaveLength(1);
    });
  });

  describe('with chartIndicator display prop ', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
    });
    test('should not show chartIndicator when false', () => {
      expect(wrapper.find('ChartIndicator')).toHaveLength(0);
    });
    test('should show the chartIndicator when true', () => {
      wrapper.setState({ display: true });
      expect(wrapper.find('ChartIndicator')).toHaveLength(1);
    });
  });

  describe('onClick ', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
    });
    test('should change the indicator position', () => {
      const circleProps = {
        r: 40,
        x: 79.36630443973255,
        y: 197.52612788988029,
        value: 40,
      };
      wrapper.find('InstrumentBubble').first().props().onClick(circleProps);
      expect(wrapper.state().indicator).toBe(0);
    });
  });

  describe('onKeyPress', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
    });
    const arrowRight = {
      key: 'ArrowRight',
    };

    const arrowLeft = {
      key: 'ArrowLeft',
    };
    const keyCodeRight = {
      keyCode: 39,
    };

    const keyCodeLeft = {
      keyCode: 37,
    };

    test(
      'should move right with rightArrow keypress if it didn\'t reach end of graph',
      () => {
        wrapper.find('InstrumentBubble').first().props().keyPress(arrowRight);
        expect(wrapper.state().indicator).toBe(1);
      },
    );

    test(
      'should move right with keycode 39, if it didn\'t reach end of graph',
      () => {
        wrapper.find('InstrumentBubble').first().props().keyPress(keyCodeRight);
        expect(wrapper.state().indicator).toBe(1);
      },
    );

    test(
      'should move left with leftArrow keypress if it didn\'t reach beginning of graph',
      () => {
        wrapper.find('InstrumentBubble').first().props().keyPress(arrowRight);
        wrapper.find('InstrumentBubble').first().props().keyPress(arrowLeft);
        expect(wrapper.state().indicator).toBe(0);
      },
    );

    test(
      'should move left with keycode 38 if it didn\'t reach beginning of graph',
      () => {
        wrapper.find('InstrumentBubble').first().props().keyPress(arrowRight);
        wrapper.find('InstrumentBubble').first().props().keyPress(keyCodeLeft);
        expect(wrapper.state().indicator).toBe(0);
      },
    );

    test(
      'should move to the end with arrow left at the beginning of chart',
      () => {
        wrapper.find('InstrumentBubble').first().props().keyPress(arrowLeft);
        expect(wrapper.state().indicator).toBeGreaterThan(2);
      },
    );

    test(
      'should move to the beginning of chart if arrow right at the end of chart',
      () => {
        const circleProps = {
          r: 25,
          x: 815,
          y: 200,
          value: 10,
        };
        wrapper.find('InstrumentBubble').first().props().onClick(circleProps);
        wrapper.find('InstrumentBubble').first().props().keyPress(arrowRight);
        expect(wrapper.state().indicator).toBe(0);
      },
    );
  });

  describe('onDrag', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<BubbleChart
        selectedCategory="instrument"
        instrumentChartData1={instrumentChartData1}
        instrumentChartData2={instrumentChartData2}
      />);
    });

    test(
      'should not update indicator position if mouseMove without mouseDown',
      () => {
        // Get props for onDragMove and check the state x position
        const mouseDrag = {
          clientX: 50,
        };
        wrapper.find('g').props().onMouseMove(mouseDrag);
        expect(wrapper.state().indicator).toBeNull();
      },
    );

    test('should update indicator position if mouseMove with mouseDown', () => {
      const mouseDrag = {
        clientX: 50,
        clientY: 100,
      };
      wrapper.find('g').props().onMouseDown();
      wrapper.find('g').props().onMouseMove(mouseDrag);
      expect(wrapper.state().indicator).toBe(2);
    });

    test('should not update the indicator position once mouseUp occurs', () => {
      const mouseDrag1 = {
        clientX: 50,
        clientY: 100,
      };
      const mouseDrag2 = {
        clientX: 120,
        clientY: 200,
      };
      wrapper.find('g').props().onMouseDown();
      wrapper.find('g').props().onMouseMove(mouseDrag1);
      const prevIndicator = wrapper.state().indicator;
      wrapper.find('g').props().onMouseUp();
      wrapper.find('g').props().onMouseMove(mouseDrag2);
      expect(wrapper.state().indicator).toBe(prevIndicator);
    });
  });
});
