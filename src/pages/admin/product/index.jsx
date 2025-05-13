import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Constanst from "../../../Constanst";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // Thêm state cho tìm kiếm

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();  // Ưu tiên fetch danh mục trước
      await fetchProducts();
    };
    fetchData();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/products/list`);
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu sản phẩm");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Lỗi fetch product:", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/list`);
      if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu danh mục");
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Lỗi fetch categories:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
      try {
        const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("Sản phẩm đã được xóa!");
          fetchProducts();
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

  // ✅ Sửa để đảm bảo so sánh đúng kiểu dữ liệu
  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => String(cat.id) === String(categoryId));
    return category?.name || "Không có danh mục";
  };

  // Lọc sản phẩm dựa trên từ khóa tìm kiếm
  const filteredProducts = products.filter(product => {
    return product.name.toLowerCase().includes(searchQuery.toLowerCase()); // Kiểm tra tên sản phẩm chứa từ khóa
  });

  return (
      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Danh sách sản phẩm</h2>
          <Link className="btn btn-success" to="/admin/product/addproduct">
            Thêm sản phẩm
          </Link>
        </div>

        {/* Thêm ô tìm kiếm */}
        <div className="mb-4">
          <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật searchQuery khi người dùng nhập
          />
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
          {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan="10">Không có sản phẩm nào</td>
              </tr>
          ) : (
              filteredProducts.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.price?.toLocaleString() || "Không có"}</td>
                    <td>{getCategoryName(product.category_id)}</td>
                    <td>{product.status === 1 ? "Hiển thị" : "Ẩn"}</td>
                    <td>
                      <img
                          src={`${Constanst.DOMAIN_API}/uploads/${product.images}`}
                          alt="product"
                          width="60"
                          height="60"
                          style={{objectFit: "cover"}}
                      />
                    </td>
                    <td>{product.description}</td>
                    <td>{product.discount_price?.toLocaleString() || "Không có"}</td>
                    <td>{product.view}</td>
                    <td>
                      <Link
                          className="btn btn-success me-2"
                          to={`/admin/product/editproduct/${product.id}`}
                      >
                        Sửa sản phẩm
                      </Link>
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
