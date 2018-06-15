import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

import UserFormComponent from './UserFormComponent';

describe('<UserFormComponent />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<UserFormComponent />);
  });

  it('should have a `<form>` element', () => {
    expect(
      wrapper.find('form').length
    ).toBe(1);
  });

  it('renders a name input', () => {
    expect(wrapper.find('[name="name"]').length).toEqual(1)
  });

  it('renders a email input', () => {
    expect(wrapper.find('[name="email"]').length).toEqual(1)
  });

  it('renders a message input', () => {
    expect(wrapper.find('[name="message"]').length).toEqual(1)
  });

  describe('<form />', () => {

    describe('< Name input />', () => {
      it('should respond to change event and change the state of the name', () => {
        wrapper.find('[name="name"]').simulate('change', {
          target: {name: 'name', value: 'test'}
        });
        expect(wrapper.state('name')).toEqual('test');
      }); 
    });

    describe('< Email input />', () => {
      it('should respond to change event and change the state of the email', () => {
        wrapper.find('[name="email"]').simulate('change', {
          target: {name: 'email', value: 'test@gmail.com'}
        });
        expect(wrapper.state('email')).toEqual('test@gmail.com');
      }); 
    });

    describe('<form submit />', () => {

      it('should update in progress as true when submit is clicked',() => {
        wrapper.find('[name="name"]').simulate('change', {
          target: {name: 'name', value: 'test'}
        });
        wrapper.find('[name="email"]').simulate('change', {
          target: {name: 'email', value: 'test@gmail.com'}
        });
        wrapper.find('[name="message"]').simulate('change', {
          target: {name: 'message', value: 'Test message'}
        });
        wrapper.find('form').simulate('submit',{
          preventDefault: () => {},
          target: {checkValidity: () => true},
        });
        expect(wrapper.state('isUpdateInProgress')).toEqual(true);
      })

      it('should have the form email value when submit clicked',() => {
        wrapper.find('[name="email"]').simulate('change', {
          target: {name: 'email', value: 'test@gmail.com'}
        });
        wrapper.find('form').simulate('submit',{
          preventDefault: () => {},
          target: {checkValidity: () => true},
        });
        expect(wrapper.state('email')).toEqual('test@gmail.com');
      })

      it('should update update in progress false after 3seconds',(done) => {
        wrapper.find('[name="name"]').simulate('change', {
          target: {name: 'name', value: 'test'}
        });
        wrapper.find('[name="email"]').simulate('change', {
          target: {name: 'email', value: 'test@gmail.com'}
        });
        wrapper.find('[name="message"]').simulate('change', {
          target: {name: 'message', value: 'Test message'}
        });
        wrapper.find('form').simulate('submit',{
          preventDefault: () => {},
          target: {checkValidity: () => true},
        });
        setTimeout(() => {
          expect(wrapper.state('isUpdateInProgress')).toEqual(false);
          done();
        }, 3000);
      })
    });
  });
});
