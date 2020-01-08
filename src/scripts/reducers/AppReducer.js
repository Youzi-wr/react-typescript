export default function AppReducer(state = {}, action) {
    switch (action.type) {
        case "updateAuthInfo":
            return Object.assign({}, state, { authInfo: action.authInfo });
        case "updateUserInfo":
            return Object.assign({}, state, { userInfo: action.userInfo });
        case "updateTopMenuIndex":
            return Object.assign({}, state, { navPermission: action.navPermission || [] });
        case "initWebConfig":
            return Object.assign({}, state, { webConfig: action.webConfig });
        default:
            return state;
    }
}