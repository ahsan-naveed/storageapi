// TODO: add sign out

import React, { Component } from 'react';
import { Storage } from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import './Application.css';

Storage.configure({
  level: 'private',
});

class S3Image extends Component {
  state = { src: null }
  
  async componentDidMount() {
    const { s3Key } = this.props;
    const src = await Storage.get(s3Key, { expires: 10 });
    this.setState(() => ({ src }));
  }
  
  render() {
    const { src } = this.state;
    if(!src) return null; 
    
    const { alt } = this.props;
    return (
      <article>
        <img src={src} alt={alt} />
      </article>
    );
  }
}

class Application extends Component {
  state = {
    files: []
  };

  async componentDidMount() {
    // list all contents of bucket
    const files = await Storage.list('');

    this.setState(() => ({ files }));
  }

  handleSubmit = event => {
    event.preventDefault();

    const file = this.fileInput.files[0];
    const { name } = file;

    Storage.put(name, file).then((response) => {
      this.setState(() => ({files: [...this.state.files, response] }));
    }).catch(console.error);
  };

  render() {
    return (
      <div className="Application">
        <form className="NewItem" onSubmit={this.handleSubmit}>
          <input
            type="file"
            ref={input => this.fileInput = input}
          />
          <input className="full-width" type="submit" />
        </form>
        <section className="Application-images">
          {this.state.files.map(file => {
            return (
              <S3Image
                s3Key={file.key}
                key={file.key}
                alt={`graphic-${file.key}`}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default withAuthenticator(Application);
