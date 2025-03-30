import React from "react";
import bgImage from "../contact/poster.jpg"; // Thay đường dẫn nếu cần

const Contact = () => {
    return (
        <div style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            minHeight: "100vh",
            padding: "20px"
        }}>
            <div className="container py-5" style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                borderRadius: "10px",
                padding: "30px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }}>
                <h2 className="text-center mb-4" style={{fontWeight: "bold", color: "#002776"}}>Liên Hệ</h2>
                <p className="text-center mb-4">
                    Trước khi gửi tin nhắn, vui lòng đọc <a href="#">Câu hỏi thường gặp (FAQ)</a>, vì hầu hết các câu
                    hỏi đã có câu trả lời.
                </p>
                <div className="d-flex justify-content-center mt-4">
                    <form className="w-50" style={{
                        backgroundColor: "white",
                        padding: "20px",
                        borderRadius: "10px",
                        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                    }}>
                        <div className="mb-3">
                            <input type="text" className="form-control" placeholder="Tên của bạn" required/>
                        </div>
                        <div className="mb-3">
                            <input type="email" className="form-control" placeholder="Email của bạn" required/>
                        </div>
                        <div className="mb-3">
                            <textarea className="form-control" placeholder="Tin nhắn của bạn" rows="5"
                                      required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Gửi tin nhắn</button>
                    </form>
                </div>

                {/* Quyền lợi của khách hàng */}
                <div className="mt-5 text-center">
                    <h3 className="mb-3" style={{fontWeight: "bold", color: "#002776"}}>Quyền lợi của khách hàng</h3>
                    <div className="d-flex justify-content-center gap-3 flex-wrap">
                        <div className="p-3 border rounded shadow-sm" style={{
                            width: "220px",
                            backgroundColor: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}>
                            ✅ Miễn phí giao hàng cho đơn hàng từ 500.000đ.
                        </div>
                        <div className="p-3 border rounded shadow-sm" style={{
                            width: "220px",
                            backgroundColor: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}>
                            ✅ Đổi trả dễ dàng trong vòng 7 ngày nếu có lỗi từ nhà sản xuất.
                        </div>
                        <div className="p-3 border rounded shadow-sm" style={{
                            width: "220px",
                            backgroundColor: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}>
                            ✅ Hỗ trợ tư vấn tận tình từ đội ngũ CSKH.
                        </div>
                        <div className="p-3 border rounded shadow-sm" style={{
                            width: "220px",
                            backgroundColor: "white",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                        }}>
                            ✅ Nhận ưu đãi đặc biệt khi đăng ký thành viên.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
