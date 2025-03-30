import "../../../../assets/admin/css/styleadmin.css";
import {Link} from 'react-router';

const HeaderAdmin = () => {
    return (
        <>
            <div className="sidebar d-flex flex-column p-3">
                <img src="images/logo.png" className="img-fluid" alt="Sách"/>

                <hr/>

                <a href="#" style={{borderRadius: "50px"}}>
                    <i className="ri-dashboard-line me-2"></i>Bảng điều khiển
                </a>
                <hr/>

                <a href="#" style={{borderRadius: "50px"}}>
                    <i className="ri-book-2-line me-2"></i>Sản phẩm
                </a>

                <a href="#" style={{borderRadius: "50px"}}>
                    <i className="ri-apps-line me-2"></i>Danh mục
                </a>
                <Link to="/admin/order" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Don hang
                </Link>
                <Link to="/admin/user" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Khach Hang
                </Link>
                <a href="#" style={{borderRadius: "50px"}}>
                    <i className="ri-chat-3-line me-2"></i>Bình luận
                </a>
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
