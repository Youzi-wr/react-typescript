import React from 'react';
import { connect } from 'react-redux';
import nav from '../nav';
import NavActive from './Active';
import sidebar from './sidebar.scss';

let sty = sidebar;

class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navConfig: this.props.navConfig,
            sidebarList: []
        }
    }
    componentDidMount() {
        this.filterTopMenu();
    }
    filterTopMenu() {
        let { navConfig } = this.state;
        let { userInfo } = this.props;
        let authSet = userInfo ? userInfo.authSet : [];
        let parentNav = nav.find(item => item.menu == navConfig);
        let sidebarList = parentNav.children ? parentNav.children.reduce(function (arr, item) {
            if (!item["autId"] || authSet.indexOf(item["autId"]) != -1) {
                arr.push(item);
            }
            return arr;
        }, []) : [];

        this.setState({ sidebarList });
    }
    render() {
        const { sidebarList } = this.state;
        const { authSet } = this.props.userInfo;

        return (
            <div className={sty.navBar}>
                <ul className={sty.wrap}>
                    {
                        sidebarList.map(item => {
                            if (!item.autId || authSet.indexOf(item.autId) >= 0)
                                return <NavActive key={item.menu} to={item.router}>{item.name}</NavActive>;
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            userInfo: state.appRoot.userInfo,
            navPermission: state.appRoot.navPermission
        }
    },
    dispatch => {
        return {
            navPermissionFun(permissionList) {
                dispatch({ type: 'NAVPERMISSION', permissionList });
            }
        }
    }
)(SideBar);

