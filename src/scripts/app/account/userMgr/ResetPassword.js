import React from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Input, Button, notification } from 'antd';
import AccountService from 'scripts/services/AccountService';
import sty from '../account.scss';

const FormItem = Form.Item;

class ResetPasswordComp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            toUserList: false,
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
    compareToFirstPassword(rule, value, callback)  {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('newPassword')) {
            callback('重复输入密码不一致！');
        } else {
            callback();
        }
    }
    submit(e) {
        e.preventDefault();
        const id = location.pathname.split('resetPassword/')[1];
        this.props.form.validateFields({
            first: true,
            force: true
        }, (err, values) => {
            if (!err) {
                let that = this;
                console.log('Received values of form: ', values);
                AccountService.resetAccount(id, values).then(res => {
                    if (res.success) {
                        notification["success"]({
                            message: '重置密码成功！'
                        });
                        that.setState({toUserList: true});
                    }
                });
            }
        });
    }
    backToList() {
        this.setState({toUserList: true});
    }
    render() {
        let { getFieldDecorator } = this.props.form;
        let { formItemLayout, tailFormItemLayout, toUserList } = this.state;

        if (toUserList) {
            return <Redirect to="/account/userMgr"/>;
        } else {
            return (
                <div className={sty.addUser}>
                    <h3 className={sty.addUserTitle}>重置密码</h3>
                    <Form onSubmit={e => this.submit(e)} className={`clearfix`} autoComplete="off">
                        <div className={sty.formAddUser}>
                            <FormItem label="新密码" {...formItemLayout}>
                                {getFieldDecorator('newPassword', {
                                    rules: [{
                                        required: true,
                                        message: '新密码不能为空！'
                                    }, {
                                        pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\x21-\x7e]{8,16}$/,
                                        message: '密码格式不正确，至少8字符，最高16位，包含数字和字母或特殊符号！'
                                    }]
                                })(
                                    <Input type="password" placeholder="请输入新的密码"/>
                                )}
                            </FormItem>

                            <FormItem label="确认密码" {...formItemLayout}>
                                {getFieldDecorator('passwordRepeat', {
                                    rules: [{
                                        required: true,
                                        message: '重复密码不能为空！'
                                    }, {
                                        validator: (rule, value, callback) => this.compareToFirstPassword(rule, value, callback)
                                    }]
                                })(
                                    <Input type="password" placeholder="重复输入密码"/>
                                )}
                            </FormItem>

                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" style={{'marginRight': '8px'}}>提交</Button>
                                <Button onClick={e => this.backToList(e)}>返回</Button>
                            </FormItem>
                        </div>
                    </Form>
                </div>
            );
        }    
    }
}

const ResetPassword = Form.create()(ResetPasswordComp);
export default ResetPassword;