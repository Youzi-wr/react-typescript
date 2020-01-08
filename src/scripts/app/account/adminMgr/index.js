import React from 'react';
import { Form, Button, notification, AutoComplete, Select } from 'antd';
import AccountService from 'scripts/services/AccountService';
import sty from '../account.scss';

const FormItem = Form.Item;

const { userInfo } = AppGlobal.getStore().appRoot;
const authSet = userInfo.authSet;

class AdmintMgrComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            adminId: '',
            systemAdmin: [],
            securityAuditor: [],
            securityHandler: [],
            systemAdminEdit: false,
            securityAuditorEdit: false,
            securityHandlerEdit: false,
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 7 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 16 }
                }
            },
            systemAdminValue: {
                key: '',
                label: ''
            },
            securityAuditorValue: {
                key: '',
                label: ''
            },
            securityHandlerValue: {
                key: '',
                label: ''
            },
            value: {
                key: '',
                label: ''
            }
        }
    }
    componentDidMount() {
        let that = this;
        AccountService.loadAdmins().then(res => {
            if (res.success) {
                let { SecurityAuditor, SecurityHandler, SystemAdmin } = res.data;
                that.setState({
                    systemAdmin: [{
                        id: SystemAdmin.id.toString(),
                        nickName: SystemAdmin.nickName,
                        email: SystemAdmin.email,
                        mobileNo: SystemAdmin.mobileNo
                    }],
                    securityAuditor: [{
                        id: SecurityAuditor.id.toString(),
                        nickName: SecurityAuditor.nickName,
                        email: SecurityAuditor.email,
                        mobileNo: SecurityAuditor.mobileNo
                    }],
                    securityHandler: [{
                        id: SecurityHandler.id.toString(),
                        nickName: SecurityHandler.nickName,
                        email: SecurityHandler.email,
                        mobileNo: SecurityHandler.mobileNo
                    }],
                    systemAdminValue: {
                        key: SystemAdmin.id.toString(),
                        label: SystemAdmin.nickName
                    },
                    securityAuditorValue: {
                        key: SecurityAuditor.id.toString(),
                        label: SecurityAuditor.nickName
                    },
                    securityHandlerValue: {
                        key: SecurityHandler.id.toString(),
                        label: SecurityHandler.nickName
                    }
                });
            }
        });
    }
    eidt(type) {
        this.setState({ [type + 'Edit']: true });
    }
    cancel(type) {
        this.setState({ [type + 'Edit']: false });
    }
    done(type) {
        let { adminId, roleName } = this.state,
            that = this;
        // console.log(roleName, adminId); 
        AccountService.setAdminUser(type, adminId).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '更新成功！'
                });
            } else {
                //todo errorcode
            }
            that.setState({ [roleName + 'Edit']: false });
        });
    }
    handleChange = (e, type) => {
        this.setState({
            [type + 'Value']: e
        });
    }
    onSelect(info, roleName) {
        this.setState({
            adminId: info.key,
            roleName
        });
    }
    onSearch(e, type) {
        AccountService.searchGeneral(e).then(res => {
            if (res.data instanceof Array)
                this.setState({ [type]: res.data });
            else
                this.setState({ [type]: [] });
        });
    }
    render() {
        let {
            formItemLayout,
            systemAdmin,
            securityAuditor,
            securityHandler,
            systemAdminEdit,
            securityAuditorEdit,
            securityHandlerEdit,
            systemAdminValue,
            securityAuditorValue,
            securityHandlerValue,
            adminId
        } = this.state;

        return (
            <div className={sty.userMgr}>
                <h3 className={sty.userMgrTitle}>管理员设置</h3>
                <Form onSubmit={e => this.submit(e)} className={`clearfix`} autoComplete="off">
                    <div className={sty.formUserMgr}>
                        <FormItem label="系统管理员" {...formItemLayout}>
                            <div>
                                <AutoComplete
                                    labelInValue
                                    value={systemAdminValue}
                                    style={{ width: '50%' }}
                                    dropdownStyle={{ width: 380 }}
                                    onChange={e => this.handleChange(e, 'systemAdmin')}
                                    onSelect={e => this.onSelect(e, 'systemAdmin')}
                                    onSearch={e => this.onSearch(e, 'systemAdmin')}
                                    placeholder="请选择系统管理员"
                                    optionLabelProp="text"
                                    disabled={!systemAdminEdit}
                                >
                                    {
                                        systemAdmin.map((item, i) => {
                                            return <AutoComplete.Option key={item.id} text={item.nickName}>{item.nickName}:{item.email ? item.email + '/' : ''}{item.mobileNo}</AutoComplete.Option>
                                        })
                                    }
                                </AutoComplete>
                                <Button style={{ display: authSet.indexOf('A-001-201') >= 0 ? (!systemAdminEdit ? 'inline-block' : 'none') : 'none' }} type="primary" onClick={e => this.eidt('systemAdmin')}>编辑</Button>
                                <Button style={{ display: systemAdminEdit ? 'inline-block' : 'none' }} type="primary" onClick={e => this.done('SystemAdmin')}>完成</Button>
                                <Button style={{ display: systemAdminEdit ? 'inline-block' : 'none' }} onClick={e => this.cancel('systemAdmin')}>取消</Button>
                            </div>
                        </FormItem>

                        <FormItem label="安全审计员" {...formItemLayout}>
                            <div>
                                <AutoComplete
                                    style={{ width: '50%' }}
                                    dropdownStyle={{ width: 380 }}
                                    labelInValue
                                    value={securityAuditorValue}
                                    onChange={e => this.handleChange(e, 'securityAuditor')}
                                    onSelect={e => this.onSelect(e, 'securityAuditor')}
                                    onSearch={e => this.onSearch(e, 'securityAuditor')}
                                    placeholder="请选择安全审计员"
                                    disabled={!securityAuditorEdit}
                                    optionLabelProp="text"
                                >
                                    {
                                        securityAuditor.map((item, i) => {
                                            return <AutoComplete.Option key={i} value={item.id} text={item.nickName}>{item.nickName}:{item.email ? item.email + '/' : ''}{item.mobileNo}</AutoComplete.Option>
                                        })
                                    }
                                </AutoComplete>
                                <Button style={{ display: authSet.indexOf('A-001-201') >= 0 ? (!securityAuditorEdit ? 'inline-block' : 'none') : 'none' }} type="primary" onClick={e => this.eidt('securityAuditor')}>编辑</Button>
                                <Button style={{ display: securityAuditorEdit ? 'inline-block' : 'none' }} type="primary" onClick={e => this.done('SecurityAuditor')}>完成</Button>
                                <Button style={{ display: securityAuditorEdit ? 'inline-block' : 'none' }} onClick={e => this.cancel('securityAuditor')}>取消</Button>
                            </div>
                        </FormItem>

                        <FormItem label="安全保密员" {...formItemLayout}>
                            <div>
                                <AutoComplete
                                    style={{ width: '50%' }}
                                    dropdownStyle={{ width: 380 }}
                                    labelInValue
                                    value={securityHandlerValue}
                                    onChange={e => this.handleChange(e, 'securityHandler')}
                                    onSelect={e => this.onSelect(e, 'securityHandler')}
                                    onSearch={e => this.onSearch(e, 'securityHandler')}
                                    placeholder="请选择安全保密员"
                                    disabled={!securityHandlerEdit}
                                    optionLabelProp="text"
                                >
                                    {
                                        securityHandler.map((item, i) => {
                                            return <AutoComplete.Option key={i} value={item.id} text={item.nickName}>{item.nickName}:{item.email ? item.email + '/' : ''}{item.mobileNo}</AutoComplete.Option>
                                        })
                                    }
                                </AutoComplete>
                                <Button style={{ display: authSet.indexOf('A-001-201') >= 0 ? (!securityHandlerEdit ? 'inline-block' : 'none') : 'none' }} type="primary" onClick={e => this.eidt('securityHandler')}>编辑</Button>
                                <Button style={{ display: securityHandlerEdit ? 'inline-block' : 'none' }} type="primary" onClick={e => this.done('SecurityHandler')}>完成</Button>
                                <Button style={{ display: securityHandlerEdit ? 'inline-block' : 'none' }} onClick={e => this.cancel('securityHandler')}>取消</Button>
                            </div>
                        </FormItem>
                    </div>
                </Form>
            </div>
        );
    }
}

const AdmintMgr = Form.create()(AdmintMgrComp);
export default AdmintMgr;