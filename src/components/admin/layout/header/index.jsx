import "../../../../assets/admin/css/styleadmin.css";
import {Link} from 'react-router';

const HeaderAdmin = () => {
    return (
        <>
            <div className="sidebar d-flex flex-column p-3">
                <img src="images/logo.png" className="img-fluid" alt="Sách"/>

                <hr/>

                <a href="/admin" style={{borderRadius: "50px"}}>
                    <i className="ri-dashboard-line me-2"></i>Bảng điều khiển
                </a>
                <hr/>


                <Link to="/admin/product" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Sản Phẩm
                </Link>
                <Link to="/admin/category" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Danh Mục
                </Link>

                <Link to="/admin/order" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Đơn hàng
                </Link>

                <Link to="/admin/user" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Khách hàng
                </Link>

                <Link to="/admin/comment" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Bình luận
                </Link>
            </div>

            <div className="flex-grow-1">
                <div className="header">
                    <h5 className="m-0">Bảng điều khiển</h5>
                    <div className="d-flex align-items-center">
                        <div className="search-box">
                            <i className="ri-search-line"></i>
                            <input type="text" placeholder="Tìm kiếm..."/>
                        </div>
                        <div className="user-avatar ms-3">
                            <img src="https://via.placeholder.com/40" alt="User"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderAdmin;
