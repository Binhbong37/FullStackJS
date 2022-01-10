import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import _ from 'lodash';

class ModalEditUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
        };
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hardcode',
                firstName: user.firstName,
                lastName: user.lastName,
                address: user.address,
            });
        }
        console.log('DidMount model Edit', this.props.currentUser);
    }

    handleOnchange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value,
        });
    };

    // Need validate form before submit
    validateInput = () => {
        let isValid = true;
        let arrInput = [
            'email',
            'password',
            'firstName',
            'lastName',
            'address',
        ];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameters: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    };
    handleSaveUser = () => {
        let isValid = this.validateInput();
        if (isValid === true) {
            // call api edit
            this.props.editUser(this.state);
        }
        // this.toggle();
    };
    toggle = () => {
        this.props.toggleFromParent();
    };
    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                className="modal-user-container"
                size="lg"
            >
                <ModalHeader toggle={() => this.toggle()}>
                    Edit User
                </ModalHeader>
                <ModalBody>
                    <div className="modal-user-body">
                        <div className="input-container">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                value={this.state.email}
                                onChange={(e) => this.handleOnchange(e)}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={this.state.password}
                                onChange={(e) => this.handleOnchange(e)}
                                disabled
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={this.state.firstName}
                                onChange={(e) => this.handleOnchange(e)}
                            />
                        </div>
                        <div className="input-container">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={this.state.lastName}
                                onChange={(e) => this.handleOnchange(e)}
                            />
                        </div>
                        <div className="input-container max-width-input">
                            <label htmlFor="address">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={this.state.address}
                                onChange={(e) => this.handleOnchange(e)}
                            />
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        className="px-3"
                        onClick={() => this.handleSaveUser()}
                    >
                        Save change
                    </Button>{' '}
                    <Button
                        color="secondary"
                        className="px-3"
                        onClick={() => this.toggle()}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
