import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { expect } from 'chai';

export const shouldBehaveLikeAComponent = (wrapper, component, className) => {
  const expectHasClass = (name) => {
    // Using mount and shallow requires different ways to check the class of the component
    if (wrapper instanceof ShallowWrapper) {
      expect(wrapper.hasClass(name)).to.equal(true);
    } else if (wrapper instanceof ReactWrapper) {
      expect(wrapper.find(component).childAt(0).hasClass(name)).to.equal(true);
    }
  };

  it('should render with the component and provided classes', () => {
    expectHasClass(component.name);

    if (className) {
      expectHasClass(className);
    }
  });
};

export const shouldHaveInteractionProps = (wrapper) => {
  const props = wrapper.props();
  expect(props.onClick).to.be.a('function');
  expect(props.onKeyPress).to.be.a('function');
  expect(props.tabIndex).to.equal(0);
  expect(props.focusable).to.equal(true);
};
