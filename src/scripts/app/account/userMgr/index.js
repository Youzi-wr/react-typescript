import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Input, Upload, Button, Icon, Table, Divider, notification, Modal } from 'antd';
import AccountService from 'scripts/services/AccountService';
import sty from '../account.scss';

class UserMgr extends React.Component {
    constructor(props) {
        super(props);
        let { webConfig, userInfo } = this.props;
        let { authSet, tenant } = userInfo;
        let { deleteUser } = webConfig.user;
        let that = this;

        let columns = [{
            title: '序号',
            key: 'id',
            render(data, record, index) {
                let { pageNum } = that.state.searchFilter;
                return (pageNum - 1) * 10 + index + 1;
            }
        }, {
            title: '昵称',
            key: 'nickName',
            dataIndex: 'nickName'
        }, {
            title: '邮箱',
            key: 'email',
            dataIndex: 'email'
        }, {
            title: '用户ID',
            key: 'registerName',
            dataIndex: 'registerName'
        }, {
            title: '手机',
            key: 'mobileNo',
            dataIndex: 'mobileNo'
        }, {
            title: '安全级别',
            key: 'level',
            dataIndex: 'level',
            render(level) {
                let descn;
                tenant.personSecurityVOList.map((item, i) => {
                    if (level == item.level)
                        descn = <span key={i}>{item.descn}</span>;
                });
                return descn;
            }
        }, {
            title: '操作',
            width: '215',
            render: (data) => (
                <span>
                    {
                        authSet.indexOf('A-001-102') >= 0 ?
                            <a onClick={(e) => this.showDetail(data.id)}
                            >查看详情</a> : ''
                    }
                    {
                        deleteUser && authSet.indexOf('A-001-104') >= 0 ?
                            (
                                <span>
                                    <Divider type="vertical" />
                                    <a onClick={(e) => this.deleteItem(data)}
                                    >删除</a>
                                </span>
                            ) : ''
                    }
                    {
                        !deleteUser && authSet.indexOf('A-001-104') >= 0 ?
                            data.status === 'AVAILABLE' ?
                                (
                                    <span>
                                        <Divider type="vertical" />
                                        <a className={sty.redTip}
                                            onClick={(e) => this.disableItem(data.id)}
                                        >禁用</a>
                                    </span>
                                ) : (
                                    <span>
                                        <Divider type="vertical" />
                                        <a className={sty.redTip}
                                            onClick={(e) => this.enableItem(data.id)}
                                        >启用</a>
                                    </span>
                                ) : ''
                    }
                    {
                        authSet.indexOf('A-001-105') >= 0 ?
                            (
                                <span>
                                    <Divider type="vertical" />
                                    <a onClick={(e) => this.resetPassword(data.id)}>重置密码</a>
                                </span>
                            ) : ''
                    }
                </span>
            )
        }];

        this.state = {
            dataSource: [],
            total: 0,
            columns,
            searchFilter: {
                keyWord: '',
                sortField: null,
                sortType: null,
                pageSize: 10,
                pageNum: 1
            },
            toAddUser: false,
            isNewUser: false,
            accountId: '',
            toResetPassword: false,
            resetId: '',
            isShowDeleteModal: false,
            deleteUserId: ''
        };
    }
    componentDidMount() {
        let { searchFilter } = this.state;

        this.getList(searchFilter);
    }
    deleteItem(user) {
        let { id, nickName } = user;

        this.setState({
            isShowDeleteModal: true,
            deleteUserId: id
        });
    }
    delete() {
        let { deleteUserId } = this.state;
        let that = this;

        if (deleteUserId) {
            AccountService.disableAccount(deleteUserId).then(res => {
                if (res.success) {
                    notification["success"]({
                        message: '删除成功！'
                    });

                    let { searchFilter } = that.state;
                    that.getList(searchFilter);
                    that.setState({
                        isShowDeleteModal: false
                    });
                } else {
                    notification["error"]({
                        message: '删除失败！'
                    });
                }
            });
        }
    }
    cancel() {
        this.setState({
            isShowDeleteModal: false,
            deleteUserId: ''
        });
    }
    disableItem(id) {
        let that = this;
        AccountService.disableAccount(id).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '禁用成功！'
                });

                let { searchFilter } = that.state;
                that.getList(searchFilter);
            } else {
                notification["error"]({
                    message: '禁用失败！'
                });
            }
        });
    }
    enableItem(id) {
        let that = this;
        AccountService.enableAccount(id).then(res => {
            if (res.success) {
                notification["success"]({
                    message: '启用成功！'
                });

                let { searchFilter } = that.state;
                that.getList(searchFilter);
            } 
        });
    }
    resetPassword(id) {
        this.setState({
            toResetPassword: true,
            resetId: id
        });
    }
    showDetail(id) {
        this.setState({
            toAddUser: true,
            isNewUser: false,
            accountId: id
        });
    }
    addUser() {
        this.setState({
            toAddUser: true,
            isNewUser: true
        });
    }
    handleTableChange(pagination) {
        let filterData = Object.assign({}, this.state.searchFilter, {
            pageNum: pagination.current
        });

        this.setState({ searchFilter: filterData });
        this.getList(filterData);
    }
    filterByKeyWord(keyWord) {
        let filterData = Object.assign({}, this.state.searchFilter, {
            keyWord: keyWord,
            pageNum: 1
        });

        this.setState({ searchFilter: filterData });
        this.getList(filterData);
    }
    exportAccount() {
        let { searchFilter } = this.state;

        AccountService.exportFile(searchFilter.keyWord);
    }
    getList(searchFilter) {
        let { webConfig } = this.props;
        let { searchAPI } = webConfig.user;
        let that = this;

        AccountService.getAccountList(searchAPI, searchFilter).then(function (res) {
            if (res.success) {
                that.setState({
                    dataSource: res.data.accountList,
                    total: res.data.total
                });
            }
        });
    }
    uploadFile = (info) => {
        if (info.file.status === 'done') {
            if (info.file.response.success) {
                notification["success"]({
                    message: '导入成功！'
                });
            } else {
                notification["error"]({
                    message: '导入失败！'
                });
            }
        } else if (info.file.status === 'error') {
            notification["error"]({
                message: '导入失败！'
            });
        }
    }
    render() {
        let { dataSource, columns, total, searchFilter, toAddUser, isNewUser, accountId, toResetPassword, resetId, isShowDeleteModal } = this.state;
        let { userInfo, authInfo } = this.props;
        let { authSet } = userInfo;

        if (toAddUser) {
            return isNewUser ?
                <Redirect to="/account/addUser" /> :
                <Redirect to={{
                    pathname: '/account/addUser/' + accountId
                }} />;
        } else if (toResetPassword) {
            return <Redirect to={{
                pathname: '/account/resetPassword/' + resetId
            }} />;
        } else {
            return (
                <div className={sty.userMgr}>
                    <Form layout="inline" className="clearfix">
                        <div className={sty.formWrap}>
                            <div className={`${sty.formItemLeft} ant-form-item`}
                                style={{ display: authSet.indexOf('A-001-101') >= 0 ? 'block' : 'none' }}>
                                <Input placeholder="输入查询关键字" onPressEnter={e => this.filterByKeyWord(e.target.value)} />
                            </div>

                            <div className={sty.formItemCenter}>
                                <span>共&nbsp;<span>{total}</span>&nbsp;结果</span>
                            </div>

                            <div style={{ display: authSet.indexOf('A-001-106') >= 0 ? 'block' : 'none' }}>
                                <Upload
                                    name="__account"
                                    action="/admin/api/manage/account/create/user/import"
                                    headers={{
                                        authorization: 'Bearer ' + authInfo.access_token
                                    }}
                                    onChange={this.uploadFile}
                                    showUploadList={false}
                                    accept=".xls,.xlsx"
                                    listType="text">
                                    <Button>
                                        <Icon type="download" />导入
                                    </Button>
                                </Upload>
                            </div>

                            <div style={{ display: authSet.indexOf('A-001-107') >= 0 ? 'block' : 'none' }}>
                                <Button type="primary" onClick={e => this.exportAccount(e)}>
                                    <Icon type="upload" />导出
                                </Button>
                            </div>

                            <div style={{ display: authSet.indexOf('A-001-107') >= 0 ? 'block' : 'none' }}>
                                <Button type="primary" onClick={e => this.addUser(e)}>
                                    <Icon type="plus" />新增
                                </Button>
                            </div>
                        </div>
                    </Form>

                    <div className={sty.gridTable}>
                        <h3>用户列表</h3>
                        <Table rowKey={record => record.id}
                            dataSource={dataSource}
                            columns={columns}
                            pagination={{
                                total: total,
                                pageSize: 10,
                                current: searchFilter.pageNum
                            }}
                            onChange={pagination => this.handleTableChange(pagination)}
                        />
                    </div>

                    <Modal
                        title="提示"
                        visible={isShowDeleteModal}
                        onOk={() => this.delete()}
                        onCancel={() => this.cancel()}
                        width={400}
                        okText="确认"
                        cancelText="取消"
                    >确认删除用户？</Modal>
                </div>
            );
        }
    }
}

export default connect(
    state => {
        return {
            webConfig: state.appRoot.webConfig,
            userInfo: state.appRoot.userInfo,
            authInfo: state.appRoot.authInfo
        }
    }
)(UserMgr);