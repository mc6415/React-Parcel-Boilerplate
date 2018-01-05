import React, { Component } from 'react';
import {Header, Button, Icon} from 'semantic-ui-react';
import {withRouter} from 'react-router';
import Firebase from 'firebase';
import fb from '../firebase';

class Home extends  Component {
    constructor(props){
        super(props);
        this.state = {name: ''};
    }

    loginGoogle = () => {
        const provider = new Firebase.auth.GoogleAuthProvider();
        fb.auth().signInWithPopup(provider)
            .then(() => {
                this.props.history.push('/Clients');
            })
    };

    loginFacebook = () => {
        const provider = new Firebase.auth.FacebookAuthProvider();
        fb.auth().signInWithPopup(provider)
            .then(() => {
                this.props.history.push('/Clients')
            })
    };

    render(){
        return(
            <div>
                <Header as="h1" inverted>Welcome</Header>
                <Button color="green" icon labelPosition="left" onClick={this.loginGoogle}>
                    <Icon name="google" />
                    Login with Google
                </Button>
                <Button color="blue" icon labelPosition="left" onClick={this.loginFacebook}>
                    <Icon name="facebook" />
                    Login with Facebook
                </Button>
            </div>
        )
    }
}

export default withRouter(Home);