import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router"; // Đổi thành 'react-router-dom'
import Constanst from "../../../Constanst";

const EditCategory = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: "",
        status: "Hiển thị",
    });

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/${id}`);
                const data = await res.json();

                if (res.ok) {
                    setCategory({
                        name: data.name,
                        status: data.status === 1 ? "Hiển thị" : "Ẩn",
                    });
                } else {
                    throw new Error("Không tìm thấy danh mục");
                }
            } catch (err) {
                console.error(err);
                alert("Lỗi khi tải danh mục");
                navigate("/admin/category");
            }
        };

        fetchCategory();
    }, [id, navigate]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setCategory({...category, [name]: value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = category.status === "Hiển thị" ? 1 : 0;

        const data = {
            name: category.name,
            status: status,
        };

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Cập nhật thất bại");
            }

            alert("Cập nhật danh mục thành công!");
            navigate("/admin/category");
        } catch (err) {
            console.error(err.message);
            alert("Lỗi khi cập nhật danh mục: " + err.message);
        }
    };


    return (
        <div className="container mt-5">
            <h2>Sửa danh mục</h2>
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
                    Cập nhật danh mục
                </button>
                <Link to="/admin/category" className="btn btn-secondary">
                    Quay lại
                </Link>
            </form>
        </div>
    );
};

export default EditCategory;
