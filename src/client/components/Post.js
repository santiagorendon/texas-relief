import React from 'react';

class Post extends React.Component{
  constructor() {
    super();
    this.state = {
    }
  }
  render() {
    return (
      <div key="1" className="card mb-2">
          <div className="card-body p-2 p-sm-3">
              <div className="media forum-item">
                  <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                  <div className="media-body">
                      <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">{this.props.title}</a></h6>
                      <p className="text-secondary">
                          {this.props.text}
                      </p>
                      <p className="text-muted"><a href="javascript:void(0)">drewdan</a> replied <span className="text-secondary font-weight-bold">1 minute ago</span></p>
                  </div>
                  <div className="text-muted small text-center align-self-center">
                      <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 19</span>
                      <span><i className="far fa-comment ml-2"></i> 3</span>
                  </div>
              </div>
          </div>
      </div>
    )
  }
}

export default Post;
