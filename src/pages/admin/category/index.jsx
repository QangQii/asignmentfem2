import React, {useEffect, useState} from "react";
import {Link} from 'react-router'; // Đổi thành react-router-dom
import Constanst from "../../../Constanst";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);

    // Hàm lấy danh sách danh mục
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/list`);
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error("Lỗi khi tải danh mục:", error);
            }
        };

        fetchCategories();
    }, []);

    // Hàm xử lý xóa danh mục
    const handleDelete = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/${id}`, {
                    method: 'DELETE',
                });

                if (!res.ok) {
                    throw new Error('Không thể xóa danh mục');
                }

                // Cập nhật lại danh sách danh mục sau khi xóa
                setCategories(categories.filter(category => category.id !== id));
                alert("Danh mục đã được xóa!");
            } catch (error) {
                console.error("Lỗi khi xóa danh mục:", error);
                alert("Có lỗi xảy ra khi xóa danh mục.");
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>Danh sách danh mục</h2>
            <Link to="/admin/category/addcategory" className="btn btn-primary mb-3">
                Thêm danh mục
            </Link>
            <table className="table table-bordered">
                <thead className="table-dark">
                <tr>
                    <th>Id</th>
                    <th>Tên danh mục</th>
                    <th>Hình ảnh</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>
                            <img
                                src={category.images} // Đảm bảo đúng tên trường từ API
                                alt={category.name}
                                style={{width: "100px", height: "auto"}}
                            />
                        </td>
                        <td>{category.status === 1 ? "Hiển thị" : "Ẩn"}</td>
                        <td>
                            <Link
                                to={`/admin/category/editcategory/${category.id}`}
                                className="btn btn-warning btn-sm me-2"
                            >
                                Sửa
                            </Link>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => handleDelete(category.id)} // Gọi hàm xóa khi nhấn nút
                            >
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;
