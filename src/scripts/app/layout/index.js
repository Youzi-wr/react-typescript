import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import { connect } from 'react-redux';
import Loadable from 'react-loadable';
import {Helmet} from 'react-helmet';
import AppSpin from 'scripts/app/spin';
import Head from 'scripts/app/head';
import layout from './layout.scss';
const sty = layout;

class Layout extends React.Component {
    componentDidMount() {
        const { getWebConfig } = this.props;
        getWebConfig();
    }
    render() {
        const { navPermission, webConfig } = this.props;

        return (
            <div className={sty.right}>
                <Helmet>
                    <title>{webConfig && webConfig.html.title}</title>
                </Helmet>
                
                {/* <Head /> 解决双导航navLink不生效问题*/}
                <Route path="/:place" component={Head} />
                <div className={sty.pageWrap}>
                    <div className={sty.pageContent}>
                        {navPermission && navPermission.length && (webConfig ?
                            <Switch>
                                <Route path="/account" component={
                                    Loadable({
                                        loader: () => import(/* webpackChunkName: "account" */ 'scripts/app/account').then(object => object.default),
                                        loading: AppSpin
                                    })
                                } />
                                <Redirect to={`/${navPermission[0]}`} />
                            </Switch> : null
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(
    state => {
        return {
            webConfig: state.appRoot.webConfig,
            navPermission: state.appRoot.navPermission
        }
    },
    dispatch => {
        return {
            getWebConfig() {
                dispatch({ type: 'GET_WEBCONFIG' });
            }
        }
    }
)(Layout);

