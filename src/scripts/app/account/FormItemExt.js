import React from 'react';
import ReactDOM from 'react-dom';
import { TreeSelect, Tree, Menu, Dropdown, Icon } from 'antd';
import AccountService from 'scripts/services/AccountService';
import './contextmenu.scss';

const TreeNode = Tree.TreeNode;
const { userInfo } = AppGlobal.getStore().appRoot;
const authSet = userInfo.authSet;

class TreeSelectAsyn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            treeData: []
        }
    }
    componentDidMount() {
        let that = this;

        AccountService.getParentOrgById(null).then(res => {
            if (res.success) {
                let treeData = res.data;
                let orgList = [];

                treeData.map((item, i) => {
                    !i ? orgList.push({
                        'title': item.name,
                        'key': '0',
                        'value': item.orgId.toString(),
                        'avatarUrl': item.avatarUrl,
                        'children': []
                    }) : orgList[0].children.push(!item.numOfOrg ? {
                        'title': item.name,
                        'key': '0-' + (i - 1),
                        'value': item.orgId.toString(),
                        'avatarUrl': item.avatarUrl,
                        'isLeaf': true
                    } : {
                            'title': item.name,
                            'key': '0-' + (i - 1),
                            'value': item.orgId.toString(),
                            'avatarUrl': item.avatarUrl
                        })
                });

                that.setState({
                    treeData: orgList
                });
            }
        });
    }
    onLoadData(treeNode) {
        let parentId = treeNode.props.value;
        return new Promise(resolve => {
            AccountService.getParentOrgById(parentId).then(res => {
                if (res.success) {
                    let dd = this.getNewTreeData(parentId, this.generateTreeNodes(treeNode, res.data));
                    let newData = JSON.stringify(dd);

                    this.setState({
                        treeData: JSON.parse(newData)
                    });
                }
                resolve();
            });
        });
    }
    generateTreeNodes(treeNode, newChilds) {
        let newChildsList = [];

        newChilds.forEach((item, i) => {
            newChildsList.push({
                'title': item.name,
                'key': treeNode.props.eventKey + '-' + i,
                'value': item.orgId.toString(),
                'avatarUrl': item.avatarUrl,
                'isLeaf': item.numOfOrg ? false : true
            });
        });

        return newChildsList;
    }
    getNewTreeData(curKey, child) {
        let { treeData } = this.state;

        const loop = (data) => {
            data.forEach((item) => {
                if (curKey.indexOf(item.value) === 0) {
                    item.children = child;
                    return;
                }
                if (item.children) {
                    loop(item.children);
                }
            });
        };
        loop(treeData);

        return treeData;
    }
    render() {
        let { treeData } = this.state;
        let { isDisabled, deptId, deptName, placeholder } = this.props;

        let initData = {
            value: deptId ? deptId.toString() : '',
            label: deptName 
        };
        
        return (
            <TreeSelect
                disabled={isDisabled}
                labelInValue
                value={initData}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder={placeholder || "请选择用户部门"}
                treeData={treeData}
                treeDefaultExpandedKeys={['0']}
                loadData={e => this.onLoadData(e)}
                onChange={e => this.props.treeValueChange(e)}
                notFoundContent={'暂无数据'}
            />
        );
    }
}

