import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Constanst from "../../../Constanst";

const AddProduct = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    view: "",
    status: "Còn hàng",
    category_id: "",
      images: null, // Để lưu trữ file ảnh
  });

    // Xử lý thay đổi giá trị của các trường nhập liệu
  const handleChange = (e) => {
      const {name, value} = e.target;
      setProduct({...product, [name]: value});
  };

    // Xử lý thay đổi file hình ảnh
    const handleFileChange = (e) => {
        setProduct({...product, images: e.target.files[0]}); // Lưu file ảnh
  };

    // Gửi dữ liệu đến API
  const handleSubmit = async (e) => {
    e.preventDefault();

    const status = product.status === "Còn hàng" ? 1 : 0;
      const formData = new FormData();

      // Thêm các dữ liệu vào formData
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("discount_price", product.discount_price);
      formData.append("view", product.view);
      formData.append("status", status);
      formData.append("category_id", product.category_id);
      formData.append("images", product.images); // Thêm file ảnh vào FormData

    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/products/add`, {
        method: "POST",
          body: formData, // Gửi formData thay vì JSON
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Lỗi từ server:", errorData);
        throw new Error(errorData.error || "Lỗi khi thêm sản phẩm");
      }

      navigate("/admin/product");
    } catch (err) {
      console.error("Lỗi khi thêm sản phẩm:", err.message);
      alert(`Lỗi khi thêm sản phẩm: ${err.message}`);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Thêm sản phẩm</h2>
        <form onSubmit={handleSubmit} className="border p-4 rounded bg-light" encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Giá khuyến mãi</label>
          <input
            type="number"
            className="form-control"
            name="discount_price"
            value={product.discount_price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Số lượt xem</label>
          <input
            type="number"
            className="form-control"
            name="view"
            value={product.view}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select
            className="form-select"
            name="status"
            value={product.status}
            onChange={handleChange}
          >
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Mã danh mục</label>
          <input
            type="number"
            className="form-control"
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
            <label className="form-label">Chọn hình ảnh</label>
          <input
              type="file"
            className="form-control"
              name="images"
              onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success me-2">
          Thêm sản phẩm
        </button>
        <Link to="/admin/product" className="btn btn-secondary">
          Quay lại
        </Link>
      </form>
    </div>
  );
};

export default AddProduct;
