/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage';
import AdminPage from './components/AdminPage';
import ResultsPage from './components/ResultsPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/admin', async () => <AdminPage />);

  on('/results', async state => {
    const {prices, vehicles} = await http.get('/api/prices', state.query);
    return <ResultsPage query={state.query} prices={prices} vehicles={vehicles}/>;
  });

  on('*', async () => {
    const destinations = await http.get('/api/destinations');
    return <MainPage destinations={destinations}/>;
  });

  on('error', (state, error) => state.statusCode === 404 ?
    <App context={state.context} error={error}><NotFoundPage /></App> :
    <App context={state.context} error={error}><ErrorPage /></App>
  );
});

export default router;
