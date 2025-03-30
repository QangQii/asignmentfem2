import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

const Order = () => {
    const [orders, setOrders] = useState([
        {id: "DH001", customer: "Nguyễn Minh Hoàng", total: "1.500.000 VND", status: "Đã giao"},
        {id: "DH002", customer: "Trần Thị Hạnh", total: "750.000 VND", status: "Đang xử lý"},
        {id: "DH003", customer: "Lê Thanh Sơn", total: "2.200.000 VND", status: "Đã giao"},
        {id: "DH004", customer: "Phạm Ngọc Mai", total: "980.000 VND", status: "Đang vận chuyển"},
        {id: "DH005", customer: "Hoàng Anh Dũng", total: "3.150.000 VND", status: "Đã hủy"},
        {id: "DH006", customer: "Đặng Thị Lan", total: "1.000.000 VND", status: "Đang xử lý"},
        {id: "DH007", customer: "Bùi Văn Tùng", total: "650.000 VND", status: "Đã giao"},
        {id: "DH008", customer: "Võ Thị Hương", total: "1.850.000 VND", status: "Đã giao"},
        {id: "DH009", customer: "Dương Quốc Bảo", total: "2.500.000 VND", status: "Đang vận chuyển"}
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newOrder, setNewOrder] = useState({id: "", customer: "", total: "", status: "Đang xử lý"});

    const handleEdit = (index) => {
        setEditingOrder({...orders[index], index});
        setShowModal(true);
    };

    const handleDelete = (index) => {
        setOrders(orders.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const updatedOrders = [...orders];
        updatedOrders[editingOrder.index] = {...editingOrder};
        delete updatedOrders[editingOrder.index].index;
        setOrders(updatedOrders);
        setShowModal(false);
    };

    const handleAdd = () => {
        setOrders([...orders, newOrder]);
        setShowAddModal(false);
        setNewOrder({id: "", customer: "", total: "", status: "Đang xử lý"});
    };

    return (
        <div className="container mt-5 pt-4">
            <h2 className="mb-4">Danh Sách Đơn Hàng</h2>
            <button className="btn btn-success mb-3" onClick={() => setShowAddModal(true)}>Thêm</button>
            <table className="table table-striped table-bordered text-center">
                <thead className="thead-dark">
                <tr>
                    <th>Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order, index) => (
                    <tr key={index}>
                        <td>{order.id}</td>
                        <td>{order.customer}</td>
                        <td>{order.total}</td>
                        <td><strong>{order.status}</strong></td>
                        <td>
                            <button className="btn btn-warning btn-sm mx-1" onClick={() => handleEdit(index)}>Sửa
                            </button>
                            <button className="btn btn-danger btn-sm mx-1" onClick={() => handleDelete(index)}>Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Modal chỉnh sửa */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Chỉnh Sửa Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingOrder && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Mã Đơn</Form.Label>
                                <Form.Control type="text" value={editingOrder.id} readOnly/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Khách Hàng</Form.Label>
                                <Form.Control type="text" value={editingOrder.customer}
                                              onChange={(e) => setEditingOrder({
                                                  ...editingOrder,
                                                  customer: e.target.value
                                              })}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tổng Tiền</Form.Label>
                                <Form.Control type="text" value={editingOrder.total} onChange={(e) => setEditingOrder({
                                    ...editingOrder,
                                    total: e.target.value
                                })}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Trạng Thái</Form.Label>
                                <Form.Control as="select" value={editingOrder.status} onChange={(e) => setEditingOrder({
                                    ...editingOrder,
                                    status: e.target.value
                                })}>
                                    <option>Đã giao</option>
                                    <option>Đang xử lý</option>
                                    <option>Đang vận chuyển</option>
                                    <option>Đã hủy</option>
                                </Form.Control>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="primary" onClick={handleSave}>Lưu</Button>
                </Modal.Footer>
            </Modal>

            {/* Modal thêm đơn hàng */}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Đơn Hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Mã Đơn</Form.Label>
                            <Form.Control type="text" value={newOrder.id}
                                          onChange={(e) => setNewOrder({...newOrder, id: e.target.value})}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Khách Hàng</Form.Label>
                            <Form.Control type="text" value={newOrder.customer}
                                          onChange={(e) => setNewOrder({...newOrder, customer: e.target.value})}/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Tổng Tiền</Form.Label>
                            <Form.Control type="text" value={newOrder.total}
                                          onChange={(e) => setNewOrder({...newOrder, total: e.target.value})}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>Hủy</Button>
                    <Button variant="success" onClick={handleAdd}>Thêm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Order;
