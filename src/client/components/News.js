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
        tags: [["Relief", true], ["Disaster", false], ["Outage", false], ["Blizzard", false], ["Donation", false]]
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
    let subscriptionKey = '8d6cbfdda76342e0afe828481020bd84';
    let host = 'api.bing.microsoft.com';
    let path = '/v7.0/news/search';
    console.log("texas && " + this.state.tags.filter(tag => tag[1] == true).map(tag => tag[0].toLocaleLowerCase()).join(" || "));
    let searchTerm = "texas+" + this.state.tags.filter(tag => tag[1] == true).map(tag => tag[0].toLocaleLowerCase()).join("+")
    return new Promise((resolve, reject) => {
      https.get({
        hostname: host,
        path:     path + `?q=${encodeURIComponent(searchTerm)}`,
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
            console.log(JSON.parse(res).value[0])
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
