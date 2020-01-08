import React from 'react';
import { connect } from 'react-redux';
import { Avatar, Popover, Button, Drawer } from 'antd';
import NavActive from 'scripts/app/sidebar/Active';
import nav from '../nav';
import sty from './head.scss';

class Head extends React.Component {
    state = {
        navList: [],
        visible: false
    }
    componentDidMount() {
        this.filterTopMenu();
    }
    filterTopMenu() {
        let { navPermissionFun, userInfo } = this.props;
        let authSet = userInfo ? userInfo.authSet : [];

        let { navList, navKey } = nav.reduce(function (obj, item) {
            if (!item["autId"] || authSet.indexOf(item["autId"]) != -1) {
                obj.navKey.push(item.menu);
                obj.navList.push(item);
            }
            return obj;
        }, {
            navList: [],
            navKey: []
        });

        navPermissionFun(navKey);
        this.setState({ navList });
    }
    logout() {
        window.sessionStorage.clear();
        window.location.href = '/login';
    }
    showDrawer = () => {
        this.setState({
            visible: true
        });
    }
    onClose = () => {
        this.setState({
            visible: false
        });
    };
    render() {
        let { navList } = this.state;
        let { userInfo } = this.props;
        let logoUrl = userInfo["tenant"]["logoUrl"] ? userInfo["tenant"]["logoUrl"] : '/app-monitor-static/images/logo.png';
        let avatar = userInfo.avatarUrl ? userInfo.avatarUrl : '/app-monitor-static/images/avatar.png';

        return (
            <div className={sty.head}>
                <div className={sty.title}>
                    <Avatar src={logoUrl} style={{ width: "46px", height: "46px" }} />&nbsp;
                    <span className={sty.txt}>{userInfo["tenant"]["shortName"]}</span>
                </div>
                <ul className={sty.headNav}>
                    {
                        navList.map((item, i) => {
                            return <NavActive key={i} to={item.router} activeClassName="head-nav-active">{item.name}</NavActive>;
                        })
                    }
                </ul>
                <div className={sty.headNavMin} onClick={this.showDrawer}>
                    <svg t="1571651040448" viewBox="0 0 1639 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2804" width="20" height="20"><path d="M0 102.4C0 45.846047 45.451756 0 102.4 0 158.953953 0 204.8 45.451756 204.8 102.4 204.8 158.953953 159.348244 204.8 102.4 204.8 45.846047 204.8 0 159.348244 0 102.4ZM409.6 102.4C409.6 45.846047 456.269926 0 512.253266 0L1535.746734 0C1592.440566 0 1638.4 45.451756 1638.4 102.4 1638.4 158.953953 1591.730074 204.8 1535.746734 204.8L512.253266 204.8C455.559434 204.8 409.6 159.348244 409.6 102.4ZM0 512C0 455.446047 45.451756 409.6 102.4 409.6 158.953953 409.6 204.8 455.051756 204.8 512 204.8 568.553953 159.348244 614.4 102.4 614.4 45.846047 614.4 0 568.948244 0 512ZM409.6 512C409.6 455.446047 456.269926 409.6 512.253266 409.6L1535.746734 409.6C1592.440566 409.6 1638.4 455.051756 1638.4 512 1638.4 568.553953 1591.730074 614.4 1535.746734 614.4L512.253266 614.4C455.559434 614.4 409.6 568.948244 409.6 512ZM0 921.6C0 865.046047 45.451756 819.2 102.4 819.2 158.953953 819.2 204.8 864.651756 204.8 921.6 204.8 978.153953 159.348244 1024 102.4 1024 45.846047 1024 0 978.548244 0 921.6ZM409.6 921.6C409.6 865.046047 456.269926 819.2 512.253266 819.2L1535.746734 819.2C1592.440566 819.2 1638.4 864.651756 1638.4 921.6 1638.4 978.153953 1591.730074 1024 1535.746734 1024L512.253266 1024C455.559434 1024 409.6 978.548244 409.6 921.6Z" p-id="2805" fill="#ffffff"></path></svg>
                </div>
                <Drawer
                    placement="left"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    className="head-nav-min-wrap"
                >
                    {
                        navList.map((item, i) => {
                            return <NavActive key={i} to={item.router} activeClassName="head-nav-min-active">{item.name}</NavActive>;
                        })
                    }
                </Drawer>
                {userInfo ?
                    <div className={sty.avatar}>
                        <span>{userInfo.nickName}&nbsp;&nbsp;</span>
                        <Popover
                            placement="bottomRight"
                            content={(
                                <div className="dropdown-menu">
                                    <div className="left">
                                        <Avatar className="user-photo" src={avatar} />
                                    </div>
                                    <div className="right">
                                        <div className="user-name">{userInfo.nickName}</div>
                                        <div className="email">{userInfo.email}</div>
                                    </div>
                                    <Button type="primary" className="btn-logout" onClick={this.logout}>退出账户</Button>
                                </div>
                            )}
                            trigger="click">
                            <Avatar size="large" src={avatar} />
                        </Popover>
                    </div> : null}
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            userInfo: state.appRoot.userInfo
        }
    },
    dispatch => {
        return {
            navPermissionFun(permissionList) {
                dispatch({ type: 'NAVPERMISSION', permissionList });
            }
        }
    }
)(Head);