import { fork } from 'redux-saga/effects';
import appSaga from './AppSaga';
import AccountSaga from './AccountSaga';

export default function* rootSaga() {
    yield fork(appSaga);
    yield fork(AccountSaga);
}