import sinon from 'sinon';
import handleInteraction from './handleInteraction';

const eventFuncs = {
  preventDefault: () => {},
  stopPropagation: () => {},
};

describe('utilities/handleInteraction', () => {
  let spy;
  let result;

  describe('with a callback', () => {
    beforeEach(() => {
      spy = sinon.spy();
      result = handleInteraction(spy, 'a', 'b');
    });

    test('should return an object', () => {
      expect(typeof result).toBe('object');
    });

    test('should add a tabIndex', () => {
      expect(result.tabIndex).toBe(0);
    });

    test('should add focusable', () => {
      expect(result.focusable).toBe(true);
    });

    test('should add an onClick handler', () => {
      result.onClick(eventFuncs);
      expect(spy.calledOnce).toBe(true);
      expect(spy.calledWith('a', 'b')).toBe(true);
    });

    test('should add an onKeyPress handler', () => {
      result.onKeyPress({ key: 'Enter', ...eventFuncs });
      expect(spy.calledOnce).toBe(true);
      expect(spy.calledWith('a', 'b')).toBe(true);
    });

    test('should only let onKeyPress respond to enter', () => {
      result.onKeyPress({ key: ' ', ...eventFuncs });
      expect(spy.called).toBe(false);
    });
  });

  test('should return an empty object when no callback is provided', () => {
    spy = sinon.spy();
    result = handleInteraction();
    expect(result).toEqual({});
  });

  describe('memoization', () => {
    test('should work with no bound args', () => {
      const func = () => {};
      const firstResult = handleInteraction(func);
      expect(firstResult).toBe(handleInteraction(func));
      expect(firstResult).not.toBe(handleInteraction(() => {}));
      expect(firstResult).toBe(handleInteraction(func));
    });

    test('should work with bound string args', () => {
      const func = () => {};
      const args = ['a', 'b', 'c'];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).toBe(handleInteraction(func, ...args));
      expect(firstResult).not.toBe(handleInteraction(func, 'a', 'b', 'a'));
      expect(firstResult).toBe(handleInteraction(func, ...args));
    });

    test('should work with bound bool args', () => {
      const func = () => {};
      const args = [true, false];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).toBe(handleInteraction(func, ...args));
      expect(firstResult).not.toBe(handleInteraction(func, true, true));
      expect(firstResult).toBe(handleInteraction(func, ...args));
    });

    test('should work with bound number args', () => {
      const func = () => {};
      const args = [1, 2.5, -3];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).toBe(handleInteraction(func, ...args));
      expect(firstResult).not.toBe(handleInteraction(func, 1, 2, -3));
      expect(firstResult).not.toBe(handleInteraction(func, 1, 2.5, 3));
      expect(firstResult).toBe(handleInteraction(func, ...args));
    });

    test('should work with bound function args', () => {
      const func = () => {};
      const args = [func, () => {}];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).toBe(handleInteraction(func, ...args));
      expect(firstResult).not.toBe(handleInteraction(func, ...args.slice().reverse()));
      expect(firstResult).toBe(handleInteraction(func, ...args));
    });

    test('should work with bound array args', () => {
      const func = () => {};
      const args = [[], []];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).toBe(handleInteraction(func, ...args));
      expect(firstResult).not.toBe(handleInteraction(func, ...args.slice().reverse()));
      expect(firstResult).toBe(handleInteraction(func, ...args));
    });

    test('should work with bound object args', () => {
      const func = () => {};
      const args = [{}, {}];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).toBe(handleInteraction(func, ...args));
      expect(firstResult).not.toBe(handleInteraction(func, ...args.slice().reverse()));
      expect(firstResult).toBe(handleInteraction(func, ...args));
    });
  });
});
