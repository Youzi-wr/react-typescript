import React from 'react';
import { Route, Switch } from 'react-router-dom';
import SideBar from 'scripts/app/sidebar';
import UserMgr from './userMgr';
import AdminMgr from './adminMgr';
import DeptMgr from './deptMgr';
import AddUser from './userMgr/AddUser';
import ResetPassword from './userMgr/ResetPassword';
import RedirectControl from 'scripts/app/sidebar/RedirectControl';
import sty from './account.scss';

class Account extends React.Component {
    state = {
        navConfig: "account"
    }
    render() {
        const { navConfig } = this.state;

        return (
            <div style={{ height: '100%', padding: '16px' }}>
                <SideBar navConfig={navConfig} />
                <div className={sty.account}>
                    <Switch>
                        <Route path="/account/userMgr" component={UserMgr} />
                        <Route path="/account/adminMgr" component={AdminMgr} />
                        <Route path="/account/deptMgr" component={DeptMgr} />
                        <Route path="/account/addUser" component={AddUser} />
                        <Route path="/account/resetPassword" component={ResetPassword} />
                        <RedirectControl navConfig={navConfig} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default Account;