import React, {useState} from "react";
import {Link} from "react-router";

const AddCategory = () => {
    const [category, setCategory] = useState({name: "", description: ""});

    const handleChange = (e) => {
        setCategory({...category, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Danh mục mới:", category);
    };

    return (
        <div className="container mt-5">
            <h2>Thêm danh mục</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Tên danh mục</label>
                    <input type="text" className="form-control" name="name" value={category.name}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" name="description" value={category.description}
                              onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-success me-2">Thêm danh mục</button>
                <Link to="/admin/category" className="btn btn-secondary">Quay lại</Link>
            </form>
        </div>
    );
};

export default AddCategory;