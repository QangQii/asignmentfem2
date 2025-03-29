import "../../../../assets/css/bootstrap.min.css";
import "../../../../assets/css/tiny-slider.css";
import "../../../../assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import {Link} from 'react-router'; // đường dẫn click bằng thẻ link=\
const HeaderClient = () =>{
    return (
        <>
            <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark"
                 arial-label="Furni navigation bar">

                <div className="container">
                    <a className="navbar-brand" href="index.html">Book Man<span>.</span></a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false"
                            aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsFurni">
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Trang chủ</a>
                            </li>
                            <li><a className="nav-link" href="shop.html">Sản phẩm</a></li>
                            <li><Link className="nav-link" to={"/about"}>Thông tin</Link></li>
                            <li><Link className="nav-link" to={"/services"}>Dịch vụ</Link></li>
                            <li><a className="nav-link" href="blog.html">Bài viết</a></li>
                            <li><a className="nav-link" href="contact.html">Liên hệ</a></li>
                        </ul>

                        <ul className="custom-navbar-cta navbar-nav mb-2 mb-md-0 ms-5">
                            <li><a className="nav-link" href="#"><img src="images/user.svg"/></a></li>
                            <li><a className="nav-link" href="cart.html"><img src="images/cart.svg"/></a></li>
                        </ul>
                    </div>
                </div>

            </nav>
        </>
    )
}
export default HeaderClient;