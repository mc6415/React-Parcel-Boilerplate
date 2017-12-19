import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Components/Home';
import AboutPage from './Components/AboutPage';

export default class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

