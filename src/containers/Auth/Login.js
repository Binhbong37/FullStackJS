import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

// import * as actions from '../store/actions';
import * as actions from '../../store/actions';

import './Login.scss';
// import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
    }
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
                            />
                        </div>
                        <div className="col-12 form-group mt-3">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="password"
                            />
                        </div>
                        <div className="col-12 mt-3">
                            <button className="btn-login">Login</button>
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
        adminLoginSuccess: (adminInfo) =>
            dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
