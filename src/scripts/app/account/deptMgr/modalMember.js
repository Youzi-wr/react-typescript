import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { TreeSelectAsyn } from '../FormItemExt';
import AccountService from 'scripts/services/AccountService';

const FormItem = Form.Item;

class ModalMemberComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            formProps: this.props.formProps,
            isDisabled: this.props.formProps.id ? true : false,
            deptId: this.props.formProps.rightSelectedNode.value || '', //todo
            deptName: this.props.formProps.rightSelectedNode.title || '',
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
    componentWillReceiveProps(nextProps) {
        this.setState({ formProps: nextProps.formProps });
    }
    submit(e) {
        const { form, id } = this.state.formProps;

        e.preventDefault();
        form.validateFields({
            first: true,
            force: true
        }, (err, values) => {
            if (!err) {
                let that = this;

                values['depId'] = this.state.deptId;

                if (id) {
                    values['id'] = id;
                    delete values.password;
                    AccountService.updateAccount(values).then(res => {
                        if (res.success) {
                            notification["success"]({
                                message: '修改信息成功！'
                            });
                            that.backToList('refresh');
                        } else {
                            //todo errocode
                        }
                    });
                } else {
                    // console.log('Received values of form: ', values);
                    AccountService.createAccount(values).then(res => {
                        if (res.success) {
                            notification["success"]({
                                message: '添加用户成功！'
                            });
                            that.backToList('refresh');
                        } else {
                            //todo errocode
                        }
                    });
                }

            }
        });
    }
    backToList(isRefresh) {
        let { closeModal } = this.state.formProps;
        closeModal(isRefresh);
    }
    getTreeValue(e) {
        this.setState({ 
            deptId: e.value,
            deptName: e.label
        });
    }
    render() {
        let { form, detail, id } = this.state.formProps;
        let { getFieldDecorator } = form;
        let { formItemLayout, tailFormItemLayout, isDisabled, deptId, deptName } = this.state;

        return (
            <div className="clearfix">
                <Form onSubmit={e => this.submit(e)} className={`clearfix`} autoComplete="off">
                    <div style={{padding: '35px 68px 0 0'}}>
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
                                <Input placeholder="请输入用户称呼" disabled={isDisabled}/>
                            )}
                        </FormItem>

                        <FormItem label="邮箱" {...formItemLayout}>
                            {getFieldDecorator('email', {
                                rules: [{
                                    required: true,
                                    message: '邮箱不能为空！'
                                }, {
                                    type: 'email',
                                    message: '邮箱格式不正确！'
                                }]
                            })(
                                <Input placeholder="请输入用户邮箱" disabled={isDisabled}/>
                            )}
                        </FormItem>

                        <FormItem label="用户密码" {...formItemLayout} style={{ display: id ? 'none' : 'block' }}>
                            {getFieldDecorator('password', {
                                rules: [{
                                    required: id ? false :true,
                                    message: '密码不能为空！'
                                }, {
                                    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\x21-\x7e]{8,16}$/,
                                    message: '密码格式不正确，至少8字符，最高16位，包含数字和字母或特殊符号！'
                                }]
                            })(
                                <Input type="password" placeholder="请输入新的密码" autoComplete="new-password"/>
                            )}
                        </FormItem>

                        <FormItem label="手机号" {...formItemLayout}>
                            {getFieldDecorator('mobileNo', {
                                rules: [{
                                    required: true,
                                    message: '手机不能为空！'
                                }, {
                                    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
                                    message: '手机号格式不正确！'
                                }]
                            })(
                                <Input placeholder="请输入用户手机" disabled={isDisabled}/>
                            )}
                        </FormItem>

                        <FormItem label="所在部门" {...formItemLayout}>
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
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <FormItem {...tailFormItemLayout}>
                            <span style={{ display: !isDisabled ? 'block' : 'none' }}>
                                <Button type="primary" 
                                    style={{'marginRight': '8px'}}
                                    onClick={e => this.submit(e)}>保存</Button>
                                <Button onClick={e => this.backToList(e)}>取消</Button>
                            </span>
                            <span  style={{ display: isDisabled ? 'block' : 'none' }}>
                                <Button type="primary"
                                    style={{'marginRight': '8px'}}
                                    onClick={e => this.setState({isDisabled: false})}>编辑</Button>
                                <Button onClick={e => this.backToList(e)}>取消</Button>
                            </span>
                        </FormItem>
                    </div>
                </Form> 
            </div>
        );
    }
}

const CustomizedForm = Form.create({
    mapPropsToFields(props) {
        let { detail, id } = props;
        return id ? {
            nickName: Form.createFormField({ value: detail.nickName }),
            password: Form.createFormField({ value: detail.password }),
            email: Form.createFormField({ value: detail.email }),
            mobileNo: Form.createFormField({ value: detail.mobileNo }),
            deptId: Form.createFormField({ value: detail.deptId })
        } : {}
    }
})((props) => {
    return <ModalMemberComp formProps={props}/>;
});

class ModalMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            id: this.props.id,
            rightSelectedNode: this.props.rightSelectedNode
        }
    }
    componentDidMount() {
        let { id } = this.state;

        if (id) {
            AccountService.getUserDatail(id).then(res => {
                if (res.success) {
                    this.setState({ detail: res.data });
                } else {
                    //todo errocode
                }
            });
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ 
    //         id: nextProps.id,
    //         rightSelectedNode: nextProps.rightSelectedNode
    //     });

    //     if (nextProps.id) {
    //         AccountService.getUserDatail([nextProps.id]).then(res => {
    //             if (res.success) {
    //                 this.setState({ detail: res.data[0] });
    //             } else {
    //                 //todo errocode
    //             }
    //         });
    //     }
    // }
    render() {
        let { detail, id, rightSelectedNode } = this.state;
        let { closeModal } = this.props;

        return <CustomizedForm 
                    detail={detail} 
                    id={id} 
                    rightSelectedNode={rightSelectedNode} 
                    closeModal={closeModal} ref="onSubmit"/>;
    }
}

export default ModalMember;