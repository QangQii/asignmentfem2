import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Button, Image, Table} from 'react-bootstrap';
import Constanst from "../../../Constanst"; // Đảm bảo đường dẫn đúng
import {useNavigate} from 'react-router-dom';
import {FaMinus, FaPlus, FaTrashAlt} from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode'; // *** THÊM IMPORT NÀY ***

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    // --- Lấy giỏ hàng từ backend thay vì localStorage ---
    const getCartFromAPI = useCallback(async () => {
        const token = localStorage.getItem('authToken');
        if (token) {
            try {
                const response = await fetch(`${Constanst.DOMAIN_API}/api/cart`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const cartData = await response.json();
                    setCart(cartData);
                } else {
                    throw new Error('Không thể tải giỏ hàng');
                }
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng từ API:", error);
                setError("Không thể tải giỏ hàng.");
            }
        } else {
            setCart([]);
        }
    }, []);

    // --- Lưu giỏ hàng vào backend ---
    const saveCartToAPI = async (productId, updatedCart) => {
        const token = localStorage.getItem('authToken');
        let productUpdated = {};
        if (token) {
            try {
                updatedCart.map(item => {
                    if (item.product_id === productId) {
                        productUpdated = item
                    }
                })
                const response = await fetch(`${Constanst.DOMAIN_API}/api/cart/update/` + productId, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({cart: productUpdated})
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error('Error saving cart:', errorData);  // Log lỗi nếu có
                    throw new Error('Cập nhật giỏ hàng thất bại');
                }
                console.log('Giỏ hàng đã được cập nhật thành công');
            } catch (error) {
                console.error('Lỗi khi lưu giỏ hàng:', error);
                setError("Không thể lưu giỏ hàng.");
            }
        }
    };

    const deleteCartToAPI = async (productId) => {
        const token = localStorage.getItem('authToken');
        const response = await fetch(`${Constanst.DOMAIN_API}/api/cart/` + productId, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });
    }


    // --- Hàm check login (giải mã token) ---
    const checkLoginStatus = useCallback(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 > Date.now()) {
                    setIsLoggedIn(true);
                    setUserInfo({
                        id: decodedToken.id,
                        name: decodedToken.name,
                        email: decodedToken.email,
                        role: decodedToken.role,
                        phone: decodedToken.phone || null
                    });
                } else {
                    setIsLoggedIn(false);
                    setUserInfo(null);
                    localStorage.removeItem('authToken');
                }
            } catch (error) {
                setIsLoggedIn(false);
                setUserInfo(null);
                localStorage.removeItem('authToken');
            }
        } else {
            setIsLoggedIn(false);
            setUserInfo(null);
        }
    }, []);

    useEffect(() => {
        getCartFromAPI();
        checkLoginStatus();
    }, [getCartFromAPI, checkLoginStatus]);

    // --- Các hàm thay đổi giỏ hàng (tăng giảm số lượng, xóa sản phẩm) ---
    const handleQuantityChange = (productId, action) => {
        const updatedCart = cart.map(item => {
            console.log(item)
            if (item.product_id === productId) {
                let newQuantity = item.quantity;
                if (action === 'increase' && newQuantity < 10) {
                    newQuantity += 1;
                } else if (action === 'decrease' && newQuantity > 1) {
                    newQuantity -= 1;
                }
                console.log(newQuantity)
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        saveCartToAPI(productId, updatedCart);
        setCart(updatedCart);
    };

    const removeFromCart = (productId) => {
        const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?");
        if (!confirmDelete) return;

        const updatedCart = cart.filter(item => item.product_id !== productId);
        deleteCartToAPI(productId);
        setCart(updatedCart);
    };

    const calculateTotal = () => {
        console.log(cart)
        return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    };

    const handleCheckout = () => {
        if (!isLoggedIn || !userInfo) {
            navigate('/login', { state: { from: '/cart' } });
            return;
        }

        if (cart.length === 0) {
            setError("Giỏ hàng của bạn đang trống.");
            return;
        }

        navigate('/oder', {
            state: {cartItems: cart, userInfo: userInfo}
        });
    };

    const renderCartItems = () => {
        if (cart.length === 0) {
            return <Alert variant="info">Giỏ hàng của bạn đang trống.</Alert>;
        }

        return (
            <Table responsive hover className="align-middle">
                <thead>
                <tr>
                    <th>Hình ảnh</th>
                    <th>Tên sản phẩm</th>
                    <th>Đơn giá</th>
                    <th className="text-center">Số lượng</th>
                    <th>Thành tiền</th>
                    <th>Xóa</th>
                </tr>
                </thead>
                <tbody>
                {cart.map((item) => (
                    <tr key={item.id}>
                        <td>
                            <Image
                                src={item.product?.images ? `${Constanst.DOMAIN_API}/uploads/${item.product.images}` : "/path/to/default-image.jpg"}
                                alt={item.product?.name}
                                style={{width: '100px', height: 'auto', objectFit: 'contain'}}
                                thumbnail
                            />
                        </td>
                        <td>{item.product?.name}</td>
                        <td>{item.product?.price?.toLocaleString()} VNĐ</td>
                        <td className="text-center">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product_id, 'decrease')}
                                disabled={item.quantity <= 1}
                                style={{ marginRight: '5px' }}
                            >
                                <FaMinus />
                            </Button>
                            <span style={{ margin: '0 10px', minWidth: '20px', display: 'inline-block' }}>{item.quantity}</span>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.product_id, 'increase')}
                                disabled={item.quantity >= 10}
                                style={{ marginLeft: '5px' }}
                            >
                                <FaPlus />
                            </Button>
                        </td>
                        <td>{(item.product?.price * item.quantity).toLocaleString()} VNĐ</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(item.product_id)}>
                                <FaTrashAlt />
                            </Button>
                        </td>
                    </tr>
                ))}

                </tbody>
                <tfoot>
                <tr>
                    <td colSpan={4} className="text-end"><strong>Tổng cộng:</strong></td>
                    <td><strong>{calculateTotal().toLocaleString()} VNĐ</strong></td>
                    <td></td>
                </tr>
                </tfoot>
            </Table>
        );
    };

    return (
        <div className="container mt-4 pb-5 min-vh-100 d-flex flex-column">
            <h2 className="mb-4 text-center">Giỏ Hàng Của Bạn</h2>

            {error && <Alert variant="danger" onClose={() => setError("")} dismissible>{error}</Alert>}

            <div className="flex-grow-1">
                {renderCartItems()}
            </div>

            {cart.length > 0 && (
                <div className="text-center mt-4 mb-4">
                    <Button variant="success" size="lg" onClick={handleCheckout}>
                        {isLoggedIn ? "Tiến hành thanh toán" : "Đăng nhập để thanh toán"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
