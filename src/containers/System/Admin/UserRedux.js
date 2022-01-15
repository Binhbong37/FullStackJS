import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

// import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';

import * as actions from '../../../store/actions';

class UserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
        };
    }

    async componentDidMount() {
        this.props.genderStart();
        // try {
        //     let res = await getAllCodeService('gender');
        //     if (res.data && res.data.errCode === 0) {
        //         this.setState({
        //             genderArr: res.data.data,
        //         });
        //     }
        //     console.log('Check RES', res);
        // } catch (error) {
        //     console.log(error);
        // }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genderRedux !== this.props.genderRedux) {
            this.setState({
                genderArr: this.props.genderRedux,
            });
        }
    }

    render() {
        let genders = this.state.genderArr;
        // let genders = this.props.genderRedux;
        let language = this.props.language;
        return (
            <div className="user-redux-container">
                <div className="title">Redux From User</div>
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
                                <label htmlFor="gender">
                                    <FormattedMessage id="manage-user.position" />
                                </label>
                                <select name="gender" className="form-control">
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                    <option value="2">Other</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="address">
                                    <FormattedMessage id="manage-user.role" />
                                </label>
                                <select name="roleId" className="form-control">
                                    <option value="0">Male</option>
                                    <option value="1">Female</option>
                                    <option value="2">Other</option>
                                </select>
                            </div>
                            <div className="col-3">
                                <label htmlFor="image">
                                    <FormattedMessage id="manage-user.image" />
                                </label>
                                <input
                                    type="text"
                                    name="image"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-12">
                                <button className="btn btn-primary mt-3">
                                    <FormattedMessage id="manage-user.save" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                ;
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        genderStart: () => dispatch(actions.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
