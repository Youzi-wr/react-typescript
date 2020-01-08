import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, Select, notification, DatePicker } from 'antd';
import { TreeSelectAsyn } from '../FormItemExt';
import AccountService from 'scripts/services/AccountService';
import sty from '../account.scss';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const FormItem = Form.Item;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';

class AddUserComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDisabled: this.props.id ? true : false,
            disableRepeatSubmit: false,
            toUserList: false,
            deptId: '', //todo
            deptName: '',
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
            tailFormItemLayout: {
                wrapperCol: {
                    xs: {
                        span: 24,
                        offset: 0
                    },
                    sm: {
                        span: 16,
                        offset: 7
                    }
                }
            }
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ formProps: nextProps.formProps });
    // }
    compareToFirstPassword(rule, value, callback) {
        const { form } = this.props;

        if (value && value !== form.getFieldValue('password')) {
            callback('重复输入密码不一致！');
        } else {
            callback();
        }
    }
    submit(e) {
        const { form, id } = this.props;

        e.preventDefault();
        form.validateFields({
            first: true,
            force: true
        }, (err, values) => {
            if (!err) {
                let that = this;

                if (id) {
                    values['id'] = id;
                    delete values.password;
                }

                delete values.kit;
                delete values.site;
                delete values.passwordRepeat;
                delete values.deptName; //todo 如果有deptName,默认是新增部门
                values['depId'] = this.state.deptId;
                values['expirationDate'] = values.expirationDate ? values.expirationDate.format(dateFormat) : '';

                // console.log('Received values of form: ', values);
                this.setState({ disableRepeatSubmit: true });
                id ? AccountService.updateAccount(values).then(res => {
                    if (res.success) {
                        notification["success"]({
                            message: '修改信息成功！'
                        });
                        that.setState({ toUserList: true });
                    } else {
                        that.setState({ disableRepeatSubmit: false });
                    }
                }, err => {
                    that.setState({ disableRepeatSubmit: false });
                })
                    :
                    AccountService.createAccount(values).then(res => {
                        if (res.success) {
                            notification["success"]({
                                message: '添加用户成功！'
                            });
                            that.setState({ toUserList: true });
                        } else {
                            that.setState({ disableRepeatSubmit: false });
                        }
                    }, err => {
                        that.setState({ disableRepeatSubmit: false });
                    });
            }
        });
    }
    kitSelect = (value) => {
        let { tenant, id } = this.props;
        let data = [{
            userId: id,
            tenantCode: tenant.code,
            appSetId: value
        }];
        AccountService.assignAppSet(data).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '分配应用集成功!'
                });
            }
        });
    }
    kitDeselect = (value) => {
        let { tenant, id } = this.props;
        let data = [{
            userId: id,
            tenantCode: tenant.code,
            appSetId: value
        }];
        AccountService.unassignAppSet(data).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '取消分配应用集成功!'
                });
            }
        });
    }
    siteChange(value) {
        let { tenant, id } = this.props;
        let data = {
            userId: id,
            tenantCode: tenant.code,
            siteId: value
        };
        if (data.siteId) {
            AccountService.assignSite(data).then(res => {
                if (res.success) {
                    notification["success"]({
                        message: '分配工作目录成功!'
                    });
                }
            }, err => {
                //todo errcode
            });
        }
    }
    getTreeValue(e) {
        this.setState({
            deptId: e.value,
            deptName: e.label
        });
    }
    editForm() {
        this.setState({ isDisabled: false });
    }
    cancelEdit() {
        this.setState({ isDisabled: true });
    }
    backToList() {
        this.setState({ toUserList: true });
    }
    render() {
        let { form, tenant, detail, authSet, id } = this.props;
        let { getFieldDecorator } = form;
        let { formItemLayout, tailFormItemLayout, toUserList, isDisabled, deptId, deptName, disableRepeatSubmit } = this.state;

        if (toUserList) {
            return <Redirect to="/account/userMgr" />;
        } else {
            return (
                <div className={sty.addUser}>
                    <h3 className={sty.addUserTitle}>{id ? '详细信息' : '新增用户'}</h3>
                    <Form onSubmit={e => this.submit(e)} className={`clearfix`} autoComplete="off">
                        <div className={sty.formAddUser}>
                            <FormItem label="称呼" {...formItemLayout}>
                                {getFieldDecorator('nickName', {
                                    rules: [{
                                        required: true,
                                        message: '用户昵称不能为空！'
                                    }, {
                                        max: 25,
                                        message: "用户昵称不能不超过25个字符！"
                                    }, {
                                        pattern: /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/,
                                        message: `用户昵称格式不正确!
                                            包含汉字、数字、字母、下划线，
                                            不能以下划线开头和结尾`
                                    }]
                                })(
                                    <Input placeholder="请输入用户称呼" disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="用户密码" {...formItemLayout} style={{ display: id ? 'none' : 'block' }}>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: id ? false : true,
                                        message: '密码不能为空！'
                                    }, {
                                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\x21-\x7e]{8,16}$/,
                                        message: '密码格式不正确，至少8字符，最高16位，包含数字和字母或特殊符号！'
                                    }]
                                })(
                                    <Input type="password" placeholder="请输入新的密码" />
                                )}
                            </FormItem>

                            <FormItem label="确认密码" {...formItemLayout} style={{ display: id ? 'none' : 'block' }}>
                                {getFieldDecorator('passwordRepeat', {
                                    rules: [{
                                        required: id ? false : true,
                                        message: '重复输入不能为空！'
                                    }, {
                                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback)
                                    }]
                                })(
                                    <Input type="password" placeholder="重复输入密码" />
                                )}
                            </FormItem>

                            <FormItem label="邮箱" {...formItemLayout}>
                                {getFieldDecorator('email', {
                                    rules: [{
                                        type: 'email',
                                        message: '邮箱格式不正确！'
                                    }]
                                })(
                                    <Input placeholder="请输入用户邮箱" disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="手机" {...formItemLayout}>
                                {getFieldDecorator('mobileNo', {
                                    rules: [{
                                        pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                                        message: '手机号格式不正确！'
                                    }]
                                })(
                                    <Input placeholder="请输入用户手机" disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="用户ID" {...formItemLayout}>
                                {getFieldDecorator('registerName', {
                                    rules: []
                                })(
                                    <Input placeholder="请输入用户ID" disabled={id ? true : false} />
                                )}
                            </FormItem>

                            <FormItem label="固定电话" {...formItemLayout}>
                                {getFieldDecorator('phoneNo', {
                                    rules: [{
                                        pattern: /0\d{2,3}-\d{5,9}|0\d{2,3}-\d{5,9}|\d{5,9}/,
                                        message: '固定电话格式不正确！'
                                    }]
                                })(
                                    <Input placeholder="请输入固定电话" disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="使用期限" {...formItemLayout}>
                                {getFieldDecorator('expirationDate', {
                                    rules: [{
                                        type: 'object'
                                    }]
                                })(
                                    <DatePicker locale={locale} disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="其他信息" {...formItemLayout}>
                                {getFieldDecorator('contacts', {
                                    rules: []
                                })(
                                    <TextArea placeholder="请输入其他联系方式" rows={4} disabled={isDisabled}></TextArea>
                                )}
                            </FormItem>

                            <FormItem label="职位" {...formItemLayout}>
                                {getFieldDecorator('positionName', {
                                    rules: []
                                })(
                                    <Input placeholder="请输入用户职位" disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="部门" {...formItemLayout}>
                                {getFieldDecorator('deptName', {
                                    rules: []
                                })(
                                    <TreeSelectAsyn
                                        isDisabled={isDisabled}
                                        deptId={deptId || detail.depId}
                                        deptName={deptName || detail.deptName}
                                        treeValueChange={e => this.getTreeValue(e)} />
                                )}
                            </FormItem>

                            <FormItem label="经理" {...formItemLayout}>
                                {getFieldDecorator('managerName', {
                                    rules: []
                                })(
                                    <Input placeholder="请输入用户经理" disabled={isDisabled} />
                                )}
                            </FormItem>

                            <FormItem label="安全级别" {...formItemLayout}>
                                {getFieldDecorator('level', {
                                    initialValue: 2,
                                    rules: []
                                })(
                                    <Select disabled={isDisabled}>
                                        {
                                            tenant.personSecurityVOList.map((item, i) => {
                                                return <Select.Option key={i} value={item.level}>{item.descn}</Select.Option>
                                            })
                                        }
                                    </Select>
                                )}
                            </FormItem>

                            {
                                detail.kitAndSiteInfo ? <div>
                                    <FormItem label="应用集" {...formItemLayout} style={{ display: id ? 'block' : 'none' }}>
                                        {getFieldDecorator('kit', {
                                            initialValue: detail.kitAndSiteInfo.defaultKit,
                                            rules: []
                                        })(
                                            <Select
                                                disabled={isDisabled}
                                                mode={'multiple'}
                                                onSelect={this.kitSelect}
                                                onDeselect={this.kitDeselect}>
                                                {
                                                    detail.kitAndSiteInfo.kitList.map((item, i) => {
                                                        return <Select.Option key={i} value={item.appSetId}>{item.name}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>

                                    <FormItem label="工作目录" {...formItemLayout} style={{ display: id ? 'block' : 'none' }}>
                                        {getFieldDecorator('site', {
                                            initialValue: detail.kitAndSiteInfo.defaultSite,
                                            rules: []
                                        })(
                                            <Select disabled={detail.kitAndSiteInfo.defaultSite !== '0' ? true : isDisabled} onChange={e => this.siteChange(e)}>
                                                {
                                                    detail.kitAndSiteInfo.siteList.map((item, i) => {
                                                        return <Select.Option key={i} value={item.id}>{item.siteName}</Select.Option>
                                                    })
                                                }
                                            </Select>
                                        )}
                                    </FormItem>
                                </div> : ''
                            }

                            <FormItem {...tailFormItemLayout}>
                                <span style={{ display: isDisabled ? 'block' : 'none' }}>
                                    {
                                        authSet.indexOf('A-001-103') >= 0 && (
                                            <Button type="primary"
                                                style={{ 'marginRight': '8px' }}
                                                onClick={e => this.editForm(e)}>编辑</Button>
                                        )
                                    }
                                    <Button onClick={e => this.backToList(e)}>返回</Button>
                                </span>
                                <span style={{ display: isDisabled ? 'none' : 'block' }}>
                                    <Button type="primary"
                                        htmlType="submit"
                                        disabled={disableRepeatSubmit}
                                        style={{ 'marginRight': '8px' }}>提交</Button>
                                    <Button disabled={disableRepeatSubmit} onClick={e => this.cancelEdit(e)}>取消</Button>
                                </span>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            );
        }
    }
}

const CustomizedForm = Form.create({
    mapPropsToFields(props) {
        let { detail, id } = props;
        let date = new Date(detail.expirationDate).format('yyyy-mmon-dd');
        return id ? detail.expirationDate ? {
            nickName: Form.createFormField({ value: detail.nickName }),
            password: Form.createFormField({ value: detail.password }),
            passwordRepeat: Form.createFormField({ value: detail.passwordRepeat }),
            email: Form.createFormField({ value: detail.email }),
            mobileNo: Form.createFormField({ value: detail.mobileNo }),
            registerName: Form.createFormField({ value: detail.registerName }),
            phoneNo: Form.createFormField({ value: detail.phoneNo }),
            contacts: Form.createFormField({ value: detail.contacts }),
            positionName: Form.createFormField({ value: detail.positionName }),
            deptId: Form.createFormField({ value: detail.deptId }),
            deptName: Form.createFormField({ value: detail.deptName }),
            managerName: Form.createFormField({ value: detail.managerName }),
            level: Form.createFormField({ value: detail.level }),
            expirationDate: Form.createFormField({ value: detail.expirationDate ? moment(date, dateFormat) : '' })
        } : {
                nickName: Form.createFormField({ value: detail.nickName }),
                password: Form.createFormField({ value: detail.password }),
                passwordRepeat: Form.createFormField({ value: detail.passwordRepeat }),
                email: Form.createFormField({ value: detail.email }),
                mobileNo: Form.createFormField({ value: detail.mobileNo }),
                registerName: Form.createFormField({ value: detail.registerName }),
                phoneNo: Form.createFormField({ value: detail.phoneNo }),
                contacts: Form.createFormField({ value: detail.contacts }),
                positionName: Form.createFormField({ value: detail.positionName }),
                deptId: Form.createFormField({ value: detail.deptId }),
                deptName: Form.createFormField({ value: detail.deptName }),
                managerName: Form.createFormField({ value: detail.managerName }),
                level: Form.createFormField({ value: detail.level })
            } : {}
    }
})((props) => {
    return <AddUserComp {...props} />;
});

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: parseInt(location.pathname.split('addUser/')[1]),
            accountDetail: {}
        }
    }
    componentDidMount() {
        let that = this;
        let { id } = this.state;

        if (id) {
            AccountService.getUserDatail(id).then(res => {
                if (res.success) {
                    that.setState({ accountDetail: res.data });
                } else {
                    //todo errocode
                }
            });
            this.props.prepareKitAndSite(id);
        }
    }
    render() {
        let { accountDetail, id } = this.state;
        let { userInfo, kitAndSiteInfo } = this.props;
        let { tenant, authSet } = userInfo;

        accountDetail['kitAndSiteInfo'] = kitAndSiteInfo;
        return <CustomizedForm id={id} tenant={tenant} authSet={authSet} detail={accountDetail} />;
    }
}

export default connect(
    state => {
        return {
            userInfo: state.appRoot.userInfo,
            kitAndSiteInfo: state.account.kitAndSiteInfo
        }
    },
    dispatch => {
        return {
            prepareKitAndSite(id) {
                dispatch({ type: 'PREPARE_KITSITE', id: id });
            }
        }
    }
)(AddUser);