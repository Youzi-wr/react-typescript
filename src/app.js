import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from 'scripts/saga';
import AppReducer from 'scripts/reducers';
import AppGlobal from 'scripts/utils/AppGlobal';
import AuthRoute from 'scripts/app/AuthRoute';
import ScrollToTop from 'scripts/app/ScrollToTop';
import util from 'scripts/utils/util';
import 'scripts/style/global.scss';
import 'scripts/app/app.scss';

AppGlobal();//global initialization

let history = createBrowserHistory({ basename: '/views' });
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    AppReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

window.AppGlobal.getStore = function () {
    return store.getState();
}

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history} forceRefresh={false}>
                    <ScrollToTop>
                        <AuthRoute />
                    </ScrollToTop>
                </Router>
            </Provider>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));

