import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Link, useNavigate, useParams} from "react-router-dom";
import Constanst from "../../../Constanst";

const EditProduct = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Lấy id từ URL
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchCategories(); // Lấy danh mục khi component mount
    fetchProduct(); // Lấy thông tin sản phẩm
  }, [id]);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/list`);
      if (!res.ok) {
        throw new Error("Lỗi khi lấy danh mục");
      }
      const data = await res.json();
      setCategories(data); // Lưu dữ liệu danh mục vào state
    } catch (err) {
      console.error("Lỗi fetch categories:", err);
    }
  };

  const fetchProduct = async () => {
    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`);
      if (!res.ok) {
        throw new Error("Lỗi khi lấy sản phẩm");
      }
      const data = await res.json();
      setProduct(data);
      // Set các giá trị của sản phẩm vào form
      setValue("name", data.name);
      setValue("description", data.description);
      setValue("price", data.price);
      setValue("discount_price", data.discount_price || "");
      setValue("status", data.status === 1 ? "Còn hàng" : "Hết hàng");
      setValue("category_id", data.category_id);
      setValue("images", data.images);
    } catch (err) {
      console.error("Lỗi khi lấy dữ liệu sản phẩm:", err);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const status = data.status === "Còn hàng" ? 1 : 0;

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discount_price", data.discount_price || "");
    formData.append("status", status);
    formData.append("category_id", data.category_id); // Lấy category_id
    if (data.images[0]) {
      formData.append("images", data.images[0]);
    }

    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi cập nhật sản phẩm");
      }

      navigate("/admin/product");
    } catch (err) {
      alert(`Lỗi khi cập nhật sản phẩm: ${err.message}`);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
        (category) => category.id === parseInt(selectedCategoryId)
    );
    // Cập nhật tên danh mục vào input
    if (selectedCategory) {
      setValue("category_name", selectedCategory.name);
    }
  };

  if (!product) {
    return <div>Loading...</div>; // Hiển thị loading khi dữ liệu sản phẩm chưa được tải
  }

  return (
      <div className="container mt-5">
        <h2>Sửa sản phẩm</h2>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="border p-4 rounded bg-light"
            encType="multipart/form-data"
        >
          <div className="mb-3">
            <label className="form-label">Tên sản phẩm</label>
            <input
                className="form-control"
                {...register("name", {required: "Tên không được để trống"})}
            />
            {errors.name && <small className="text-danger">{errors.name.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
                className="form-control"
                {...register("description", {required: "Mô tả là bắt buộc"})}
            />
            {errors.description && <small className="text-danger">{errors.description.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Giá</label>
            <input
                type="number"
                className="form-control"
                {...register("price", {
                  required: "Giá không được để trống",
                  min: {value: 1, message: "Giá phải lớn hơn 0"},
                })}
            />
            {errors.price && <small className="text-danger">{errors.price.message}</small>}
          </div>

          <div className="mb-3">
            <label className="form-label">Giá khuyến mãi</label>
            <input
                type="number"
                className="form-control"
                {...register("discount_price", {
                  validate: (value) => {
                    if (value === "" || value === undefined) return true; // Không bắt buộc
                    if (parseFloat(value) >= parseFloat(product.price)) {
                      return "Giá khuyến mãi phải nhỏ hơn giá gốc";
                    }
                    return true;
                  },
                })}
            />
            {errors.discount_price && (
                <small className="text-danger">{errors.discount_price.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Trạng thái</label>
            <select className="form-select" {...register("status")}>
              <option value="Còn hàng">Còn hàng</option>
              <option value="Hết hàng">Hết hàng</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Danh mục</label>
            <select
                className="form-select"
                {...register("category_id", {required: "Phải chọn danh mục"})}
                onChange={handleCategoryChange} // Gọi khi thay đổi danh mục
            >
              <option value="">Chọn danh mục</option>
              {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
              ))}
            </select>
            {errors.category_id && (
                <small className="text-danger">{errors.category_id.message}</small>
            )}
          </div>

          {/* Hiển thị tên danh mục đã chọn */}
          <div className="mb-3">
            <label className="form-label">Tên danh mục đã chọn</label>
            <input
                type="text"
                className="form-control"
                {...register("category_name")}
                readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Chọn hình ảnh</label>
            <input
                type="file"
                className="form-control"
                {...register("images")}
            />
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
