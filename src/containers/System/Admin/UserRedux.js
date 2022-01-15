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
        };
    }

    handleOnchangeImage = (e) => {
        let data = e.target.files;
        let file = data[0];
        if (file) {
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                prevImageURL: objectUrl,
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
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
        if (prevProps.positionRedux !== this.props.positionRedux) {
            this.setState({
                positionArr: this.props.positionRedux,
            });
        }
        if (prevProps.roleRedux !== this.props.roleRedux) {
            this.setState({
                roleArr: this.props.roleRedux,
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

    render() {
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
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="address">
                                    <FormattedMessage id="manage-user.gender" />
                                </label>
                                <select name="gender" className="form-control">
                                    {genders &&
                                        genders.length > 0 &&
                                        genders.map((gender, index) => {
                                            return (
                                                <option key={index}>
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
                                >
                                    {positions &&
                                        positions.length > 0 &&
                                        positions.map((gender, index) => {
                                            return (
                                                <option key={index}>
                                                    {language === LANGUAGES.VI
                                                        ? gender.valueVi
                                                        : gender.valueEn}
                                                </option>
                                            );
                                        })}
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="address">
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select name="roleId" className="form-control">
                                    {roles &&
                                        roles.length > 0 &&
                                        roles.map((gender, index) => {
                                            return (
                                                <option key={index}>
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
                                <button className="btn btn-primary mt-3">
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
