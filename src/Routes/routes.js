import { Route, Switch } from 'react-router-dom';

import AdminPage from '../Pages/AdminPage';
import HomePage from '../Pages/HomePage';
import StatsPage from '../Pages/StatsPage';

const routes = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={AdminPage} />
      <Route path="/home" exact component={HomePage} />
      <Route path="/stats" exact component={StatsPage} />
    </Switch>
  );
};

export default routes;
