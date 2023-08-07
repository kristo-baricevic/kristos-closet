import React, { Component } from 'react';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageUrl: null,
      selectedCategory: '',
    };
  }

  handleFileUpload = (event) => {
    const file = event.target.files[0];
    this.setState({ imageUrl: URL.createObjectURL(file) });
  }

  classifyImage = (event) => {
    event.preventDefault();

    // Check if the user is authenticated and show an alert if they are not
    if (!this.props.isAuthenticated) {
      alert('You need to be logged in to upload an image.');
      return;
    }

    const file = document.getElementById('imageFile').files[0];
    const formData = new FormData();
    formData.append('imageFile', file);
    formData.append('category', this.state.selectedCategory);
    formData.append('userId', this.props.user.id);

    // Get the JWT token from local storage
    const token = localStorage.getItem('token');
    console.log(token);

    fetch('/backend/Upload', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response from the backend
      this.setState({ imageUrl: null });
      this.props.onImageUploaded();
      console.log(data);
    })
    .catch(error => {
      // Handle the error
      console.log(error);
    });
  }

  render() {
    return (
      <div>
        <h2 className="upload-title">Upload Your Article of Clothing</h2>
        <div className="upload-container">
          <form id="imageForm" onSubmit={this.classifyImage}>
            <label htmlFor="category">Category:</label>
            <select id="category" value={this.state.selectedCategory} onChange={(e) => this.setState({ selectedCategory: e.target.value })} required>
              <option value="Top">Top</option>
              <option value="Bottom">Bottom</option>
              <option value="onePiece">One-piece</option>
              <option value="Shoes">Shoes</option>
              <option value="Hat">Hat</option>
              <option value="Accessory">Accessory</option>
            </select>
            <label className="choose-file">
              <input type="file" id="imageFile" accept=".jpg,.jpeg,.png,.gif" required onChange={this.handleFileUpload} />
              Choose File
            </label>
            <button className="classify-button" id="classifyButton" type="submit">Upload Image</button>
          </form>
        </div>

        <p id="resultLabel"></p>

        <div id="imageContainer">
          {this.state.imageUrl && <img id="uploadedImage" alt="Uploaded Image" src={this.state.imageUrl} />}
        </div>
      </div>
    );
  }
}

export default ImageUploader;
