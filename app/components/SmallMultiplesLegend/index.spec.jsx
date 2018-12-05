import React from 'react';
import { mount } from 'enzyme';
import sinon from 'sinon';
import { expect } from 'chai';

import SmallMultiplesLegend from './';
import LegendItem from './LegendItem';
import List from '../List';

describe('Components|SmallMultiplesLegend', () => {
  let wrapper;
  let spy;
  const noop = () => {};
  const eventFuncs = { preventDefault: noop, stopPropagation: noop };

  const itShouldRenderTitle = (title) => {
    it('should render the title', () => {
      // Using mount and shallow requires different ways to check the class of the component
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.find(SmallMultiplesLegend).childAt(0).hasClass('SmallMultiplesLegend')).to.be.true;
      expect(wrapper.text()).to.contain(title);
    });
  };

  const itShouldRenderItems = (data) => {
    it('should render the data as LegendItem components in the List component', () => {
      const listItemsWrapper = wrapper.find(List).find(LegendItem).not('[data=null]');

      for (let i = 0; i < data.length; i += 1) {
        const listItemWrapper = listItemsWrapper.at(i);

        expect(listItemWrapper.type()).to.be.equal(LegendItem);
        expect(listItemWrapper.prop('title')).to.equal(data[i].id);
        expect(listItemWrapper.prop('data')).to.deep.equal(data[i].conditions);
      }
    });
  };

  const itShouldRenderWithoutHighlight = () => {
    it('should renders the component without highlighting', () => {
      const listWrapper = wrapper.find(List);
      const itemsWrapper = wrapper.find(LegendItem);

      if (listWrapper.exists()) {
        // eslint-disable-next-line no-unused-expressions
        expect(listWrapper.hasClass('unhighlight')).to.be.false;
      }

      itemsWrapper.forEach((itemWrapper) => {
        // eslint-disable-next-line no-unused-expressions
        expect(itemWrapper.prop('unhighlight')).to.be.oneOf([null, false]);
      });
    });
  };

  const itShouldRenderWithHighlight = (hightlightID) => {
    it('should only renders the LegendItem with the corresponding ID highlighted', () => {
      const highlightSelector = `[title="${hightlightID}"]`;
      const listWrapper = wrapper.find(List);
      const unhighlightItemsWrapper = wrapper.find(LegendItem).not(highlightSelector);
      const highlightItemWrapper = wrapper.find(LegendItem).filter(highlightSelector);

      // eslint-disable-next-line no-unused-expressions
      expect(listWrapper.hasClass('unhighlight')).to.be.true;

      unhighlightItemsWrapper.forEach((itemWrapper) => {
        // eslint-disable-next-line no-unused-expressions
        expect(itemWrapper.prop('unhighlight')).to.be.true;
      });

      if (highlightItemWrapper.exists()) {
        // eslint-disable-next-line no-unused-expressions
        expect(highlightItemWrapper.prop('unhighlight')).to.be.false;
      }
    });
  };

  beforeEach(() => {
    spy = sinon.spy();
  });

  describe('when no data is provided', () => {
    const title = 'Test Title';

    beforeEach(() => {
      wrapper = mount(<SmallMultiplesLegend title={title} data={[]} onChange={noop} />);
    });

    itShouldRenderTitle(title);
    itShouldRenderWithoutHighlight();

    it('should not render a list', () => {
      // eslint-disable-next-line no-unused-expressions
      expect(wrapper.find(List)).to.be.empty;
    });
  });

  describe('when only one data condition is provided', () => {
    const title = 'Title-A';
    const data = [{
      id: 'Condition Title',
      conditions: [{
        date: new Date('2018-01-01T00:00:00.000Z'),
        number: 12,
      }, {
        date: new Date('2018-01-02T00:00:00.000Z'),
        number: 1,
      }, {
        date: new Date('2018-01-03T00:00:00.000Z'),
        number: 345,
      }],
    }];

    const itShouldNotAllListItem = () => {
      it('should not render a "All" list item', () => {
        expect(wrapper.find(List).text()).to.not.contain(wrapper.prop('allLabel'));
        expect(wrapper.find(LegendItem)).to.have.lengthOf(1);
      });
    };

    const itShouldCallOnChangeOnClick = () => {
      it('should call the onChange function on click', () => {
        const legendItemWrapper = wrapper.find(LegendItem);

        legendItemWrapper.simulate('click', eventFuncs);
        // eslint-disable-next-line no-unused-expressions
        expect(spy.calledOnceWith(data[0].id)).to.be.true;
      });
    };

    const itShouldCallOnChangeOnEnter = () => {
      it('should call the onChange function on enter key press', () => {
        const legendItemWrapper = wrapper.find(LegendItem);

        legendItemWrapper.simulate('keypress', {
          key: 'Enter',
          ...eventFuncs,
        });
        // eslint-disable-next-line no-unused-expressions
        expect(spy.calledOnceWith(data[0].id)).to.be.true;
      });
    };

    describe('when no highlightID is provided', () => {
      beforeEach(() => {
        wrapper = mount(<SmallMultiplesLegend title={title} data={data} onChange={spy} />);
      });

      itShouldRenderTitle(title);
      itShouldRenderItems(data);
      itShouldRenderWithoutHighlight();
      itShouldNotAllListItem();
      itShouldCallOnChangeOnClick();
      itShouldCallOnChangeOnEnter();
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
      });

      itShouldRenderTitle(title);
      itShouldRenderItems(data);
      itShouldRenderWithHighlight(hightlightID);
      itShouldNotAllListItem();
      itShouldCallOnChangeOnClick();
      itShouldCallOnChangeOnEnter();
    });
  });

  describe('when multiple data conditions are provided', () => {
    const title = 'ABC-TEST_123';
    const data = [{
      id: 'ConditionTitle 1',
      conditions: [{
        date: new Date('2222-01-01T00:00:00.000Z'),
        number: 7,
      }, {
        date: new Date('2222-02-01T00:00:00.000Z'),
        number: 8,
      }, {
        date: new Date('2222-03-01T00:00:00.000Z'),
        number: 9,
      }],
    }, {
      id: 'another title',
      conditions: [{
        date: new Date('2222-01-01T00:00:00.000Z'),
        number: 1515,
      }],
    }, {
      id: 'OTHER_OTHER_TITLE_ABC',
      conditions: [{
        date: new Date('2222-02-02T00:00:00.000Z'),
        number: 0,
      }, {
        date: new Date('2222-02-22T00:00:00.000Z'),
        number: 1,
      }],
    }];

    const itShouldCallOnChangeWithNULLOnClick = () => {
      it('should call the onChange function with the data ID on click', () => {
        const allLegendItemWrapper = wrapper.find(LegendItem).filter('[data=null]');

        allLegendItemWrapper.simulate('click', eventFuncs);
        // eslint-disable-next-line no-unused-expressions
        expect(spy.calledOnceWith(null)).to.be.true;
      });
    };

    const itShouldCallOnChangeWithIDOnClick = () => {
      it('should call the onChange function with the data ID on click', () => {
        const legendItemsWrapper = wrapper.find(LegendItem).filter(':not([data=null])');

        for (let i = 0; i < legendItemsWrapper.length; i += 1) {
          const legendItemWrapper = legendItemsWrapper.at(i);

          legendItemWrapper.simulate('click', eventFuncs);
          // eslint-disable-next-line no-unused-expressions
          expect(spy.calledWith(data[i].id)).to.be.true;
        }

        expect(spy.callCount).to.be.equal(data.length);
      });
    };

    const itShouldCallOnChangeWithNULLOnEnter = () => {
      it('should call the onChange function with the data ID on click', () => {
        const allLegendItemWrapper = wrapper.find(LegendItem).filter('[data=null]');

        allLegendItemWrapper.simulate('keypress', {
          key: 'Enter',
          ...eventFuncs,
        });
        // eslint-disable-next-line no-unused-expressions
        expect(spy.calledOnceWith(null)).to.be.true;
      });
    };

    const itShouldCallOnChangeWithIDOnEnter = () => {
      it('should call the onChange function with the data ID on enter key press', () => {
        const legendItemsWrapper = wrapper.find(LegendItem).filter(':not([data=null])');

        for (let i = 0; i < legendItemsWrapper.length; i += 1) {
          const legendItemWrapper = legendItemsWrapper.at(i);

          legendItemWrapper.simulate('keypress', {
            key: 'Enter',
            ...eventFuncs,
          });
          // eslint-disable-next-line no-unused-expressions
          expect(spy.calledWith(data[i].id)).to.be.true;
        }

        expect(spy.callCount).to.be.equal(data.length);
      });
    };

    describe('when no allLabel is provided', () => {
      const itShouldRenderDefaultAllLabel = () => {
        it('should render the default allLabel as a LegendItem component', () => {
          const firstListItem = wrapper.find(List).prop('items')[0];

          expect(firstListItem.type).to.be.equal(LegendItem);
          expect(firstListItem.props.title).to.equal(SmallMultiplesLegend.defaultProps.allLabel);
          // eslint-disable-next-line no-unused-expressions
          expect(firstListItem.props.data).to.be.null;
          expect(wrapper.find(LegendItem)).to.have.lengthOf(4);
        });
      };

      describe('when no highlightID is provided', () => {
        beforeEach(() => {
          wrapper = mount(<SmallMultiplesLegend title={title} data={data} onChange={spy} />);
        });

        itShouldRenderTitle(title);
        itShouldRenderItems(data);
        itShouldRenderWithoutHighlight();
        itShouldCallOnChangeWithNULLOnClick();
        itShouldCallOnChangeWithIDOnClick();
        itShouldCallOnChangeWithNULLOnEnter();
        itShouldCallOnChangeWithIDOnEnter();
        itShouldRenderDefaultAllLabel();
      });

      describe('when a highlightID is provided', () => {
        const hightlightID = data[2].id;

        beforeEach(() => {
          wrapper = mount((
            <SmallMultiplesLegend
              title={title}
              data={data}
              onChange={spy}
              highlightID={hightlightID}
            />));
        });

        itShouldRenderTitle(title);
        itShouldRenderItems(data);
        itShouldRenderWithHighlight(hightlightID);
        itShouldCallOnChangeWithNULLOnClick();
        itShouldCallOnChangeWithIDOnClick();
        itShouldCallOnChangeWithNULLOnEnter();
        itShouldCallOnChangeWithIDOnEnter();
        itShouldRenderDefaultAllLabel();
      });
    });

    describe('when a allLabel is provided', () => {
      const itShouldRenderProvidedAllLabel = () => {
        it('should render the provided allLabel as a LegendItem component', () => {
          const firstListItem = wrapper.find(List).prop('items')[0];

          expect(firstListItem.type).to.be.equal(LegendItem);
          expect(firstListItem.props.title).to.equal(wrapper.prop('allLabel'));
          // eslint-disable-next-line no-unused-expressions
          expect(firstListItem.props.data).to.be.null;
          expect(wrapper.find(LegendItem)).to.have.lengthOf(4);
        });
      };

      describe('when no highlightID is provided', () => {
        const hightlightID = data[1].id;

        beforeEach(() => {
          wrapper = mount((
            <SmallMultiplesLegend
              title={title}
              data={data}
              onChange={spy}
              allLabel="ALL CONDITIONS AND/OR FEATURES"
              highlightID={hightlightID}
            />
          ));
        });

        itShouldRenderTitle(title);
        itShouldRenderItems(data);
        itShouldRenderWithHighlight(hightlightID);
        itShouldCallOnChangeWithNULLOnClick();
        itShouldCallOnChangeWithIDOnClick();
        itShouldCallOnChangeWithNULLOnEnter();
        itShouldCallOnChangeWithIDOnEnter();
        itShouldRenderProvidedAllLabel();
      });
    });
  });
});
