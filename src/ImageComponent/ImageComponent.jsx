import React from 'react';

import './ImageComponent.css';

export default class ImageComponent extends React.Component {
  constructor(props){
    super(props)
    this.state= {
      imageUrl: null,
      fileValue: ''
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange(event){
    const reader = new FileReader()
    const imageFile = event.target.files[0]
    reader.onload = () => {
      const dataURL = reader.result
      this.setState({fileValue: ''})
      this.props.isImageAdded(dataURL)
    };
    reader.readAsDataURL(imageFile)
  }

  render(){
    return (
      <div className="image-section">
        <div className="upload-btn-wrapper userForm--field">
          <button className={this.props.showError ? "btn error" : "btn"}>Upload a file</button>
          <input type="file" name="myfile" value={this.state.fileValue} onChange={this.handleOnChange} />
        </div>
        <img src={this.props.imageUrl} id="imagePreview" />
      </div>
    )
  }
}