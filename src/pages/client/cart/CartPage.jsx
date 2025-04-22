import React, { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import Constanst from "../../../Constanst";
import { useNavigate } from 'react-router-dom'; // Đúng react-router-dom

const CartPage = () => {
    const [cart, setCart] = useState([]); // Giỏ hàng
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    // Kiểm tra trạng thái đăng nhập
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/check-login`, {
                    method: "GET",
                    credentials: "same-origin",
                });

                const contentType = res.headers.get("content-type");

                if (contentType && contentType.includes("application/json")) {
                    const data = await res.json();
                    if (data.loggedIn) {
                        setIsLoggedIn(true);
                    } else {
                        setIsLoggedIn(false);
                    }
                } else {
                    console.error("Phản hồi không phải JSON", await res.text());
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra đăng nhập:", error);
                setIsLoggedIn(false);
            }
        };
        
        checkLoginStatus();
    }, []);

    // Lấy giỏ hàng từ sessionStorage
    useEffect(() => {
        const storedCart = sessionStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // Lưu giỏ hàng vào sessionStorage
    const saveToCart = (updatedCart) => {
        sessionStorage.setItem('cart', JSON.stringify(updatedCart));
        setCart(updatedCart);
    };

    // Thêm sản phẩm vào giỏ
    const addToCart = (productId, quantity) => {
        const updatedCart = [...cart];
        const productIndex = updatedCart.findIndex(item => item.productId === productId);

        if (productIndex === -1) {
            updatedCart.push({ productId, quantity });
        } else {
            updatedCart[productIndex].quantity += quantity;
        }

        saveToCart(updatedCart);
    };

    // Xóa sản phẩm khỏi giỏ
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.productId !== productId);
        saveToCart(updatedCart);
    };

    // Thực hiện thanh toán
    const handleCheckout = async () => {
        if (!isLoggedIn) {
            setError("Vui lòng đăng nhập để thanh toán.");
            return;
        }

        try {
            // Gửi dữ liệu giỏ hàng lên server
            const res = await fetch(`${Constanst.DOMAIN_API}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cart }), // Gửi giỏ hàng lên backend
            });

            const data = await res.json();

            if (res.ok) {
                // Nếu thành công, chuyển đến trang thanh toán
                navigate('/order');
            } else {
                setError(data.message || "Có lỗi xảy ra khi thanh toán.");
            }
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            setError("Có lỗi xảy ra khi thanh toán.");
        }
    };

    // Hiển thị giỏ hàng
    const renderCartItems = () => (
        <div>
            {cart.length === 0 ? (
                <div>Giỏ hàng của bạn đang trống.</div>
            ) : (
                <ul>
                    {cart.map((item, index) => (
                        <li key={index}>
                            Sản phẩm {item.productId}: {item.quantity} 
                            <Button onClick={() => removeFromCart(item.productId)}>Xóa</Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );

    return (
        <div className="container mt-5 text-center">
            {!isLoggedIn && <Alert variant="danger">Bạn cần đăng nhập để thanh toán</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <h3>Giỏ Hàng</h3>
            {renderCartItems()}

            <Button variant="success" onClick={handleCheckout}>
                Thanh toán
            </Button>
        </div>
    );
};

export default CartPage;
