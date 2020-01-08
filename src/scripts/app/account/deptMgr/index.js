import React from 'react';
import { connect } from 'react-redux';
import { Button, notification, Icon, Dropdown, Menu, Table, Divider, Modal, Input } from 'antd';
import { TreeAsyn } from '../FormItemExt';
import ModalMember from './modalMember';
import ModalDept from './modalDept';
import AccountService from 'scripts/services/AccountService';
import sty from '../account.scss';

const confirm = Modal.confirm;

class DeptMgr extends React.Component {
    constructor(props) {
        super(props);
        let { userInfo } = this.props;
        let { authSet } = userInfo;

        this.menu = (
            <Menu>
                {
                    authSet.indexOf('A-001-302') >= 0 ? (
                        <Menu.Item key="0">
                            <a onClick={e => this.viewModalMember()}>新增成员</a>
                        </Menu.Item>
                    ) : ''
                }
                {
                    authSet.indexOf('A-001-303') >= 0 ? <Menu.Divider /> : ''
                }
                {
                    authSet.indexOf('A-001-303') >= 0 ? (
                        <Menu.Item key="1">
                            <a onClick={e => this.setState({ isModalDeptVisible: true })}>创建部门</a>
                        </Menu.Item>
                    ) : ''
                }
            </Menu>
        );

        this.rowSelection = {
            onChange: (selectedRowKeys) => {
                let { moveData } = this.state;
                this.setState({
                    isMoveAllEnable: selectedRowKeys.length ? false : true,
                    moveData: Object.assign({}, moveData, {
                        targetUserIds: selectedRowKeys
                    })
                });
            }
        };

        this.state = {
            memberTotal: '0',
            dataSource: [],
            isModalMemberVisible: false,
            isModalDeptVisible: false,
            isModalMoveVisible: false,
            isModalMoveDeptVisible: false,
            isModalEditDeptVisible: false,
            isEditDeptNameEnable: true,
            columns: [{
                title: '称呼',
                key: 'nickName',
                dataIndex: 'nickName'
            }, {
                title: '岗位',
                key: 'positionName',
                dataIndex: 'positionName'
            }, {
                title: '手机',
                key: 'mobileNo',
                dataIndex: 'mobileNo'
            }, {
                title: '邮箱',
                key: 'email',
                dataIndex: 'email'
            }, {
                title: '操作',
                width: '190',
                render: (data) => (
                    <span>
                        <a onClick={(e) => this.viewModalMember(data.id)}
                        >查看详情</a>
                        {
                            authSet.indexOf('A-001-307') >= 0 ? (
                                <span>
                                    <Divider type="vertical" />
                                    <a onClick={(e) => this.moveItem(data.depId, data.id)}
                                    >移动</a>
                                </span>
                            ) : ''
                        }
                    </span>
                )
            }],
            currentDeptId: '',
            rightSelectedNode: '',
            memberId: '',
            isMoveAllEnable: true,
            moveData: {
                "fromOrgId": '',
                "toOrgId": '',
                "targetUserIds": []
            }
        }
    }
    componentDidMount() {
        this.getList();
    }
    getList(parentOrgId) {
        let that = this;
        AccountService.getOrgUserList(parentOrgId || null).then(res => {
            if (res.success) {
                that.setState({
                    dataSource: res.data,
                    memberTotal: res.data.length
                });
            } else {
                //todo errorcode
            }
        });
    }
    getTreeValue = (e, infos) => {
        let deptId = infos.selectedNodes[0].props.dataRef.value;
        this.getList(deptId);
        this.setState({ currentDeptId: deptId });
    }
    moveMembers = () => {
        let { fromOrgId, toOrgId, targetUserIds } = this.state.moveData,
            { currentDeptId } = this.state,
            that = this;

        let data = {
            "fromOrgId": fromOrgId,
            "toOrgId": toOrgId,
            "targetUserIds": targetUserIds
        };
        AccountService.moveUsersDepartment(data).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '移动成功！'
                });
                that.setState({ isModalMoveVisible: false });
                this.getList(currentDeptId);
            } else {
                //todo errcode
            }
        });
    }
    getModalTreeValue = (e, infos) => {
        let deptId = infos.selectedNodes[0].props.dataRef.value;
        let { moveData } = this.state;

        this.setState({
            moveData: Object.assign({}, moveData, {
                toOrgId: deptId
            })
        });
    }
    moveAll() {
        let { dataSource, moveData } = this.state;

        this.setState({
            isModalMoveVisible: true,
            moveData: Object.assign({}, moveData, {
                fromOrgId: dataSource[0].depId
            })
        });
    }
    moveItem(oldOrgId, id) {
        this.setState({
            isModalMoveVisible: true,
            moveData: {
                fromOrgId: oldOrgId,
                targetUserIds: [id],
                toOrgId: ''
            }
        });
    }
    viewModalMember(id) {
        this.setState({
            isModalMemberVisible: true,
            memberId: id
        });
    }
    closeModalMember = (isRefresh) => {
        let { currentDeptId } = this.state;
        this.setState({ isModalMemberVisible: false });
        if (isRefresh == 'refresh'){
            this.getList(currentDeptId);
        }
    }
    closeModalDept = (isRefresh) => {
        this.setState({ isModalDeptVisible: false });
        if (isRefresh == 'refresh'){
            this.refreshTree();
        }
    }
    refreshTree() {
        this.refs.childsFunc.refreshTree();
    }
    // ----------- 树右键菜单功能 start ---------
    addMemberByDeptId(dataRef) {
        this.setState({
            isModalMemberVisible: true,
            memberId: '',
            rightSelectedNode: dataRef
        });
    }
    creatDeptByDeptId(dataRef) {
        this.setState({
            isModalDeptVisible: true,
            rightSelectedNode: dataRef
        });
    }
    editDeptNameByDeptId(dataRef) {
        this.setState({
            isModalEditDeptVisible: true,
            rightSelectedNode: dataRef
        });
    }
    moveDeptByDeptId(dataRef) {
        this.setState({
            isModalMoveDeptVisible: true,
            movedOrgNode: dataRef
        });
    }
    moveDepts = () => {
        let { toOrgId } = this.state.moveData,
            { movedOrgNode } = this.state;

        if (toOrgId == movedOrgNode.value) {
            notification["warning"]({
                message: '不可以选择当前部门！'
            });
            return;
        }

        let data = {
            "orgId": movedOrgNode.value,
            "toOrgId": toOrgId
        };
        AccountService.moveDepartment(data).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '移动成功！'
                });
                this.setState({ isModalMoveDeptVisible: false });
                this.refreshTree();
            } else {
                //todo errcode
            }
        });
    }
    deleteDeptByDeptId = (dataRef) => {
        let that = this;
        const deleteModal = confirm({
            title: '是否确认删除' + dataRef.title + '部门?',
            content: (
                <div style={{ marginTop: '20px' }}>
                    <p><Icon type="sound" theme="outlined" />&nbsp;部门下没有子部门，否则无法删除！</p>
                    <p><Icon type="sound" theme="outlined" />&nbsp;部门下所有成员移动到公司下！</p>
                </div>
            ),
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                AccountService.deleteDepartment(dataRef.value).then(res => {
                    if (res.success) {
                        notification["success"]({
                            message: '删除部门成功！'
                        });
                        deleteModal.destroy();
                        that.refs.childsFunc.refreshTree();
                    } else {
                        if (res.errorCode == 51002) {
                            notification["error"]({
                                message: '无法删除部门！'
                            });
                        }
                        //todo errcode
                    }
                });
            },
            onCancel() {
                deleteModal.destroy();
            }
        });
    }
    editDeptNameChange(e) {
        if (e.target.value) {
            this.setState({
                isEditDeptNameEnable: false,
                editDeptName: e.target.value
            });
        } else {
            this.setState({ isEditDeptNameEnable: true });
        }
    }
    editDeptNameSubmit = () => {
        let { editDeptName, rightSelectedNode } = this.state;
        let data = {
            "name": editDeptName,
            "orgId": rightSelectedNode.value
        };
        AccountService.updateDepartment(data).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '重命名成功！'
                });
                this.setState({ isModalEditDeptVisible: false });
                this.refreshTree();
            } else {
                // todo errrcode
            }
        });
    }
    // ----------- 树右键菜单功能 end ---------
    render() {
        let {
            memberTotal,
            dataSource,
            columns,
            isModalMemberVisible,
            isModalDeptVisible,
            isModalMoveVisible,
            isModalMoveDeptVisible,
            isModalEditDeptVisible,
            memberId,
            rightSelectedNode,
            isMoveAllEnable
        } = this.state;
        let { menu, rowSelection } = this;
        let { authSet } = this.props.userInfo;

        return (
            <div className={sty.deptMgr}>
                <div className={sty.treeWrap}>
                    <div className={sty.title}>
                        <span className={sty.titleTxt}>组织架构</span>
                        <div style={{ display: (authSet.indexOf('A-001-302') >= 0 && authSet.indexOf('A-001-303') >= 0) ? 'block' : 'none' }}>
                            <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
                                <Icon type="plus-circle" theme="outlined" />
                            </Dropdown>
                        </div>
                    </div>
                    <div className={sty.tree}>
                        <TreeAsyn
                            treeValueChange={this.getTreeValue}
                            isRightClick={true}
                            addMemberByDeptId={dataRef => this.addMemberByDeptId(dataRef)}
                            creatDeptByDeptId={dataRef => this.creatDeptByDeptId(dataRef)}
                            editDeptNameByDeptId={dataRef => this.editDeptNameByDeptId(dataRef)}
                            moveDeptByDeptId={dataRef => this.moveDeptByDeptId(dataRef)}
                            deleteDeptByDeptId={dataRef => this.deleteDeptByDeptId(dataRef)}
                            ref="childsFunc"
                        />
                    </div>
                </div>
                <div className={sty.tableWrap}>
                    <div className={sty.title}>
                        <span className={sty.titleTxt}>全部成员（{memberTotal}）</span>
                        <Button onClick={e => this.moveAll(e)} disabled={isMoveAllEnable}>移动</Button>
                    </div>
                    <div className={sty.table}>
                        <Table
                            rowKey={record => record.id}
                            rowSelection={rowSelection}
                            dataSource={dataSource}
                            columns={columns}
                            pagination={false}
                        />
                    </div>
                </div>
                {/* ------------- 成员模态框 ------------- */}
                <Modal
                    visible={isModalMemberVisible}
                    width={550}
                    title={!memberId ? "新增成员" : "查看详情"}
                    maskClosable={false}
                    footer={null}
                    onCancel={e => this.setState({ isModalMemberVisible: false })}
                    bodyStyle={{
                        padding: "0",
                        backgroundColor: "#fff",
                        borderRadius: "3px"
                    }}
                >
                    {/* todo cancel时，调用closeModal，触发componentWillReceiveProps */}
                    {isModalMemberVisible ?
                        <ModalMember
                            id={memberId}
                            rightSelectedNode={rightSelectedNode}
                            closeModal={this.closeModalMember} /> : null}
                </Modal>
                {/* ------------- 部门模态框 ------------- */}
                <Modal
                    visible={isModalDeptVisible}
                    footer={null}
                    width={550}
                    title={"创建部门"}
                    maskClosable={false}
                    onCancel={e => this.setState({ isModalDeptVisible: false })}
                    bodyStyle={{
                        padding: "0",
                        backgroundColor: "#fff",
                        borderRadius: "3px"
                    }}
                >
                    <ModalDept
                        rightSelectedNode={rightSelectedNode}
                        closeModal={this.closeModalDept} />
                </Modal>
                {/* ------------- 移动成员模态框 ------------- */}
                <Modal
                    visible={isModalMoveVisible}
                    width={400}
                    title={"移动成员"}
                    maskClosable={false}
                    okText="移动"
                    onOk={this.moveMembers}
                    cancelText="取消"
                    onCancel={e => this.setState({ isModalMoveVisible: false })}
                    bodyStyle={{
                        padding: "0 20px",
                        minHeight: '250px',
                        backgroundColor: "#fff",
                        borderRadius: "3px"
                    }}
                >
                    <TreeAsyn treeValueChange={this.getModalTreeValue} />
                </Modal>
                {/* ------------- 移动部门模态框 ------------- */}
                <Modal
                    visible={isModalMoveDeptVisible}
                    width={400}
                    title={"移动部门"}
                    maskClosable={false}
                    okText="移动"
                    onOk={this.moveDepts}
                    cancelText="取消"
                    onCancel={e => this.setState({ isModalMoveDeptVisible: false })}
                    bodyStyle={{
                        padding: "0 20px",
                        minHeight: '250px',
                        backgroundColor: "#fff",
                        borderRadius: "3px"
                    }}
                >
                    <TreeAsyn treeValueChange={this.getModalTreeValue} />
                </Modal>
                {/* ------------- 修改部门名称模态框 ------------- */}
                <Modal
                    visible={isModalEditDeptVisible}
                    width={400}
                    title={"修改部门名称"}
                    maskClosable={false}
                    okText="确认"
                    onOk={this.editDeptNameSubmit}
                    okButtonProps={{ disabled: this.state.isEditDeptNameEnable }}
                    cancelText="取消"
                    onCancel={e => this.setState({ isModalEditDeptVisible: false })}
                    bodyStyle={{
                        padding: "0",
                        backgroundColor: "#fff",
                        borderRadius: "3px"
                    }}
                >
                    <div style={{ width: '100%', padding: '30px 45px' }}>
                        <Input
                            placeholder="请输入部门名称"
                            onChange={e => this.editDeptNameChange(e)} />
                    </div>
                </Modal>
            </div>
        );
    }
}


export default connect(
    state => {
        return {
            userInfo: state.appRoot.userInfo
        }
    }
)(DeptMgr);