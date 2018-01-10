import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Grid, Button, Icon, Header} from 'semantic-ui-react';
import Firebase from 'firebase';
import fb from '../firebase';

class Home extends  Component {
    constructor(props){
        super(props);
    }

    loginGoogle = () => {
        const provider = new Firebase.auth.GoogleAuthProvider();
        fb.auth().signInWithPopup(provider).then(u => {
            this.loginUser(u);
        })
    }

    loginUser = (u) => {
        const user = u.user;
        const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            roles: []
        }

        fb.firestore().collection("users").doc(user.uid).get()
            .then(doc => {
                if(!doc.exists){
                    fb.firestore().collection("users").doc(user.uid).set(newUser).then(
                        this.props.history.push('/Voting')
                    )
                } else {
                    this.props.history.push('/Voting')
                }
            })
    }

    render(){
        return(
            <Grid centered>
                <Grid.Row>
                    <Header as="h2" icon inverted>
                        <Icon name="tasks" />
                        Voting App
                        <Header.Subheader>
                            Post and vote on a great many things.
                        </Header.Subheader>
                    </Header>
                </Grid.Row>
                <Grid.Row>
                    <Button icon inverted color="green" labelPosition="left" size="large" onClick={this.loginGoogle}>
                        <Icon name="google" />
                        Login With Google
                    </Button>
                </Grid.Row>
            </Grid>
        )
    }
}

export default withRouter(Home);