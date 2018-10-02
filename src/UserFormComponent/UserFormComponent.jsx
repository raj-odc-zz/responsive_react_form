import React from 'react';

import LoaderComponent from './../LoaderComponent/LoaderComponent'
import ImageComponent from './../ImageComponent/ImageComponent'

import './UserFormComponent.css';

class UserFormComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isUpdateInProgress: false,
      displayErrors: false,
      name: '',
      email: '',
      message: '',
      image: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageAdded = this.handleImageAdded.bind(this)
  }

  handleChange(e) {
    this.setState({
        [e.target.name]: e.target.value
    })
  }

  handleImageAdded(value) {
    this.setState({
      image : value
    })
  }

  handleSubmit(e){
    const {isUpdateInProgress, image} = this.state;
    e.preventDefault()
    if (!e.target.checkValidity() || !image) {
    	this.setState({
        invalid: true,
        displayErrors: true
      });
      return;
    }
    this.setState({isUpdateInProgress: true})
    // Todo:  post API code will place here
    setTimeout(() => {
      this.setState({
        name: '',
        email: '',
        message: '',
        displayErrors: false,
        isUpdateInProgress: false,
        image: '',
      })
    }, 3000)
    return false
  }

  render() {
    const { displayErrors, image } = this.state
    return (
      <div className="userForm">
        <form 
          onSubmit={ this.handleSubmit} 
          noValidate
          className={displayErrors ? 'displayErrors' : ''}
        >
          <div className="userForm--field">
            <label>Name</label>
            <input
              type="text" 
              name="name" 
              placeholder="Enter your name here"
              required
              value= {this.state.name}
              onChange={ this.handleChange }
            />
          </div>
          <div className="userForm--field">
            <label>Email</label>
            <input 
              type="email" 
              name="email"
              required
              placeholder="Enter your email here"
              value= {this.state.email}
              onChange={ this.handleChange }
            />
          </div>
          <div className="userForm--field">
            <label>Message</label>
            <textarea 
              rows="6" 
              name="message" 
              placeholder="Enter your message here"
              required
              value= {this.state.message}
              onChange={ this.handleChange }
            />
          </div>
          <ImageComponent isImageAdded={this.handleImageAdded} imageUrl={image} showError={ displayErrors && !image } />
          <div className="userForm--field">
            <button type="submit">Submit</button>
          </div>
        </form>
        { this.state.isUpdateInProgress && <LoaderComponent/> }
      </div>
    );
  }
}

export default UserFormComponent;