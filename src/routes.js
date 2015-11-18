/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React from 'react';
import Router from 'react-routing/src/Router';
import http from './core/HttpClient';
import App from './components/App';
// import ContentPage from './components/ContentPage';
import ContactPage from './components/ContactPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import NotFoundPage from './components/NotFoundPage';
import ErrorPage from './components/ErrorPage';
import MainPage from './components/MainPage';

const router = new Router(on => {
  on('*', async (state, next) => {
    const component = await next();
    return component && <App context={state.context}>{component}</App>;
  });

  on('/contact', async () => {
    // const cars = await http.get('/api/cars');
    return <ContactPage cars={[]}/>;
  });

  on('/login', async () => {
    const users = await http.get('/api/users');
    return <LoginPage users={users} />
  });

  on('/register', async () => <RegisterPage />);

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
