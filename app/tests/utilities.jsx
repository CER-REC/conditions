import { ShallowWrapper } from 'enzyme';
import { expect } from 'chai';

export const shouldBehaveLikeAComponent = (component, callback) => {
  it('should render with the component name as a class', () => {
    const wrapper = callback();

    const getRendered = () => {
      if (wrapper instanceof ShallowWrapper) { return wrapper; }
      return wrapper.find(component).childAt(0);
    };

    expect(getRendered().hasClass(component.name)).to.equal(true);
    // Disabling this rule is safe because prop-types are only stripped in prod
    // eslint-disable-next-line react/forbid-foreign-prop-types
    if (component.propTypes.className) {
      wrapper.setProps({ className: 'testClass' });
      expect(getRendered().hasClass('testClass')).to.equal(true);
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
