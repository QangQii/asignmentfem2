import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Form, ListGroup, Row, Col } from 'react-bootstrap';
import Constanst from "../../../Constanst";

const OrderPage = () => {
    const [cart, setCart] = useState([]);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        address: '',
        note: ''
    });

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/cart`, {
                    method: "GET",
                    credentials: "same-origin",
                });
                const data = await res.json();
                if (res.ok) {
                    setCart(data.cart);
                } else {
                    setError(data.message);
                }
            } catch (error) {
                console.error("Lỗi khi lấy giỏ hàng:", error);
            }
        };

        const checkLoginStatus = async () => {
            try {
                const res = await fetch(`${Constanst.DOMAIN_API}/api/check-login`, {
                    method: "GET",
                    credentials: "same-origin",
                });
                const data = await res.json();
                if (data.loggedIn) {
                    setIsLoggedIn(true);
                    fetchCart();
                } else {
                    setIsLoggedIn(false);
                }
            } catch (error) {
                console.error("Lỗi khi kiểm tra đăng nhập:", error);
            }
        };

        checkLoginStatus();
    }, []);

    const placeOrder = async () => {
        if (!formData.fullName || !formData.phone || !formData.address) {
            setError("Vui lòng nhập đầy đủ thông tin giao hàng.");
            return;
        }

        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/order`, {
                method: 'POST',
                credentials: "same-origin",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cart,
                    shippingInfo: formData
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSuccess("Đặt hàng thành công!");
                setCart([]);
                setFormData({ fullName: '', phone: '', address: '', note: '' });
            } else {
                setError(data.message);
            }
        } catch (error) {
            console.error("Lỗi khi đặt hàng:", error);
        }
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">Xác nhận đơn hàng</h2>

            {!isLoggedIn && <Alert variant="danger">Bạn cần đăng nhập để đặt hàng</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">{success}</Alert>}

            <Row>
                {/* Bên trái: Sản phẩm */}
                <Col md={7}>
                    <Card>
                        <Card.Header>Danh sách sản phẩm</Card.Header>
                        <ListGroup variant="flush">
                            {cart.length > 0 ? cart.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <strong>{item.name}</strong> (x{item.quantity})
                                        </div>
                                        <div>{item.price.toLocaleString()}₫</div>
                                    </div>
                                </ListGroup.Item>
                            )) : (
                                <ListGroup.Item>Giỏ hàng của bạn đang trống</ListGroup.Item>
                            )}
                        </ListGroup>
                        <Card.Footer className="text-right">
                            <strong>Tổng cộng: {calculateTotal().toLocaleString()}₫</strong>
                        </Card.Footer>
                    </Card>
                </Col>

                {/* Bên phải: Form thông tin giao hàng */}
                <Col md={5}>
                    <Card style={{ minHeight: 'calc(100vh - 300px)' }}>
                        <Card.Header>Thông tin giao hàng</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Họ và tên</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="Nhập họ tên"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Số điện thoại</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="Nhập số điện thoại"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Địa chỉ giao hàng</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Nhập địa chỉ"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Ghi chú (nếu có)</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="note"
                                        value={formData.note}
                                        onChange={handleChange}
                                        placeholder="Ghi chú cho đơn hàng"
                                    />
                                </Form.Group>

                                <Button
                                    variant="success"
                                    className="w-100"
                                    onClick={placeOrder}
                                >
                                    Xác nhận đặt hàng
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderPage;
