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
});
