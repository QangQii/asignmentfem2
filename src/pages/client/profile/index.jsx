import React, {useEffect, useState} from "react";
import Constanst from "../../../Constanst"; // Đảm bảo Constanst.DOMAIN_API chứa URL đúng của API của bạn

const Profile = () => {
    const [profile, setProfile] = useState({
        username: "",
        name: "",
        email: "",
        phone: ""
    });

    // Hàm lấy dữ liệu hồ sơ từ backend
    const fetchProfile = async () => {
        try {
            const res = await fetch(`${Constanst.DOMAIN_API}/api/users/1`); // ← Sửa API phù hợp
            if (!res.ok) {
                throw new Error("Không thể lấy dữ liệu hồ sơ");
            }
            const data = await res.json();
            setProfile(data);
        } catch (err) {
            console.error("Lỗi lấy dữ liệu hồ sơ:", err);
        }
    };

    // Lấy thông tin hồ sơ khi component mount
    useEffect(() => {
        fetchProfile();
    }, []);

    // Render thông tin profile
    const renderProfileInfo = () => (
        <div className="card p-4">
            <div className="mb-3">
                <strong>Username:</strong> {profile.username}
            </div>
            <div className="mb-3">
                <strong>Name:</strong> {profile.name}
            </div>
            <div className="mb-3">
                <strong>Email:</strong> {profile.email}
            </div>
            <div className="mb-3">
                <strong>Phone:</strong> {profile.phone}
            </div>
        </div>
    );

    return (
        <div className="container mt-5">
            <h1>Hồ Sơ Tài Khoản</h1>
            {renderProfileInfo()}
        </div>
    );
};

export default Profile;
