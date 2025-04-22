import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import Constanst from "../../../Constanst"; // Đảm bảo Constanst.DOMAIN_API chứa URL đúng của API của bạn

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null); // State để lưu trữ thông báo lỗi
    const [isLoading, setIsLoading] = useState(false); // State cho trạng thái loading
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault(); // Ngăn chặn hành vi submit mặc định của form
        setError(null); // Reset lỗi trước mỗi lần thử đăng nhập
        setIsLoading(true); // Bắt đầu loading

        // Kiểm tra input cơ bản
        if (!email || !password) {
            setError("Vui lòng nhập đầy đủ email và mật khẩu.");
            setIsLoading(false);
            return;
        }

        try {
            // Gọi API đăng nhập từ backend
            const response = await axios.post(
                `${Constanst.DOMAIN_API}/api/login`, // **Quan trọng**: Đảm bảo đây là đúng endpoint login của bạn
                { email, password }, // Dữ liệu gửi đi là JSON
                {
                    headers: {
                        'Content-Type': 'application/json', // Đảm bảo header đúng
                    },
                }
            );

            console.log("Login response:", response.data);

            // Kiểm tra xem có token trong response không
            if (response.data && response.data.token) {
                const token = response.data.token;

                // Lưu token vào localStorage
                localStorage.setItem('authToken', token);
                console.log("Token đã được lưu vào localStorage.");

                // Giải mã token
                const decodedToken = jwtDecode(token);
                console.log("Decoded Token:", decodedToken); // Sẽ thấy { id, name, email, role, iat, exp }

                // Lưu thông tin người dùng vào sessionStorage nếu cần (tuỳ chọn)
                sessionStorage.setItem('userId', decodedToken.id);
                sessionStorage.setItem('userRole', decodedToken.role);

                // Điều hướng dựa trên role
                if (decodedToken.role === 1) { // Role 1: Admin
                    console.log("Redirecting to /admin...");
                    navigate('/admin'); // Điều hướng đến trang dashboard admin
                } else if (decodedToken.role === 2) { // Role 2: Khách hàng
                    console.log("Redirecting to /...");
                    navigate('/'); // Điều hướng đến trang chủ
                } else {
                    // Trường hợp role không xác định (nên xử lý)
                    console.warn("Role người dùng không xác định:", decodedToken.role);
                    navigate('/'); // Mặc định về trang chủ
                }

                window.location.reload(); // Reload lại trang sau khi đăng nhập thành công
            } else {
                // Trường hợp API trả về 200 nhưng không có token (ít xảy ra với logic backend hiện tại)
                setError(response.data.message || "Đăng nhập thành công nhưng không nhận được token.");
            }

        } catch (err) {
            console.error("Login Error:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.request) {
                setError("Không thể kết nối đến máy chủ. Vui lòng thử lại.");
            } else {
                setError("Đã có lỗi xảy ra trong quá trình đăng nhập.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5 col-xl-4">
                        <div className="card p-4 shadow-lg border-0 rounded-3">
                            <h3 className="mb-4 text-center fw-bold">Đăng nhập</h3>
                            <form onSubmit={handleLogin}>
                                {error && (
                                    <div className="alert alert-danger" role="alert">
                                        {error}
                                    </div>
                                )}

                                <div className="mb-3 text-start">
                                    <label htmlFor="email" className="form-label">Email <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className={`form-control ${error && email === '' ? 'is-invalid' : ''}`} // Thêm validation đơn giản
                                        id="email"
                                        placeholder="Nhập địa chỉ email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required 
                                        disabled={isLoading} 
                                    />
                                </div>

                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label">Mật khẩu <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        className={`form-control ${error && password === '' ? 'is-invalid' : ''}`}
                                        id="password"
                                        placeholder="Nhập mật khẩu"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <a href="/forgot-password" className="text-decoration-none">Quên mật khẩu?</a>
                                </div>

                                <button type="submit" className="btn btn-primary w-100 btn-lg" disabled={isLoading}>
                                    {isLoading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm" role="status"
                                                  aria-hidden="true"></span>
                                            <span className="ms-2">Đang xử lý...</span>
                                        </>
                                    ) : (
                                        "Đăng nhập"
                                    )}
                                </button>
                            </form>

                            <p className="mt-4 text-center">
                                Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
