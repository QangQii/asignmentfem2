import React, { useState, useEffect } from 'react'; // Thêm import useEffect
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import Constanst from '../../../Constanst';

const OrderPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { cartItems, userInfo } = location.state || {}; // Lấy dữ liệu được truyền từ CartPage
    const [name, setName] = useState(userInfo?.name || '');
    const [phone, setPhone] = useState(userInfo?.phone || '');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(1); // 1 là COD mặc định
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        // Nếu có thông tin userInfo được truyền, cập nhật state ban đầu
        if (userInfo) {
            setName(userInfo.name || '');
            setPhone(userInfo.phone || '');
        }
    }, [userInfo]);

    const handlePlaceOrder = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        if (!name || !phone || !address) {
            setError('Vui lòng nhập đầy đủ thông tin giao hàng.');
            setIsSubmitting(false);
            return;
        }

        if (!cartItems || cartItems.length === 0) {
            setError('Giỏ hàng của bạn đang trống. Không thể đặt hàng.');
            setIsSubmitting(false);
            return;
        }

        const token = localStorage.getItem('authToken');
        if (!token || !userInfo?.id) {
            setError('Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.');
            setIsSubmitting(false);
            navigate('/login', { state: { from: '/order' } });
            return;
        }

        const orderData = {
            user_id: userInfo.id,
            items: cartItems.map(item => ({
                productId: item.id,
                quantity: item.quantity,
                price: item.price
            })),
            name: name,
            phone: phone,
            address: address,
            payments: parseInt(paymentMethod), // Lấy giá trị phương thức thanh toán
            payment_status: parseInt(paymentMethod) === 1 ? 0 : 1, // 0 là chưa thanh toán cho COD
            status: 1 // Chờ xác nhận
        };

        console.log("Sending final order data:", orderData);

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/orders/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(orderData),
            });

            if (res.ok) {
                const result = await res.json();
                console.log("Order placed successfully:", result);
                alert("Đặt hàng thành công!");
                localStorage.removeItem('cart');
                navigate('/order-history');
            } else {
                let errorMsg = `Có lỗi xảy ra khi đặt hàng (Status: ${res.status}).`;
                try {
                    const result = await res.json();
                    console.error("Order error response:", result);
                    errorMsg = result.message || errorMsg;
                } catch (e) {
                    console.error("Could not parse error JSON:", await res.text());
                }
                setError(errorMsg);
            }
        } catch (error) {
            console.error("Network error during order placement:", error);
            setError("Không thể kết nối đến máy chủ để đặt hàng. Vui lòng kiểm tra kết nối mạng và thử lại.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-4">
            <h2>Thông Tin Giao Hàng</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handlePlaceOrder}>
                <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Tên người nhận</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên người nhận"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                        type="tel"
                        placeholder="Nhập số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                    <Form.Label>Địa chỉ giao hàng</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Nhập địa chỉ chi tiết"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Phương thức thanh toán</Form.Label>
                    <Form.Check
                        type="radio"
                        id="cod"
                        label="Thanh toán khi nhận hàng (COD)"
                        name="paymentMethod"
                        value={1}
                        checked={paymentMethod === 1}
                        onChange={(e) => setPaymentMethod(parseInt(e.target.value))}
                    />
                    {/* Bạn có thể thêm các phương thức thanh toán khác ở đây nếu cần */}
                </Form.Group>

                <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Đang đặt hàng..." : "Hoàn tất đặt hàng"}
                </Button>
                <Button variant="secondary" className="ms-2" onClick={() => navigate('/cart')}>
                    Quay lại giỏ hàng
                </Button>
            </Form>
        </div>
    );
};

export default OrderPage;