import { Route, Switch } from 'react-router-dom';

import AdminPage from '../Pages/AdminPage';
import HomePage from '../Pages/HomePage';

const routes = () => {
  return (
    <Switch>
      <Route path="/admin" exact component={AdminPage} />
      <Route path="/home" exact component={HomePage} />
    </Switch>
  );
};

export default routes;
