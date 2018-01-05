import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Loader, Header, Segment, Divider, Form, Comment } from 'semantic-ui-react';
import fb from '../firebase';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {loggedIn: false, note: '', notes: []}
    }

    componentWillMount = () => {
        fb.auth().onAuthStateChanged((user) => {
            if(user) {
                this.setState({loggedIn: true});
                const notes = fb.database().ref('notes/' + fb.auth().currentUser.uid);
                const notesCopy = [];
                notes.on('value', (snap) => {
                    notesCopy.length = 0;
                    for(const i in snap.val()){
                        notesCopy.push({
                            ref: i,
                            note: snap.val()[i]
                        });
                    }

                    this.setState({notes: notesCopy})
                });
            }
        })
    };

    updateNote = (event) => {
        this.setState({note: event.target.value})
    };

    addNote = (event) => {
        event.preventDefault();
        const note = {
            author: fb.auth().currentUser.displayName,
            authorID: fb.auth().currentUser.uid,
            note: this.state.note,
            timeAdded: new Date().toISOString()
        };
        fb.database().ref('notes/' + fb.auth().currentUser.uid).push(note);
    };

    removeComment = (id) => {
        fb.database().ref(`notes/${fb.auth().currentUser.uid}/${id}`).remove();
    };

    render(){
        if(!this.state.loggedIn){
            return(
                <Loader active inline="centered" inverted size="massive" />
            );
        }

        const notesList = this.state.notes.map((n) => {
            console.log(n);
            let avatarUrl = `https://api.adorable.io/avatars/285/${fb.auth().currentUser.uid}.png`;
            return(
                <Comment key={n.ref}>
                    <Comment.Avatar as='a' src={avatarUrl} />
                    <Comment.Content>
                        <Comment.Author as="a">{n.note.author}</Comment.Author>
                        <Comment.Metadata>
                            <span>{new Date(n.note.timeAdded).toLocaleString()}</span>
                        </Comment.Metadata>
                        <Comment.Text>{n.note.note}</Comment.Text>
                        <Comment.Actions>
                            <a onClick={() => {this.removeComment(n.ref)}}>Delete</a>
                        </Comment.Actions>
                    </Comment.Content>
                </Comment>
            )
        });

        return (
            <div>
                <Header inverted as="h1"> Welcome {fb.auth().currentUser.displayName} </Header>
                <Segment raised color="green">
                    <Comment.Group>
                        <Header as="h3" dividing> Notes </Header>
                        {notesList}
                    </Comment.Group>
                </Segment>
                <Form>
                    <Form.Group widths="equal">
                        <Form.TextArea label="Note" placeholder="Note Here" value={this.state.note} onChange={this.updateNote} />
                    </Form.Group>
                    <Form.Button onClick={this.addNote}>Add Note</Form.Button>
                </Form>
            </div>
        )
    }
}

export default withRouter(Profile);