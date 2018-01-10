import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Grid, Transition, Loader } from 'semantic-ui-react';
import fb from '../firebase';

class Voting extends Component{
    constructor(props){
        super(props);
        this.state = {loggedIn: false};
    }

    componentWillMount = () => {

    }

    render(){
        if(!this.state.loggedIn){
            return( <Loader active inline size="massive" /> )
        }
        return(
            <Grid>
                <Grid.Column width={4}>
                    <h1>Hello World</h1>
                </Grid.Column>
                <Grid.Column width={8}>
                    <h1>Hello Again</h1>
                </Grid.Column>
            </Grid>
        )
    }
}

export default withRouter(Voting);