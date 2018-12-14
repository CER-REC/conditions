import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import SmallMultiplesLegend from './';
import LegendItem from './LegendItem';
import List from '../List';
import shared from './shared.spec';

describe('Components|SmallMultiplesLegend', () => {
  let wrapper;
  let spy;
  const test = {};
  const noop = () => {};

  const shouldRenderTitle = (title) => {
    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });
  };

  const shouldRenderItems = (data, max) => {
    it('should render the data as LegendItem components in the List component', () => {
      const listItemsWrapper = wrapper.find(List).shallow().find(LegendItem).not('[all=true]');

      for (let i = 0; i < data.length; i += 1) {
        const listItemWrapper = listItemsWrapper.at(i);

        expect(listItemWrapper.type()).to.equal(LegendItem);
        expect(listItemWrapper.prop('title')).to.equal(data[i].name);
        expect(listItemWrapper.prop('data')).to.deep.equal(data[i].graphData);
        expect(listItemWrapper.prop('max')).to.equal(max);
      }
    });
  };

  const shouldRenderWithoutHighlight = () => {
    it('should renders the component without highlighting', () => {
      const listWrapper = wrapper.find(List);
      const itemsWrapper = wrapper.find(LegendItem);

      if (listWrapper.exists()) {
        expect(listWrapper.hasClass('faded')).to.equal(false);
      }

      itemsWrapper.forEach((itemWrapper) => {
        expect(itemWrapper.prop('faded')).to.be.oneOf([null, false]);
      });
    });
  };

  const shouldRenderWithHighlight = (highlightName) => {
    it('should only render the LegendItem with the corresponding name highlighted', () => {
      const highlightSelector = `[title="${highlightName}"]`;
      const listWrapper = wrapper.find(List);
      const fadedItemsWrapper = wrapper.find(LegendItem).not(highlightSelector);
      const highlightItemWrapper = wrapper.find(LegendItem).filter(highlightSelector);

      expect(listWrapper.hasClass('faded')).to.equal(true);

      fadedItemsWrapper.forEach((itemWrapper) => {
        expect(itemWrapper.prop('faded')).to.equal(true);
      });

      if (highlightItemWrapper.exists()) {
        expect(highlightItemWrapper.prop('faded')).to.equal(false);
      }
    });
  };

  beforeEach(() => {
    spy = sinon.spy();
  });

  describe('when no data is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = shallow(<SmallMultiplesLegend className="test" title={title} data={[]} onChange={noop} />);
      test.wrapper = wrapper;
    });

    shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, 'test');
    shouldRenderTitle(title);
    shouldRenderWithoutHighlight();

    it('should not render a list', () => {
      expect(wrapper.find(List)).to.have.lengthOf(0);
    });
  });

  describe('when only one data condition is provided', () => {
    const title = 'Title-A';
    const data = [{
      name: 'Condition Title',
      graphData: [{
        date: 2018,
        count: 12,
      }, {
        date: 2019,
        count: 1,
      }, {
        date: 2020,
        count: 345,
      }],
      color: 'black',
    }];

    const shouldNotAllListItem = () => {
      it('should not render a "All" list item', () => {
        const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);

        expect(legendItemsWrapper.filter('[all=true]')).to.have.lengthOf(0);
        expect(legendItemsWrapper).to.have.lengthOf(1);
      });
    };

    const shouldCallOnChangeOnClick = () => {
      it('should call the onChange function on click', () => {
        wrapper.find(List).prop('onChange')(0);

        expect(spy.calledOnceWith(data[0].name)).to.be.equal(true);
      });
    };

    const shouldCallOnChangeOnEnter = () => {
      it('should call the onChange function on enter key press', () => {
        wrapper.find(List).prop('onChange')(0);

        expect(spy.calledOnceWith(data[0].name)).to.be.equal(true);
      });
    };

    describe('when no highlightName is provided', () => {
      beforeEach(() => {
        wrapper = shallow(<SmallMultiplesLegend className="anotherClass" title={title} data={data} onChange={spy} />);
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, 'anotherClass');
      shouldRenderTitle(title);
      shouldRenderItems(data, 345);
      shouldRenderWithoutHighlight();
      shouldNotAllListItem();
      shouldCallOnChangeOnClick();
      shouldCallOnChangeOnEnter();
    });

    describe('when a highlightName is provided', () => {
      const highlightName = data[0].name;

      beforeEach(() => {
        wrapper = shallow((
          <SmallMultiplesLegend
            title={title}
            data={data}
            onChange={spy}
            highlightName={highlightName}
          />
        ));
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, null);
      shouldRenderTitle(title);
      shouldRenderItems(data, 345);
      shouldRenderWithHighlight(highlightName);
      shouldNotAllListItem();
      shouldCallOnChangeOnClick();
      shouldCallOnChangeOnEnter();
    });
  });

  describe('when multiple data conditions are provided', () => {
    const title = 'ABC-TEST_123';
    const data = [{
      name: 'ConditionTitle 1',
      graphData: [{
        date: 2211,
        count: 7,
      }, {
        date: 2222,
        count: 8,
      }, {
        date: 2233,
        count: 9,
      }],
      color: 'white',
    }, {
      name: 'another title',
      graphData: [{
        date: 2211,
        count: 1515,
      }],
      color: '#123456',
    }, {
      name: 'OTHER_OTHER_TITLE_ABC',
      graphData: [{
        date: 2211,
        count: 0,
      }, {
        date: 2233,
        count: 1,
      }],
      color: 'red',
    }];

    const shouldRenderTheAllItem = () => {
      it('should render the all LegendItem component', () => {
        const legendItemsWrapper = wrapper.find(List).shallow().find(LegendItem);
        const firstItemWrapper = legendItemsWrapper.at(0).shallow();

        // TODO: Redo when translations are implemented
        expect(firstItemWrapper.text()).to.contain('All');
        expect(firstItemWrapper.text()).to.contain(title);
        expect(legendItemsWrapper).to.have.lengthOf(4);
      });
    };

    const shouldCallOnChangeWithNULLOnClick = () => {
      it('should call the onChange function with the data name on click', () => {
        wrapper.find(List).prop('onChange')(0);

        expect(spy.calledOnceWith(null)).to.equal(true);
      });
    };

    const shouldCallOnChangeWithNameOnClick = () => {
      it('should call the onChange function with the data name on click', () => {
        for (let i = 0; i < data.length; i += 1) {
          // Account for all item at the beginning
          wrapper.find(List).prop('onChange')(i + 1);

          expect(spy.calledWith(data[i].name)).to.equal(true);
        }

        expect(spy.callCount).to.equal(data.length);
      });
    };

    const shouldCallOnChangeWithNULLOnEnter = () => {
      it('should call the onChange function with null on click', () => {
        wrapper.find(List).prop('onChange')(0);

        expect(spy.calledOnceWith(null)).to.equal(true);
      });
    };

    const shouldCallOnChangeWithNameOnEnter = () => {
      it('should call the onChange function with the data name on enter key press', () => {
        for (let i = 0; i < data.length; i += 1) {
          // Account for all item at the beginning
          wrapper.find(List).prop('onChange')(i + 1);

          expect(spy.calledWith(data[i].name)).to.be.equal(true);
        }

        expect(spy.callCount).to.equal(data.length);
      });
    };

    describe('when no highlightName is provided', () => {
      beforeEach(() => {
        wrapper = shallow(<SmallMultiplesLegend className="abcd" title={title} data={data} onChange={spy} />);
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, 'abcd');
      shouldRenderTitle(title);
      shouldRenderItems(data, 1515);
      shouldRenderWithoutHighlight();
      shouldRenderTheAllItem();
      shouldCallOnChangeWithNULLOnClick();
      shouldCallOnChangeWithNameOnClick();
      shouldCallOnChangeWithNULLOnEnter();
      shouldCallOnChangeWithNameOnEnter();
    });

    describe('when a highlightName is provided', () => {
      const highlightName = data[2].name;

      beforeEach(() => {
        wrapper = shallow((
          <SmallMultiplesLegend
            className="something123"
            title={title}
            data={data}
            onChange={spy}
            highlightName={highlightName}
          />
        ));
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, 'something123');
      shouldRenderTitle(title);
      shouldRenderItems(data, 1515);
      shouldRenderWithHighlight(highlightName);
      shouldRenderTheAllItem();
      shouldCallOnChangeWithNULLOnClick();
      shouldCallOnChangeWithNameOnClick();
      shouldCallOnChangeWithNULLOnEnter();
      shouldCallOnChangeWithNameOnEnter();
    });
  });
});
