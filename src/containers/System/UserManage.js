import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {
    getAllUsers,
    createNewUserFromService,
    deleteUserService,
    userEditService,
} from '../../services/userService';

import { emitter } from '../../utils/emitter';

import ModalUser from './ModalUser';
import ModelEditUser from './ModelEditUser';

import './userManager.scss';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {},
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

    toggleEditModal = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
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
                emitter.emit('EVENT_CLEAR_MODAL_DATA');
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

    handleDelete = async (data) => {
        try {
            let res = await deleteUserService(data.id);
            if (res.data.message && res.data.message.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.data.message.errMessage);
            }
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    handelEditUser = (data) => {
        console.log(data);
        this.setState({
            isOpenModalEdit: true,
            userEdit: data,
        });
    };

    doEditUser = async (user) => {
        try {
            let res = await userEditService(user);
            if (res.data.message && res.data.message.errCode === 0) {
                this.setState({
                    isOpenModalEdit: false,
                });
                await this.getAllUserFromReact();
            } else {
                alert(res.data.message.errMessage);
            }
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        let { arrUsers } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEdit && (
                    <ModelEditUser
                        isOpen={this.state.isOpenModalEdit}
                        toggleFromParent={this.toggleEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                )}
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
                                                <button
                                                    className="btn-warning mx-2"
                                                    onClick={() =>
                                                        this.handelEditUser(
                                                            user
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn-danger"
                                                    onClick={() =>
                                                        this.handleDelete(user)
                                                    }
                                                >
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
