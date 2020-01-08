import React from 'react';
import { NavLink, Route } from 'react-router-dom';

class NavActive extends React.Component {
    onClickMenu(e, url) {
        let toUrl = e.target.href;
        if (toUrl.indexOf('/app/') != '-1') {
            location.href = toUrl.replace('/views', '');
            e.preventDefault();
        }
    }
    render() {
        let { to, activeClassName, children } = this.props;
        return <Route path={to} children={({ match, ...rest }) => (
            <li className={match ? activeClassName || 'nav-active' : ''}>
                <NavLink to={to} onClick={(e, to) => this.onClickMenu(e, to)}>{children}</NavLink>
            </li>
        )} />;
    }
}

export default NavActive;