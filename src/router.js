import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Selection from './routes/selection'
import Layout from './components/Layout'
import Line from './routes/line'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Layout>
        <Switch>
          <Route path="/" exact component={IndexPage} />
          <Route path="/selection" exact component={Selection} />
          <Route path="/line" exact component={Line} />
        </Switch>
      </Layout>

    </Router>
  );
}

export default RouterConfig;
