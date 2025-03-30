import React from "react";
import {Link} from "react-router";

const CategoryList = () => {
    const categories = [
        {id: 1, name: "Điện tử", description: "Các sản phẩm điện tử hiện đại"},
        {id: 2, name: "Thời trang", description: "Thời trang xu hướng mới nhất"},
        {id: 3, name: "Gia dụng", description: "Các sản phẩm tiện ích cho gia đình"},
    ];

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Danh sách danh mục</h2>
                <Link className="btn btn-success" to="addcategory">Thêm danh mục</Link>
            </div>
            <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên danh mục</th>
                    <th>Mô tả</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {categories.map((category) => (
                    <tr key={category.id}>
                        <td>{category.id}</td>
                        <td>{category.name}</td>
                        <td>{category.description}</td>
                        <td>
                            <Link to="editcategory" className="btn btn-primary btn-sm me-2">Sửa</Link>
                            <button className="btn btn-secondary btn-sm">Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default CategoryList;