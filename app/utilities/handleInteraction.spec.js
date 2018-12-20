import sinon from 'sinon';
import { expect } from 'chai';
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

    it('should return an object', () => {
      expect(result).to.be.an('object');
    });

    it('should add a tabIndex', () => {
      expect(result.tabIndex).to.equal(0);
    });

    it('should add focusable', () => {
      expect(result.focusable).to.equal(true);
    });

    it('should add an onClick handler', () => {
      result.onClick(eventFuncs);
      expect(spy.calledOnce).to.equal(true);
      expect(spy.calledWith('a', 'b')).to.equal(true);
    });

    it('should add an onKeyPress handler', () => {
      result.onKeyPress({ key: 'Enter', ...eventFuncs });
      expect(spy.calledOnce).to.equal(true);
      expect(spy.calledWith('a', 'b')).to.equal(true);
    });

    it('should only let onKeyPress respond to enter', () => {
      result.onKeyPress({ key: ' ', ...eventFuncs });
      expect(spy.called).to.equal(false);
    });
  });

  it('should return an empty object when no callback is provided', () => {
    spy = sinon.spy();
    result = handleInteraction();
    expect(result).to.deep.equal({});
  });

  describe('memoization', () => {
    it('should work with no bound args', () => {
      const func = () => {};
      const firstResult = handleInteraction(func);
      expect(firstResult).to.equal(handleInteraction(func));
      expect(firstResult).to.not.equal(handleInteraction(() => {}));
      expect(firstResult).to.equal(handleInteraction(func));
    });

    it('should work with bound string args', () => {
      const func = () => {};
      const args = ['a', 'b', 'c'];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).to.equal(handleInteraction(func, ...args));
      expect(firstResult).to.not.equal(handleInteraction(func, 'a', 'b', 'a'));
      expect(firstResult).to.equal(handleInteraction(func, ...args));
    });

    it('should work with bound bool args', () => {
      const func = () => {};
      const args = [true, false];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).to.equal(handleInteraction(func, ...args));
      expect(firstResult).to.not.equal(handleInteraction(func, true, true));
      expect(firstResult).to.equal(handleInteraction(func, ...args));
    });

    it('should work with bound number args', () => {
      const func = () => {};
      const args = [1, 2.5, -3];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).to.equal(handleInteraction(func, ...args));
      expect(firstResult).to.not.equal(handleInteraction(func, 1, 2, -3));
      expect(firstResult).to.not.equal(handleInteraction(func, 1, 2.5, 3));
      expect(firstResult).to.equal(handleInteraction(func, ...args));
    });

    it('should work with bound function args', () => {
      const func = () => {};
      const args = [func, () => {}];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).to.equal(handleInteraction(func, ...args));
      expect(firstResult).to.not.equal(handleInteraction(func, ...args.slice().reverse()));
      expect(firstResult).to.equal(handleInteraction(func, ...args));
    });

    it('should work with bound array args', () => {
      const func = () => {};
      const args = [[], []];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).to.equal(handleInteraction(func, ...args));
      expect(firstResult).to.not.equal(handleInteraction(func, ...args.slice().reverse()));
      expect(firstResult).to.equal(handleInteraction(func, ...args));
    });

    it('should work with bound object args', () => {
      const func = () => {};
      const args = [{}, {}];
      const firstResult = handleInteraction(func, ...args);
      expect(firstResult).to.equal(handleInteraction(func, ...args));
      expect(firstResult).to.not.equal(handleInteraction(func, ...args.slice().reverse()));
      expect(firstResult).to.equal(handleInteraction(func, ...args));
    });
  });
});
