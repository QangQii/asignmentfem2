import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Accordion, Alert, Badge, Button, Container, Image, Spinner, Table} from 'react-bootstrap';
import Constanst from "../../../Constanst"; // Đảm bảo đường dẫn đúng

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Hàm định dạng ngày tháng
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const options = {year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'};
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    };

    // Hàm lấy text trạng thái đơn hàng
    const getOrderStatus = (status) => {
        switch (status) {
            case 1:
                return <Badge bg="warning" text="dark">Chờ xác nhận</Badge>;
            case 2:
                return <Badge bg="info">Đã xác nhận</Badge>;
            case 3:
                return <Badge bg="primary">Đang giao hàng</Badge>;
            case 4:
                return <Badge bg="success">Đã giao</Badge>;
            case 0:
                return <Badge bg="danger">Đã hủy</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    // Hàm lấy text trạng thái thanh toán
    const getPaymentStatus = (status) => {
        switch (status) {
            case 0:
                return <Badge bg="warning" text="dark">Chưa thanh toán</Badge>;
            case 1:
                return <Badge bg="success">Đã thanh toán</Badge>;
            default:
                return <Badge bg="secondary">Không xác định</Badge>;
        }
    };

    // Hàm lấy phương thức thanh toán
    const getPaymentMethod = (method) => {
        switch (method) {
            case 1:
                return "Thanh toán khi nhận hàng (COD)";
            case 2:
                return "Chuyển khoản ngân hàng"; // Ví dụ
            case 3:
                return "Ví điện tử"; // Ví dụ
            default:
                return "Không xác định";
        }
    };


    // Hàm fetch lịch sử đơn hàng
    const fetchOrderHistory = useCallback(async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('authToken');

        if (!token) {
            setError("Vui lòng đăng nhập để xem lịch sử đơn hàng.");
            setLoading(false);
            // Có thể chuyển hướng về trang đăng nhập
            // navigate('/login', { state: { from: '/order-history' } });
            return;
        }

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/orders/history`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (res.ok) {
                const data = await res.json();
                // Sắp xếp đơn hàng mới nhất lên đầu (nếu backend chưa làm)
                data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setOrders(data);
            } else {
                // Xử lý lỗi từ server (401, 403, 500...)
                let errorMsg = `Lỗi ${res.status}: Không thể tải lịch sử đơn hàng.`;
                try {
                    const errorData = await res.json();
                    errorMsg = errorData.message || errorMsg;
                } catch (e) { /* Bỏ qua nếu không parse được json lỗi */
                }

                if (res.status === 401 || res.status === 403) {
                    errorMsg = "Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.";
                    // Xóa token cũ nếu lỗi 401/403
                    localStorage.removeItem('authToken');
                    // Cân nhắc chuyển hướng về login
                    navigate('/login', {state: {from: '/order-history'}});
                }
                setError(errorMsg);
                setOrders([]); // Xóa đơn hàng cũ nếu có lỗi
            }
        } catch (err) {
            console.error("Lỗi mạng khi fetch lịch sử đơn hàng:", err);
            setError("Lỗi mạng, không thể kết nối đến máy chủ.");
            setOrders([]);
        } finally {
            setLoading(false);
        }
    }, [navigate]); // Thêm navigate vào dependencies

    useEffect(() => {
        fetchOrderHistory();
    }, [fetchOrderHistory]); // Gọi fetch khi component mount hoặc fetchOrderHistory thay đổi

    // --- Phần Render ---
    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Đang tải...</span>
                </Spinner>
                <p>Đang tải lịch sử đơn hàng...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-4 mb-5 min-vh-100">
            <h2 className="mb-4 text-center">Lịch sử Đơn Hàng</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            {!error && orders.length === 0 && (
                <Alert variant="info">Bạn chưa có đơn hàng nào.</Alert>
            )}

            {!error && orders.length > 0 && (
                <Accordion defaultActiveKey="0"
                           alwaysOpen> {/* Mở sẵn item đầu, alwaysOpen giữ các item khác mở khi mở item mới */}
                    {orders.map((order, index) => (
                        <Accordion.Item eventKey={index.toString()} key={order.id} className="mb-3 shadow-sm">
                            <Accordion.Header>
                                <div className="d-flex justify-content-between w-100 me-3">
                                    <span><strong>Mã đơn:</strong> #{order.id}</span>
                                    <span><strong>Ngày đặt:</strong> {formatDate(order.createdAt)}</span>
                                    <span><strong>Trạng thái:</strong> {getOrderStatus(order.status)}</span>
                                    <span className="fw-bold">
                                        Tổng tiền: {order.totalAmount ? order.totalAmount.toLocaleString() : calculateOrderTotal(order.items).toLocaleString()} VNĐ
                                    </span>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body>
                                <h5>Chi tiết đơn hàng</h5>
                                <p><strong>Người nhận:</strong> {order.name}</p>
                                <p><strong>Điện thoại:</strong> {order.phone}</p>
                                <p><strong>Địa chỉ:</strong> {order.address}</p>
                                <p><strong>Thanh
                                    toán:</strong> {getPaymentMethod(order.payments)} - {getPaymentStatus(order.payment_status)}
                                </p>

                                <h6 className='mt-3'>Các sản phẩm đã đặt:</h6>
                                {order.items && order.items.length > 0 ? (
                                    <Table striped bordered hover responsive size="sm">
                                        <thead>
                                        <tr>
                                            <th>Hình ảnh</th>
                                            <th>Tên sản phẩm</th>
                                            <th>Số lượng</th>
                                            <th>Đơn giá</th>
                                            <th>Thành tiền</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {order.items.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    {/* Giả sử item.product có thông tin ảnh */}
                                                    <Image
                                                        src={item.product?.images ? `${Constanst.DOMAIN_API}/uploads/${item.product.images}` : "/path/to/default-image.jpg"}
                                                        alt={item.product?.name || 'Sản phẩm'}
                                                        style={{width: '50px', height: 'auto'}}
                                                        thumbnail
                                                    />
                                                </td>
                                                {/* Giả sử item.product có thông tin tên */}
                                                <td>{item.product?.name || `Sản phẩm ID: ${item.product_id}`}</td>
                                                <td>{item.quantity}</td>
                                                <td>{item.price.toLocaleString()} VNĐ</td>
                                                <td>{(item.quantity * item.price).toLocaleString()} VNĐ</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                ) : (
                                    <p>Không có thông tin chi tiết sản phẩm cho đơn hàng này.</p>
                                )}
                                {/* Nút hủy đơn hàng (ví dụ) - Chỉ hiển thị khi trạng thái cho phép */}
                                {order.status === 1 && ( // Chỉ cho hủy khi đang chờ xác nhận
                                    <Button variant="danger" size="sm" onClick={() => handleCancelOrder(order.id)}>
                                        Hủy đơn hàng
                                    </Button>
                                )}
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            )}
        </Container>
    );
};

// Hàm tính tổng tiền nếu backend không trả về sẵn
const calculateOrderTotal = (items) => {
    if (!items || items.length === 0) return 0;
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
};

// Hàm xử lý hủy đơn hàng (ví dụ - cần tạo API backend tương ứng)
const handleCancelOrder = async (orderId) => {
    if (!window.confirm(`Bạn có chắc chắn muốn hủy đơn hàng #${orderId}?`)) {
        return;
    }
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Vui lòng đăng nhập lại.");
        return;
    }

    try {
        // Gọi API để hủy đơn hàng (ví dụ: PUT /api/orders/:id/cancel)
        const res = await fetch(`${Constanst.DOMAIN_API}/api/orders/${orderId}/cancel`, {
            method: 'PUT', // Hoặc PATCH
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        });

        if (res.ok) {
            alert(`Đã hủy đơn hàng #${orderId} thành công!`);
            // Tải lại danh sách đơn hàng để cập nhật trạng thái
            // Tuy nhiên, fetchOrderHistory nằm ngoài scope này, cần tìm cách gọi lại nó
            // Đơn giản nhất là reload trang:
            window.location.reload();
            // Cách tốt hơn là truyền hàm fetchOrderHistory vào component hoặc dùng state management
        } else {
            const errorData = await res.json();
            alert(`Lỗi khi hủy đơn hàng: ${errorData.message || res.statusText}`);
        }
    } catch (error) {
        alert(`Lỗi mạng khi hủy đơn hàng: ${error.message}`);
    }
};


export default OrderHistory;