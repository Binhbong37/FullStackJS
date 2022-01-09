import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers } from '../../services/userService';
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
    async componentDidMount() {
        console.log('DiDMount');
        let response = await getAllUsers('ALL');
        if (response.data && response.data.errCode === 0) {
            this.setState({
                arrUsers: response.data.users,
            });
        }
    }

    render() {
        let { arrUsers } = this.state;
        return (
            <div className="users-container">
                <ModalUser
                    isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
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
                        <tr>
                            <th>Email</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

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
