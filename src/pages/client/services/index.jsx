const Services = () => {
    return ( // return chỉ chạy 1 thẻ div
        <div>

            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Dịch Vụ</h1>
                                <p className="mb-4">Hãy trải nghiệm những dịch vụ tốt nhất của chúng tôi. Chúng tôi cam
                                    kết mang đến chất lượng và sự hài lòng tuyệt đối.</p>
                                <p><a href="" className="btn btn-secondary me-2">Mua Ngay</a><a href="#"
                                                                                                className="btn btn-white-outline">Khám
                                    Phá</a></p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img-wrap">
                                <img src="images/couch.png" className="img-fluid"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="why-choose-section">
                <div className="container">
                    <div className="row my-5">
                        <div className="col-6 col-md-6 col-lg-3 mb-4">
                            <div className="feature">
                                <div className="icon">
                                    <img src="images/truck.svg" alt="Hình ảnh" className="img-fluid"/>
                                </div>
                                <h3>Vận Chuyển Nhanh & Miễn Phí</h3>
                                <p>Chúng tôi cam kết giao hàng nhanh chóng và hoàn toàn miễn phí trên toàn quốc.</p>
                            </div>
                        </div>

                        <div className="col-6 col-md-6 col-lg-3 mb-4">
                            <div className="feature">
                                <div className="icon">
                                    <img src="images/bag.svg" alt="Hình ảnh" className="img-fluid"/>
                                </div>
                                <h3>Mua Sắm Dễ Dàng</h3>
                                <p>Giao diện thân thiện, giúp bạn dễ dàng tìm kiếm và đặt hàng trong vài bước đơn
                                    giản.</p>
                            </div>
                        </div>

                        <div className="col-6 col-md-6 col-lg-3 mb-4">
                            <div className="feature">
                                <div className="icon">
                                    <img src="images/support.svg" alt="Hình ảnh" className="img-fluid"/>
                                </div>
                                <h3>Hỗ Trợ 24/7</h3>
                                <p>Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ bạn bất cứ lúc nào.</p>
                            </div>
                        </div>

                        <div className="col-6 col-md-6 col-lg-3 mb-4">
                            <div className="feature">
                                <div className="icon">
                                    <img src="images/return.svg" alt="Hình ảnh" className="img-fluid"/>
                                </div>
                                <h3>Đổi Trả Dễ Dàng</h3>
                                <p>Chính sách đổi trả linh hoạt, giúp bạn yên tâm khi mua sắm.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="product-section pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                            <h2 className="mb-4 section-title">Chế Tác Từ Chất Liệu Tuyệt Vời</h2>
                            <p className="mb-4">Sản phẩm của chúng tôi được làm từ vật liệu cao cấp, đảm bảo chất lượng
                                và độ bền theo thời gian.</p>
                            <p><a href="#" className="btn">Khám Phá</a></p>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="#">
                                <img src="https://cdn0.fahasa.com/media/catalog/product/8/9/8936066698344.jpg"
                                     className="img-fluid product-thumbnail"/>
                                <h3 className="product-title">Chat GPT Thực Chiến</h3>
                                <strong className="product-price">127.000đ</strong>
                                <span className="icon-cross">
            <img src="images/cross.svg" className="img-fluid"/>
          </span>
                            </a>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="#">
                                <img src="https://cdn0.fahasa.com/media/catalog/product/i/m/image_195509_1_49918.jpg"
                                     className="img-fluid product-thumbnail"/>
                                <h3 className="product-title">D. Trump - Nghệ Thuật Đàm Phán (Tái Bản 2020)</h3>
                                <strong className="product-price">92.000đ</strong>
                                <span className="icon-cross">
            <img src="images/cross.svg" className="img-fluid"/>
          </span>
                            </a>
                        </div>
                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="#">
                                <img
                                    src="https://cdn0.fahasa.com/media/catalog/product/d/u/duoc_su_tu_su_tap_1_tieu_thuyet_bia_1_4.jpg"
                                    className="img-fluid product-thumbnail"/>
                                <h3 className="product-title">[Light Novel] Dược Sư Tự Sự - Tập 1</h3>
                                <strong className="product-price">88.000đ</strong>
                                <span className="icon-cross">
            <img src="images/cross.svg" className="img-fluid"/>
          </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="testimonial-section before-footer-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 mx-auto text-center">
                            <h2 className="section-title">Đánh Giá Khách Hàng</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="testimonial-slider-wrap text-center">
                                <div className="testimonial-slider">
                                    <div className="item">
                                        <div className="row justify-content-center">
                                            <div className="col-lg-8 mx-auto">
                                                <div className="testimonial-block text-center">
                                                    <blockquote className="mb-5">
                                                        <p>&ldquo;Sản phẩm tuyệt vời, chất lượng cao và dịch vụ khách
                                                            hàng rất chuyên nghiệp!&rdquo;</p>
                                                    </blockquote>
                                                    <div className="author-info">
                                                        <div className="author-pic">
                                                            <img src="images/person-1.png" alt="Nguyễn Văn A"
                                                                 className="img-fluid"/>
                                                        </div>
                                                        <h3 className="font-weight-bold">Nguyễn Văn A</h3>
                                                        <span className="position d-block mb-3">Khách Hàng</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}
export default Services;