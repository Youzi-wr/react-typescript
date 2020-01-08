export default {
    webConfig: {
        product: 'xietong',
        html: {
            title: '桐享系统管理'
        },
        login: {
            copyRight: 'Copyright © 2015  上海谐桐信息技术有限公司'
        },
        user: {
            deleteUser: false,
            searchAPI: '/admin/api/manage/account/search'
        }
    },
    companyInfo: {
        tel: '021-50890310',
        email: 'support@sharetome.com'
    },
    filePermissionMap: {
        show: 'READ',
        preview: 'READ',
        property: 'READ',
        share: 'SHARE',
        download: 'DOWNLOAD',
        move: 'WRITE',
        edit: 'WRITE',
        remove: 'DELETE',
        rename: 'WRITE',
        upload: 'WRITE',
        mkdir: 'WRITE',
        level: 'DELETE'
    },
    strategyList: [{
            align: '负载均衡',
            proxyAssignStrategy: 'loadBalance'
        },
        {
            align: '轮询',
            proxyAssignStrategy: 'roundRobin'
        },
        {
            align: '随机',
            proxyAssignStrategy: 'random'
        }
    ],
    config: {
        EMAIL_VALIDATE_RESEND_COUNT: 60,
        MOBILE_VALIDATE_RESEND_COUNT: 60,
        FILE_LIST_COUNT_PER_PAGE: 20
    },
    url: {
        api: {
            getUserInfo: '/admin/api/user/token/account',
            createGroup: '/admin/api/group/create/apply',
            fileLevel: '/admin/api/system/file/security'
        }
    },
    fileType: [{
        className: 'commonFile',
        posX: -45,
        posY: 0,
        suffix: []
    }, {
        className: 'doc',
        posX: -90,
        posY: 0,
        suffix: [
            'doc', 'dot', 'docx', 'docm', 'dotx', 'dotm', 'docb',
            'msword', 'vnd.openxmlformats-officedocument.wordprocessingml.document',
            'vnd.openxmlformats-officedocument.wordprocessingml.template', 'vnd.ms-word.document.macroEnabled.12',
            'vnd.ms-word.template.macroEnabled.12'
        ]
    }, {
        className: 'txt',
        posX: -135,
        posY: 0,
        suffix: ['txt', 'plain']
    }, {
        className: 'xls',
        posX: -180,
        posY: 0,
        suffix: [
            'xls', 'xlt', 'xlm', 'xlsx', 'xlsm', 'xltx', 'xltm', 'xlsb', 'xla', 'xlam', 'xll', 'xlw',
            'vnd.ms-excel', 'vnd.ms-excel.sheet.binary.macroEnabled.12',
            'vnd.ms-excel.sheet.macroEnabled.12', 'vnd.ms-excel.template.macroEnabled.12',
            'vnd.ms-excel.addin.macroEnabled.12',
            'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'vnd.openxmlformats-officedocument.spreadsheetml.template'
        ]
    }, {
        className: 'ppt',
        posX: -225,
        posY: 0,
        suffix: [
            'ppt', 'pot', 'pps', 'pptx', 'pptm', 'potx', 'potm', 'ppam', 'ppsx', 'ppsm', 'sldx', 'sldm',
            'vnd.openxmlformats-officedocument.presentationml.template',
            'vnd.openxmlformats-officedocument.presentationml.slideshow',
            'vnd.openxmlformats-officedocument.presentationml.presentation', 'vnd.ms-powerpoint',
            'vnd.ms-powerpoint.addin.macroEnabled.12', 'vnd.ms-powerpoint.presentation.macroEnabled.12',
            'vnd.ms-powerpoint.slideshow.macroEnabled.12'
        ]
    }, {
        className: 'pdf',
        posX: -270,
        posY: 0,
        suffix: ['pdf']
    }, {
        className: 'mp3',
        posX: -315,
        posY: 0,
        suffix: ['mp3', 'mpeg']
    }, {
        className: 'mov',
        posX: -360,
        posY: 0,
        suffix: ['mov']
    }, {
        className: 'wav',
        posX: -405,
        posY: 0,
        suffix: ['wav', 'x-wav']
    }, {
        className: 'avi',
        posX: 0,
        posY: -45,
        suffix: ['avi', 'msvideo', 'x-msvideo']
    }, {
        className: 'mp4',
        posX: -45,
        posY: -45,
        suffix: ['mp4']
    }, {
        className: 'jpg',
        posX: -90,
        posY: -45,
        suffix: ['jpg', 'jpeg', 'jpe', 'jfif', 'jif']
    }, {
        className: 'png',
        posX: -135,
        posY: -45,
        suffix: ['png']
    }, {
        className: 'bmp',
        posX: -180,
        posY: -45,
        suffix: ['bmp']
    }, {
        className: 'gif',
        posX: -225,
        posY: -45,
        suffix: ['gif']
    }, {
        className: 'psd',
        posX: -270,
        posY: -45,
        suffix: ['psd']
    }, {
        className: 'eps',
        posX: -315,
        posY: -45,
        suffix: ['eps', '.ai']
    }, {
        className: 'zip',
        posX: -360,
        posY: -45,
        suffix: ['zip', 'rar', 'x-gzip', 'x-bzip2', 'x-compressed-zip']
    }]
};