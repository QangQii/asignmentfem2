import React, {useEffect, useState} from "react";
import Constanst from "../../../Constanst"; // Đảm bảo đường dẫn đúng
import {Button, Card, Form} from 'react-bootstrap'; // Sử dụng Card và Form từ react-bootstrap

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null); // State để theo dõi người dùng đang chỉnh sửa

    // Hàm lấy danh sách người dùng
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/users/list`);
                const data = await res.json();
                setUsers(data);
            } catch (error) {
                console.error("Lỗi khi tải người dùng:", error);
            }
        };

        fetchUsers();
    }, []);

    // Hàm xử lý xóa người dùng
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/users/${id}`, {
                    method: 'DELETE',
                });

                if (!res.ok) {
                    throw new Error('Không thể xóa người dùng');
                }

                // Cập nhật lại danh sách người dùng sau khi xóa
                setUsers(users.filter(user => user.id !== id));
                alert("Người dùng đã được xóa!");
            } catch (error) {
                console.error("Lỗi khi xóa người dùng:", error);
                alert("Có lỗi xảy ra khi xóa người dùng.");
            }
        }
    };

    // Hàm xử lý cập nhật trạng thái người dùng
    const handleStatusChange = async (userId, status) => {
        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({status}),
            });

            if (!res.ok) {
                throw new Error('Không thể cập nhật trạng thái');
            }

            // Cập nhật lại trạng thái người dùng trong state
            setUsers(users.map(user =>
                user.id === userId ? {...user, status} : user
            ));
            setEditingUser(null); // Đóng card chỉnh sửa sau khi cập nhật
            alert("Trạng thái người dùng đã được cập nhật!");
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert("Có lỗi xảy ra khi cập nhật trạng thái.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Danh sách người dùng</h2>
            <div className="row">
                {users.map((user) => (
                    <div className="col-md-4 mb-3" key={user.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>
                                    <strong>Id:</strong> {user.id} <br/>
                                    <strong>Username:</strong> {user.username} <br/>
                                    <strong>Email:</strong> {user.email} <br/>
                                    <strong>Số điện thoại:</strong> {user.phone} <br/>
                                    <strong>Trạng thái:</strong>
                                    <span
                                        className={`badge ${user.status === 1 ? 'bg-success' : 'bg-danger'}`}
                                    >
                                        {user.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                                    </span> <br/>
                                    <strong>Role:</strong> {user.role === 1 ? "Admin" : "User"} <br/>
                                    {/* Hiển thị Avatar dưới dạng ảnh */}
                                    {user.avatar && <img src={user.avatar} alt="Avatar" className="img-fluid"/>}
                                </Card.Text>
                                <Button
                                    variant="warning"
                                    size="sm"
                                    onClick={() => setEditingUser(user)} // Chỉnh sửa khi nhấn "Sửa"
                                >
                                    Sửa
                                </Button>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)} // Xóa khi nhấn "Xóa"
                                >
                                    Xóa
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>

            {/* Hiển thị Card chỉnh sửa trạng thái khi có người dùng đang chỉnh sửa */}
            {editingUser && (
                <div className="mt-4">
                    <Card>
                        <Card.Body>
                            <Card.Title>Chỉnh sửa trạng thái: {editingUser.name}</Card.Title>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Trạng thái</Form.Label>
                                    <Form.Control
                                        as="select"
                                        value={editingUser.status}
                                        onChange={(e) => setEditingUser({...editingUser, status: e.target.value})}
                                    >
                                        <option value={0}>Đang hoạt động</option>
                                        <option value={1}>Không hoạt động</option>
                                    </Form.Control>
                                </Form.Group>
                            </Form>
                            <Button
                                variant="primary"
                                onClick={() => handleStatusChange(editingUser.id, editingUser.status)}
                            >
                                Lưu
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={() => setEditingUser(null)} // Đóng Card khi hủy
                                className="ml-2"
                            >
                                Hủy
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default UserList;
