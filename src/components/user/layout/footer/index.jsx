import "../../../../assets/css/bootstrap.min.css";
import "../../../../assets/css/tiny-slider.css";
import "../../../../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FooterClient = () =>{
    return(
        <>
            <footer className="footer-section">
                <div className="container relative">

                    <div className="sofa-img">
                        <img src="images/anhnen.png" alt="Image" className="img-fluid"/>
                    </div>

                    <div className="row">
                        <div className="col-lg-8">
                            <div className="subscription-form">
                                <h3 className="d-flex align-items-center"><span className="me-1"><img
                                    src="images/envelope-outline.svg" alt="Image" className="img-fluid"/></span><span>Đăng ký</span>
                                </h3>

                                <form action="#" className="row g-3">
                                    <div className="col-auto">
                                        <input type="text" className="form-control" placeholder="Tên người dùng"/>
                                    </div>
                                    <div className="col-auto">
                                        <input type="email" className="form-control" placeholder="Email người dùng"/>
                                    </div>
                                    <div className="col-auto">
                                        <button className="btn btn-primary">
                                            <span className="fa fa-paper-plane"></span>
                                        </button>
                                    </div>
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="row g-5 mb-5">
                        <div className="col-lg-4">
                            <div className="mb-4 footer-logo-wrap"><a href="#"
                                                                      className="footer-logo">Book Man<span>.</span></a>
                            </div>
                            <p className="mb-4">Đây là trang web dành cho tất cả mọi người yêu sách trên toàn thế giới
                                chúng tôi có tất cả các loaị sách mà bạn cần đến </p>

                            <ul className="list-unstyled custom-social">
                                <li><a href="#"><span className="fa fa-brands fa-facebook-f"></span></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-twitter"></span></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-instagram"></span></a></li>
                                <li><a href="#"><span className="fa fa-brands fa-linkedin"></span></a></li>
                            </ul>
                        </div>

                        <div className="col-lg-8">
                            <div className="row links-wrap">
                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Thông tin</a></li>
                                        <li><a href="#">Dịch vụ</a></li>
                                        <li><a href="#">Bài viết</a></li>
                                        <li><a href="#">Hỗ trợ</a></li>
                                    </ul>
                                </div>

                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Hỗ trợ</a></li>
                                        <li><a href="#">Cơ sở</a></li>
                                        <li><a href="#">Hỗ trợ online</a></li>
                                    </ul>
                                </div>

                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Công việc</a></li>
                                        <li><a href="#">Đội ngũ</a></li>
                                        <li><a href="#">Lãnh đạo</a></li>
                                        <li><a href="#">Chính sách bảo mật </a></li>
                                    </ul>
                                </div>

                                <div className="col-6 col-sm-6 col-md-3">
                                    <ul className="list-unstyled">
                                        <li><a href="#">Sách Khoa Học</a></li>
                                        <li><a href="#">Sách Tâm Lý</a></li>
                                        <li><a href="#">Sách Công Nghệ</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="border-top copyright">
                        <div className="row pt-4">
                            <div className="col-lg-6">
                                <p className="mb-2 text-center text-lg-start">Copyright &copy;
                                    <script>document.write(new Date().getFullYear());</script>
                                    . All Rights Reserved. &mdash; Designed with love by <a
                                        href="https://untree.co">Untree.co</a> Distributed By <a
                                        hreff="https://themewagon.com">ThemeWagon</a>
                                </p>
                            </div>

                            <div className="col-lg-6 text-center text-lg-end">
                                <ul className="list-unstyled d-inline-flex ms-auto">
                                    <li className="me-4"><a href="#">Terms &amp; Conditions</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </footer>
        </>
    )
}

export default FooterClient;