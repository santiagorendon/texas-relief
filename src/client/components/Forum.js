import React from 'react';
import NavBar from './NavBar';
import Post from './Post';
import '../styles/forum.css';

class Forum extends React.Component{
  constructor() {
    super();
    this.state = {
      posts: []
    }
    this.componentDidMount = this.componentDidMount.bind(this);
      this.createPost = this.createPost.bind(this);
  }

  navHighlight() {
    let navItems = Array.from(document.getElementsByClassName("nav-link"));
    navItems.forEach((item, i) => {
      navItems[i].classList.remove("active")
    });
    navItems[2].classList.add("active")
  }

  displayModal() {
    const modal = document.getElementById("post-modal");
    modal.style.display = "block";
  }

  closeModal() {
    const modal = document.getElementById("post-modal");
    modal.style.display = "none";
  }

  fetchPosts() {
    let tmpArray = [];

    fetch('/api/get-posts')
    .then((response) =>{
      return response.json();
    })
    .then((data) =>{
      data.forEach((item, i) => {
        tmpArray.push(<Post title = {item.postTitle} text = {item.postContent}/>)
      });
      return tmpArray;
    })
    .then((res) =>{
      this.setState({
        posts: res
      })
    })

  }

  createPost() {
    let title = document.getElementById("postTitle").value;
    let text = document.getElementById("postTextArea").value;
    fetch('/api/create-post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `title=${title}&content=${text}`
    })
    .then(function(response) {
      return response.json();
    });

    this.setState({
      posts: [...this.state.posts, <Post title = {title} text = {text}/>]
    })

