import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import './MedicalFacility.scss';

class MedicalFacility extends Component {
    render() {
        return (
            <div className="section-share section-medical-facility">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Cơ sở y tế</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-custom">
                                <div className="bg-img section-medical-facility"></div>
                                <div>BV Thu Cúc</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-medical-facility"></div>
                                <div>BV Thu Cúc 2</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-medical-facility"></div>
                                <div>Bệnh Viện Ung Bướu</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-medical-facility"></div>
                                <div>Bệnh Viện Từ Dũ</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-medical-facility"></div>
                                <div>text below here 5</div>
                            </div>
                            <div className="section-custom">
                                <div className="bg-img section-medical-facility"></div>
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
