import React from 'react';
import { shallow } from 'enzyme';
import { shouldBehaveLikeAComponent, mountWithIntl } from '../../../tests/utilities';
import FilterContent from '.';

const yearRange = {
  start: 1970,
  end: 1980,
};

const projectStatus = ['OPEN', 'CLOSED', 'CANCELLED'];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/FilterContent', () => {
  describe('proper props being passed in', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={noop}
          reset={noop}
          onYearSelect={noop}
          closeTab={noop}
        />,
      );
    });

    shouldBehaveLikeAComponent(FilterContent, () => wrapper);

    test('renders ul with className of filter', () => {
      expect(wrapper.find('ul.projectStatus')).toHaveLength(1);
    });
    test('renders ul with className of projectList', () => {
      expect(wrapper.find('ul.projectList')).toHaveLength(1);
    });
  });

  describe('on year click/enter', () => {
    let wrapper;
    let spy;
    let li;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={{ start: 1971, end: 1971 }}
          changeProjectStatus={noop}
          reset={noop}
          closeTab={noop}
          onYearSelect={spy}
        />,
      );
      li = wrapper
        .find('.projectList')
        .find('li')
        .first();
    });
    test('the click must call its onClick prop called yearSelect', () => {
      li.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('the enter key should call its keyPress prop called yearSelect', () => {
      li.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('on right/left keyPress in year li', () => {
    let wrapper;
    let spy;
    let li;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={noop}
          reset={noop}
          closeTab={noop}
          onYearSelect={spy}
        />,
      );
      li = wrapper
        .find('.projectList')
        .find('li')
        .first();
    });
    test('a right arrow key or left arrow key will call its prop', () => {
      li.simulate('keyDown', { ...eventFuncs, key: 'ArrowRight' });
      li.simulate('keyUp', { ...eventFuncs, key: 'ArrowRight' });
      li.simulate('keyDown', { ...eventFuncs, key: 'ArrowLeft' });
      li.simulate('keyUp', { ...eventFuncs, key: 'ArrowLeft' });
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });

  describe('onClick / keypress of status tab', () => {
    let wrapper;
    let spy;
    let status;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={spy}
          reset={noop}
          closeTab={noop}
          onYearSelect={noop}
        />,
      );
      status = wrapper
        .find('.projectStatus')
        .find('li')
        .first();
    });
    test('click should call its changeProjectStatus prop', () => {
      status.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('enter key should call its changeProjectStatus prop', () => {
      status.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onClick/keypress of reset', () => {
    let wrapper;
    let spy;
    let reset;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={noop}
          reset={spy}
          closeTab={noop}
          onYearSelect={noop}
        />,
      );

      reset = wrapper.find('div.reset');
    });
    test('click should call its reset prop', () => {
      reset.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
    test('keyPress should call its reset prop', () => {
      reset.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
  describe('onClick/keypress of close', () => {
    let wrapper;
    let spy;
    let close;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={noop}
          reset={noop}
          closeTab={spy}
          onYearSelect={noop}
        />,
      );
      close = wrapper
        .find('FormattedMessage')
        .last()
        .shallowWithIntl();
    });
    test('click should call its closeTab Prop', () => {
      close.simulate('click', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('keyPress should call its closeTab Prop', () => {
      close.simulate('keyPress', { ...eventFuncs, key: 'Enter' });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('with selectedYear of first index', () => {
    let wrapper;
    let spy;
    let li;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={{ start: 1970, end: 1970 }}
          changeProjectStatus={spy}
          reset={noop}
          closeTab={noop}
          onYearSelect={noop}
        />,
      );
      li = wrapper.find('.projectList').find('li');
    });

    test('The first index will have regularBackground, leftCurve and rightCurve', () => {
      expect(
        li.first().hasClass('regularBackground rightCurve leftCurve'),
      ).toBe(true);
    });

    test('The second index will not have any curve classes', () => {
      expect(li.at(1).hasClass('')).toBe(true);
    });
  });

  describe('3 selected index', () => {
    let wrapper;
    let spy;
    let li;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={{ start: 1970, end: 1972 }}
          changeProjectStatus={spy}
          reset={noop}
          closeTab={noop}
          onYearSelect={noop}
        />,
      );
      li = wrapper.find('.projectList').find('li');
    });

    test('The first index will have left curve', () => {
      expect(li.at(0).hasClass('regularBackground leftCurve')).toBe(true);
    });

    test('The second index will only have regular background', () => {
      expect(li.at(1).hasClass('regularBackground')).toBe(true);
    });

    test('The third index will have rightCurve', () => {
      expect(li.at(2).hasClass('regularBackground rightCurve')).toBe(true);
    });
  });

  describe('onDrag start', () => {
    test('onDrag start will call yearSelect prop', () => {
      const spy = jest.fn();
      // mountWithIntl used for next few tests for accessing getAttribute property
      const wrapper = mountWithIntl(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={noop}
          reset={noop}
          closeTab={noop}
          onYearSelect={spy}
        />,
      );
      const li = wrapper
        .find('.projectList')
        .find('li')
        .first();
      li.simulate('mouseDown', eventFuncs);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe('onDrag move', () => {
    let wrapper;
    let spy;
    let li;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = mountWithIntl(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={yearRange}
          changeProjectStatus={noop}
          onYearSelect={spy}
          closeTab={noop}
          reset={noop}
        />,
      );
      li = wrapper
        .find('.projectList')
        .find('li')
        .first();
    });
    test('onDrag move, will call its onYearSelect prop', () => {
      li.simulate('mouseDown', eventFuncs);
      li.simulate('mouseMove', { eventFuncs, clientX: 10, clientY: 10 });
      expect(spy).toHaveBeenCalledTimes(2);
    });

    test('onDrag Stop, onDragMove should not call its onYearSelect prop', () => {
      li.simulate('mouseDown', eventFuncs);
      li.simulate('mouseMove', { eventFuncs, clientX: 10, clientY: 10 });
      li.simulate('mouseUp', eventFuncs);
      li.simulate('mouseMove', { eventFuncs, clientX: 20, clientY: 20 });
      expect(spy).toHaveBeenCalledTimes(2);
    });
  });
});
