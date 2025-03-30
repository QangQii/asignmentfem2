import React, {useState} from "react";
import {Link} from "react-router";

const EditProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        category: "",
        content: "",
        price: "",
        status: "Còn hàng",
        image: ""
    });

    const handleChange = (e) => {
        setProduct({...product, [e.target.name]: e.target.value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Sản phẩm mới:", product);
        // Xử lý thêm sản phẩm tại đây
    };

    return (
        <div className="container mt-5">
            <h2>Sửa sản phẩm</h2>
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light">
                <div className="mb-3">
                    <label className="form-label">Tên sản phẩm</label>
                    <input type="text" className="form-control" name="name" value={product.name} onChange={handleChange}
                           required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Danh mục</label>
                    <input type="text" className="form-control" name="category" value={product.category}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Nội dung</label>
                    <textarea className="form-control" name="content" value={product.content} onChange={handleChange}
                              required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Giá</label>
                    <input type="number" className="form-control" name="price" value={product.price}
                           onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Trạng thái</label>
                    <select className="form-select" name="status" value={product.status} onChange={handleChange}>
                        <option value="Còn hàng">Còn hàng</option>
                        <option value="Hết hàng">Hết hàng</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Hình ảnh (URL)</label>
                    <input type="text" className="form-control" name="image" value={product.image}
                           onChange={handleChange} required/>
                </div>
                <button type="submit" className="btn btn-success me-2">Thêm sản phẩm</button>
                <Link to="/admin/product" className="btn btn-secondary">Quay lại</Link>
            </form>
        </div>
    );
};

export default EditProduct;
