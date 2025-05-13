import React, {useEffect, useState} from "react";
import {Link} from 'react-router';
import Constanst from "../../../Constanst";
import {Button, Card} from 'react-bootstrap';

const UserList = () => {
    const [users, setUsers] = useState([]);

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

    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/users/${id}`, {
                    method: 'DELETE',
                });

                if (!res.ok) throw new Error('Không thể xóa người dùng');

                setUsers(users.filter(user => user.id !== id));
                alert("Người dùng đã được xóa!");
            } catch (error) {
                console.error("Lỗi khi xóa người dùng:", error);
                alert("Có lỗi xảy ra khi xóa người dùng.");
            }
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
                                    <strong>SĐT:</strong> {user.phone} <br/>
                                    <strong>Trạng thái:</strong>{" "}
                                    <span className={`badge ${user.status === 1 ? 'bg-success' : 'bg-danger'}`}>
                                        {user.status === 1 ? "Đang hoạt động" : "Không hoạt động"}
                                    </span><br/>
                                    <strong>Role:</strong> {user.role === 1 ? "Admin" : "User"}<br/>
                                    {user.avatar && <img src={user.avatar} alt="Avatar" className="img-fluid"/>}
                                </Card.Text>
                                <Link to={`/admin/user/edituser/${user.id}`} className="btn btn-warning btn-sm me-2">
                                    Sửa
                                </Link>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    Xóa
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserList;
