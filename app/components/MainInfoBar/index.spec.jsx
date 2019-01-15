import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import MainInfoBar from '.';

describe('Components|MainInfoBar', () => {
  describe('with default props', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<MainInfoBar
        onChange={() => {}}
        textBox=""
        handleOnClick={() => {}}
      />);
    });

    it('should render', () => {
      expect(wrapper.type()).to.equal('div');
    });

    it('should have a className', () => {
      expect(wrapper.is('.MainInfoBar')).to.equal((true));
    });

    it('should show four share icons ', () => {
      expect(wrapper.find('ShareIcon')).to.have.lengthOf(4);
    });

    it('should show a horizontal line', () => {
      expect(wrapper.find('hr')).to.have.lengthOf(1);
    });

    it('should show three text links', () => {
      expect(wrapper.find('button')).to.have.lengthOf(3);
    });

    it('should show five share icons', () => {
      wrapper = shallow(<MainInfoBar onChange={() => {}} textBox="test" />);
      expect(wrapper.find('ShareIcon')).to.have.lengthOf(5);
    });

    it('should show the About TextBox when textBox props is About', () => {
      wrapper = shallow(<MainInfoBar textBox="About" />);
      expect(wrapper.props().textBox).to.equal('About');
    });

    it('should show the Methodology TextBox when textBox props is Methodology', () => {
      wrapper = shallow(<MainInfoBar textBox="Methodology" />);
      expect(wrapper.props().textBox).to.equal('Methodology');
    });

    it('should show the Downloads TextBox when textBox props is Downloads', () => {
      wrapper = shallow(<MainInfoBar textBox="Downloads" />);
      expect(wrapper.props().textBox).to.equal('Downloads');
    });
  });
});
