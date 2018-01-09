import React, {Component} from 'react';
import { withRouter } from 'react-router';

class AboutPage extends Component {
    render(){
        return(
            <h1>Different Page!</h1>
        )
    }
}

export default withRouter(AboutPage);