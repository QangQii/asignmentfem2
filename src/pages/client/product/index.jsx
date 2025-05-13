import {useEffect, useState} from "react";
import {Link} from "react-router";
import Constanst from "../../../Constanst"; // Đảm bảo Constanst.DOMAIN_API chứa URL đúng của API của bạn

const ProductClient = () => {
    const [products, setProducts] = useState([]); // Dữ liệu sản phẩm
    const [categories, setCategories] = useState([]); // Dữ liệu danh mục
    const [selectedCategory, setSelectedCategory] = useState(null); // Danh mục đã chọn
    const [searchQuery, setSearchQuery] = useState(""); // Từ khóa tìm kiếm
    const [priceRange, setPriceRange] = useState("all"); // Khoảng giá đã chọn
    const [sortOrder, setSortOrder] = useState("none"); // Thứ tự sắp xếp giá

    // Lấy dữ liệu sản phẩm và danh mục khi component load
    useEffect(() => {
        fetchProducts();
        fetchCategories();
    }, []);

    // Hàm lấy dữ liệu sản phẩm từ API
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

    // Hàm lấy dữ liệu danh mục từ API
    const fetchCategories = async () => {
        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/categories/list`);
            if (!res.ok) throw new Error("Lỗi khi lấy dữ liệu danh mục");
            const data = await res.json();
            setCategories(data);
        } catch (err) {
            console.error("Lỗi fetch category:", err);
        }
    };

    // Hàm lọc sản phẩm theo tên, danh mục, khoảng giá và thứ tự sắp xếp
    const filteredProducts = products.filter(product => {
        // Kiểm tra tên sản phẩm có chứa từ khóa tìm kiếm không
        const matchesSearchQuery = product.name.toLowerCase().includes(searchQuery.toLowerCase());

        // Kiểm tra sản phẩm có thuộc danh mục đã chọn không
        const matchesCategory = selectedCategory ? product.category_id === selectedCategory : true;

        // Kiểm tra khoảng giá
        let matchesPriceRange = true;
        if (priceRange === "0-10000") {
            matchesPriceRange = product.price >= 0 && product.price <= 10000;
        } else if (priceRange === "10000-100000") {
            matchesPriceRange = product.price >= 10000 && product.price <= 100000;
        } else if (priceRange === "100000-1000000") {
            matchesPriceRange = product.price >= 100000 && product.price <= 1000000;
        } else if (priceRange === "1000000-100000000") {
            matchesPriceRange = product.price >= 1000000 && product.price <= 100000000;
        }

        return matchesSearchQuery && matchesCategory && matchesPriceRange;
    });

    // Hàm sắp xếp sản phẩm theo giá
    const sortedProducts = () => {
        if (sortOrder === "asc") {
            return filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "desc") {
            return filteredProducts.sort((a, b) => b.price - a.price);
        }
        return filteredProducts;
    };

    // Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = (product) => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productInCart = cart.find(item => item.id === product.id);

        if (productInCart) {
            productInCart.quantity += 1;
        } else {
            cart.push({...product, quantity: 1});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
    };

    return (
        <div>
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Cửa Hàng</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="untree_co-section product-section before-footer-section">
                <div className="container">
                    <div className="row">
                        {/* Cột bên trái - Danh mục */}
                        <div className="col-md-3 mb-4">
                            <h5>Danh mục sản phẩm</h5>
                            <ul className="list-group">
                                {categories.length === 0 ? (
                                    <li className="list-group-item">Không có danh mục nào</li>
                                ) : (
                                    categories.map((category) => (
                                        <li
                                            key={category.id}
                                            className="list-group-item"
                                            onClick={() => setSelectedCategory(category.id)} // Khi chọn danh mục, lưu vào selectedCategory
                                            style={{
                                                cursor: 'pointer',
                                                fontWeight: selectedCategory === category.id ? 'bold' : 'normal'
                                            }}
                                        >
                                            {category.name}
                                        </li>
                                    ))
                                )}
                            </ul>

                            {/* Dropdown lọc giá nằm dưới danh mục */}
                            <div className="mt-4">
                                <h5>Lọc theo giá</h5>
                                <select
                                    className="form-select"
                                    value={priceRange}
                                    onChange={(e) => setPriceRange(e.target.value)} // Cập nhật khoảng giá khi người dùng chọn
                                >
                                    <option value="all">Tất cả giá</option>
                                    <option value="0-10000">Từ 0 VNĐ đến 10,000 VNĐ</option>
                                    <option value="10000-100000">Từ 10,000 VNĐ đến 100,000 VNĐ</option>
                                    <option value="100000-1000000">Từ 100,000 VNĐ đến 1,000,000 VNĐ</option>
                                    <option value="1000000-100000000">Từ 1,000,000 VNĐ đến 100,000,000 VNĐ</option>
                                </select>
                            </div>
                        </div>

                        {/* Cột bên phải - Sản phẩm */}
                        <div className="col-md-9">
                            {/* Thanh tìm kiếm */}
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tìm kiếm sản phẩm..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)} // Cập nhật searchQuery khi người dùng nhập
                                />
                            </div>

                            {/* Dropdown sắp xếp giá */}
                            <div className="mb-4">
                                <select
                                    className="form-select"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)} // Cập nhật thứ tự sắp xếp khi người dùng chọn
                                >
                                    <option value="none">Sắp xếp theo giá</option>
                                    <option value="asc">Giá từ thấp đến cao</option>
                                    <option value="desc">Giá từ cao đến thấp</option>
                                </select>
                            </div>

                            <div className="row">
                                {sortedProducts().length === 0 ? (
                                    <div className="col-12">
                                        <p>Không có sản phẩm nào</p>
                                    </div>
                                ) : (
                                    sortedProducts().map((product) => (
                                        <div className="col-12 col-md-6 col-lg-4 mb-4" key={product.id}>
                                            <div className="card h-100 shadow-sm">
                                                <Link to={`/product/${product.id}`}>
                                                    <img
                                                        src={`${Constanst.DOMAIN_API}/uploads/${product.images}`}
                                                        className="card-img-top img-fluid"
                                                        alt={product.name}
                                                        style={{height: "200px", objectFit: "cover"}}
                                                    />
                                                </Link>
                                                <div className="card-body d-flex flex-column">
                                                    <h5 className="card-title">{product.name}</h5>
                                                    <p className="card-text mt-auto fw-bold text-danger">
                                                        {product.price
                                                            ? product.price.toLocaleString() + " VNĐ"
                                                            : "Giá chưa có"}
                                                    </p>
                                                    <div className="d-flex justify-content-between mt-3">
                                                        <Link to={`/product/${product.id}`} className="btn btn-info">
                                                            Xem Chi Tiết
                                                        </Link>
                                                        <button
                                                            className="btn btn-success"
                                                            onClick={() => handleAddToCart(product)}
                                                        >
                                                            Thêm Giỏ Hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductClient;
