import {useCallback, useEffect, useState} from "react";
import {useParams} from "react-router";
import Constanst from "../../../Constanst"; // Đảm bảo Constanst.DOMAIN_API chứa URL đúng của API của bạn

const ProductDetail = () => {
    const { id } = useParams(); // Lấy ID sản phẩm từ URL
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    // Hàm lấy chi tiết sản phẩm
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

    // Hàm thêm sản phẩm vào giỏ hàng
    const handleAddToCart = useCallback(async () => {
        if (!product) return; // Kiểm tra nếu sản phẩm không tồn tại

        try {
            // Lấy token từ localStorage (hoặc sessionStorage nếu anh sử dụng)
            const token = localStorage.getItem("authToken");
            //console.log(token)
            const res = await fetch(`${Constanst.DOMAIN_API}/api/cart/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`  // Gửi token trong header
                },
                body: JSON.stringify({
                    product_id: product.id,
                    quantity: quantity,
                })
            });

            const data = await res.json();
            if (res.ok) {
                alert(data.message); // Thông báo thêm vào giỏ hàng thành công
            } else {
                alert(data.message); // Thông báo lỗi từ API
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    }, [product, quantity]); // Tối ưu lại hàm thêm vào giỏ hàng

    // Hàm thay đổi số lượng sản phẩm
    const handleQuantityChange = (action) => {
        if (action === "increase" && quantity < 10) {
            setQuantity(quantity + 1);
        } else if (action === "decrease" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    // Hàm tính tổng giá
    const calculateTotalPrice = () => {
        return product?.price ? product.price * quantity : 0;
    };

    if (!product) return <div className="text-center">Đang tải...</div>;

    // Styles
    const buttonStyle = {
        fontSize: '20px',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0',
        borderRadius: '50%',
        transition: 'background-color 0.3s ease',
    };

    const addToCartButtonStyle = {
        marginBottom: "500px",
        transition: 'all 0.3s ease',
    };

    // CSS Styles (Outside return)
    const productImageStyle = {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: '8px',
        transition: 'transform 0.3s ease',
    };

    const handleImageHover = (e) => {
        e.target.style.transform = 'scale(1.1)';
    };

    const handleImageLeave = (e) => {
        e.target.style.transform = 'scale(1)';
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
                            style={productImageStyle}
                            onMouseEnter={handleImageHover}
                            onMouseLeave={handleImageLeave}
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
