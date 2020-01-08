export default function AppReducer(state = {}, action) {
    switch (action.type) {
        case "prepareKitAndSite":
            return Object.assign({}, state, { kitAndSiteInfo: action.kitAndSiteInfo });
        default:
            return state;
    }
}