import React, {useEffect, useState} from 'react';
import {Alert, Button} from 'react-bootstrap';
import Constanst from "../../../Constanst";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Kiểm tra đăng nhập
    useEffect(() => {
        const checkLoginStatus = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/check-login`, {
                    method: "GET",
                    credentials: "same-origin", // Đảm bảo gửi cookie/session
                });
                const data = await res.json();
                if (data.loggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra đăng nhập:", error);
            }
        };

        checkLoginStatus();
    }, []);

    // Thêm vào giỏ hàng
    const addToCart = async (productId, quantity) => {
        if (!isLoggedIn) {
            setError("Vui lòng đăng nhập để thêm vào giỏ hàng.");
            return;
        }

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/cart`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({productId, quantity}),
            });

            const data = await res.json();

            if (res.ok) {
                alert(data.message);
                setCart([...cart, {productId, quantity}]); // Cập nhật giỏ hàng
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
        }
    };

    return (
        <div>
            {!isLoggedIn && <Alert variant="danger">Bạn cần đăng nhập để thêm vào giỏ hàng</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}

            <Button onClick={() => addToCart(1, 1)}>Thêm vào giỏ hàng</Button>
        </div>
    );
};

export default CartPage;