class TreeAsyn extends React.Component {
    state = {
        expandedKeys: ["0"],
        treeData: []
    }
    componentDidMount() {
        this.initTree();
    }
    initTree() {
        AccountService.getParentOrgById(null).then(res => {
            if (res.success) {
                let treeData = res.data;
                let orgList = [];

                treeData.map((item, i) => {
                    !i ? orgList.push({
                        'title': item.name,
                        'key': '0',
                        'value': item.orgId.toString(),
                        'avatarUrl': item.avatarUrl,
                        'children': []
                    }) : orgList[0].children.push(!item.numOfOrg ? {
                        'title': item.name,
                        'key': '0-' + (i - 1),
                        'value': item.orgId.toString(),
                        'avatarUrl': item.avatarUrl,
                        'isLeaf': true
                    } : {
                            'title': item.name,
                            'key': '0-' + (i - 1),
                            'value': item.orgId.toString(),
                            'avatarUrl': item.avatarUrl
                        })
                });

                this.setState({
                    treeData: orgList
                });
            }
        });
    }
    onLoadData = (treeNode) => {
        let parentId = treeNode.props.value;
        return new Promise(resolve => {
            if (treeNode.props.children) {
                resolve();
                return;
            }

            AccountService.getParentOrgById(parentId).then(res => {
                if (res.success) {
                    let dd = this.generateTreeNodes(treeNode, res.data);
                    let newData = JSON.stringify(dd);
                    treeNode.props.dataRef.children = JSON.parse(newData);

                    this.setState({
                        treeData: [...this.state.treeData]
                    });
                }
                resolve();
            });
        });
    }
    generateTreeNodes(treeNode, newChilds) {
        let newChildsList = [];

        newChilds.forEach((item, i) => {
            newChildsList.push({
                'title': item.name,
                'key': treeNode.props.eventKey + '-' + i,
                'value': item.orgId.toString(),
                'avatarUrl': item.avatarUrl,
                'isLeaf': item.numOfOrg ? false : true
            });
        });

        return newChildsList;
    }
    renderTreeNodes = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key} dataRef={item}>
                        {this.renderTreeNodes(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode {...item} dataRef={item} />;
        });
    }
    onExpand = (e, expandedKeys) => {
        this.setState({
            expandedKeys: e
        });
    }
    refreshTree = () => {
        this.setState({ treeData: [] });
        this.initTree();
    }
    // ------------- treeRightClick start --------------
    componentWillUnmount() {
        if (this.cmContainer) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            document.body.removeChild(this.cmContainer);
            this.cmContainer = null;
        }
    }
    onRightClick = (info) => {
        this.renderCm(info);
    }
    renderCm(info) {
        if (this.toolTip) {
            ReactDOM.unmountComponentAtNode(this.cmContainer);
            this.toolTip = null;
        }

        const menu = (
            <Menu>
                {
                    authSet.indexOf('A-001-302') >= 0 ? (
                        <Menu.Item key="0">
                            <a onClick={e => this.props.addMemberByDeptId(info.node.props.dataRef)}>新增成员</a>
                        </Menu.Item>
                    ) : ''
                }
                {authSet.indexOf('A-001-302') >= 0 ? <Menu.Divider /> : ''}
                {
                    authSet.indexOf('A-001-303') >= 0 ? (
                        <Menu.Item key="1" style={{ display: authSet.indexOf('A-001-303') >= 0 ? 'block' : 'none' }}>
                            <a onClick={e => this.props.creatDeptByDeptId(info.node.props.dataRef)}>创建部门</a>
                        </Menu.Item>
                    ) : ''
                }
                {authSet.indexOf('A-001-303') >= 0 ? <Menu.Divider /> : ''}
                {
                    authSet.indexOf('A-001-304') >= 0 ? (
                        <Menu.Item key="2">
                            <a onClick={e => this.props.editDeptNameByDeptId(info.node.props.dataRef)}>重命名</a>
                        </Menu.Item>
                    ) : ''
                }
                {authSet.indexOf('A-001-304') >= 0 ? <Menu.Divider /> : ''}
                {
                    authSet.indexOf('A-001-305') >= 0 ? (
                        <Menu.Item key="3">
                            <a onClick={e => this.props.moveDeptByDeptId(info.node.props.dataRef)}>移动</a>
                        </Menu.Item>
                    ) : ''
                }
                {authSet.indexOf('A-001-305') >= 0 ? <Menu.Divider /> : ''}
                {
                    authSet.indexOf('A-001-306') >= 0 ? (
                        <Menu.Item key="4">
                            <a onClick={e => this.props.deleteDeptByDeptId(info.node.props.dataRef)}>删除</a>
                        </Menu.Item>
                    ) : ''
                }
            </Menu>
        );

        this.toolTip = (
            <Dropdown overlay={menu} defaultVisible trigger={['click']} placement="bottomLeft">
                <span></span>
            </Dropdown>
        );

        const container = this.getContainer();
        Object.assign(this.cmContainer.style, {
            position: 'absolute',
            left: `${info.event.pageX}px`,
            top: `${info.event.pageY}px`
        });

        ReactDOM.render(this.toolTip, container);
    }
    getContainer() {
        if (!this.cmContainer) {
            this.cmContainer = document.createElement('div');
            document.body.appendChild(this.cmContainer);
        }
        return this.cmContainer;
    }
    // ------------- treeRightClick end --------------
    render() {
        let { expandedKeys } = this.state;
        let { isRightClick } = this.props;
        let ex = JSON.parse(JSON.stringify(expandedKeys)); //TODO ?

        return (
            <div>
                {
                    this.state.treeData.length ?
                        <Tree loadData={this.onLoadData}
                            onExpand={this.onExpand}
                            expandedKeys={ex}
                            onRightClick={isRightClick ? this.onRightClick : null}
                            onSelect={(e, infos) => this.props.treeValueChange(e, infos)}>
                            {this.renderTreeNodes(this.state.treeData)}
                        </Tree> : <Icon type="loading" theme="outlined" />
                }
            </div>
        );
    }
}

export default {
    TreeSelectAsyn,
    TreeAsyn
}