import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import Home from './Components/Home';
import AboutPage from './Components/AboutPage';
import Profile from './Components/Profile';
import Clients from './Components/Clients';

export default class Router extends Component{
    render(){
        return(
            <BrowserRouter>
                <Switch>
                    <Route path="/about" component={AboutPage} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/clients" component={Clients} />
                    <Route path="/client/:id" component={Profile} />
                    <Route path="/" component={Home} />
                </Switch>
            </BrowserRouter>
        )
    }
}

