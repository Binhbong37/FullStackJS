import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { LANGUAGES } from '../../utils';

import './Header.scss';

class Header extends Component {
    handleChangLanguage = (language) => {
        this.props.changeLanguageApp(language);
    };
    render() {
        const { processLogout, language, userInfo } = this.props;
        console.log(userInfo);

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className="language">
                    <span className="welcome">
                        <FormattedMessage id="homeHeader.welcome" />,
                        {userInfo && userInfo.firstName
                            ? userInfo.firstName
                            : ''}
                    </span>
                    <span
                        className={
                            language === LANGUAGES.VI
                                ? 'language-vi active'
                                : 'language-vi'
                        }
                        onClick={() => this.handleChangLanguage(LANGUAGES.VI)}
                    >
                        VN
                    </span>
                    <span
                        className={
                            language === LANGUAGES.EN
                                ? 'language-en active'
                                : 'language-en'
                        }
                        onClick={() => this.handleChangLanguage(LANGUAGES.EN)}
                    >
                        EN
                    </span>
                    <div
                        className="btn btn-logout"
                        onClick={processLogout}
                        title="Logout"
                    >
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

                {/* nút logout */}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageApp: (language) =>
            dispatch(actions.changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
