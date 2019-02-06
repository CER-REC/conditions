import React from 'react';
import { shallow } from 'enzyme';
import FilterContent from '.';

const yearRange = {
  start: 70,
  end: 80,
};

const projectStatus = ['OPEN', 'CLOSED', 'CANCELLED'];
const noop = () => {};
const eventFuncs = { preventDefault: noop, stopPropagation: noop };

describe('Components|SearchBar/FilterContent', () => {
  describe('if display prop is false', () => {
    test('should not render anything', () => {
      const wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={[]}
          display={false}
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
        />,
      );
      expect(wrapper.type()).toBeNull();
    });
  });

  describe('proper props being passed in', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
        />,
      );
    });
    test('renders a className of FilterContent', () => {
      expect(wrapper.find('.FilterContent')).toHaveLength(1);
    });
    test('renders ul with className of filter', () => {
      expect(wrapper.find('ul.projectStatus')).toHaveLength(1);
    });
    test('renders ul with className of projectList', () => {
      expect(wrapper.find('ul.projectList')).toHaveLength(1);
    });

    test('renders formattedMessage reset', () => {
      const updatedWrapper = wrapper.find('div.reset > FormattedMessage');
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.reset');
      expect(updatedWrapper.shallowWithIntl().text()).toBe('RESET');
    });

    test('renders formattedMessage projectYear', () => {
      const updatedWrapper = wrapper
        .find('.titleText > FormattedMessage')
        .first();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe(
        'components.SearchBar.filter.projectYear',
      );
    });

    test('renders projectStatus Text', () => {
      const updatedWrapper = wrapper
        .find('.titleText > FormattedMessage')
        .last();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe(
        'components.SearchBar.filter.projectStatus.projectStatusText',
      );
    });

    test('renders close text', () => {
      const updatedWrapper = wrapper.find('FormattedMessage').last();
      expect(updatedWrapper).toHaveLength(1);
      expect(updatedWrapper.prop('id')).toBe('components.SearchBar.close');
      expect(updatedWrapper.shallowWithIntl().hasClass('close')).toBe(true);
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
          selectedYear={[1]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={spy}
          onYearKeyPress={noop}
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
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={spy}
        />,
      );
      li = wrapper
        .find('.projectList')
        .find('li')
        .first();
    });
    test('a right arrow key or left arrow key will call its keyPress prop called yearSelect', () => {
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
          selectedYear={[]}
          display
          changeProjectStatus={spy}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
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
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={spy}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
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
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={spy}
          yearSelect={noop}
          onYearKeyPress={noop}
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
          selectedYear={[0]}
          display
          changeProjectStatus={spy}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
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
          selectedYear={[0, 1, 2]}
          display
          changeProjectStatus={spy}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
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
    test('on Drag start will call yearSelect prop', () => {
      const spy = jest.fn();
      const wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={noop}
          reset={noop}
          closeTab={noop}
          yearSelect={spy}
          onYearKeyPress={noop}
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

  describe('on Drag move', () => {
    let wrapper;
    let spy;
    let li;
    beforeEach(() => {
      spy = jest.fn();
      wrapper = shallow(
        <FilterContent
          yearRange={yearRange}
          projectStatus={projectStatus}
          selectedYear={[]}
          display
          changeProjectStatus={noop}
          onDragMove={spy}
          reset={noop}
          closeTab={noop}
          yearSelect={noop}
          onYearKeyPress={noop}
        />,
      );
      li = wrapper
        .find('.projectList')
        .find('li')
        .first();
    });
    test('on Drag move, will call its onDragMove prop', () => {
      li.simulate('mouseDown', eventFuncs);
      li.simulate('mouseMove', { eventFuncs, clientX: 10, clientY: 10 });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    test('onDrag Stop, onDragMove should not call its onDragMove prop', () => {
      li.simulate('mouseDown', eventFuncs);
      li.simulate('mouseMove', { eventFuncs, clientX: 10, clientY: 10 });
      li.simulate('mouseUp', eventFuncs);
      li.simulate('mouseMove', { eventFuncs, clientX: 20, clientY: 20 });
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
