import React, { Component } from 'react';

import Map from './components/Map';
import Forum from './components/Forum';
import Donate from './components/Donate';
import News from './components/News'

import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/map" render={() => ( <Map /> )} exact/>
          <Route path="/forums" render={() => ( <Forum /> )} exact/>
          <Route path="/donate" render={() => ( <Donate /> )} exact/>
          <Route path="/news" render={() => ( <News /> )} exact/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
