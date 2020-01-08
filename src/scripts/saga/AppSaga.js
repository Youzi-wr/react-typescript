import { call, put, fork, takeLatest } from 'redux-saga/effects';
import AuthService from 'scripts/services/AuthService';

// selector
const getState = (state, type) => state[type];

//*****************create root worker********************
/**
 * get access_token
 */
function* getAuthInfo() {
    let token = sessionStorage.getItem('access_token');
    
    if (token) {
        //get userInfo
        yield fork(getUserInfo, { access_token: token });
    } else {
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null } });
    }
}

function* login(action) {
    try {
        const authInfo = yield call(AuthService.login, action.username, action.password);
        sessionStorage.setItem('access_token', authInfo.access_token);
        //get userInfo
        yield fork(getUserInfo, { access_token: authInfo.access_token });
    } catch (err) {
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null }  });
    }
}

/**
 * get userInfo by access_token
 */
function* getUserInfo(action) {
    try {
        const userInfo = yield call(AuthService.getUserInfoByToken, action.access_token);
        yield put({ type: "updateUserInfo", userInfo: userInfo.data });
        yield put({ type: "updateAuthInfo", authInfo: { access_token: action.access_token } });
    } catch (err) {
        yield put({ type: "updateUserInfo", userInfo: null });
        yield put({ type: "updateAuthInfo", authInfo: { access_token: null }  });
    }
}

/** 
 *  set nav Permissio
 */
function* navPermissionFun(action) {
    yield put({ type: "updateTopMenuIndex", navPermission: action.permissionList });
}

/**
 * get webConfig
 */
function* getWebConfig() {
    try {
        const webConfigRes = yield call(AuthService.findOneBySiteName);
        const webConfig = JSON.parse(webConfigRes.webConfig);
        yield put({ type: 'initWebConfig', webConfig });
    } catch (err) {
        yield put({ type: 'initWebConfig', webConfig: {} });
    }
}

//*****************create worker********************
function* appSaga() {
    yield takeLatest('CHECK_AUTHINFO', getAuthInfo);
    yield takeLatest('TO_LOGIN_IN', login);
    yield takeLatest('NAVPERMISSION', navPermissionFun);
    yield takeLatest('GET_WEBCONFIG', getWebConfig);
}

export default appSaga;