import axios from "axios";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import Constanst from "../../../Constanst"; // Đảm bảo đường dẫn này đúng
import {useNavigate, useSearchParams,} from "react-router-dom"; // Sử dụng react-router-dom v6

const Register = () => {
    const navigate = useNavigate();
    const [queryParams] = useSearchParams();
    const {
        register,
        formState: {errors},
        handleSubmit,
        setValue, // Vẫn giữ nếu cần cho chức năng cập nhật
    } = useForm({
        defaultValues: {
            username: "",
            name: "",
            email: "",
            phone: "",
            password: "",
        },
    });

    // Phần useEffect và getUserInfo giữ nguyên cho chức năng cập nhật
    useEffect(() => {
        if (queryParams.get("id")) {
            getUserInfo();
        }
    }, [queryParams]); // Thêm dependency array

    const getUserInfo = async () => {
        try {
            // API này cần trả về đủ thông tin: username, name, email, phone,...
            const res = await axios.get(
                `${Constanst.DOMAIN_API}/auth/user?id=${queryParams.get("id")}`
            );
            // Cập nhật các trường cần thiết từ API response
            setValue("username", res.data.data.username);
            setValue("name", res.data.data.name);
            setValue("email", res.data.data.email); // Giả sử API trả về email
            setValue("phone", res.data.data.phone); // Giả sử API trả về phone
            // Lưu ý: Không nên setValue cho password và avatar khi lấy thông tin để cập nhật
            // Người dùng nên nhập lại mật khẩu nếu muốn thay đổi
            // Avatar nên hiển thị ảnh cũ và cho phép chọn ảnh mới
        } catch (e) {
            console.log(e);
            // Xử lý lỗi khi không lấy được thông tin user (vd: hiển thị thông báo)
        }
    };

    const handleRegister = async (data) => { // Tham số data từ handleSubmit
        try {
            let formData = new FormData();
            formData.append("username", data.username);
            formData.append("name", data.name);
            formData.append("email", data.email); // Thêm email
            formData.append("phone", data.phone); // Thêm phone
            formData.append("password", data.password);

            // Chỉ thêm avatar nếu người dùng đã chọn file
            if (data.avatar && data.avatar.length > 0) {
                formData.append("avatar", data.avatar[0]); // Chọn ảnh đầu tiên
            }
            // Backend sẽ tự dùng ảnh default nếu không có avatar được gửi lên

            if (queryParams.get("id")) {
                // Chức năng cập nhật người dùng (Xem lại API endpoint và phương thức nếu cần)
                // formData.append("id", queryParams.get("id")); // Backend update có cần id trong body không? Thường là lấy từ URL params
                // await axios.put(`${Constanst.DOMAIN_API}/auth/update-user/${queryParams.get("id")}`, formData); // Ví dụ endpoint PUT với id
                // navigate("/user"); // Chuyển hướng sau khi cập nhật
                console.warn("Chức năng cập nhật chưa được triển khai hoàn chỉnh trong ví dụ này.");
                return;
            }

            // Chức năng thêm người dùng mới
            console.log("Đang gửi dữ liệu đăng ký:", Object.fromEntries(formData.entries())); // Log dữ liệu gửi đi (trừ file)

            const res = await axios.post(
                `${Constanst.DOMAIN_API}/api/register`, // Đảm bảo đúng endpoint backend
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data' // Quan trọng khi gửi FormData
                    }
                }
            );
            console.log("Đăng ký thành công:", res.data); // Log phản hồi từ server
            alert(res.data.message || "Đăng ký thành công!"); // Hiển thị thông báo
            navigate("/login"); // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
        } catch (err) {
            console.error("Lỗi đăng ký:", err);
            if (err.response) {
                // Lỗi từ phía server (vd: email tồn tại, validation error)
                console.error("Server Response:", err.response.data);
                alert(`Đăng ký thất bại: ${err.response.data.message || "Có lỗi xảy ra từ server"}`);
            } else if (err.request) {
                // Lỗi không nhận được phản hồi từ server
                console.error("No response received:", err.request);
                alert("Đăng ký thất bại: Không thể kết nối đến server.");
            } else {
                // Lỗi khác (vd: lỗi thiết lập request)
                console.error("Error setting up request:", err.message);
                alert(`Đăng ký thất bại: ${err.message}`);
            }
        }
    };

    // Validate avatar giữ nguyên
    const validateAvatar = (files) => {
        // Nếu là form cập nhật và không chọn file mới thì không cần validate
        if (queryParams.get("id") && (!files || files.length === 0)) {
            return true;
        }
        // Nếu là form đăng ký, hoặc form cập nhật mà có chọn file mới
        if (!files || files.length === 0) {
            return "Bạn phải chọn ảnh đại diện"; // Bắt buộc khi đăng ký
        }

        const maxSize = 1024 * 1024 * 15; // 15MB
        const types = ["image/jpg", "image/jpeg", "image/png", "image/webp", "image/gif"]; // Thêm gif nếu cần
        for (let index = 0; index < files.length; index++) {
            if (!types.includes(files[index].type)) {
                return "Ảnh không đúng định dạng (jpg, jpeg, png, webp, gif)";
            }
            if (files[index].size > maxSize) {
                return `Kích thước ảnh "${files[index].name}" quá lớn (tối đa 15MB)`;
            }
        }
        return true;
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100 bg-light py-5"> {/* Đảm bảo chiều cao tối thiểu và padding */}
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6 col-xl-5"> {/* Tăng độ rộng một chút */}
                        <div className="card p-4 shadow-lg border-0 rounded-3">
                            <h3 className="mb-4 text-center fw-bold">{queryParams.get("id") ? "Cập nhật thông tin" : "Đăng ký tài khoản"}</h3>
                            <form onSubmit={handleSubmit(handleRegister)}>
                                {/* Username */}
                                <div className="mb-3 text-start">
                                    <label htmlFor="username" className="form-label">Tên đăng nhập <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        id="username"
                                        placeholder="Nhập tên đăng nhập"
                                        {...register("username", {
                                            required: "Vui lòng nhập tên đăng nhập",
                                            minLength: {value: 3, message: "Tên đăng nhập phải có ít nhất 3 ký tự"}
                                        })}
                                    />
                                    {errors.username &&
                                        <div className="invalid-feedback">{errors.username.message}</div>}
                                </div>

                                {/* Name */}
                                <div className="mb-3 text-start">
                                    <label htmlFor="name" className="form-label">Họ và Tên <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="text"
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        id="name"
                                        placeholder="Nhập họ và tên"
                                        {...register("name", {
                                            required: "Vui lòng nhập họ và tên",
                                        })}
                                    />
                                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                                </div>

                                {/* Email */}
                                <div className="mb-3 text-start">
                                    <label htmlFor="email" className="form-label">Email <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="email"
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        id="email"
                                        placeholder="Nhập địa chỉ email"
                                        {...register("email", {
                                            required: "Vui lòng nhập email",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Địa chỉ email không hợp lệ"
                                            }
                                        })}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                                </div>

                                {/* Phone */}
                                <div className="mb-3 text-start">
                                    <label htmlFor="phone" className="form-label">Số điện thoại <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="tel" // Sử dụng type="tel" cho số điện thoại
                                        className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                        id="phone"
                                        placeholder="Nhập số điện thoại"
                                        {...register("phone", {
                                            required: "Vui lòng nhập số điện thoại",
                                            pattern: {
                                                value: /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/,
                                                message: "Số điện thoại không hợp lệ"
                                            }
                                        })}
                                    />
                                    {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
                                </div>

                                {/* Password */}
                                <div className="mb-3 text-start">
                                    <label htmlFor="password" className="form-label">Mật khẩu <span
                                        className="text-danger">*</span></label>
                                    <input
                                        type="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        id="password"
                                        placeholder="Nhập mật khẩu"
                                        {...register("password", {
                                            // Chỉ yêu cầu mật khẩu khi đăng ký (không yêu cầu khi cập nhật trừ khi người dùng muốn đổi)
                                            required: {
                                                value: !queryParams.get("id"),
                                                message: "Vui lòng nhập mật khẩu"
                                            },
                                            minLength: {value: 6, message: "Mật khẩu phải có ít nhất 6 ký tự"},
                                        })}
                                    />
                                    {/* Có thể thêm trường nhập lại mật khẩu nếu cần */}
                                    {errors.password &&
                                        <div className="invalid-feedback">{errors.password.message}</div>}
                                    {queryParams.get("id") &&
                                        <small className="form-text text-muted">Để trống nếu không muốn thay đổi mật
                                            khẩu.</small>}
                                </div>

                                {/* Bỏ phần chọn Gender */}
                                {/*
                                <div className="container py-4">
                                    ... (Phần Gender cũ) ...
                                </div>
                                */}

                                {/* Avatar */}
                                <div className="mb-4"> {/* Tăng khoảng cách dưới */}
                                    <label htmlFor="avatar" className="form-label">Ảnh đại diện</label>
                                    <input
                                        type="file"
                                        className={`form-control ${errors.avatar ? 'is-invalid' : ''}`}
                                        id="avatar"
                                        accept="image/png, image/jpeg, image/jpg, image/webp, image/gif" // Chỉ chấp nhận file ảnh
                                        {...register("avatar", {
                                            // Validate chỉ khi đăng ký hoặc khi có chọn file mới lúc cập nhật
                                            validate: (files) => validateAvatar(files)
                                        })}
                                    />
                                    {errors.avatar && <div className="invalid-feedback">{errors.avatar.message}</div>}
                                    {/* Có thể thêm phần hiển thị ảnh preview ở đây */}
                                </div>

                                {/* Submit Button */}
                                <button type="submit"
                                        className="btn btn-primary w-100 btn-lg"> {/* Tăng kích thước nút */}
                                    {queryParams.get("id") ? "Cập nhật" : "Đăng ký"}
                                </button>
                            </form>

                            {/* Thêm link đăng nhập */}
                            {!queryParams.get("id") && (
                                <p className="mt-3 text-center">
                                    Đã có tài khoản? <a href="/login">Đăng nhập ngay</a>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;