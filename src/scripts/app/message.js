export default {
    "common": {
        "BTN_CHANGE": "修改",
        "BTN_EDIT": "编辑",
        "BTN_UPDATE": "更新",
        "BTN_CANCEL": "取消",
        "BTN_CONFIRM": "确认"
    },
    "header": {
        "newPost": {
            "LINK_NEW_SHARE": "消息",
            "LINK_NEW_TASK": "任务",
            "LINK_NEW_MEETING": "会议"
        },
        "profile": {
            "LINK_PROFILE": "@:user.setting.profile.TXT_PROFILE_INFO_TITLE",
            "LINK_SECURITY_SETTING": "@:user.setting.BTN_SECURITY_SETTING",
            "LINK_LOGOUT": "退出账户",
            "LINK_SETTINGS": "我的设置"
        },
        "notifications": {
            "BTN_VIEW_ALL": "查看全部",
            "TXT_NEW_COUNT": "您有{{num}}条新通知",
            "TXT_ALL_NTF": "全部通知"
        }
    },
    "nav": {
        "user": {
            "LINK_MY_POST": "我的消息",
            "LINK_MY_POST_INBOX": "所有消息",
            "LINK_MY_POST_PERSONAL": "个人消息",
            "LINK_MY_POST_GROUP": "项目消息",
            "LINK_MY_POST_FAV": "收藏夹",
            "LINK_MY_POST_DRAFT": "草稿",
            "LINK_MY_TASK": "我的任务",
            "LINK_MY_FILE": "我的文档",
            "LINK_MY_GROUP": "我的项目",
            "LINK_MY_ACCOUT_SETTING": "账户设置",
            "LINK_MY_APPS": "应用中心"
        },
        "group": {
            "LINK_GROUP_POST": "项目消息",
            "LINK_GROUP_TASK": "项目任务",
            "LINK_GROUP_FILE": "项目文档",
            "LINK_GROUP_MEMBER": "项目成员",
            "LINK_GROUP_SETTING": "项目设置",
            "LINK_GROUP_BACK": "返回个人"
        }
    },
    "user": {
        "setting": {
            "TXT_SETTING_CENTER_TITLE": "设置中心",
            "TXT_SETTING_CENTER_DESCRIPTION": "设置包括个人信息、安全以及提醒设置",
            "BTN_PROFILE_SETTING": "个人设置",
            "BTN_SECURITY_SETTING": "密码修改",
            "BTN_WEBSITE_SETTING": "个性设置",
            "profile": {
                "TXT_PROFILE_INFO_TITLE": "个人信息",
                "TXT_NICK_NAME": "称呼",
                "TXT_POSITION": "职位",
                "TXT_DEPARTMENT": "部门",
                "TXT_LANGUATE": "语言",
                "TXT_CUSTOM_STYLE": "皮肤",
                "TXT_EMAIL": "邮箱",
                "TXT_MOBILE": "手机",
                "TXT_EMAIL_SENT": "邮件已发送",
                "TXT_SMS_SENT": "短信已发送",
                "TXT_EMAIL_CONFIRM_CODE_PLACEHOLDER": "请输入邮箱验证码",
                "TXT_SMS_CONFIRM_CODE_PLACEHOLDER": "请输入短信验证码",
                "TXT_ERROR_FORM": "请检查表单！",
                "TXT_ERROR_NICKNAME_NOT_NULL": "称呼不能为空！",
                "TXT_ERROR_POSITION_NOT_NULL": "职位不能为空！",
                "TXT_ERROR_DEPARTMENT_NOT_NULL": "部门不能为空！",
                "TXT_ERROR_NICKNAME_FORMAT": "称呼格式不正确！<br>包含汉字、数字、字母、下划线；<br>不能以下划线开头和结尾。",
                "TXT_ERROR_POSITION_FORMAT": "职位格式不正确！<br>包含汉字、数字、字母、下划线；<br>不能以下划线开头和结尾。",
                "TXT_ERROR_DEPARTMENT_FORMAT": "部门格式不正确！<br>包含汉字、数字、字母、下划线；<br>不能以下划线开头和结尾。",
                "TXT_ENTER_EMAIL_CONFIRM_CODE_PLACEHOLDER": "请输入邮箱验证码",
                "BTN_CHANGE": "@:common.BTN_CHANGE",
                "BTN_EDIT": "@:common.BTN_EDIT",
                "BTN_UPDATE": "@:common.BTN_UPDATE",
                "BTN_CANCEL": "@:common.BTN_CANCEL",
                "BTN_CONFIRM": "@:common.BTN_CONFIRM",
                "BTN_EMAIL_VALIDATION": "邮件验证",
                "BTN_SMS_VALIDATION": "短信验证",
                "TXT_SETTING_TITLE": "个人设置",
                "TXT_SETTING_LANG": "语言",
                "TXT_SETTING_STYLE": "样式"
            }
        },
        "security": {
            "TXT_HINT_TITLE": "密码要求：",
            "TXT_HINT_1": "至少包含1个数字",
            "TXT_HINT_2": "至少包含1个字母",
            "TXT_HINT_3": "至少包含1个特殊字符",
            "TXT_HINT_4": "至少8位字符",
            "TXT_CURRENT": "当前密码",
            "TXT_CURRENT_PLACEHOLDER": "请输入当前密码",
            "TXT_NEW": "新密码",
            "TXT_NEW_PLACEHOLDER": "请输入新密码",
            "TXT_REPEAT": "确认密码",
            "TXT_REPEAT_PLACEHOLDER": "请再次输入新密码",
            "TXT_SUCCESS": "更改密码成功",
            "TXT_FAIL": "修改密码失败",
            "TXT_ERROR_NULL_CURRENT_PASSWORD": "当前密码不能为空！",
            "TXT_ERROR_NULL_NEW_PASSWORD": "新密码不能为空！",
            "TXT_ERROR_NULL_REPEAT_PASSWORD": "确认密码不能为空！",
            "TXT_ERROR_NEW_PASSWORD_FORMAT": "新密码格式不正确！",
            "TXT_ERROR_REPEAT_PASSWORD": "两次密码输入不一致！",
            "TXT_ERROR_CHECK_FORM": "请检查表单！",
            "BTN_UPDATE": "@:common.BTN_UPDATE"
        }
    },
    "operateType": {
        "LOGIN": "登录",
        "LOGOUT": "登出",
        "POST_VIEW": "查看消息",
        "POST_REPLY": "回复消息",
        "POST_REPLY_WITH_ATTACHMENT": "回复消息(插入附件)",
        "POST_ADD_ATTACHMENT": "添加附件到消息",
        "POST_INVITE_MEMBER": "邀请人员进入消息",
        "POST_KICK_MEMBER": "将人员踢出消息",
        "POST_SELF_EXIT": "退出消息",
        "POST_CREATE": "新建消息",
        "POST_CHANGE": "更新消息",
        "POST_ADD_TARGET": "添加消息-对象人或者群组或者email",
        "POST_REMOVE_TARGET": "移除消息-对象人或者群组或者email",
        "POST_RECALL_COMMENT": "回复评论",
        "POST_RENAME_TITLE": "重命名消息标题",
        "POST_ADD_FAVORITE": "收藏到收藏夹",
        "POST_UNDO_FAVORITE": "取消收藏",
        "POST_SET_TOP": "置顶消息",
        "POST_UNDO_TOP": "取消消息置顶",
        "POST_SET_LIKE": "点赞消息",
        "POST_UNDO_LIKE": "取消消息点赞",
        "POST_UPDATE_CONTENT": "更新消息内容",
        "POST_MUTE": "屏蔽消息内容",
        "POST_MUTE_UNDO": "取消屏蔽消息内容",
        "POST_ATTACHMENT_DEL": "移除附件",
        "POST_CHART_ROOM_CRATE": "创建聊天室",
        "POST_SAVE_DOC": "保存文件",
        "TASK_CREATE": "创建任务",
        "TASK_CREATE_PACKAGE": "创建任务包",
        "TASK_CREATE_SUB": "创建子任务",
        "TASK_ASSIGN": "分配任务",
        "TASK_POSTPONE": "延期任务",
        "TASK_DELETE": "删除任务",
        "TASK_DELETE_PACKAGE": "删除任务包",
        "TASK_RENAME": "重命名任务",
        "TASK_RENAME_PACKAGE": "重命名任务包",
        "TASK_REJECT": "审批任务退回",
        "TASK_APPROVE": "审批任务通过",
        "TASK_SET_IMPORTANCE": "设置任务为重要",
        "TASK_UNDO_IMPORTANCE": "取消任务重要",
        "TASK_SET_COMPLETE": "设置任务完成",
        "TASK_UNDO_COMPLETE": "设置任务未完成",
        "FILE_UPLOAD": "上传文件",
        "FILE_MAKE_DIR": "创建文件夹",
        "FILE_DELETE": "删除文件",
        "FILE_SHARE": "共享文件",
        "FILE_UNDO_SHARE": "取消文件共享",
        "FILE_COPY": "复制文件",
        "FILE_MOVE": "移动文件",
        "FILE_RENAME": "重命名文件",
        "FILE_PREVIEW": "预览文件",
        "FILE_DOWNLOAD": "下载文件",
        "FILE_EDIT": "编辑文件",
        "FILE_SECURITY_LEVEL_CHANGE": "更改文件安全级别",
        "CHANGE_AUTH": "变更权限",
        "ANNOTATION_CREATE": "创建注释",
        "ANNOTATION_CHANGE": "更新注释",
        "ANNOTATION_DELETE": "删除注释",
        "ACCOUNT_REGISTER": "注册用户",
        "ACCOUNT_ACTIVATE": "用户激活",
        "ACCOUNT_JOIN_TENANT_REQUEST": "请求加入到租户",
        "ACCOUNT_JOIN_TENANT_APPROVE": "同意加入到租户",
        "ACCOUNT_JOIN_TENANT_VIA_LOGIN_USER": "通过当前用户添加新用户",
        "ACCOUNT_UPDATE_INFO": "更新用户信息",
        "ACCOUNT_UPDATE_ICON": "更新用户头像",
        "ACCOUNT_SEND_SMS": "发送短信",
        "ACCOUNT_SEND_MAIL": "发送邮件",
        "ACCOUNT_UPDATE_EMAIL": "更新邮箱",
        "ACCOUNT_UPDATE_MOBILE": "更新手机",
        "ACCOUNT_FIND_PASSWORD": "找回密码",
        "ACCOUNT_CHANGE_PASSWORD_NORMAL": "手动变更密码",
        "ACCOUNT_CHANGE_PASSWORD_MAIL": "邮箱变更密码",
        "ACCOUNT_BANNED_USER": "禁用用户",
        "TENANT_REGISTER": "注册租户",
        "MAIL_ACCOUNT_ADD": "添加邮件用户",
        "MAIL_ACCOUNT_REMOVE": "移除邮件用户",
        "MAIL_ACCOUNT_EDIT": "修改邮件用户",
        "GROUP_APPLY_CREATE": "申请创建群组",
        "GROUP_UPDATE": "更新群组信息",
        "GROUP_UPDATE_ICON": "更新群组头像",
        "GROUP_INVITE_USER": "邀请成员",
        "GROUP_UPDATE_ROLE": "更新群组角色",
        "GROUP_EXIT": "退出群组",
        "MEETING_CREATE": "创建会议",
        "MEETING_REVISE": "修改会议",
        "MEETING_ACCEPT": "接受会议",
        "MEETING_REJECT": "拒绝会议",
        "MEETING_CANCEL": "取消会议",
        "MEETING_DETAIL": "查看会议信息",
        "OPEN_API_TOKEN": " 获得第三方APP信息",
        "OPEN_API_IDENTIFY": " 验证第三方APP身份",
        "OPEN_API_POST_CREATE": " 通过第三方APP发送消息",
        "OPEN_API_POST_REPLY": " 通过第三方APP回复消息",
        "MANAGE_LOG_AUDIT": "日志审计",
        "MANAGE_ACCOUNT_CREATE": "创建用户",
        "MANAGE_ACCOUNT_DELETE": "删除用户",
        "MANAGE_ACCOUNT_UPDATE": "更新用户信息",
        "MANAGE_ACCOUNT_ENABLE": "启用用户",
        "MANAGE_ACCOUNT_DISABLE": "禁用用户",
        "MANAGE_ACCOUNT_REST_PW": "重置密码",
        "MANAGE_ADMIN_REASSIGN": "设置管理员",
        "MANAGE_TENANT_UPDATE": "更新租户信息",
        "MANAGE_TENANT_UPDATE_LOGO": "更新租户LOGO",
        "MANAGE_TENANT_LIST_TENANT": "获取所有租户信息",
        "MANAGE_TENANT_LOAD_INFO": "获取租户信息",
        "MANAGE_TENANT_LIST_MENU": "查看企业菜单功能组合",
        "MANAGE_TENANT_MODIFY_MENU": "更改企业菜单功能组合",
        "MANAGE_FILE_SEC_GET": "查看文件密级",
        "MANAGE_FILE_SEC_ADD": "添加文件密级",
        "MANAGE_FILE_SEC_DEL": "删除文件密级",
        "MANAGE_FILE_SEC_UPDATE": "更新文件密级",
        "MANAGE_STRATEGY_GET": "查看访问策略",
        "MANAGE_USER_SEC_GET": "查看用户密级",
        "MANAGE_USER_SEC_ADD": "添加用户密级",
        "MANAGE_USER_SEC_DEL": "删除用户密级",
        "MANAGE_USER_SEC_UPDATE": "更新用户密级",
        "MANAGE_THIRD_SYSTEM": "创建第三方系统接口",
        "MANAGE_FILE_ACCESS_STRATEGY_RESET": "重置文件访问策略",
        "MANAGE_FILE_ACCESS_STRATEGY_UPDATE": "修改文件访问策略",
        "EDIT_OPEN_APP": "打开应用",
        "EDIT_STATUS_START": "开始编辑",
        "EDIT_UPDATE_EDITOR": "切换编辑控制权",
        "EDIT_INVITE": "邀请编辑",
        "EDIT_JOIN": "加入编辑",
        "EDIT_QUIET": "退出编辑",
        "EDIT_COMMIT": "提交文件",
        "EDIT_CLOSE": "关闭应用",
        "EDIT_JOIN_REQUEST": "申请加入编辑",
        "MANAGE_ACCOUNT_CREATE_FILE": "上传文件创建用户",
        "MANAGE_TENANT_USER_NUMBER": "更新租户最大用户数",
        "MANAGE_TENANT_FIRST_MENU": "查看租户默认首页",
        "MANAGE_TENANT_MODIFY_MENU": "更新租户功能组合",
        "MANAGE_TENANT_MODIFY_FIRST_MENU": "更新租户默认首页",
        "TASK_EXPORT_PACKAGE": "导出任务",
        "IGNORE": "忽略的日志",
        "BROWSER_HISTORY": "浏览器历史记录",
        "CONFIG_CREATE_VPN_ACL": "创建VPN白名单",
        "CONFIG_DELETE_VPN_ACL": "删除VPN白名单",
        "CONFIG_CREATE_VPN": "创建vpn节点",
        "CONFIG_UPDATE_VPN": "修改vpn节点",
        "CONFIG_DELETE_VPN": "删除vpn节点",
        "CONFIG_UPDATE_VPN_GLOBAL_CONFIG": "修改vpn选择策略",

        "DEPARTMENT_CREATE": "添加部门",

        "DEPARTMENT_SEARCH_ORG": "搜索组织部门",
        "DEPARTMENT_USER_MOVE": "移动部门人员",
        "DEPARTMENT_USER_REMOVE": "删除部门人员",
        "DEPARTMENT_LIST_USER": "查看部门人员",
        "DEPARTMENT_LIST_ORG": "查看组织部门列表",
        "DEPARTMENT_MOVE": "移动部门",
        "DEPARTMENT_DELETE": "删除部门",
        "DEPARTMENT_UPDATE": "更新部门信息",
        "DEPARTMENT_CREATE": "创建部门",
        "MANAGE_CLIENT_ACL_UPSET": "重置用户白名单",
        "MANAGE_CLIENT_ACL_DELETE": "删除用户白名单",
        "MANAGE_CLIENT_ACL_GET": "获取用户白名单",
        "OPEN_API_ACCOUNT_REGISTER": "第三方注册",
        "ACCOUNT_VERIFY_VALIDATION": "核实验证",
        "ACCOUNT_SEND_VALIDATECODE": "发送验证码",
        "ANNOTATION_PLAY_MEDIA": "播放视频",
        "FILE_SHARE_ANONYMOUS": "匿名分享"
    },
    "file": {
        "TXT_FILE_BOX_TITLE": "内容库",
        "TXT_ALL_FILE": "所有文件",
        "TXT_ALL_SHARE_FILE": "收到共享",
        "TXT_LOADING": "正在载入……",
        "BTN_UPLOAD": "上传文件",
        "BTN_CREATE_FOLDER": "新建文件夹",
        "BTN_DOWNLOAD": "下载",
        "BTN_MOVE_COPY": "移动/复制",
        "BTN_DELETE": "删除",
        "BTN_ASC": "正序排列",
        "BTN_DES": "倒序排列",
        "BTN_TIME_ASC": "从旧到新",
        "BTN_TIME_DES": "从新到旧",
        "BTN_ORDER_FILE_NAME": "按文件名",
        "BTN_ORDER_TXT": "排序",
        "BTN_ORDER_TIME": "按时间",
        "BTN_ORDER_TYPE": "按类型",
        "TXT_SYS_FOLDER": "系统文件夹",
        "TXT_CREATE_TIME": "创建于",
        "TXT_MODIFY_TIME": "修改于",
        "TXT_UPLOAD_TIME": "上传于",
        "TXT_SHARE_TIME": "共享于",
        "TXT_FILE_COUNT": "共{{fileCount}}个文件",
        "TXT_ERROR_RENAME_NULL_INPUT": "名称不可为空",
        "LINK_SHARE": "分享",
        "LINK_DOWNLOAD": "@:file.BTN_DOWNLOAD",
        "LINK_MOVE_COPY": "@:file.BTN_MOVE_COPY",
        "LINK_DELETE": "@:file.BTN_DELETE",
        "LINK_PREVIEW": "预览",
        "LINK_EDIT": "编辑",
        "LINK_RENAME": "重命名",
        "LINK_PROPERTY": "属性",
        "BTN_LOAD_MORE": "更多……",
        "BTN_LOADING_MORE": "正在载入……",
        "BTN_ERROR_LOAD_MORE_FAIL": "载入数据失败，点击重试",
        "TXT_EMPTY_FOLDER": "空目录",
        "TXT_ERROR_LOAD": "初始化文件列表失败……",
        "TXT_RETRY": "重试",
        "share": {
            "TXT_SUCCESS": "分享成功！",
            "TXT_ERROR_TIME_BEFORE_NOW": "分享截止时间不能设置为过去",
            "TXT_ERROR_NO_SELECTED_FILES": "@:file.copy.TXT_ERROR_NO_SELECTED_FILES"
        },
        "copy": {
            "TXT_ERROR_NO_SELECTED_FILES": "没有需要复制/移动的文件被选中……"
        }
    },
    "group": {
        "setting": {
            "TXT_ERROR_UPDATE_FAIL": "更新项目信息失败"
        }
    },
    "fileviewer": {
        "TXT_LICENSE_DECLARE": "您正在使用软件试用版。如需授权，请联系我们。",
        "TXT_CHAT": "即时讨论",
        "TXT_VER_HISTORY": "版本记录",
        "TXT_PARTICIPANTS": "参与成员",
        "BTN_ADD_PARTICIPANT": "添加新成员",
        "TXT_CHAT_PLACEHOLDER": "我想说...",
        "TXT_EDITING": "{{editor}}正在编辑...",
        "BTN_FORCE_CLOSE": "放弃保存并退出",
        "BTN_FORCE_CLOSE_ERR_CONN": "服务器连接异常，请关闭后重试",
        "BTN_DOWNLOAD_PLUGIN": "请下载最新插件",
        "TXT_SESSION_INVITED": "邀请协同编辑文件",
        "TXT_RELATED_FILE": "基于文件",
        "TXT_INVITE_LIST": "邀请",
        "BTN_INVITE": "邀请",
        "TXT_ADD_INVITES": "添加邀请的用户",
        "TXT_SAY_TO_THEM": "对TA说",
        "TXT_INPUT_MSG": "输入发送给对方的消息..."
    },
    "quickpreviewer": {
        "opacity": "透明度",
        "thickness": "粗&nbsp;&nbsp;&nbsp;细"
    },
    "errors": {
        "500": "出现了未知问题，请尽快反馈给我们",
        "502": "对不起，服务暂时无法访问",
        "30001": "调用接口没有足够的参数",
        "30002": "数据保存失败",
        "30003": "输入参数不正确",
        "30004": "您的数据存在错误",
        "50301": "您的权限不足，无法完成操作",
        "50302": "您的操作会影响系统运行，无法完成",
        "50303": "条件不满足，无法完成操作",
        "50304": "不能执行改文件操作",
        "50305": "文件没有找到对应的信息",
        "50310": "文件或目录未找到",
        "50311": "文件不能复制/移动到子目录",
        "50312": "部分文件没有权限，无法删除",
        "50315": "同一目录下，文件名不能相同",
        "50101": "用户信息不存在",
        "50102": "用户密码修改失败",
        "50103": "用户权限不足",
        "50104": "验证码不匹配",
        "50105": "验证码失效",
        "50106": "邮件发送失败",
        "50107": "输入的不是email地址",
        "50108": "email地址已经存在",
        "50109": "手机号已经存在",
        "50111": "您已经加入了团队/企业",
        "50112": "团队/企业的名称或者主域名已经被占用",
        "50113": "团队/企业不存在",
        "50201": "项目名称不能重复",
        "50202": "项目创建者不能退出项目",
        "50203": "项目创建者不能被修改",
        "50204": "用户已经退出项目",
        "50205": "不能对自己进行该项操作",
        "10701": "无效的请求",
        "50701": "文件信息获取失败",
        "50702": "文件内容获取失败",
        "10703": "读取文件失败",
        "10704": "分页数据读取失败",
        "50705": "没有足够的文件权限",
        "10601": "无效的请求",
        "50602": "文件类型不支持",
        "10603": "内部通信异常",
        "50604": "文件后缀名与内容不匹配",
        "10605": "其它异常",
        "10606": "IO通信异常",
        "50607": "创建预览文件失败",
        "50608": "转码失败",
        "50609": "预览文件尚未生成，请稍后再试",
        "30701": "预览服务下载数据解析错误",
        "30702": "预览服务连接异常",
        "30703": "预览插件异常",
        "50598": "发送文件协同编辑邀请失败",
        "50599": "文件编辑会话不存在或已结束",
        "50539": "用户不是已受邀的用户",
        "50540": "虚拟机资源紧张，请稍后再试",
        "50804": "达到最大置顶帖子数",
        "50805": "任务发起者不能退出",
        "50806": "只有信息发起者才能删除信息",
        "50807": "您无法访问该信息",
        "50808": "您没有足够的权限",
        "50110": "未找到有效的发送对象",
        "90001": "你的账户已在别处登录",
        "90002": "登录超时，请重新登录",
        "50901": "权限不足，无法进行此操作",
        "50902": "当前任务状态，无法进行此操作",
        "60001": "操作对象不存在",
        "60002": "对象不能被删除.(存在该Level的用户)(存在该Level的文件)",
        "60011": "文件密级不存在",
        "60012": "删除错误，存在该权限的文件",
        "60013": "文件密级已存在",
        "60021": "用户密级不存在",
        "60022": "删除错误，存在该权限的用户",
        "60023": "用户密级已存在",
        "51001": "无法找到部门",
        "51002": "无法删除部门",
        "51003": "无法移动部门",
        "54001": "主机配置规则不存在",
        "54002": "缺少企业信息",
        "54003": "缺少主机配置名称",
        "54004": "非法IP地址",
        "54005": "非法IP地址段",
        "54006": "缺少主机配置ID",
        "54007": "非法ID",
        "57304": "应用集不存在",
        "70101": "无效的APP",
        "70103": "APP已存在",
        "70202": "客户端已经存在该APP",
        "70301": "无效的企业",
        "70302": "企业中已存在该APP",
        "70402": "用户已存在该APP",
        "70601": "无效的分类",
        "50121": "企业用户已达到上限",
        "50122": "企业信息不可限制",
        "50123": "限制人数不正确",
        "56012": "文件密级不能被删除 (存在该Level的文件)",
        "56022": "用户密级不能被删除 (存在该Level的用户)",
        "50124": "抱歉，企业用户数已达上限！",
        "50508": "文件大小超过限制！",
        "50703": "license名称重复",
        "50721": "节点不存在",
        "50722": "非法的业务逻辑",
        "50723": "实体未找到",
        "50724": "更改节点信息失败",
        "50725": "修改VPN信息失败",
        "50726": "配置白名单失败",
        "50727": "非法的IP地址段",
        "50728": "非法的IP地址",
        "50729": "语法错误",
        "50730": "已存在",
        "50125": "企业已经存在",
        "50732": "proxy-agent异常，请联系管理员",
        "50750": "license数量不足，请稍后再试",
        "50751": "license已被使用，不可删除",
        "50752": "应用已添加license",
        "51101": "站点IP已存在！",
        "51102": "站点名称已存在",
        "51103": "站点不存在",
        "51104": "当前用户tenant没有站点访问权限",
        "51105": "用户已被分配站点",
        "51106": "请先删除该站点下关联的应用",
        "51107": "站点IP地址不可用",
        "51108": "不允许删除包含应用的镜像",
        "57103": "app编号不合法"
    },
    "option": {
        "PRIMARY": "允许",
        "DENY": "拒绝",
        "IGNORE": "忽略"
    },
    "rule": {
        "PRIMARY": "允许",
        "DENY": "禁止"
    },
    "import": {
        "create": "成功",
        "fail": "失败",
        "updated": "已更新"
    },
    "filesecurity": {
        "HINT": "说明：分别配置满足“条件”的用户是否具有“共享”“编辑”“下载”“阅读”“删除” 的权限",
        "userlevel": {
            "NAME": "用户级别",
            "USER_FILE": "用户级别≥文件级别",
            "FILE_USER": "用户级别<文件级别"
        },
        "fileowner": {
            "FILEOWNER": "文件所有人",
            "FILEOTHER": "非文件所有人"
        },
        "groupuser": {
            "NAME": "组角色",
            "ADMIN": "组管理员",
            "MEMBER": "组成员",
            "GUEST": "组访问者"
        },
        "file": {
            "NAME": "文件共享",
            "DOWNLOAD": "可下载文件",
            "EDIT": "可编辑文件",
            "READONLY": "只读文件"
        }
    },
    "vpsstatus": {
        "UP": "可用",
        "DOWN": "不可用",
        "UNKNOWN": "未知"
    },
    "vpstypes": {
        "INSIDE": "内环",
        "OUTSIDE": "外环"
    },
    "monitortypes": {
        "CONNECTIONTOEXTERNAL": "内环-外环断连",
        "CONNECTIONTOPROXY": "代理-内环断连",
        "MEMORY": "内存高",
        "HOST_RESTARTED": "主机重启动",
        "HOST_UNREACHABLE": "长时间无法获取数据",
        "CPU": "CPU高"
    },
    "monitordetails": {
        "EXTERNAL_H": "内环至外环连接断开",
        "EXTERNAL_R": "内环至外环连接恢复",
        "PROXY_H": "代理至内环连接断开",
        "PROXY_R": "代理至内环连接恢复",
        "CPU_H": "CPU使用率超过90%",
        "CPU_R": "CPU占用率恢复正常",
        "UNREACHABLE_H": "持续5分钟服务器 {{host}} 无法获取监控数据",
        "UNREACHABLE_R": "服务器{{host}}监控访问恢复",
        "RESTARTED": "服务器 {{host}} 重启动",
        "MEMORY_H": "主机 {{host}} 可用内存紧张，剩余不足20M",
        "MEMORY_R": "可用内存恢复正常"
    }

}