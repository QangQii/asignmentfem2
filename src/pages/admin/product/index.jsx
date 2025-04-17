import { useState, useEffect } from "react";
import { Link } from "react-router"; // Sử dụng react-router-dom
import Constanst from "../../../Constanst";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/products/list`);
      if (!res.ok) {
        throw new Error("Lỗi khi lấy dữ liệu sản phẩm");
      }
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi fetch product:", err);
    }
  };

  // Hàm xử lý xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Sản phẩm đã được xóa!");
          fetchProducts(); // Cập nhật lại danh sách sản phẩm sau khi xóa
        } else {
          const errorData = await res.json();
          console.error("Lỗi xóa sản phẩm:", errorData);
          alert("Lỗi khi xóa sản phẩm");
        }
      } catch (err) {
        console.error("Lỗi khi xóa sản phẩm:", err);
        alert("Lỗi khi xóa sản phẩm");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Danh sách sản phẩm</h2>
        <Link className="btn btn-success" to="/admin/product/addproduct">
          Thêm sản phẩm
        </Link>
      </div>

      <table className="table table-bordered table-hover text-center">
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Tên sản phẩm</th>
            <th>Giá</th>
            <th>Danh mục</th>
            <th>Trạng thái</th>
            <th>Ảnh</th>
            <th>Mô tả</th>
            <th>Giá KM</th>
            <th>View</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="10">Không có sản phẩm nào</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td> {/* Hiển thị số thứ tự */}
                <td>
                  {product.name}
                </td>
                <td>{product.price ? product.price.toLocaleString() : "Không có"}</td>
                <td>{product.category_id}</td> {/* Nếu bạn muốn hiển thị tên danh mục, cần phải lấy tên từ API hoặc liên kết */}
                <td>{product.status === 1 ? "Hiển thị" : "Ẩn"}</td>
                <td>
                  <img
                    src={`${Constanst.DOMAIN_API}/${product.images}`}
                    alt="product"
                    width="60"
                    height="60"
                    style={{ objectFit: "cover" }}
                  />
                </td>
                <td>{product.description}</td>
                <td>
                  {product.discount_price
                    ? product.discount_price.toLocaleString()
                    : "Không có"}
                </td>
                <td>{product.view}</td>
                <td>
                  {/* Nút sửa, trỏ đến trang sửa sản phẩm */}
                  <Link
                    className="btn btn-success me-2"
                    to={`/admin/product/editproduct/${product.id}`}
                  >
                    Sửa sản phẩm
                  </Link>

                  {/* Nút xóa sản phẩm */}
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(product.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
