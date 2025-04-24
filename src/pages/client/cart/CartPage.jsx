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
    const [userInfo, setUserInfo] = useState(null); // Sẽ lưu trữ payload đã giải mã
    const navigate = useNavigate();

    // --- Hàm lấy giỏ hàng (giữ nguyên) ---
    const getCartFromLocalStorage = useCallback(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            try {
                const parsedCart = JSON.parse(storedCart);
                const validatedCart = parsedCart.map(item => ({
                    ...item,
                    quantity: Number(item.quantity) || 1
                }));
                setCart(validatedCart);
            } catch (e) {
                console.error("Lỗi parse giỏ hàng từ localStorage:", e);
                localStorage.removeItem('cart');
                setCart([]);
            }
        } else {
            setCart([]);
        }
    }, []);

    // --- Hàm lưu giỏ hàng (giữ nguyên) ---
    const saveCartToLocalStorage = (updatedCart) => {
        const cartToSave = updatedCart.filter(item => item.quantity > 0);
        localStorage.setItem('cart', JSON.stringify(cartToSave));
        setCart(cartToSave);
    };

    // --- Sửa hàm checkLoginStatus để giải mã token ---
    const checkLoginStatus = useCallback(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken); // Xem payload token của bạn

                // Kiểm tra xem token còn hạn không (exp tính bằng giây)
                if (decodedToken.exp * 1000 > Date.now()) {
                    console.log("Token hợp lệ và chưa hết hạn.");
                    setIsLoggedIn(true);
                    // Lưu thông tin user từ payload vào state userInfo
                    // **QUAN TRỌNG:** Đảm bảo các key (id, name, role, phone...) tồn tại trong payload token của bạn
                    setUserInfo({
                        id: decodedToken.id, // Bắt buộc cho handleCheckout
                        name: decodedToken.name, // Cần cho handleCheckout
                        email: decodedToken.email, // Có thể cần
                        role: decodedToken.role, // Có thể cần
                        phone: decodedToken.phone || null // Lấy phone nếu có trong token
                        // Thêm các trường khác từ token nếu cần
                    });
                } else {
                    // Token hết hạn
                    console.log("Token đã hết hạn.");
                    setIsLoggedIn(false);
                    setUserInfo(null);
                    localStorage.removeItem('authToken'); // Xóa token hết hạn
                }
            } catch (error) {
                // Token không hợp lệ (không giải mã được)
                console.error("Lỗi giải mã token:", error);
                setIsLoggedIn(false);
                setUserInfo(null);
                localStorage.removeItem('authToken'); // Xóa token không hợp lệ
            }
        } else {
            // Không tìm thấy token
            console.log("Không tìm thấy authToken.");
            setIsLoggedIn(false);
            setUserInfo(null);
        }
    }, []); // useCallback với dependency rỗng vì nó chỉ đọc từ localStorage và dùng jwtDecode

    // --- useEffect để chạy khi component mount ---
    useEffect(() => {
        getCartFromLocalStorage();
        checkLoginStatus(); // Gọi hàm kiểm tra mới
    }, [getCartFromLocalStorage, checkLoginStatus]); // Dependencies

    // --- Các hàm khác (removeFromCart, handleQuantityChange, calculateTotal) giữ nguyên ---
    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        saveCartToLocalStorage(updatedCart);
    };

    const handleQuantityChange = (productId, action) => {
        const updatedCart = cart.map(item => {
            if (item.id === productId) {
                let newQuantity = item.quantity;
                if (action === 'increase' && newQuantity < 10) {
                    newQuantity += 1;
                } else if (action === 'decrease' && newQuantity > 1) {
                    newQuantity -= 1;
                }
                return {...item, quantity: newQuantity};
            }
            return item;
        });
        saveCartToLocalStorage(updatedCart);
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // --- Xử lý thanh toán (handleCheckout) VẪN CẦN GỬI TOKEN LÊN BACKEND ---
    const handleCheckout = async () => {
        console.log("Attempting checkout...");
        setError("");

        // 1. Kiểm tra trạng thái đăng nhập (dựa trên state đã set bởi checkLoginStatus)
        if (!isLoggedIn || !userInfo) {
            console.log("User not logged in or userInfo missing. Redirecting to login.");
            navigate('/login', {state: {from: '/cart'}});
            return;
        }

        // 2. Kiểm tra giỏ hàng rỗng
        if (cart.length === 0) {
            console.log("Cart is empty. Aborting checkout.");
            setError("Giỏ hàng của bạn đang trống.");
            return;
        }

        // 3. **LẤY TOKEN ĐỂ GỬI LÊN BACKEND XÁC THỰC LẠI**
        const token = localStorage.getItem('authToken');
        if (!token) {
            console.error("Auth token missing at checkout! This shouldn't happen if isLoggedIn is true.");
            setError("Phiên đăng nhập không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.");
            checkLoginStatus(); // Cập nhật lại trạng thái phòng trường hợp token bị xóa bởi tab khác
            navigate('/login', {state: {from: '/cart'}});
            return;
        }

        // 4. Chuẩn bị dữ liệu đơn hàng (sử dụng thông tin từ userInfo đã giải mã)
        const orderData = {
            user_id: userInfo.id, // Lấy từ state userInfo (đã giải mã)
            items: cart.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            name: userInfo.name || `User ${userInfo.id}`, // Lấy từ state userInfo
            phone: userInfo.phone || "N/A", // Lấy từ state userInfo (nếu có trong token)
            address: "Default Address", // Địa chỉ thường cần form nhập riêng
            payments: 1, // COD
            payment_status: 0, // Chưa thanh toán
            status: 1 // Chờ xác nhận
        };

        console.log("Sending order data to /api/orders/checkout:", orderData);

        // 5. GỬI YÊU CẦU LÊN BACKEND (VẪN KÈM TOKEN TRONG HEADER)
        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // **BACKEND PHẢI XÁC THỰC TOKEN NÀY**
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData),
            });

            // 6. Xử lý kết quả (giữ nguyên)
            if (res.ok) {
                const result = await res.json();
                console.log("Checkout successful:", result);
                alert("Đặt hàng thành công!");
                localStorage.removeItem('cart');
                setCart([]);
                navigate('/order-history');
            } else {
                let errorMsg = `Có lỗi xảy ra khi đặt hàng (Status: ${res.status}).`;
                try {
                    const result = await res.json();
                    console.error("Checkout error response:", result);
                    errorMsg = result.message || errorMsg;
                } catch (e) {
                    console.error("Could not parse error JSON:", await res.text());
                }
                setError(errorMsg);
            }
        } catch (error) {
            console.error("Network error during checkout:", error);
            setError("Không thể kết nối đến máy chủ để đặt hàng. Vui lòng kiểm tra kết nối mạng và thử lại.");
        }
    };

    // --- Hiển thị giỏ hàng chi tiết (renderCartItems) giữ nguyên ---
    const renderCartItems = () => {
        // ... (code render bảng giữ nguyên) ...
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
                                src={item.images ? `${Constanst.DOMAIN_API}/uploads/${item.images}` : "/path/to/default-image.jpg"}
                                alt={item.name}
                                style={{width: '60px', height: 'auto', objectFit: 'contain'}}
                                thumbnail
                            />
                        </td>
                        <td>{item.name}</td>
                        <td>{item.price?.toLocaleString()} VNĐ</td>
                        <td className="text-center">
                            <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 'decrease')}
                                disabled={item.quantity <= 1}
                                style={{marginRight: '5px'}}
                            >
                                <FaMinus/>
                            </Button>
                            <span style={{
                                margin: '0 10px',
                                minWidth: '20px',
                                display: 'inline-block'
                            }}>{item.quantity}</span>
                            <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleQuantityChange(item.id, 'increase')}
                                disabled={item.quantity >= 10}
                                style={{marginLeft: '5px'}}
                            >
                                <FaPlus/>
                            </Button>
                        </td>
                        <td>{(item.price * item.quantity).toLocaleString()} VNĐ</td>
                        <td>
                            <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                                <FaTrashAlt/>
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

    // --- return JSX (giữ nguyên) ---
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
                        {/* Nút này giờ sẽ cập nhật đúng dựa trên isLoggedIn state */}
                        {isLoggedIn ? "Tiến hành thanh toán" : "Đăng nhập để thanh toán"}
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;