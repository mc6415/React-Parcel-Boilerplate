import React, {Component} from 'react';
import { withRouter } from 'react-router';
import { Header, Modal, Icon, Button, Form, Table, Label } from 'semantic-ui-react';
import fb from '../firebase';

class Clients extends  Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddScreen: false,
            clientFirstName: '',
            clientSurname: '',
            clientEmail: '',
            clientDOB: '',
            clients: []
        }
    };

    componentWillMount = () => {
        fb.auth().onAuthStateChanged((user) => {
            if (user) {
                const clients = fb.database().ref('Clients');
                const ClientsListCopy = [];
                clients.on('value', (snap) => {
                    ClientsListCopy.length = 0;
                    for (const i in snap.val()) {
                        ClientsListCopy.push({
                            ref: i,
                            client: snap.val()[i]
                        });
                    }
                    this.setState({clients: ClientsListCopy});
                })
            } else {
                this.props.history.push("/");
            }
        })


    };

    showModal = () => {
        this.setState({showAddScreen: true})
    };

    closeModal = () => {
        this.setState({showAddScreen: false})
    };

    handleChange = (e, {name, value}) => this.setState({[name]: value});

    addClient = (e) => {
        e.preventDefault();

        const newUser = {
            firstName: this.state.clientFirstName,
            lastName: this.state.clientSurname,
            dob: this.state.clientDOB,
            email: this.state.clientEmail
        };

        fb.database().ref('Clients').push(newUser)
            .then(this.closeModal);
    };

    removeClient = (id) => {
        fb.database().ref(`Clients/${id}`).remove();
    };

    logOut = () => {
        fb.auth().signOut();
        this.props.history.push("/");
    };

    render(){

        const clients = this.state.clients.map((n) => {
            return(
                <Table.Row>
                    <Table.Cell>{n.client.firstName}</Table.Cell>
                    <Table.Cell>{n.client.lastName}</Table.Cell>
                    <Table.Cell>{n.client.email}</Table.Cell>
                    <Table.Cell>
                        <Button color="red" onClick={() => {this.removeClient(n.ref)}} inverted>Remove</Button>
                        <Button color="blue" inverted onClick={() => {this.props.history.push('/Client/' + n.ref)}}> View </Button>
                    </Table.Cell>
                </Table.Row>
            )
        });

        return(
            <div>
                <Header as="h1" inverted> Hello </Header>
                <Button color="green" onClick={this.showModal}> Add Client </Button>
                <Button color="red" onClick={this.logOut}> Logout </Button>
                <Modal basic size='small' open={this.state.showAddScreen}>
                    <Header icon='add user' content="Add Client" />
                    <Modal.Content>
                        <Form inverted onSubmit={this.addClient}>
                            <Form.Group widths="equal">
                                <Form.Input label="First Name" name="clientFirstName" value={this.state.clientFirstName} onChange={this.handleChange}/>
                                <Form.Input label="Surname" value={this.state.clientSurname} name="clientSurname" onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Input label="Email" name="clientEmail" value={this.state.clientEmail} onChange={this.handleChange} />
                                <Form.Input type="date" label="Date Of Birth" name="clientDOB" value={this.state.clientDOB} onChange={this.handleChange} />
                                {/*<Form.Field>*/}
                                    {/*<label>Date </label>*/}
                                    {/*<DatePicker name="clientDOB" name="clientDOB" value={this.state.clientDOB} onChange={this.updateDOB} />*/}
                                {/*</Form.Field>*/}
                            </Form.Group>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button.Group>
                        <Button basic color='red' inverted onClick={this.closeModal}> Cancel </Button>
                            <Button.Or />
                        <Button color='green' inverted onClick={this.addClient} > Add </Button>
                        </Button.Group>
                    </Modal.Actions>
                </Modal>

                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>First Name</Table.HeaderCell>
                            <Table.HeaderCell>Last Name </Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Actions</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {clients}
                    </Table.Body>

                </Table>

            </div>
        )
    }
}

export default withRouter(Clients);