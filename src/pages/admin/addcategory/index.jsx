import React, {useState} from "react";
import {Link, useNavigate} from "react-router";
import Constanst from "../../../Constanst";

const AddCategory = () => {
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: "",
        images: "", // sửa đúng với cột trong DB
        status: "Hiển thị",
    });

    const handleChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = category.status === "Hiển thị" ? 1 : 0;

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...category, status}), // giữ images
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Thêm thất bại");
            }

            alert("Thêm danh mục thành công!");
            navigate("/admin/category");
        } catch (err) {
            console.error("Lỗi:", err.message);
            alert("Lỗi khi thêm danh mục: " + err.message);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Thêm danh mục</h2>
            <form onSubmit={handleSubmit} className="border p-4 bg-light rounded">
                <div className="mb-3">
                    <label className="form-label">Tên danh mục</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={category.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Hình ảnh (URL)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="images"
                        value={category.images}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select
                        className="form-select"
                        name="status"
                        value={category.status}
                        onChange={handleChange}
                    >
                        <option value="Hiển thị">Hiển thị</option>
                        <option value="Ẩn">Ẩn</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-success me-2">
                    Thêm danh mục
                </button>
                <Link to="/admin/category" className="btn btn-secondary">
                    Quay lại
                </Link>
            </form>
        </div>
    );
};

export default AddCategory;
