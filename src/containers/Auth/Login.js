import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import * as actions from '../../store/actions';

import './Login.scss';
// import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            password: '',
            isShowPassword: false,
            errMassage: '',
        };
    }
    handleOnchange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;

        this.setState({
            [name]: value,
        });
    };

    handleLogin = async () => {
        this.setState({
            errMassage: '',
        });
        try {
            let data = await handleLoginApi(
                this.state.userName,
                this.state.password
            );
            console.log(data.data.errCode);
            if (data.data && data.data.errCode !== 0) {
                this.setState({
                    errMassage: data.data.message,
                });
            }
            if (data.data && data.data.errCode === 0) {
                this.props.userLoginSuccess(data.data.user);
                console.log(data.data.user);
            }
        } catch (error) {
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMassage: error.response.data.message,
                    });
                }
            }
        }
    };

    handleShowHidePass = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        });
    };
    render() {
        return (
            <div className="login-background">
                <div className="login-container">
                    <div className="login-content row">
                        <h2 className="col-12 text-center">Login</h2>
                        <div className="col-12 form-group mt-5">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="userName"
                                name="userName"
                                value={this.state.userName}
                                onChange={(e) => this.handleOnchange(e)}
                            />
                        </div>
                        <div className="col-12 form-group mt-3">
                            <div className="custom-input-password">
                                <input
                                    type={
                                        this.state.isShowPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    className="form-control"
                                    placeholder="password"
                                    name="password"
                                    value={this.state.password}
                                    onChange={(e) => this.handleOnchange(e)}
                                />
                                <span onClick={() => this.handleShowHidePass()}>
                                    <i
                                        className={
                                            this.state.isShowPassword
                                                ? 'far fa-eye'
                                                : 'far fa-eye-slash'
                                        }
                                    ></i>
                                </span>
                            </div>
                        </div>
                        <div className="col-12 mt-2" style={{ color: 'red' }}>
                            {this.state.errMassage}
                        </div>
                        <div className="col-12 mt-3">
                            <button
                                className="btn-login"
                                onClick={() => this.handleLogin()}
                            >
                                Login
                            </button>
                        </div>
                        <div className="col-12">
                            <span className="forgot-pass">
                                Forgot your password?
                            </span>
                        </div>
                        <div className="col-12 text-center mt-3">
                            <span className="other-login">Or login with: </span>
                        </div>
                        <div className="col-12 social-login">
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        navigate: (path) => dispatch(push(path)),
        // userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
