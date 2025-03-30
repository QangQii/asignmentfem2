import "../../../../assets/admin/css/styleadmin.css";

const HeaderAdmin = () => {
    return (
        <>
            <div className="sidebar d-flex flex-column p-3">
                <h4 className="text-center">Book Man</h4>
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
                <a href="#" style={{borderRadius: "50px"}}>
                    <i className="ri-file-list-line me-2"></i>Đơn hàng
                </a>
                <a href="#" style={{borderRadius: "50px"}}>
                    <i className="ri-user-line me-2"></i>Khách hàng
                </a>
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
