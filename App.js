// library imports
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// component imports
import Footer from './comp/pure/Footer';
import Header from './comp/pure/Header';
import MainView from './views/MainView';
import LoginView from './views/LoginView';
import RegisterView from './views/RegisterView';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Switch>
          <Route path='/login/' component={LoginView} />
          <Route path='/register/' component={RegisterView} />
          <Route path='/' component={MainView} />
        </Switch>
      </main>
      <Footer />
    </>
  );
};