import React from 'react';
import { ShallowWrapper, shallow, mount } from 'enzyme';
import { expect } from 'chai';
import { IntlProvider, intlShape } from 'react-intl';
import i18nMessages from '../i18n';

const intlProvider = new IntlProvider({ locale: 'en', messages: i18nMessages.en }, {});
const { intl } = intlProvider.getChildContext();
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

export const monkeyPatchShallowWithIntl = () => {
  ShallowWrapper.prototype.shallowWithIntl = function shallowWithIntl() {
    return this.shallow({ context: { intl } });
  };
};

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
      const rendered = getRendered();
      // Ensure the component name is still a class
      expect(rendered.hasClass(component.name)).to.equal(true);
      // Check that the new class was added
      expect(rendered.hasClass('testClass')).to.equal(true);
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

export const shallowWithIntl = (node, { context, ...opts } = {}) => shallow(
  nodeWithIntlProp(node),
  {
    context: { ...context, intl },
    ...opts,
  },
).shallow();

export const mountWithIntl = (node, { context, childContextTypes, ...opts } = {}) => mount(
  nodeWithIntlProp(node),
  {
    context: { ...context, intl },
    childContextTypes: { intl: intlShape, ...childContextTypes },
    ...opts,
  },
).childAt(0);
