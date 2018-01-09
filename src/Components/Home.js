import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Grid, Header } from 'semantic-ui-react';

class Home extends  Component {
    render(){
        return(
            <Grid centered>
                <Grid.Row>
                    <Header as="h1"> Hello World </Header>
                </Grid.Row>
            </Grid>
        )
    }
}

export default withRouter(Home);