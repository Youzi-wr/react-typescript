import React from 'react';
import { connect } from 'react-redux';
import nav from '../nav';
import Page404 from '../spin/404';
import { Route, Redirect } from 'react-router-dom';

delete nav.default;

class RedirectControl extends React.Component {
    render() {
        const { authSet } = this.props.userInfo;
        const { navConfig } = this.props;
        let parentNav = nav.find(item => item.menu == navConfig);
        
        return <div>
            <Route path={`/${navConfig}/page404`} component={Page404} />
            {
                ((sideMenuList, authSet, navConfig) => {
                    if (sideMenuList && sideMenuList.length) {
                        let compo = sideMenuList.find(item => (authSet.indexOf(item.autId) >= 0) || !item.autId);
                        return compo ? <Redirect to={compo.router} /> : <Redirect to={`/${navConfig}/page404`} />;
                    } else {
                        return <Redirect to={`/${navConfig}/page404`} />;
                    }
                })(parentNav["children"], authSet, navConfig)
            }
        </div>;
    }
}

export default connect(
    state => {
        return {
            userInfo: state.appRoot.userInfo
        }
    }
)(RedirectControl);