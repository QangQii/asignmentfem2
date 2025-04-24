import React, { useState, useEffect } from "react";
import { Table, Button, Form } from "react-bootstrap";
import Constanst from "../../../Constanst";

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingOrderId, setEditingOrderId] = useState(null);
    const [updatedPaymentStatus, setUpdatedPaymentStatus] = useState({});
    const [updatedOrderStatus, setUpdatedOrderStatus] = useState({});

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${Constanst.DOMAIN_API}/api/oders`);
            if (!response.ok) {
                throw new Error("Lỗi khi lấy dữ liệu đơn hàng");
            }
            const data = await response.json();
            setOrders(data);
        } catch (err) {
            console.error("Lỗi fetch đơn hàng:", err);
            setError("Lỗi khi lấy dữ liệu đơn hàng");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleEdit = (id) => {
        setEditingOrderId(id);
        const orderToEdit = orders.find(order => order.id === id);
        if (orderToEdit) {
            setUpdatedPaymentStatus({ [id]: orderToEdit.payment_status });
            setUpdatedOrderStatus({ [id]: orderToEdit.status });
        }
    };

    const handlePaymentStatusChange = (id, value) => {
        setUpdatedPaymentStatus({ ...updatedPaymentStatus, [id]: parseInt(value) });
    };

    const handleOrderStatusChange = (id, value) => {
        setUpdatedOrderStatus({ ...updatedOrderStatus, [id]: parseInt(value) });
    };

    const handleSave = async (id) => {
        const payment_status = updatedPaymentStatus[id];
        const status = updatedOrderStatus[id];

        try {
            const response = await fetch(`${Constanst.DOMAIN_API}/api/oders/${id}`, {
                method: 'PUT', // Giả sử bạn có endpoint PUT để cập nhật
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ payment_status, status }),
            });

            if (response.ok) {
                alert(`Đơn hàng ID ${id} đã được cập nhật.`);
                setEditingOrderId(null);
                fetchOrders();
            } else {
                const errorData = await response.json();
                setError(`Lỗi khi cập nhật đơn hàng ID ${id}: ${errorData.message || response.statusText}`);
            }
        } catch (error) {
            console.error("Lỗi cập nhật đơn hàng:", error);
            setError(`Lỗi mạng khi cập nhật đơn hàng ID ${id}.`);
        }
    };

    const handleCancelEdit = () => {
        setEditingOrderId(null);
    };

    return (
        <div className="container mt-5">
            <h2>Danh sách đơn hàng</h2>
            {loading && <p>Đang tải dữ liệu đơn hàng...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && !error && (
                <Table striped bordered hover className="text-center">
                    <thead className="table-dark">
                    <tr>
                        <th>STT</th>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Điện thoại</th>
                        <th>Thanh toán</th>
                        <th>Trạng thái thanh toán</th>
                        <th>Trạng thái đơn hàng</th>
                        <th>ID Người dùng</th>
                        <th>Địa chỉ</th>
                        <th>Ngày tạo</th>
                        <th>Ngày cập nhật</th>
                        <th>Hành Động</th>
                    </tr>
                    </thead>
                    <tbody>
                    {orders.length === 0 ? (
                        <tr>
                            <td colSpan="12">Không có đơn hàng nào</td>
                        </tr>
                    ) : (
                        orders.map((order, index) => (
                            <tr key={order.id}>
                                <td>{index + 1}</td>
                                <td>{order.id}</td>
                                <td>{order.name}</td>
                                <td>{order.phone}</td>
                                <td>
                                    {order.payments === 1 ? "COD" :
                                        order.payments === 2 ? "Chuyển khoản" : "Không xác định"}
                                </td>
                                <td>
                                    {editingOrderId === order.id ? (
                                        <Form.Control
                                            as="select"
                                            value={updatedPaymentStatus[order.id]}
                                            onChange={(e) => handlePaymentStatusChange(order.id, e.target.value)}
                                        >
                                            <option value={0}>Chưa thanh toán</option>
                                            <option value={1}>Đã thanh toán</option>
                                        </Form.Control>
                                    ) : (
                                        order.payment_status === 1 ? "Đã thanh toán" : "Chưa thanh toán"
                                    )}
                                </td>
                                <td>
                                    {editingOrderId === order.id ? (
                                        <Form.Control
                                            as="select"
                                            value={updatedOrderStatus[order.id]}
                                            onChange={(e) => handleOrderStatusChange(order.id, e.target.value)}
                                        >
                                            <option value={0}>Đã hủy</option>
                                            <option value={1}>Chờ xác nhận</option>
                                            <option value={2}>Đã xác nhận</option>
                                            <option value={3}>Đang giao hàng</option>
                                            <option value={4}>Đã giao</option>
                                        </Form.Control>
                                    ) : (
                                        {
                                            1: "Chờ xác nhận",
                                            2: "Đã xác nhận",
                                            3: "Đang giao hàng",
                                            4: "Đã giao",
                                            0: "Đã hủy",
                                        }[order.status] || "Không xác định"
                                    )}
                                </td>
                                <td>{order.user_id}</td>
                                <td>{order.address}</td>
                                <td>{new Date(order.createdAt).toLocaleString()}</td>
                                <td>{new Date(order.updatedAt).toLocaleString()}</td>
                                <td>
                                    {editingOrderId === order.id ? (
                                        <>
                                            <Button variant="success" size="sm" onClick={() => handleSave(order.id)}>Lưu</Button>
                                            <Button variant="secondary" size="sm" className="ms-2" onClick={handleCancelEdit}>Hủy</Button>
                                        </>
                                    ) : (
                                        <Button variant="warning" size="sm" onClick={() => handleEdit(order.id)}>Sửa</Button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                    </tbody>
                </Table>
            )}
        </div>
    );
};

export default OrderList;