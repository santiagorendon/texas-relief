import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/map" render={() => ( <Map /> )} exact/>

        </div>
      </BrowserRouter>
    );
  }
}
export default App;
