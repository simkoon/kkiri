import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer, { rootSaga } from './modules';
import { tempSetMember, check } from './modules/member';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from 'styled-components';
import theme from './lib/styles/theme';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

const loadMember = () => {
  try {
    const member = localStorage.getItem('member');

    if (!member) {
      return <h3>잉</h3>;
    }
    store.dispatch(tempSetMember(JSON.parse(member)));
    store.dispatch(check());
  } catch (e) {
    console.log('localStorage error!');
  }
};

sagaMiddleware.run(rootSaga);
loadMember();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
