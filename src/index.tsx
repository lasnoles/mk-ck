import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import {BrowserRouter, Route} from 'react-router-dom';
import AuthRoute from './component/auth-route/auth-route.component';
import App from './App';
import loginPage from './pages/login-page/login-page.component';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
        <AuthRoute />
        <Route path="/" component={loginPage}/>
        <Route exact path="/entity" component={App}/>
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

