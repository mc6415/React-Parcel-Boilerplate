import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Grid, Header, Segment, Icon, Button } from 'semantic-ui-react';
import Firebase from 'firebase';
import fb from '../firebase';

class Home extends  Component {
    constructor(props){
        super(props);
        this.state = {siteSettings: {}}
    }

    loginGoogle = () => {
        const provider = new Firebase.auth.GoogleAuthProvider();
        fb.auth().signInWithPopup(provider)
            .then(() => {
                this.props.history.push('/profile');
            });
    };

    componentWillMount = () => {
        fb.firestore().collection("site").doc("loginExample")
            .onSnapshot(doc => {
                if(doc.exists){
                    this.setState({siteSettings: doc.data()})
                } else {
                    fb.firestore().collection("site").doc("loginExample").set({
                        name: "loginExample"
                    })
                }
            })
    }

    loginFacebook = () => {
        const provider = new Firebase.auth.FacebookAuthProvider();
        fb.auth().signInWithPopup(provider)
            .then(() => {
                this.props.history.push('/profile');
            });
    };

    loginGithub = () => {
        const provider = new Firebase.auth.GithubAuthProvider();
        fb.auth().signInWithPopup(provider)
            .then(() => {
                this.props.history.push('/profile');
            });
    };

    loginAnon = () => {
        fb.auth().signInAnonymously()
            .then(() => {
                this.props.history.push('/profile');
            });
    };

    updateTitle = () => {
        fb.firestore().collection("site").doc("loginExample").update({
            name: "Firebase Example",
            posts: ["Test", "Test2"],
            address: {}
        })
    }

    render(){
        return(
            <Grid divided centered>
               <Grid.Row>
                    <Header as="h1" icon inverted>
                        <Icon name="user" inverted />
                        <Header.Content>Welcome to {this.state.siteSettings.name}</Header.Content>
                        <Header.Subheader>Please login with one of the options below</Header.Subheader>
                    </Header>
               </Grid.Row>
               <Grid.Row>
                    <Button icon labelPosition="left" color="green" inverted onClick={this.loginGoogle}>
                        <Icon name="google" />
                        Login with Google
                    </Button>
                   <Button icon labelPosition="left" color="blue" inverted onClick={this.loginFacebook}>
                       <Icon name="facebook" />
                       Login with Facebook
                   </Button>
               </Grid.Row>
                <Grid.Row>
                    <Button icon labelPosition="left" color="purple" inverted onClick={this.loginGithub}>
                        <Icon name="github" />
                        Login with Github
                    </Button>
                    <Button icon labelPosition="left" color="grey" inverted onClick={this.loginAnon}>
                        <Icon name="user" />
                        Login anonymously
                    </Button>
                </Grid.Row>
                <Grid.Row>
                    <Button color="red" content="Update Title" onClick={this.updateTitle}/>
                </Grid.Row>

            </Grid>
        )
    }
}

export default withRouter(Home);