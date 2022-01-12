import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

class OutStandingDoctor extends Component {
    render() {
        return (
            <div className="section-share section-outstanding">
                <div className="section-container">
                    <div className="section-header">
                        <span className="title-section">Bác sĩ nổi bật</span>
                        <button className="btn-section">Xem thêm</button>
                    </div>
                    <div className="section-body">
                        <Slider {...this.props.settings}>
                            <div className="section-custom">
                                <div className="outer-bg">
                                    <div className="bg-img section-outstanding"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 1</div>
                                    <div>Cơ xương khớp</div>
                                </div>
                            </div>
                            <div className="section-custom">
                                <div className="outer-bg">
                                    <div className="bg-img section-outstanding"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 2</div>
                                    <div>Răng hàm mặt</div>
                                </div>
                            </div>
                            <div className="section-custom">
                                <div className="outer-bg">
                                    <div className="bg-img section-outstanding"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 3</div>
                                    <div>Tai Mũi Họng</div>
                                </div>
                            </div>
                            <div className="section-custom">
                                <div className="outer-bg">
                                    <div className="bg-img section-outstanding"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 4</div>
                                    <div>Nội, ngoại</div>
                                </div>
                            </div>
                            <div className="section-custom">
                                <div className="outer-bg">
                                    <div className="bg-img section-outstanding"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 5</div>
                                    <div>Nội, ngoại tổng hợp</div>
                                </div>
                            </div>
                            <div className="section-custom">
                                <div className="outer-bg">
                                    <div className="bg-img section-outstanding"></div>
                                </div>
                                <div className="position text-center">
                                    <div>Bác sĩ 6</div>
                                    <div>Phòng mổ</div>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
