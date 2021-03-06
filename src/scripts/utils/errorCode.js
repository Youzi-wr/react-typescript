const message = {
    "500": "出现了未知问题，请尽快反馈给我们",
    "502": "对不起，服务暂时无法访问",
    "1003": "当前账号已经加入该在线应用,不支持重复加入",
    "10000": "网络连接异常,正在尝试重连...",
    "10001": "网络连接已经恢复",
    "10601": "无效的请求",
    "10603": "系统内部通信异常",
    "10605": "其它异常",
    "10606": "IO通信异常",
    "10701": "无效的请求",
    "10703": "读取文件失败",
    "10704": "分页数据读取失败",
    "30001": "调用接口没有足够的参数",
    "30002": "数据保存失败",
    "30003": "输入参数不正确",
    "30004": "你的数据存在错误",
    "30701": "预览服务下载数据解析错误",
    "30702": "预览服务连接异常",
    "30703": "预览插件异常",
    "50101": "用户信息不存在",
    "50102": "原密码输入有误",
    "50103": "文件读取异常",
    "50104": "验证码不匹配",
    "50105": "验证码失效",
    "50106": "邮件发送失败",
    "50107": "输入的不是正确的email地址",
    "50108": "用户已经存在",
    "50109": "手机号已经存在",
    "50110": "未找到有效的发送对象",
    "50111": "用户已经加入了团队/企业",
    "50112": "团队/企业的名称或者主域名已经被占用",
    "50113": "团队/企业不存在",
    "50115": "邮件配置验证失败",
    "50119": "邮件配置无法自动识别,请设置高级参数",
    "50121": "企业用户已达到上限",
    "50122": "企业信息不可限制",
    "50123": "限制人数不正确",
    "50124": "抱歉，企业用户数已达上限！",
    "50125": "企业已经存在",
    "50201": "项目名称不能重复",
    "50202": "项目创建者不能退出该项目",
    "50203": "项目创建者不能被修改",
    "50204": "用户已经退出项目",
    "50205": "不能对自己进行该项操作",
    "50206": "项目群组不存在",
    "50301": "对不起，你的权限不够，不能进行该操作",
    "50302": "你的操作会影响系统运行，无法完成",
    "50303": "您没有足够的权限使用这个在线应用",
    "50304": "不能执行改文件操作",
    "50305": "文件没有找到对应的信息",
    "50307": "文件共享已经失效",
    "50310": "文件或目录未找到",
    "50311": "该文件不能被复制/移动到子目录",
    "50312": "部分文件没有足够的权限，无法被删除",
    "50315": "同一目录下不能有相同文件名的文件",
    "50388": "文件还未准备就绪",
    "50404": "当前虚拟机资源紧张，请稍后再试",
    "50508": "文件大小超过限制！",
    "50530": "未能正常退出会话",
    "50531": "导入工作目录失败",
    "50532": "打开应用失败",
    "50533": "关闭应用失败",
    "50537": "发起人已离开",
    "50538": "该用户已加入会话,不能重复加入",
    "50539": "用户不是已受邀的用户",
    "50540": "当前虚拟机资源紧张，请稍后再试",
    "50541": "没有合适的云应用打开该文件",
    "50555": "当前账号打开应用数量已达上限",
    "50557": "当前在线应用的成员数量已达上限，请联系您的邀请人",
    "50570": "当前网络环境差，可能影响应用的体验",
    "50571": "连接虚拟应用超时",
    "50598": "发送文件协同编辑邀请失败",
    "50599": "这个会话已过期或已关闭",
    "50602": "不支持该文件类型",
    "50604": "文件后缀名与内容不匹配",
    "50607": "未能成功创建预览文件",
    "50608": "文件转码失败",
    "50609": "预览文件尚未生成完毕，请稍后再试",
    "50701": "文件描述信息获取失败",
    "50702": "文件数据内容获取失败",
    "50703": "license名称重复",
    "50705": "没有足够的文件权限",
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
    "50732": "proxy-agent异常，请联系管理员",
    "50750": "license数量不足，请稍后再试",
    "50751": "license已被使用，不可删除",
    "50752": "应用已添加license",
    "50803": "该信息不存在或已删除",
    "50804": "达到最大置顶帖子数",
    "50805": "任务/消息发起者,执行者或默认组不能退出",
    "50806": "只有信息发起者才能删除信息",
    "50807": "你无法访问该信息",
    "50808": "你没有足够的权限",
    "50809": "无法进行此操作",
    "50810": "无法撤销评论",
    "50811": "存在无效的发送对象,请修改后再试",
    "50901": "你的权限不足，无法进行此操作",
    "50902": "当前任务状态，无法进行此操作",
    "50903": "该任务不存在或已删除",
    "50904": "无效的任务包",
    "50905": "该任务分类不能被删除",
    "50906": "移动任务出错",
    "50907": "任务预定完成时间不正确",
    "50908": "只有会议发起者才能变更会议",
    "50909": "此会议不存在或已删除",
    "50910": "系统任务无法修改",
    "51001": "无法找到部门",
    "51002": "无法删除部门",
    "51003": "无法移动部门",
    "51101": "站点IP已存在！",
    "51102": "站点名称已存在",
    "51103": "站点不存在",
    "51104": "当前用户tenant没有站点访问权限",
    "51105": "用户已被分配站点",
    "51106": "请先删除该站点下关联的应用",
    "51107": "站点IP地址不可用",
    "51108": "不允许删除包含应用的镜像",
    "51401": "当前账号已经加入该在线应用,不支持重复加入",
    "54001": "主机配置规则不存在",
    "54002": "缺少企业信息",
    "54003": "缺少主机配置名称",
    "54004": "非法IP地址",
    "54005": "非法IP地址段",
    "54006": "缺少主机配置ID",
    "54007": "非法ID",
    "56012": "文件密级不能被删除 (存在该Level的文件)",
    "56022": "用户密级不能被删除 (存在该Level的用户)",
    "57103": "app编号不合法",
    "57304": "应用集不存在",
    "60001": "操作对象不存在",
    "60002": "对象不能被删除.(存在该Level的用户)(存在该Level的文件)",
    "60011": "文件密级不存在",
    "60012": "删除错误，存在该权限的文件",
    "60013": "文件密级已存在",
    "60021": "用户密级不存在",
    "60022": "删除错误，存在该权限的用户",
    "60023": "用户密级已存在",
    "70101": "无效的APP",
    "70103": "APP已存在",
    "70202": "客户端已经存在该APP",
    "70301": "无效的企业",
    "70302": "企业中已存在该APP",
    "70402": "用户已存在该APP",
    "70601": "无效的分类",
    "90001": "你的账户已在别处登录",
    "90002": "登录已超时，请重新登录"
}

export default message;