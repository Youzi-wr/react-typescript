import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router-dom';
import Login from 'scripts/app/login';

class PublicLayout extends React.Component {
    render() {
        return (
            <Switch>
                <Route path="/login" component={Login} />
                <Redirect to="/login" />
            </Switch>
        );
    }
}

export default PublicLayout;

