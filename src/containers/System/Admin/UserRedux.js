import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';
import './userRedux.scss';

// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

import * as actions from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            positionArr: [],
            roleArr: [],
            prevImageURL: '',
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            position: '',
            gender: '',
            role: '',
            avatar: '',
        };
    }

    handleOnchangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                prevImageURL: objectUrl,
                avatar: file,
            });
        }
    };

    async componentDidMount() {
        this.props.genderStart();
        this.props.positionStart();
        this.props.roleStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            let arrGender = this.props.genderRedux;
            this.setState({
                genderArr: arrGender,
                gender:
                    arrGender && arrGender.length > 0 ? arrGender[0].key : '',
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            let arrPosition = this.props.positionRedux;
            this.setState({
                positionArr: arrPosition,
                position:
                    arrPosition && arrPosition.length > 0
                        ? arrPosition[0].key
                        : '',
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            let arrRole = this.props.roleRedux;
            this.setState({
                roleArr: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
            });
        }
    }
    prevOpenImage = () => {
        if (this.state.prevImageURL) {
            this.setState({
                isOpen: true,
            });
        }
    };

    // handleOnchangeInput
    handleOnchangeInput = (e, id) => {
        let copyState = { ...this.state };
        copyState[id] = e.target.value;

        this.setState({
            ...copyState,
        });
    };
    // Button save
    handleSaveUser = () => {
        let isValid = this.checkValidateInput();
        if (isValid === false) {
            return;
        }
        this.props.createNewUser({
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            phoneNumber: this.state.phoneNumber,
            gender: this.state.gender,
            roleId: this.state.role,
            positionId: this.state.position,
        });
    };
    checkValidateInput = () => {
        let isValid = true;
        let arrCheck = [
            'email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'address',
        ];
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false;
                alert('This input is required: ' + arrCheck[i]);
                break;
            }
        }
        return {};
    };
    render() {
        let {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            role,
            position,
            gender,
            avatar,
        } = this.state;
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        // let genders = this.props.genderRedux;
        let language = this.props.language;
        let isLoading = this.props.isLoadingRedux;
        return (
            <div className="user-redux-container">
                <div className="title">Redux From User</div>
                <div>{isLoading === true ? 'Loading Gender' : ''}</div>
                <div className="user-redux-body">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <FormattedMessage id="manage-user.add" />
                            </div>
                            <div className="col-3">
                                <label htmlFor="email">
                                    <FormattedMessage id="manage-user.email" />
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'email')
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="password">
                                    <FormattedMessage id="manage-user.password" />
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'password')
                                    }
                                />
                            </div>
                            <div className="form-group col-3">
                                <label htmlFor="firstName">
                                    <FormattedMessage id="manage-user.firstName" />
                                </label>
                                <input
                                    type="firstName"
                                    name="text"
                                    className="form-control"
                                    value={firstName}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'firstName')
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="lastName">
                                    <FormattedMessage id="manage-user.lastName" />
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className="form-control"
                                    value={lastName}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'lastName')
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="phone">
                                    <FormattedMessage id="manage-user.phone" />
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    className="form-control"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(
                                            e,
                                            'phoneNumber'
                                        )
                                    }
                                />
                            </div>
                            <div className="col-9">
                                <label htmlFor="address">
                                    <FormattedMessage id="manage-user.address" />
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={address}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'address')
                                    }
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="address">
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select
                                    name="gender"
                                    className="form-control"
                                    value={gender}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'gender')
                                    }
                                >
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((gender, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={gender.key}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="position">
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select
                                    name="position"
                                    className="form-control"
                                    value={position}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'position')
                                    }
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((gender, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={gender.key}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="role">
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select
                                    name="roleId"
                                    className="form-control"
                                    value={role}
                                    onChange={(e) =>
                                        this.handleOnchangeInput(e, 'role')
                                    }
                                >
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((gender, index) => {
                                            return (
                                                <option
                                                    key={index}
                                                    value={gender.key}
                                                >
                                                    {language === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label>
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <div className="prev-img-container">
                                    <input
                                        type="file"
                                        name="image"
                                        className="form-control"
                                        id="loadImage"
                                        hidden
                                        onChange={(e) =>
                                            this.handleOnchangeImage(e)
                                        }
                                    />
                                    <label
                                        className="label-upload"
                                        htmlFor="loadImage"
                                    >
                                        Tai Anh
                                        <i className="fas fa-upload"></i>
                                    </label>
                                    <div
                                        className="prev-image"
                                        style={{
                                            backgroundImage: `url(${this.state.prevImageURL})`,
                                        }}
                                        onClick={() => this.prevOpenImage()}
                                    ></div>
                                </div>
                            </div>
                            <div className="col-12">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.handleSaveUser()}
                                >
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.isOpen === true && (
                    <Lightbox
                        mainSrc={this.state.prevImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.positions,
        roleRedux: state.admin.roles,
        isLoadingRedux: state.admin.isLoadingGender,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        genderStart: () => dispatch(actions.fetchGenderStart()),
        positionStart: () => dispatch(actions.fetchPositionStart()),
        roleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
