const nav = [{
    menu: 'account',
    name: '账户配置',
    autId: 'A-001-000',
    router: '/account',
    children: [{
        menu: 'user',
        name: '用户管理',
        autId: 'A-001-100',
        router: '/account/userMgr'
    }, {
        menu: 'admin',
        name: '管理员设置',
        autId: 'A-001-200',
        router: '/account/adminMgr'
    }, {
        menu: 'dept',
        name: '部门设置',
        autId: 'A-001-300',
        router: '/account/deptMgr'
    }]
}];

export default nav;