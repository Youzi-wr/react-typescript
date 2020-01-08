import Http from 'scripts/services/AxiosHttp';

export default {
    getAccountList: function (url, data) {
        return Http.post(url, data);
    },
    getParentOrgById: function (parentOrgId) {
        return Http.get('/uz-organization/api/organization/list/organization/' + parentOrgId);
    },
    createAccount: function (data) {
        return Http.post('/admin/api/manage/account/create/user', data);
    },
    getUserDatail: function (userId) {
        return Http.get('/uz-accountmgr/api/account/' + userId + '/detail');
    },
    disableAccount: function (accountId) {
        return Http.post('/admin/api/manage/account/disable/' + accountId + '/user');
    },
    enableAccount: function (accountId) {
        return Http.post('/admin/api/manage/account/enable/' + accountId + '/user');
    },
    resetAccount: function (userId, password) {
        return Http.post('/admin/api/manage/account/reset/' + userId + '/user/false/email', password);
    },
    exportFile: function (keyword) {
        var url = '/admin/api/manage/account/export?keyword=' + (keyword || '') + '&access_token=' + sessionStorage.access_token;
        window.open(url);
    },
    // ---------- accountDetail kit&site start ----------
    appSetList: function (code) {
        return Http.get('/uz-appmgrv2/api/app/appset/list?tenantCode=' + code);
    },
    loadWorkDir: function (code) {
        return Http.get('/uz-sitemgr/api/site/tenant/' + code + '/all');
    },
    //get AppSet By userId
    getUserAppSet: function (id) {
        return Http.get('/uz-appmgrv2/api/app/appset/assignment/' + id);
    },
    getUserSite: function (userId) {
        return Http.get('/uz-sitemgr/api/site/assignment/' + userId);
    },
    //tenant administrator distribute appSet to user
    assignAppSet: function (data) {
        return Http.putAsPost('/uz-appmgrv2/api/app/appset/assignment', data);
    },
    unassignAppSet: function (data) {
        return Http.putAsPost('/uz-appmgrv2/api/app/appset/unassignment', data);
    },
    assignSite: function (data) {
        return Http.post('/uz-sitemgr/api/site/assignment/' + data.userId + '/' + data.siteId);
    },
    // ---------- accountDetail kit&site end ----------
    //获取三员信息
    loadAdmins: function () {
        return Http.get('/admin/api/manage/account/load/admins');
    },
    searchGeneral: function (name) {
        return Http.get('/uz-usermgr/api/user/search?key=' + name);
    },
    //设置三员
    setAdminUser: function (roleName, adminId) {
        return Http.post('/admin/api/manage/account/reassign/' + roleName + '/role/' + adminId + '/user');
    },
    //取消三员
    deleteAdminUser: function (roleName, adminId) {
        return Http.delete('/admin/api/manage/account/drop/' + roleName + '/admin/' + adminId + '/user');
    },
    // ---------- deptMgr start ----------
    getOrgUserList: function (parentOrgId) {
        return Http.get('/uz-organization/api/organization/list/user/' + parentOrgId);
    },
    moveUsersDepartment: function (data) {
        return Http.post('/uz-organization/api/organization/move/user', data);
    },
    createDepartment: function (data) {
        return Http.post('/uz-organization/api/organization/create', data);
    },
    moveDepartment: function (data) {
        return Http.post('/uz-organization/api/organization/move/organization', data);
    },
    deleteDepartment: function (data) {
        return Http.get('/uz-organization/api/organization/delete/' + data);
    },
    updateDepartment: function (data) {
        return Http.post('/uz-organization/api/organization/update', data);
    },
    updateAccount: function (user) {
        return Http.post('/admin/api/manage/account/modify/' + user.id + '/user', user);
    }
}