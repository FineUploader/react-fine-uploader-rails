import React, { Component } from 'react';
import FineUploaderTraditional from 'react-fine-uploader';
import Gallery from 'react-fine-uploader/components/gallery';

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true,
            success: {
              endpoint: "/uploads_finish"
            }
        },
        deleteFile: {
            enabled: true,
            endpoint: '/delete_uploads',
            method: 'POST'
        },
        request: {
            endpoint: '/uploads'
        },
        retry: {
            enableAuto: true
        }
    }
})

class PhotosWrapper extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      photos: this.props.photos
    }
  }
  componentDidMount(){
    const auth_token = $('meta[name="csrf-token"]').attr('content');
    uploader.on('onUpload', (id, name) => {
      console.log('onUpload')
      let params = {
        authenticity_token: auth_token
        // additional params...
      }
      uploader.methods.setParams(params, id)
    })

    uploader.on('onSubmitDelete', (id) => {
      console.log('onSubmitDelete')
      let params = {
        authenticity_token: auth_token
      }
      uploader.methods.setDeleteFileParams(params, id)
    })
  }

  render() {
    const photos = this.state.photos.map((photo) =>
      <div className="card" key={photo.id}>
        <img src={photo.image.thumb.url} className="image-responsive"></img>
        <p className="card-text">{photo.name}</p>
      </div>
    );
    return(
      <div>
        <div className="blog-masthead">
          <div className="container">
            <nav className="nav blog-nav">
              <a className="nav-link active" href="#">{this.props.brand_name}</a>
            </nav>
          </div>
        </div>
        <section className="jumbotron text-xs-center">
          <div className="container">
            <h1 className="jumbotron-heading">Photos Example App</h1>
            <p className="lead text-muted">This is example app integrated ReactFineUploader with Ruby on Rails</p>
            <Gallery uploader={ uploader } />
          </div>
        </section>
        <div className="album text-muted">
          <div className="container">
            <div className="row">
              {photos}
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default PhotosWrapper;
