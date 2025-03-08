import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from '@material-ui/core';

import Header from './Header.jsx';
import ActivityFeed from './components/ActivityFeed.jsx';
import ArchivedCalls from './components/ArchivedCalls.jsx';
import ActivityDetail from './components/ActivityDetail.jsx';

import './css/app.css';

const App = () => {
  return (
    <Router>
      <div className='container'>
        <Header />
        <Container>
          <div className="container-view">
            <Switch>
              <Route exact path="/" component={ActivityFeed} />
              <Route path="/archived" component={ArchivedCalls} />
              <Route
                path="/activity/:id"
                render={(props) => <ActivityDetail {...props} />}
              />
            </Switch>
          </div>
        </Container>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));

export default App;
