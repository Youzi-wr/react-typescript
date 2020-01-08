import { call, put, takeLatest, select } from 'redux-saga/effects';
import AccountService from 'scripts/services/AccountService';

// selector
const getState = (state, type) => state[type];

//*****************create root worker********************
// prepare kit and site data
function* prepareKitAndSite(action) {
    let [kitList, siteList, defaultKit, defaultSite] = yield [
        call(getToolKit),
        call(getSite),
        call(getDefaultKit, action.id),
        call(getDefaultSite, action.id)
    ];

    yield put({
        type: 'prepareKitAndSite',
        kitAndSiteInfo: {
            kitList,
            defaultKit,
            siteList,
            defaultSite
        }
    });
}

function* getToolKit() {
    const { userInfo } = yield select(getState, 'appRoot');
    const tenantCode = userInfo.tenant.code;

    try {
        const kitListRes = yield call(AccountService.appSetList, tenantCode);
        const kitList = kitListRes.data;
        for (var item in kitList) {
            if (kitList[item]['type'] === 'DEFAULT') {
                delete kitList[item];
            }
        }
        return kitList;
    } catch (err) {
        return [];
        //Todo errorcode
    }
}

function* getSite() {
    const { userInfo } = yield select(getState, 'appRoot');
    const tenantCode = userInfo.tenant.code;

    try {
        const siteListRes = yield call(AccountService.loadWorkDir, tenantCode);
        const siteList = siteListRes.data || [];
        siteList.unshift({
            id: '0',
            siteName: '未分配'
        });
        return siteList;
    } catch (err) {
        console.log(err);
        return [];
        //Todo errorcode
    }
}

function* getDefaultKit(id) {
    try {
        const defaultKitRes = yield call(AccountService.getUserAppSet, id);
        const defaultKit = defaultKitRes.data.map(item => item.appSetId);
        return defaultKit;
    } catch (err) {
        return '';
        //Todo errorcode
    }
}

function* getDefaultSite(id) {
    try {
        const defaultSiteRes = yield call(AccountService.getUserSite, id);
        const defaultSite = defaultSiteRes.data ? defaultSiteRes.data.siteId : '0';
        return defaultSite;
    } catch (err) {
        return '';
        //Todo errorcode
    }
}

//*****************create worker********************
function* AccountSaga() {
    yield takeLatest('PREPARE_KITSITE', prepareKitAndSite);
}

export default AccountSaga;