import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { expect } from 'chai';

const shouldBehaveLikeAComponent = (test, component, className) => {
  const expectHasClass = (name) => {
    // Using mount and shallow requires different ways to check the class of the component
    if (test.wrapper instanceof ShallowWrapper) {
      // eslint-disable-next-line no-unused-expressions
      expect(test.wrapper.hasClass(name)).to.be.true;
    } else if (test.wrapper instanceof ReactWrapper) {
      // eslint-disable-next-line no-unused-expressions
      expect(test.wrapper.find(component).childAt(0).hasClass(name)).to.be.true;
    }
  };

  it('should render with the component and provided classes', () => {
    expectHasClass(component.name);

    if (className) {
      expectHasClass(className);
    }
  });
};

export default {
  shouldBehaveLikeAComponent,
};
