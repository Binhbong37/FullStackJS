import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {
    getAllUsers,
    createNewUserFromService,
} from '../../services/userService';

import ModalUser from './ModalUser';

import './userManager.scss';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
        };
    }

    handleCreateNewUser = () => {
        this.setState({
            isOpenModal: true,
        });
    };

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        });
    };

    createNewUser = async (dataUser) => {
        try {
            let response = await createNewUserFromService(dataUser);
            if (response.data.message && response.data.message.errCode !== 0) {
                alert(response.data.message.errMessage);
                console.log(response.data.message.errMessage);
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModal: false,
                });
            }
            console.log('response', response.data.message);
        } catch (error) {
            console.log(error);
        }
    };

    getAllUserFromReact = async () => {
        let response = await getAllUsers('ALL');
        if (response.data && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users,
            });
        }
    };

    async componentDidMount() {
        console.log('DiDMount');
        await this.getAllUserFromReact();
    }

    render() {
        let { arrUsers } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                <div className="title text-center">MANAGER USER</div>
                <div className="mx-1">
                    <button
                        className="btn btn-primary px-3"
                        onClick={() => this.handleCreateNewUser()}
                    >
                        <i className="fas fa-plus"></i>
                        Create User
                    </button>
                </div>
                <div className="user-table mt-3 mx-3">
                    <table id="customers">
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Address</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {arrUsers &&
                                arrUsers.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className="btn-warning mx-2">
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button className="btn-danger">
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
