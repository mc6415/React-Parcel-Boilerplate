import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Grid, Header, Icon, Segment, Form, Button, TextArea, Comment } from 'semantic-ui-react';
import moment from 'moment';
import fb from '../firebase';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {loggedIn: false, note: '', notes: [], client: {address: {postcode:'', houseNum:'', town: '', streetName: ''}}}
    }

    componentWillMount = () => {
        fb.database().ref(`Clients/${this.props.match.params.id}`).on('value', (snap) => {
            this.setState({client: snap.val()})
        });

        const notesCopy = [];

        fb.database().ref(`Notes/${this.props.match.params.id}`).on('value', (snap) => {
            notesCopy.length = 0;
            for(const i in snap.val()){
                notesCopy.push({
                    ref: i,
                    note: snap.val()[i]
                });
            }

            this.setState({notes: notesCopy});
        })
    };

    updateAddress = (e, {name, value}) => {
        let clientCopy = this.state.client;
        clientCopy.address[name] = value;
        this.setState({client: clientCopy})
    };

    updateClient = () => {
        fb.database().ref(`Clients/${this.props.match.params.id}`).update(this.state.client);
    };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    addNote = () => {
        var note = {
            author: fb.auth().currentUser.displayName,
            authorID: fb.auth().currentUser.uid,
            note: this.state.note,
            dateAdded: new Date().toISOString()
        };
        fb.database().ref(`Notes/${this.props.match.params.id}`).push(note)
            .then(this.setState({note: ''}))
    };

    deleteNote = (id) => {
       fb.database().ref(`Notes/${this.props.match.params.id}/${id}`).remove();
    };

    archiveNote = (id) => {
        let noteCopy = {};
        fb.database().ref(`Notes/${this.props.match.params.id}/${id}`).once('value')
            .then((snap) => {
                noteCopy = snap.val();
                noteCopy.archived = true;
                fb.database().ref(`Notes/${this.props.match.params.id}/${id}`).update(noteCopy);
            })
    }

    render(){
        const notes = this.state.notes.map((n) => {
            var avatarSrc = `https://api.adorable.io/avatars/71/${n.note.authorID}.png`;
            if(typeof(n.note.archived) === 'undefined' || n.note.archived === false){
                return(
                    <Comment key={n.ref}>
                        <Comment.Avatar as="a" src={avatarSrc} />
                        <Comment.Content>
                            <Comment.Author>{n.note.author}</Comment.Author>
                            <Comment.Metadata>
                                {moment(n.note.dateAdded).format("D MMM YYYY HH:mm")}
                            </Comment.Metadata>
                            <Comment.Text>
                                {n.note.note}
                            </Comment.Text>
                            <Comment.Actions>
                                <Comment.Action onClick={() => {this.deleteNote(n.ref)}}>Delete</Comment.Action>
                                <Comment.Action onClick={() => {this.archiveNote(n.ref)}}>Archive</Comment.Action>
                            </Comment.Actions>
                        </Comment.Content>
                    </Comment>
                )
            } else {
                return null;
            }
        });

        return(
            <div>
                <Grid centered>
                    <Grid.Row>
                        <Header as="h1" icon inverted>
                            <Icon name="user" />
                            {this.state.client.firstName} {this.state.client.lastName}
                            <Header.Subheader onClick={this.editEmail}>
                                {this.state.client.email}
                            </Header.Subheader>
                        </Header>
                    </Grid.Row>
                </Grid>
                <Grid centered divided >
                    <Grid.Column width={3}>
                        <Segment raised>
                            <Form onSubmit={this.updateClient}>
                                <Form.Group widths="equal">
                                    <Form.Input label="House name or Number" value={this.state.client.address.houseNum} name="houseNum" onChange={this.updateAddress} />
                                </Form.Group>
                                <Form.Input label="Street Name" name="streetName" onChange={this.updateAddress} value={this.state.client.address.streetName} />
                                <Form.Input label="Town" name="town" onChange={this.updateAddress} value={this.state.client.address.town} />
                                <Form.Group widths="equal">
                                    <Form.Input label="postcode" value={this.state.client.address.postcode} name="postcode" onChange={this.updateAddress} />
                                </Form.Group>
                                <Button type="submit">Update</Button>
                            </Form>
                        </Segment>
                    </Grid.Column>
                    <Grid.Column width={9}>
                        <Segment raised>
                            <Header as="h3" dividing> Notes </Header>
                            <Comment.Group>
                                {notes}
                            </Comment.Group>
                        </Segment>
                        <Segment>
                            <Form onSubmit={this.addNote}>
                                <Form.Group>
                                    <TextArea name="note" value={this.state.note} onChange={this.handleChange} />
                                </Form.Group>
                                <Form.Group>
                                    <Button color="green"> Add Note</Button>
                                </Form.Group>
                            </Form>
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Profile);