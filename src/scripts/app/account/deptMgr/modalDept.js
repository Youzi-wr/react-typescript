import React from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import { TreeSelectAsyn } from '../FormItemExt';
import AccountService from 'scripts/services/AccountService';

const FormItem = Form.Item;

class ModalDeptComp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deptId: this.props.rightSelectedNode.value,
            deptName: this.props.rightSelectedNode.title,
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
    submit(e) {
        const { form } = this.props;

        e.preventDefault();
        form.validateFields({
            first: true,
            force: true
        }, (err, values) => {
            if (!err) {
                let that = this;

                values['parentOrgId'] = this.state.deptId;
                
                AccountService.createDepartment(values).then(res => {
                    if (res.success) {
                        notification["success"]({
                            message: '创建部门成功！'
                        });
                        that.backToList('refresh');
                    }
                });
            }
        });
    }
    backToList(isRefresh) {
        let { closeModal } = this.props;
        closeModal(isRefresh);
    }
    getTreeValue(e) {
        this.setState({ 
            deptId: e.value,
            deptName: e.label
        });
    }
    render() {
        let { form } = this.props;
        let { getFieldDecorator } = form;
        let { formItemLayout, tailFormItemLayout, deptId, deptName } = this.state;
        
        return (
            <div className="clearfix">
                <Form onSubmit={e => this.submit(e)} className={`clearfix`} autoComplete="off">
                    <div style={{padding: '35px 68px 0 0'}}>
                        <FormItem label="部门名称" {...formItemLayout}>
                            {getFieldDecorator('name', {
                                rules: [{
                                    required: true, 
                                    message: '部门名称不能为空！'
                                }, {
                                    max: 25,
                                    message: "部门名称不能不超过25个字符！"
                                }]
                            })(
                                <Input placeholder="请输入部门名称"/>
                            )}
                        </FormItem>

                        <FormItem label="所在部门" {...formItemLayout}>
                            {getFieldDecorator('parentOrgId', {
                                // normalize: this.getTreeValue //todo 必填校验
                            })(
                                <TreeSelectAsyn
                                    placeholder="请选择从属部门(默认属于企业下)"
                                    deptId={deptId}
                                    deptName={deptName}
                                    treeValueChange={e => this.getTreeValue(e)} />
                            )}
                        </FormItem>
                    </div>
                    <div style={{textAlign: 'right'}}>
                        <FormItem {...tailFormItemLayout}>
                            <Button type="primary" 
                                style={{'marginRight': '8px'}}
                                onClick={e => this.submit(e)}>保存</Button>
                            <Button onClick={e => this.backToList(e)}>取消</Button>
                        </FormItem>
                    </div>
                </Form> 
            </div>
        );  
    }
}

const ModalDept = Form.create()(ModalDeptComp);

export default ModalDept;