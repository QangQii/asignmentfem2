import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router";
import Constanst from "../../../Constanst";

const EditCategory = () => {
    const {id} = useParams();
    console.log("Editing category with ID:", id);
    const navigate = useNavigate();
    const [category, setCategory] = useState({
        name: "",
        images: "",
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
                        images: data.images, // ✅ Sửa từ 'image' thành 'images'
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
        setCategory({...category, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const status = category.status === "Hiển thị" ? 1 : 0;

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...category, status}),
            });

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Cập nhật thất bại");
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
                    <label className="form-label">Hình ảnh (URL)</label>
                    <input
                        type="text"
                        className="form-control"
                        name="images"
                        value={category.images} // ✅ Đã sửa đúng key
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
