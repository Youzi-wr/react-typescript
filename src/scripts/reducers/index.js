import { combineReducers } from 'redux';
import AppReducer from 'scripts/reducers/AppReducer';
import AccountReducer from 'scripts/reducers/AccountReducer';

export default combineReducers({
    appRoot: AppReducer,
    account: AccountReducer
});