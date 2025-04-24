import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import Constanst from "../../../Constanst";

const AddProduct = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const priceValue = watch("price");
  const discountPriceValue = watch("discount_price");

  const onSubmit = async (data) => {
    const formData = new FormData();
    const status = data.status === "Còn hàng" ? 1 : 0;

    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("discount_price", data.discount_price || ""); // Không bắt buộc
    formData.append("status", status);
    formData.append("category_id", data.category_id);
    formData.append("images", data.images[0]);

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

  return (
    <div className="container mt-5">
      <h2>Thêm sản phẩm</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border p-4 rounded bg-light"
        encType="multipart/form-data"
      >
        <div className="mb-3">
          <label className="form-label">Tên sản phẩm</label>
          <input
            className="form-control"
            {...register("name", { required: "Tên không được để trống" })}
          />
          {errors.name && <small className="text-danger">{errors.name.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Mô tả</label>
          <textarea
            className="form-control"
            {...register("description", { required: "Mô tả là bắt buộc" })}
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
              min: { value: 1, message: "Giá phải lớn hơn 0" },
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

        <div className="mb-3">
          <label className="form-label">Trạng thái</label>
          <select className="form-select" {...register("status")}>
            <option value="Còn hàng">Còn hàng</option>
            <option value="Hết hàng">Hết hàng</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Mã danh mục</label>
          <input
            type="number"
            className="form-control"
            {...register("category_id", { required: "Phải có mã danh mục" })}
          />
          {errors.category_id && <small className="text-danger">{errors.category_id.message}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">Chọn hình ảnh</label>
          <input
            type="file"
            className="form-control"
            {...register("images", { required: "Vui lòng chọn ảnh" })}
          />
          {errors.images && <small className="text-danger">{errors.images.message}</small>}
        </div>

        <button type="submit" className="btn btn-success me-2">Thêm sản phẩm</button>
        <Link to="/admin/product" className="btn btn-secondary">Quay lại</Link>
      </form>
    </div>
  );
};

export default AddProduct;
