import { useState, useEffect } from "react";
import Constanst from "../../../Constanst"; // Đảm bảo Constanst.DOMAIN_API chứa URL đúng của API của bạn

const ProductClient = () => {
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
                        {products.length === 0 ? (
                            <div className="col-12">
                                <p>Không có sản phẩm nào</p>
                            </div>
                        ) : (
                            products.map((product, index) => (
                                <div className="col-12 col-md-4 col-lg-3 mb-5" key={product.id}>
                                    <a className="product-item" href="#">
                                        <img
                                            src={`${Constanst.DOMAIN_API}/${product.images}`} // Đảm bảo đường dẫn hình ảnh chính xác
                                            className="img-fluid product-thumbnail"
                                            alt={product.name}
                                        />
                                        <h3 className="product-title">{product.name}</h3>
                                        <strong className="product-price">
                                            {product.price
                                                ? product.price.toLocaleString() + " VNĐ"
                                                : "Giá chưa có"}
                                        </strong>
                                        <span className="icon-cross">
                                            <img src="images/cross.svg" className="img-fluid" alt="Thêm vào giỏ" />
                                        </span>
                                    </a>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductClient;
