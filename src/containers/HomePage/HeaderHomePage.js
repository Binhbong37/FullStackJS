import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';

class HomeHeader extends Component {
    changLanguage = (language) => {
        this.props.changeLanguageApp(language);
    };
    render() {
        let language = this.props.language;
        console.log('check language', language === LANGUAGES.VI);
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <i className="fas fa-bars"></i>
                            <div className="header-logo"></div>
                        </div>
                        <div className="center-content">
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.speciality" />
                                    </b>
                                </div>
                                <div className="subTitles">
                                    <FormattedMessage id="homeHeader.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.health-facility" />
                                    </b>
                                </div>
                                <div className="subTitles">
                                    <FormattedMessage id="homeHeader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.doctor" />
                                    </b>
                                </div>
                                <div className="subTitles">
                                    <FormattedMessage id="homeHeader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div>
                                    <b>
                                        <FormattedMessage id="homeHeader.fee" />
                                    </b>
                                </div>
                                <div className="subTitles">
                                    <FormattedMessage id="homeHeader.check-health" />
                                </div>
                            </div>
                        </div>
                        <div className="right-content">
                            <div className="support">
                                <i className="fas fa-question-circle"></i>
                                <FormattedMessage id="homeHeader.support" />
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.VI
                                        ? 'language-vi active'
                                        : 'language-vi'
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changLanguage(LANGUAGES.VI)
                                    }
                                >
                                    VN
                                </span>
                            </div>
                            <div
                                className={
                                    language === LANGUAGES.EN
                                        ? 'language-en active'
                                        : 'language-en'
                                }
                            >
                                <span
                                    onClick={() =>
                                        this.changLanguage(LANGUAGES.EN)
                                    }
                                >
                                    EN
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="home-header-banner">
                    <div className="content-up">
                        <div className="title1">Nền tảng y tế</div>
                        <div className="title2">
                            Chăm sóc sức khỏe toàn diện
                        </div>
                        <div className="search">
                            <i className="fas fa-search"></i>
                            <input type="text" placeholder="Tim Chuyen Khoa" />
                        </div>
                    </div>
                    <div className="content-down">
                        <div className="options">
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    Kham chuyen khoa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">Kham tong quat</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">Kham nha khoa</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">Kham rang</div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    Kham chuyen khoa
                                </div>
                            </div>
                            <div className="option-child">
                                <div className="icon-child">
                                    <i className="far fa-hospital"></i>
                                </div>
                                <div className="text-child">
                                    Kham chuyen khoa
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
