import React from 'react';
import { mount } from 'enzyme';
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
  const eventFuncs = { preventDefault: noop, stopPropagation: noop };

  const shouldRenderTitle = (title) => {
    it('should render the title', () => {
      expect(wrapper.text()).to.contain(title);
    });
  };

  const shouldRenderItems = (data, max) => {
    it('should render the data as LegendItem components in the List component', () => {
      const listItemsWrapper = wrapper.find(List).find(LegendItem).not('[data=null]');

      for (let i = 0; i < data.length; i += 1) {
        const listItemWrapper = listItemsWrapper.at(i);

        expect(listItemWrapper.type()).to.equal(LegendItem);
        expect(listItemWrapper.prop('title')).to.equal(data[i].id);
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

  const shouldRenderWithHighlight = (hightlightID) => {
    it('should only render the LegendItem with the corresponding ID highlighted', () => {
      const highlightSelector = `[title="${hightlightID}"]`;
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
      wrapper = mount(<SmallMultiplesLegend className="test" title={title} data={[]} onChange={noop} />);
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
      id: 'Condition Title',
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
    }];

    const shouldNotAllListItem = () => {
      it('should not render a "All" list item', () => {
        expect(wrapper.find(LegendItem).filter('[data=null]')).to.have.lengthOf(0);
        expect(wrapper.find(LegendItem)).to.have.lengthOf(1);
      });
    };

    const shouldCallOnChangeOnClick = () => {
      it('should call the onChange function on click', () => {
        const legendItemWrapper = wrapper.find(LegendItem);

        legendItemWrapper.simulate('click', eventFuncs);
        expect(spy.calledOnceWith(data[0].id)).to.be.equal(true);
      });
    };

    const shouldCallOnChangeOnEnter = () => {
      it('should call the onChange function on enter key press', () => {
        const legendItemWrapper = wrapper.find(LegendItem);

        legendItemWrapper.simulate('keypress', {
          key: 'Enter',
          ...eventFuncs,
        });
        expect(spy.calledOnceWith(data[0].id)).to.be.equal(true);
      });
    };

    describe('when no highlightID is provided', () => {
      beforeEach(() => {
        wrapper = mount(<SmallMultiplesLegend className="anotherClass" title={title} data={data} onChange={spy} />);
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

    describe('when a highlightID is provided', () => {
      const hightlightID = data[0].id;

      beforeEach(() => {
        wrapper = mount((
          <SmallMultiplesLegend
            title={title}
            data={data}
            onChange={spy}
            highlightID={hightlightID}
          />
        ));
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, null);
      shouldRenderTitle(title);
      shouldRenderItems(data, 345);
      shouldRenderWithHighlight(hightlightID);
      shouldNotAllListItem();
      shouldCallOnChangeOnClick();
      shouldCallOnChangeOnEnter();
    });
  });

  describe('when multiple data conditions are provided', () => {
    const title = 'ABC-TEST_123';
    const data = [{
      id: 'ConditionTitle 1',
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
    }, {
      id: 'another title',
      graphData: [{
        date: 2211,
        count: 1515,
      }],
    }, {
      id: 'OTHER_OTHER_TITLE_ABC',
      graphData: [{
        date: 2211,
        count: 0,
      }, {
        date: 2233,
        count: 1,
      }],
    }];

    const shouldRenderTheAllItem = () => {
      it('should render the all LegendItem component', () => {
        const firstListItem = wrapper.find(List).prop('items')[0];

        expect(firstListItem.type).to.equal(LegendItem);
        // TODO: Redo when translations are implemented
        expect(firstListItem.props.title).to.contain('All');
        expect(firstListItem.props.data).to.be.equal(null);
        expect(wrapper.find(LegendItem)).to.have.lengthOf(4);
      });
    };

    const shouldCallOnChangeWithNULLOnClick = () => {
      it('should call the onChange function with the data ID on click', () => {
        const allLegendItemWrapper = wrapper.find(LegendItem).filter('[data=null]');

        allLegendItemWrapper.simulate('click', eventFuncs);
        expect(spy.calledOnceWith(null)).to.equal(true);
      });
    };

    const shouldCallOnChangeWithIDOnClick = () => {
      it('should call the onChange function with the data ID on click', () => {
        const legendItemsWrapper = wrapper.find(LegendItem).filter(':not([data=null])');

        for (let i = 0; i < legendItemsWrapper.length; i += 1) {
          const legendItemWrapper = legendItemsWrapper.at(i);

          legendItemWrapper.simulate('click', eventFuncs);
          expect(spy.calledWith(data[i].id)).to.equal(true);
        }

        expect(spy.callCount).to.equal(data.length);
      });
    };

    const shouldCallOnChangeWithNULLOnEnter = () => {
      it('should call the onChange function with the data ID on click', () => {
        const allLegendItemWrapper = wrapper.find(LegendItem).filter('[data=null]');

        allLegendItemWrapper.simulate('keypress', {
          key: 'Enter',
          ...eventFuncs,
        });
        expect(spy.calledOnceWith(null)).to.equal(true);
      });
    };

    const shouldCallOnChangeWithIDOnEnter = () => {
      it('should call the onChange function with the data ID on enter key press', () => {
        const legendItemsWrapper = wrapper.find(LegendItem).filter(':not([data=null])');

        for (let i = 0; i < legendItemsWrapper.length; i += 1) {
          const legendItemWrapper = legendItemsWrapper.at(i);

          legendItemWrapper.simulate('keypress', {
            key: 'Enter',
            ...eventFuncs,
          });
          expect(spy.calledWith(data[i].id)).to.be.equal(true);
        }

        expect(spy.callCount).to.equal(data.length);
      });
    };

    describe('when no highlightID is provided', () => {
      beforeEach(() => {
        wrapper = mount(<SmallMultiplesLegend className="abcd" title={title} data={data} onChange={spy} />);
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, 'abcd');
      shouldRenderTitle(title);
      shouldRenderItems(data, 1515);
      shouldRenderWithoutHighlight();
      shouldRenderTheAllItem();
      shouldCallOnChangeWithNULLOnClick();
      shouldCallOnChangeWithIDOnClick();
      shouldCallOnChangeWithNULLOnEnter();
      shouldCallOnChangeWithIDOnEnter();
    });

    describe('when a highlightID is provided', () => {
      const hightlightID = data[2].id;

      beforeEach(() => {
        wrapper = mount((
          <SmallMultiplesLegend
            className="something123"
            title={title}
            data={data}
            onChange={spy}
            highlightID={hightlightID}
          />
        ));
        test.wrapper = wrapper;
      });

      shared.shouldBehaveLikeAComponent(test, SmallMultiplesLegend, 'something123');
      shouldRenderTitle(title);
      shouldRenderItems(data, 1515);
      shouldRenderWithHighlight(hightlightID);
      shouldRenderTheAllItem();
      shouldCallOnChangeWithNULLOnClick();
      shouldCallOnChangeWithIDOnClick();
      shouldCallOnChangeWithNULLOnEnter();
      shouldCallOnChangeWithIDOnEnter();
    });
  });
});
