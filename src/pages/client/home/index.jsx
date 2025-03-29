const Home = () => {
    return (
        <div>
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Sách Hay <span className="d-block">Thế Giới Tri Thức</span></h1>
                                <p className="mb-4">
                                    Khám phá thế giới qua từng trang sách. Không gì tuyệt vời hơn việc đắm mình trong
                                    những câu chuyện và kiến thức mới mẻ.
                                </p>
                                <p>
                                    <a href="" className="btn btn-secondary me-2">Mua Ngay</a>
                                    <a href="#" className="btn btn-white-outline">Khám Phá</a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img-wrap">
                                <img src="images/anhnen.png" className="img-fluid" alt="Sách"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="product-section">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 col-lg-3 mb-5 mb-lg-0">
                            <h2 className="mb-4 section-title">Sách Được Tuyển Chọn Kỹ Lưỡng</h2>
                            <p className="mb-4">
                                Khám phá những cuốn sách chất lượng, được chọn lọc để mang đến tri thức và cảm hứng.
                                Không gì tuyệt vời hơn khi sở hữu một thư viện cá nhân đầy ý nghĩa.
                            </p>
                            <p><a href="shop.html" className="btn">Khám Phá</a></p>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img
                                    src="https://tiemsach.org/wp-content/uploads/2023/07/Ebook-Dac-nhan-tam.jpg"
                                    className="img-fluid product-thumbnail"
                                    alt="Sách - Đắc Nhân Tâm"
                                />
                                <h3 className="product-title">Đắc Nhân Tâm</h3>
                                <strong className="product-price">80.000 VNĐ</strong>
                                <span className="icon-cross">
                                <img src="images/cross.svg" className="img-fluid" alt="Thêm vào giỏ"/>
                            </span>
                            </a>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg"
                                    className="img-fluid product-thumbnail"
                                    alt="Sách - Nhà Giả Kim"
                                />
                                <h3 className="product-title">Nhà Giả Kim</h3>
                                <strong className="product-price">95.000 VNĐ</strong>
                                <span className="icon-cross">
                                <img src="images/cross.svg" className="img-fluid" alt="Thêm vào giỏ"/>
                            </span>
                            </a>
                        </div>

                        <div className="col-12 col-md-4 col-lg-3 mb-5 mb-md-0">
                            <a className="product-item" href="cart.html">
                                <img
                                    src="https://bizweb.dktcdn.net/thumb/grande/100/197/269/products/462558750-1083111936819329-1957541486232979466-n.png?v=1730363480047"
                                    className="img-fluid product-thumbnail"
                                    alt="Sách - Tư Duy Nhanh Và Chậm"
                                />
                                <h3 className="product-title">Tư Duy Nhanh Và Chậm</h3>
                                <strong className="product-price">220.000 VNĐ</strong>
                                <span className="icon-cross">
                                <img src="images/cross.svg" className="img-fluid" alt="Thêm vào giỏ"/>
                            </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="why-choose-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-6">
                            <h2 className="section-title">Tại Sao Chọn Chúng Tôi</h2>
                            <p>
                                Chúng tôi cam kết mang đến cho bạn những cuốn sách chất lượng nhất cùng trải nghiệm mua
                                sắm tuyệt vời. Sự hài lòng của bạn là ưu tiên hàng đầu của chúng tôi.
                            </p>

                            <div className="row my-5">
                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="images/truck.svg" alt="Giao hàng" className="img-fluid"/>
                                        </div>
                                        <h3>Giao Hàng Nhanh & Miễn Phí</h3>
                                        <p>
                                            Sách của bạn sẽ được giao đến tận tay nhanh chóng và hoàn toàn miễn phí, đảm
                                            bảo bạn nhận hàng trong thời gian ngắn nhất.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="images/bag.svg" alt="Mua sắm" className="img-fluid"/>
                                        </div>
                                        <h3>Mua Sắm Dễ Dàng</h3>
                                        <p>
                                            Trải nghiệm mua sách trực tuyến đơn giản với giao diện thân thiện và quy
                                            trình đặt hàng nhanh gọn.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="images/support.svg" alt="Hỗ trợ" className="img-fluid"/>
                                        </div>
                                        <h3>Hỗ Trợ 24/7</h3>
                                        <p>
                                            Đội ngũ của chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc của bạn bất cứ lúc
                                            nào, ngày hay đêm.
                                        </p>
                                    </div>
                                </div>

                                <div className="col-6 col-md-6">
                                    <div className="feature">
                                        <div className="icon">
                                            <img src="images/return.svg" alt="Đổi trả" className="img-fluid"/>
                                        </div>
                                        <h3>Đổi Trả Dễ Dàng</h3>
                                        <p>
                                            Chính sách đổi trả linh hoạt giúp bạn yên tâm khi mua sách, không lo lắng về
                                            rắc rối.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="img-wrap">
                                <img
                                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    alt="Sách và tri thức"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="we-help-section">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-7 mb-5 mb-lg-0">
                            <div className="imgs-grid">
                                <div className="grid grid-1">
                                    <img
                                        src="https://nhuoclac.com/wp-content/uploads/2014/09/tumblr_meqvadcgyz1qzb5wzo1_1280.jpg"
                                        alt="Sách trên kệ"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="grid grid-2">
                                    <img
                                        src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1498&auto=format&fit=crop"
                                        alt="Sách và cà phê"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="grid grid-3">
                                    <img
                                        src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1470&auto=format&fit=crop"
                                        alt="Thư viện sách"
                                        className="img-fluid"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5 ps-lg-5">
                            <h2 className="section-title mb-4">Chúng Tôi Giúp Bạn Khám Phá Thế Giới Sách</h2>
                            <p>
                                Chúng tôi hỗ trợ bạn tìm kiếm và sở hữu những cuốn sách tuyệt vời nhất. Đội ngũ của
                                chúng tôi mang đến giải pháp tối ưu để xây dựng thư viện tri thức cho riêng bạn.
                            </p>

                            <ul className="list-unstyled custom-list my-4">
                                <li>Sách chất lượng cao, nội dung phong phú</li>
                                <li>Dịch vụ tư vấn chọn sách tận tâm</li>
                                <li>Lựa chọn phù hợp cho mọi sở thích đọc</li>
                                <li>Cam kết mang lại trải nghiệm đọc sách tuyệt vời</li>
                            </ul>
                            <p><a href="#" className="btn">Khám Phá</a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popular-product">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img
                                        src="https://tiemsach.org/wp-content/uploads/2023/07/Ebook-Dac-nhan-tam.jpg"
                                        alt="Sách - Đắc Nhân Tâm"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="pt-3">
                                    <h3>Đắc Nhân Tâm</h3>
                                    <p>
                                        Cuốn sách kinh điển về nghệ thuật giao tiếp, giúp bạn xây dựng mối quan hệ bền
                                        vững.
                                    </p>
                                    <p><a href="#">Đọc Thêm</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/vi/9/9c/Nh%C3%A0_gi%E1%BA%A3_kim_%28s%C3%A1ch%29.jpg"
                                        alt="Sách - Nhà Giả Kim"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="pt-3">
                                    <h3>Nhà Giả Kim</h3>
                                    <p>
                                        Hành trình khám phá bản thân qua câu chuyện đầy cảm hứng của Paulo Coelho.
                                    </p>
                                    <p><a href="#">Đọc Thêm</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 mb-4 mb-lg-0">
                            <div className="product-item-sm d-flex">
                                <div className="thumbnail">
                                    <img
                                        src="https://bizweb.dktcdn.net/thumb/grande/100/197/269/products/462558750-1083111936819329-1957541486232979466-n.png?v=1730363480047"
                                        alt="Sách - Tư Duy Nhanh Và Chậm"
                                        className="img-fluid"
                                    />
                                </div>
                                <div className="pt-3">
                                    <h3>Tư Duy Nhanh Và Chậm</h3>
                                    <p>
                                        Khám phá cách bộ não hoạt động qua lăng kính tâm lý học của Daniel Kahneman.
                                    </p>
                                    <p><a href="#">Đọc Thêm</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;