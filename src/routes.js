/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import fetch from './core/fetch';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import ResultsPage from './components/ResultsPage';
import Location from './core/Location';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/admin', async () => <AdminPage />);
  on('/admin/dashboard', async () => <AdminPage />);
  on('/admin/destinations', async () => <AdminPage />);

  on('/results', async state => {
    const respones = await Promise.all([
      fetch(Location.createHref('/api/prices', state.query)),
      fetch('/api/destinations'),
    ]);
    const {prices, vehicles} = await respones[0].json();
    const destinations = await respones[1].json();
    return <ResultsPage query={state.query} prices={prices} vehicles={vehicles} destinations={destinations}/>;
  });

  on('*', async () => {
    const response = await fetch('/api/destinations');
    const destinations = await response.json();
    return <MainPage destinations={destinations}/>;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
