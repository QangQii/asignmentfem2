import {useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";

const User = () => {
    const [users, setUsers] = useState([
        {name: "Nguyễn Minh Hoàng", age: 30, info: "Lập trình viên tại Hà Nội", orders: 15, online: true},
        {name: "Trần Thị Hạnh", age: 28, info: "Nhân viên kế toán tại TP.HCM", orders: 10, online: false},
        {name: "Lê Thanh Sơn", age: 35, info: "Giáo viên tiếng Anh tại Đà Nẵng", orders: 8, online: true},
        {name: "Phạm Ngọc Mai", age: 22, info: "Sinh viên Đại học Bách Khoa", orders: 5, online: false},
        {name: "Hoàng Anh Dũng", age: 40, info: "Nhân viên marketing tại Hải Phòng", orders: 20, online: true},
        {name: "Đặng Thị Lan", age: 33, info: "Bác sĩ tại Bệnh viện Chợ Rẫy", orders: 12, online: false},
        {name: "Bùi Văn Tùng", age: 29, info: "Kỹ sư xây dựng tại Cần Thơ", orders: 7, online: true},
        {name: "Võ Thị Hương", age: 27, info: "Nhà thiết kế đồ họa tại Huế", orders: 9, online: false},
        {name: "Dương Quốc Bảo", age: 31, info: "Chuyên viên tài chính tại Bình Dương", orders: 18, online: true}
    ]);

    const [showModal, setShowModal] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const handleEdit = (index) => {
        setEditingUser({...users[index], index});
        setShowModal(true);
    };

    const handleDelete = (index) => {
        setUsers(users.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        const updatedUsers = [...users];
        updatedUsers[editingUser.index] = {...editingUser};
        delete updatedUsers[editingUser.index].index;
        setUsers(updatedUsers);
        setShowModal(false);
    };

    return (
        <div className="container mt-5 pt-4">
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th>STT</th>
                    <th>Họ và Tên</th>
                    <th>Tuổi</th>
                    <th>Thông Tin</th>
                    <th>Số Đơn Hàng</th>
                    <th>Trạng Thái</th>
                    <th>Hành Động</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.age}</td>
                        <td>{user.info}</td>
                        <td>{user.orders}</td>
                        <td>
                                <span
                                    className={`badge ${user.online ? 'badge-success text-white' : 'badge-secondary text-dark'}`}>
                                    {user.online ? <strong>Online</strong> : 'Offline'}
                                </span>
                        </td>
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
                    <Modal.Title>Chỉnh Sửa Thông Tin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editingUser && (
                        <Form>
                            <Form.Group>
                                <Form.Label>Họ và Tên</Form.Label>
                                <Form.Control type="text" value={editingUser.name}
                                              onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Tuổi</Form.Label>
                                <Form.Control type="number" value={editingUser.age}
                                              onChange={(e) => setEditingUser({...editingUser, age: e.target.value})}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Thông Tin</Form.Label>
                                <Form.Control type="text" value={editingUser.info}
                                              onChange={(e) => setEditingUser({...editingUser, info: e.target.value})}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Số Đơn Hàng</Form.Label>
                                <Form.Control type="number" value={editingUser.orders} onChange={(e) => setEditingUser({
                                    ...editingUser,
                                    orders: e.target.value
                                })}/>
                            </Form.Group>
                        </Form>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Hủy</Button>
                    <Button variant="primary" onClick={handleSave}>Lưu</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default User;
