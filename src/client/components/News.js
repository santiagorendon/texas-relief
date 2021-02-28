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
        articles: [],
        tags: [["Relief", false], ["Disaster", false], ["Outage", false], ["Blizzard", false], ["Donation", false], ["Funds", false], ["Electricity", false], ["Politics", false]]
    }
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
      this.getNews(this.state.tags)
        .then(res => {
            this.setState({ articles: JSON.parse(res).value })
            console.log(JSON.parse(res).value[0])
        })
        .catch(e => {
            console.log(e)
        })
  }

   getNews(tags) {
    console.log("getting news")
    let subscriptionKey = '2fc3dc1d8fef45d59bd16eb0dbb9bfb1';
    let host = 'api.bing.microsoft.com';
    let path = '/v7.0/news/search';
    let searchTerms = "texas";
    let count = 40;
    if (this.state.tags.map(tag => tag[1]).some(tag => tag == true)) {
      searchTerms += "+"
    }
    searchTerms += this.state.tags.filter(tag => tag[1] == true).map(tag => tag[0].toLocaleLowerCase()).join("+")
    console.log(searchTerms)
    return new Promise((resolve, reject) => {
      https.get({
        hostname: host,
        path:     path + `?q=${encodeURIComponent(searchTerms)}&originalImg=true&count=${count}`,
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

selectTag(index) {
  var newTags = this.state.tags.slice()
  newTags[index][1] = !newTags[index][1]
  this.setState({
    tags: newTags
  })
  this.getNews(this.state.tags)
        .then(res => {
            this.setState({ articles: JSON.parse(res).value })
            console.log(JSON.parse(res).value)
        })
        .catch(e => {
            console.log(e)
    })

}

  render() {
    if (this.state.articles.length > 0) {
        return (
          <div>
            <NavBar />
            <div className="container" style = {{display: 'block'}}>
              <div className="row container">
                {this.state.tags.map((value, index) => {
                  if (!value[1]) {
                    return (
                      <button type="button" class="btn btn-outline-secondary news-tag" onClick={() => this.selectTag(index)}>{value[0]}</button>
                  )
                  } else {
                    
                    return (
                      <button type="button" class="btn btn-outline-secondary news-tag" onClick={() => this.selectTag(index)} style= {{backgroundColor:"#6C757D", color: 'white'}}>{value[0]}</button>
                    )
                  }
                })}
              </div>
                <div className="row"> 
                    {this.state.articles.map((value, index) => {
                      if (value != null) {
                        return (
                            <div className="col-md-4">
                                <NewsArticle article = {value}/>
                            </div>
                        )
                      }
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
