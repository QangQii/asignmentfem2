import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom"; // Sử dụng react-router-dom thay vì react-router
import Constanst from "../../../Constanst"; // Đảm bảo rằng bạn đã cấu hình đúng URL API

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    discount_price: "",
    view: "",
    status: "Còn hàng",
    category_id: "",
      images: "", // Thay 'image' thành 'images'
  });
    const [image, setImage] = useState(null); // Dùng state để lưu ảnh khi upload

  // Lấy dữ liệu sản phẩm khi component được render
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`);
        const data = await res.json();

        if (res.ok && data) {
          setProduct({
            name: data.name || "",
            description: data.description || "",
            price: data.price || "",
            discount_price: data.discount_price || "",
            view: data.view || "",
            status: data.status === 1 ? "Còn hàng" : "Hết hàng",
            category_id: data.category_id || "",
              images: data.images || "", // Đảm bảo lấy đúng trường 'images' từ server
          });
        } else {
          alert("Không tìm thấy sản phẩm!");
          navigate("/admin/product"); // Quay về danh sách nếu không tìm thấy
        }
      } catch (err) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", err);
        alert("Lỗi khi tải dữ liệu sản phẩm");
        navigate("/admin/product"); // Quay về nếu lỗi
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]); // Lưu ảnh khi người dùng chọn
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('price', product.price);
      formData.append('discount_price', product.discount_price);
      formData.append('view', product.view);
      formData.append('status', product.status === "Còn hàng" ? 1 : 0);
      formData.append('category_id', product.category_id);

      // Thêm ảnh vào FormData nếu có
      if (image) {
          formData.append('images', image);  // Tên trường phải là 'images' như đã cấu hình trong backend
      }

    try {
        const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`, {
            method: "PUT",
            body: formData,  // Gửi FormData thay vì JSON
        });

        if (!res.ok) {
            const errorData = await res.json();
            alert(`Lỗi từ server: ${errorData.message || "Không xác định"}`);
            throw new Error(errorData.message || "Lỗi khi sửa sản phẩm");
        }

        alert("Cập nhật sản phẩm thành công!");
        navigate("/admin/product");
    } catch (err) {
        console.error("Lỗi khi sửa sản phẩm:", err.message);
        alert(`Lỗi khi sửa sản phẩm: ${err.message}`);
    }
  };


    return (
    <div className="container mt-5">
      <h2>Sửa sản phẩm</h2>
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
            <label className="form-label">Hình ảnh</label>
          <input
              type="file"
            className="form-control"
              name="images"
              onChange={handleImageChange}
          />
            {product.images && (
                <div>
                    <p>Ảnh hiện tại:</p>
                    <img
                        src={`${Constanst.DOMAIN_API}/uploads/${product.images}`}
                        alt="current product"
                        width="100"
                    />
                </div>
            )}
        </div>
        <button type="submit" className="btn btn-success me-2">
          Cập nhật sản phẩm
        </button>
        <Link to="/admin/product" className="btn btn-secondary">
          Quay lại
        </Link>
      </form>
    </div>
  );
};

export default EditProduct;
