import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage'
import Page404 from './pages/Page404'

class PrivateRoute extends Component {
    render() {
        const component = this.props.component
        if(localStorage.getItem('TOKEN')) {
            return (
                <Route component={component} />
            )
        } else {
            return (
                <Redirect to="/login" />
            )
        }
    }
}


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route component={Page404} />
            </Switch>
        )
    }
}