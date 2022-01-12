import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Specialty.scss';
// import { FormattedMessage } from 'react-intl';
import Slider from 'react-slick';

class Specialty extends Component {
    render() {
        return (
            <div className="section-share section-specialty">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">
                            Chuyen khoa pho bien
                        </span>
                        <button className="btn-section">Xem them</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-custom">
                                <div className="bg-img section-specialty"></div>
                                <div>text below here 1</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-specialty"></div>
                                <div>text below here 2</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-specialty"></div>
                                <div>text below here 3</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-specialty"></div>
                                <div>text below here 4</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-specialty"></div>
                                <div>text below here 5</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-specialty"></div>
                                <div>text below here 6</div>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
