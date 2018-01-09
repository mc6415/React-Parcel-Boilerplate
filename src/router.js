import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Components/Home';
import AboutPage from './Components/AboutPage';
import Profile from './Components/Profile';

export default class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/" exact component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

