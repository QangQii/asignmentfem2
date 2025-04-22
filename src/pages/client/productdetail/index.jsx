import {useEffect, useState} from "react";
import {useParams} from "react-router";
import Constanst from "../../../Constanst"; // Đảm bảo Constanst.DOMAIN_API chứa URL đúng của API của bạn

const ProductDetail = () => {
    const {id} = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    const fetchProductDetail = async () => {
        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/products/${id}`);
            if (!res.ok) {
                throw new Error("Lỗi khi lấy dữ liệu chi tiết sản phẩm");
            }
            const data = await res.json();
            setProduct(data);
        } catch (err) {
            console.error("Lỗi fetch product detail:", err);
        }
    };

    const handleAddToCart = () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const productInCart = cart.find(item => item.id === product.id);

        if (productInCart) {
            productInCart.quantity += quantity;
        } else {
            cart.push({...product, quantity});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
    };

    const handleQuantityChange = (action) => {
        if (action === "increase" && quantity < 10) {
            setQuantity(quantity + 1);
        } else if (action === "decrease" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const calculateTotalPrice = () => {
        return product.price ? product.price * quantity : 0;
    };

    if (!product) return <div className="text-center">Đang tải...</div>;

    // Styles
    const buttonStyle = {
        fontSize: '20px',
        width: '40px',
        height: '40px'
    };

    const addToCartButtonStyle = {
        marginBottom: "500px",
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card shadow-sm">
                        <img
                            src={product.images ? `${Constanst.DOMAIN_API}/uploads/${product.images}` : "/path/to/default-image.jpg"}
                            alt={product.name}
                            className="card-img-top"
                            style={{
                                maxWidth: '300px',  // Giới hạn chiều rộng tối đa là 500px
                                maxHeight: '500px', // Giới hạn chiều cao tối đa là 400px
                            }}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <h2 className="mb-4">{product.name}</h2>
                    <p>{product.description}</p>
                    <h4 className="text-primary">
                        {calculateTotalPrice().toLocaleString()} VNĐ
                    </h4>

                    <div className="d-flex align-items-center mb-3">
                        <button
                            className="btn btn-danger text-white me-2"
                            onClick={() => handleQuantityChange("decrease")}
                            style={buttonStyle}
                        >
                            -
                        </button>
                        <span className="h4">{quantity}</span>
                        <button
                            className="btn btn-danger text-white ms-2"
                            onClick={() => handleQuantityChange("increase")}
                            style={buttonStyle}
                        >
                            +
                        </button>
                    </div>

                    <button
                        className="btn btn-primary btn-lg w-100 mb-5"
                        onClick={handleAddToCart}
                        style={addToCartButtonStyle}
                    >
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
