import React, { Component } from 'react';
import Blank from '../container/Blank/Blank';
import Friendrank from '../container/Friendrank/Friendrank';
import PaySuccess from '../container/PaySuccess/PaySuccess';
import BuyFail from '../container/BuyFail/BuyFail';
import SingleTreasureBox from '../container/SingleTreasureBox/SingleTreasureBox';
import TravelSecurity from '../container/TravelSecurity/TravelSecurity';

import './App.css';
import './../../static/css/reset.css'
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Router>
              <Switch>
                  <Route exact path="/" component={PaySuccess} />;
                  <Route path="/Blank" component={Blank} />;
                  <Route path="/Friendrank" component={Friendrank} />;
                  <Route path="/BuyFail" component={BuyFail} />;
                  <Route path="/SingleTreasureBox" component={SingleTreasureBox} />;
                  <Route path="/TravelSecurity" component={TravelSecurity} />;
              </Switch>
          </Router>
      </div>
    );
  }
}

export default App;
