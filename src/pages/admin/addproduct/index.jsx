import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Constanst from "../../../Constanst";

const AddProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [categories, setCategories] = useState([]);
  const priceValue = watch("price");
  const discountPriceValue = watch("discount_price");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/list`);
      if (!res.ok) throw new Error("Lỗi khi lấy danh mục");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi fetch categories:", err);
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
    formData.append("category_id", data.category_id);
    formData.append("images", data.images[0]);
    formData.append("quantity", data.quantity); // ✅ số lượng tồn kho ban đầu
    formData.append("minStock", data.minStock); // ✅ tồn kho cảnh báo

    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/products/add`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Lỗi khi thêm sản phẩm");
      }

      navigate("/admin/product");
    } catch (err) {
      alert(`Lỗi khi thêm sản phẩm: ${err.message}`);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    const selectedCategory = categories.find(
      (category) => category.id === parseInt(selectedCategoryId)
    );
    if (selectedCategory) {
      setValue("category_name", selectedCategory.name);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Thêm sản phẩm</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-4 rounded bg-light"
        encType="multipart/form-data"
      >
        {/* Tên sản phẩm */}
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            className="form-control"
            {...register("name", { required: "Tên không được để trống" })}
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>

        {/* Mô tả */}
        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            {...register("description", { required: "Mô tả là bắt buộc" })}
          />
          {errors.description && <small className="text-danger">{errors.description.message}</small>}
        </div>

        {/* Giá */}
        <div className="mb-3">
          <label className="form-label">Giá</label>
          <input
            type="number"
            className="form-control"
            {...register("price", {
              required: "Giá không được để trống",
              min: { value: 1, message: "Giá phải lớn hơn 0" },
            })}
          />
          {errors.price && <small className="text-danger">{errors.price.message}</small>}
        </div>

        {/* Giá khuyến mãi */}
        <div className="mb-3">
          <label className="form-label">Giá khuyến mãi</label>
          <input
            type="number"
            className="form-control"
            {...register("discount_price", {
              validate: (value) => {
                if (value === "" || value === undefined) return true;
                if (parseFloat(value) >= parseFloat(priceValue)) {
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

        {/* Số lượng tồn kho ban đầu */}
        <div className="mb-3">
          <label className="form-label">Số lượng tồn kho (quantity)</label>
          <input
            type="number"
            className="form-control"
            {...register("quantity", {
              required: "Vui lòng nhập số lượng tồn kho",
              min: { value: 0, message: "Không được âm" },
            })}
          />
          {errors.quantity && <small className="text-danger">{errors.quantity.message}</small>}
        </div>

        {/* Tồn kho cảnh báo */}
        <div className="mb-3">
          <label className="form-label">Tồn kho cảnh báo (minStock)</label>
          <input
            type="number"
            className="form-control"
            {...register("minStock", {
              required: "Vui lòng nhập tồn kho cảnh báo",
              min: { value: 0, message: "Không được âm" },
            })}
          />
          {errors.minStock && <small className="text-danger">{errors.minStock.message}</small>}
        </div>

        {/* Trạng thái */}
        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select className="form-select" {...register("status")}>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </div>

        {/* Danh mục */}
        <div className="mb-3">
          <label className="form-label">Danh mục</label>
          <select
            className="form-select"
            {...register("category_id", { required: "Phải chọn danh mục" })}
            onChange={handleCategoryChange}
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

        {/* Tên danh mục đã chọn */}
        <div className="mb-3">
          <label className="form-label">Tên danh mục đã chọn</label>
          <input
            type="text"
            className="form-control"
            {...register("category_name")}
            readOnly
          />
        </div>

        {/* Hình ảnh */}
        <div className="mb-3">
          <label className="form-label">Chọn hình ảnh</label>
          <input
            type="file"
            className="form-control"
            {...register("images", { required: "Vui lòng chọn ảnh" })}
          />
          {errors.images && <small className="text-danger">{errors.images.message}</small>}
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
