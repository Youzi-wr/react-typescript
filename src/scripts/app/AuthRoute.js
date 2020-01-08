import React from 'react';
import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom';
import { connect } from 'react-redux';
import AppSpin from 'scripts/app/spin';
import Layout from 'scripts/app/layout';
import PublicLayout from 'scripts/app/layout/PublicLayout';

class AuthRoute extends React.Component {
    componentDidMount() {
        let { checkAuthInfo } = this.props;
        checkAuthInfo();
    }
    render() {
        const { authInfo } = this.props.appRoot;
        
        if (!authInfo) {
            return <Route path="/" component={AppSpin} />;
        } else if (authInfo.access_token) {
            return (
                <Switch>
                    <Route path="/" component={Layout} />
                    <Redirect to="/" />
                </Switch>
            );
        } else {
            return <Route path="/" component={PublicLayout} />;
        }
    }
}


export default withRouter(connect(
    state => {
        return {
            appRoot: state.appRoot
        }
    }, 
    dispatch => {
        return {
            checkAuthInfo: () => {
                dispatch({ type: 'CHECK_AUTHINFO' });
            }
        }
    }
)(AuthRoute));