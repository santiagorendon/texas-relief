import React from 'react';
import '../App.css';
import "../styles/news.css"
const https = require('https')
import NewsArticle from '../components/NewsArticle'
import NavBar from './NavBar';


class News extends React.Component{
  constructor() {
    super();
    this.state = {
        articles: []
    }
    this.articles = []
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  navHighlight() {
    let navItems = Array.from(document.getElementsByClassName("nav-link"));
    navItems.forEach((item, i) => {
      navItems[i].classList.remove("active")
    });
    navItems[1].classList.add("active")
  }

  componentDidMount() {
    this.navHighlight();
      this.getNews()
        .then(res => {
            this.setState({ articles: JSON.parse(res).value })
            console.log(JSON.parse(res).value[0])
        })
        .catch(e => {
            console.log(e)
        })
  }

   getNews() {
    let subscriptionKey = '8d6cbfdda76342e0afe828481020bd84';
    let host = 'api.bing.microsoft.com';
    let path = '/v7.0/news/search';
    let searchTerm = "texas AND (disaster OR outage)";
    let count = 30;
    return new Promise((resolve, reject) => {
      https.get({
        hostname: host,
        path:     path + `?q=${encodeURIComponent(searchTerm)}&count=${count}`,
        headers:  { 'Ocp-Apim-Subscription-Key': subscriptionKey },
      }, res => {
        let body = ''
        res.on('data', part => body += part)
        res.on('end', () => {
          resolve(body)
        })
        res.on('error', e => {
          console.log('Error: ' + e.message)
          reject(e.message)
        })
      })
    })
}

  render() {
    if (this.state.articles.length > 0) {
        return (
          <div>
            <NavBar />
            <div className="container" style = {{display: 'block'}}>
                <div className="row"> 
                    {this.state.articles.map((value, index) => {
                        return (
                            <div className="col-md-4">
                                <NewsArticle article = {value}/>
                            </div>
                        )
                    })}
                </div>
            </div>
          </div>
          )
    } else {
        return (
          <div>
            <NavBar />
            <div className="container">
              <h1>Please wait...</h1>
            </div>
            </div>
        )
    }
  }
}

export default News;
