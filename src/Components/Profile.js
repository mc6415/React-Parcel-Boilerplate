import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Header, Loader } from 'semantic-ui-react';
import fb from '../firebase';
require('firebase/firestore');

class Profile extends  Component{
    constructor(props){
        super(props);
        this.state = {loggedIn: false, isAnon: false, user: {firstName: ''}}
    }

    componentWillMount = () => {
        fb.auth().onAuthStateChanged(user => {
            if(user){
                this.setState({loggedIn: true, isAnon: user.isAnonymous});
            } else {
                this.props.history.push("/");
            }
        });
    };

    render(){
        if(!this.state.loggedIn){
            return(
                <Loader active size="massive" inline/>
            )
        }

        let welcomeLine = this.state.isAnon ? "Welcome Anon!" : "Welcome User!";




        return(
            <Header as="h1" inverted>{welcomeLine}</Header>
        )
    }
}

export default withRouter(Profile);