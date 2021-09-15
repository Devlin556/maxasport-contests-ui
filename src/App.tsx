import React, { useCallback, useState } from 'react';
import { BrowserRouter, Redirect, Switch } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';

import { getRouteComponents, getRoutes } from './Routes';
import Layout from './components/Layout';
import Header from './components/Header';

const App: React.FC<{}> = () => {
  const [adminToken, setToken] = useState(localStorage.getItem('admin-token'));

  const handleSetToken = useCallback((token: string) => {
    setToken(token)
  }, [setToken])

  const routeComponents = getRouteComponents(!!adminToken);
  const routes = getRoutes(!!adminToken, true);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Layout>
            <Header handleSetToken={handleSetToken} routes={routes} />
            {routeComponents}
            <Redirect to="/"/>
          </Layout>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App;
