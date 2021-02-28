import React from 'react';
import '../App.css';
const https = require('https')



class NewsArticle extends React.Component{
  constructor() {
    super();
  }

  render() {
    return (
      <a href={this.props.article.url} className="card-link" target="_blank">
          <div className="card text-center shadow-sm p-3 mb-5">
              <img className="card-img-top" src={this.props.article.image.thumbnail.contentUrl} alt="Card image cap"></img>
              <div className="card-body">
                  <h5 className="card-title max-lines">{this.props.article.name}</h5>
              </div>
          </div>
        </a>
    )
  }
}

export default NewsArticle;