    this.closeModal();
  }

  showPosts() {
    document.getElementById("comments").classList.remove("show");
    document.getElementById("posts").classList.add("show");
  }

  showComments() {
    document.getElementById("comments").classList.add("show");
    document.getElementById("posts").classList.remove("show");
  }

  componentDidMount() {
    document.getElementById("submitPost").addEventListener("click", this.createPost);
    document.getElementById("newDiscussionBtn").addEventListener("click", this.displayModal);
    document.getElementById("minimize").addEventListener("click", this.closeModal);
    document.getElementById("cancel").addEventListener("click", this.closeModal);

    this.fetchPosts();

    let posts = Array.from(document.querySelectorAll('[data-toggle="collapse"]'));
    posts.forEach((item, i) => {
      posts[i].addEventListener('click', this.showComments)
    });

    document.getElementById("backBtnComments").addEventListener("click", this.showPosts);


    this.navHighlight();
  }

  render() {
    return (
      <div>

      <NavBar />

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0-2/css/all.min.css" integrity="sha256-46r060N2LrChLLb5zowXQ72/iKKNiw/lAmygmHExk/o=" crossOrigin="anonymous" />
<div className="container">
<div className="main-body p-0">
    <div className="inner-wrapper">
        <div className="inner-sidebar">
            <div className="inner-sidebar-header justify-content-center">
                <button id="newDiscussionBtn" className="btn btn-primary has-icon btn-block" type="button" data-toggle="modal">

                    NEW DISCUSSION
                </button>
            </div>



            <div className="inner-sidebar-body p-0">
                <div className="p-3 h-100" data-simplebar="init">
                    <div className="simplebar-wrapper" style={{margin: "-16px"}}>
                        <div className="simplebar-height-auto-observer-wrapper"><div className="simplebar-height-auto-observer"></div></div>
                        <div className="simplebar-mask">
                            <div className="simplebar-offset" style={{right: "0px", bottom: "0px"}}>
                                <div className="simplebar-content-wrapper" style={{height: "100%", overflow: "hidden scroll"}}>
                                    <div className="simplebar-content" style={{padding: "16px"}}>
                                        <nav className="nav nav-pills nav-gap-y-1 flex-column">
                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon active">All Threads</a>
                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Popular this week</a>
                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Popular all time</a>
                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Solved</a>
                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">Unsolved</a>
                                            <a href="javascript:void(0)" className="nav-link nav-link-faded has-icon">No replies yet</a>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="simplebar-placeholder" style={{width: "234px", height: "292px"}}></div>
                    </div>
                    <div className="simplebar-track simplebar-horizontal" style={{visibility: "hidden"}}><div className="simplebar-scrollbar" style={{width: "0px", display: "none"}}></div></div>
                    <div className="simplebar-track simplebar-vertical" style={{visibility: "visible"}}><div className="simplebar-scrollbar" style={{height: "151px", display: "block", transform: "translate3d(0px, 0px, 0px)"}}></div></div>
                </div>
            </div>

        </div>



        <div className="inner-main">

            <div className="inner-main-header">
                <a className="nav-link nav-icon rounded-circle nav-link-faded mr-3 d-md-none" href="#" data-toggle="inner-sidebar"><i className="material-icons">arrow_forward_ios</i></a>
                <select className="custom-select custom-select-sm w-auto mr-1">
                    <option value="">Latest</option>
                    <option value="1">Popular</option>
                    <option value="3">Solved</option>
                    <option value="3">Unsolved</option>
                    <option value="3">No Replies Yet</option>
                </select>
                <span className="input-icon input-icon-sm ml-auto w-auto">
                    <input type="text" className="form-control form-control-sm bg-gray-200 border-gray-200 shadow-none mb-4 mt-4" placeholder="Search forum" />
                </span>
            </div>

            <div id="posts" className="inner-main-body p-2 p-sm-3 collapse forum-content show">
                {this.state.posts}
                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">Relief Areas</a></h6>
                                <p className="text-secondary">
                                    Anyone know what areas are in most need? Where should we focus relief efforts? Thanks.
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">drewdan</a> replied <span className="text-secondary font-weight-bold">13 minutes ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 19</span>
                                <span><i className="far fa-comment ml-2"></i> 3</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">Stories</a></h6>
                                <p className="text-secondary">
                                    Anyone have any stories they want to share with us, Its imporant to spread information on how in need Texans are doing.
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">jlrdw</a> replied <span className="text-secondary font-weight-bold">3 hours ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 18</span>
                                <span><i className="far fa-comment ml-2"></i> 1</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar3.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">Power Restoration</a></h6>
                                <p className="text-secondary">
                                  How long have your neighborhoods taken to restore power? Anyone have any ideas how we can speed up the recovery time?
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">ciungulete</a> replied <span className="text-secondary font-weight-bold">7 hours ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 32</span>
                                <span><i className="far fa-comment ml-2"></i> 2</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar4.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">Links</a></h6>
                                <p className="text-secondary">
                                    Can anyone share helpful resources on guides for surviving through the power outages?
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">bugsysha</a> replied <span className="text-secondary font-weight-bold">11 hours ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 49</span>
                                <span><i className="far fa-comment ml-2"></i> 9</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar5.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">San Antonio</a></h6>
                                <p className="text-secondary">
                                    Did anyone else's power go out in san antonio today?
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">jackalds</a> replied <span className="text-secondary font-weight-bold">12 hours ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 65</span>
                                <span><i className="far fa-comment ml-2"></i> 10</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">Foundations</a></h6>
                                <p className="text-secondary">
                                  Anyone know what other relief foundations we can add to the site?
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">bugsysha</a> replied <span className="text-secondary font-weight-bold">14 hours ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 45</span>
                                <span><i className="far fa-comment ml-2"></i> 4</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card mb-2">
                    <div className="card-body p-2 p-sm-3">
                        <div className="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div className="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" className="text-body">Apply for aid</a></h6>
                                <p className="text-secondary">
                                    Anyone know how we can apply for relief/aid if we have been effected?
                                </p>
                                <p className="text-muted"><a href="javascript:void(0)">michaeloravec</a> replied <span className="text-secondary font-weight-bold">18 hours ago</span></p>
                            </div>
                            <div className="text-muted small text-center align-self-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 70</span>
                                <span><i className="far fa-comment ml-2"></i> 3</span>
                            </div>
                        </div>
                    </div>
                </div>
                <ul className="pagination pagination-sm pagination-circle justify-content-center mb-0">
                    <li className="page-item disabled">
                        <span className="page-link has-icon"><i className="material-icons">back</i></span>
                    </li>
                    <li className="page-item active"><a className="page-link" href="javascript:void(0)">1</a></li>
                    <li className="page-item "><span className="page-link">2</span></li>
                    <li className="page-item"><a className="page-link" href="javascript:void(0)">3</a></li>
                    <li className="page-item disabled">
                        <a className="page-link has-icon" href="javascript:void(0)"><i className="material-icons">next</i></a>
                    </li>
                </ul>
            </div>

            <div id="comments" className="inner-main-body p-2 p-sm-3 collapse forum-content">

                <a id="backBtnComments" href="#" className="btn btn-light btn-sm mb-3 has-icon" data-toggle="collapse" data-target=".forum-content"><i className="fa fa-arrow-left mr-2"></i>Back</a>

                <div className="card mb-2">
                    <div className="card-body">
                        <div className="media forum-item">
                            <a href="javascript:void(0)" className="card-link">
                                <img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle" width="50" alt="User" />
                                <small className="d-block text-center text-muted">Newbie</small>
                            </a>
                            <div className="media-body ml-3">
                                <a href="javascript:void(0)" className="text-secondary">Mokrani</a>
                                <small className="text-muted ml-2">1 hour ago</small>
                                <h5 className="mt-1"></h5>
                                <div className="mt-3 font-size-sm">
                                    <p>Hellooo :)</p>
                                    <p>
                                        Hope everyone is doing well, dm me for some suggestions on how to get through the power outages and apply for aid.
                                    </p>
                                    <p>Be Safe</p>
                                </div>
                            </div>
                            <div className="text-muted small text-center">
                                <span className="d-none d-sm-inline-block"><i className="far fa-eye"></i> 19</span>
                                <span><i className="far fa-comment ml-2"></i> 3</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mb-2">
                    <div className="card-body">
                        <div className="media forum-item">
                            <a href="javascript:void(0)" className="card-link">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="rounded-circle" width="50" alt="User" />
                                <small className="d-block text-center text-muted">Pro</small>
                            </a>
                            <div className="media-body ml-3">
                                <a href="javascript:void(0)" className="text-secondary">drewdan</a>
                                <small className="text-muted ml-2">1 hour ago</small>
                                <div className="mt-3 font-size-sm">
                                    <p>Make sure to donate on the donate tab guys!</p>
                                    <p>There is a list of useful foundations there, that are sure to help out.</p>
                                </div>
                                <button className="btn btn-xs text-muted has-icon"><i className="fa fa-heart" aria-hidden="true"></i>1</button>
                                <a href="javascript:void(0)" className="text-muted small">Reply</a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    </div>



</div>
</div>

<div id="post-modal" class="modal" tabIndex="-1" role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title mb-0">New Discussion</h5>
        <button id="minimize" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <div className="form-group">
          <label for="formGroupExampleInput">Post Title</label>
          <input type="text" class="form-control" id="postTitle" placeholder=""/>
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Post Content</label>
          <textarea className="form-control" id="postTextArea" rows="3"></textarea>
        </div>
    </div>
      <div className="modal-footer">
        <button id="cancel" type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
        <button id="submitPost" type="button" className="btn btn-primary">Post</button>
      </div>
    </div>
  </div>
</div>

</div>



    )
  }
}

export default Forum;
