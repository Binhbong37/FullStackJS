import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions';

import './TableManagerUser.scss';

class TableManagerUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }
    componentDidMount() {
        this.props.fetchAllUsersRedux();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.usersRedux !== this.props.usersRedux) {
            this.setState({
                users: this.props.usersRedux,
            });
        }
    }

    handleDeleteUser = (userId) => {
        this.props.deleteUserRedux(userId);
    };
    handleEditUser = (user) => {
        this.props.handleEditUserFromParent(user);
    };
    render() {
        let { users } = this.state;
        return (
            <div className="users-container">
                <div className="title text-center">MANAGER USER</div>
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
                            {users &&
                                users.length > 0 &&
                                users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button
                                                    className="btn btn-warning mx-2"
                                                    onClick={() =>
                                                        this.handleEditUser(
                                                            user
                                                        )
                                                    }
                                                >
                                                    <i className="fas fa-pencil-alt"></i>
                                                </button>
                                                <button
                                                    className="btn btn-danger"
                                                    onClick={() =>
                                                        this.handleDeleteUser(
                                                            user.id
                                                        )
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
    return {
        usersRedux: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllUsersRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUserRedux: (id) => dispatch(actions.deleteUser(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManagerUser);
