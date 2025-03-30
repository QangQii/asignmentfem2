import React, {useState} from "react";
import {Link} from "react-router";

const ProductList = () => {
    const [showStatus] = useState(true);

    const products = [
        {
            id: 1,
            image: "https://via.placeholder.com/100",
            name: "Sản phẩm A",
            category: "Điện tử",
            content: "Sản phẩm chất lượng cao",
            price: 500000,
            status: "Còn hàng"
        },
        {
            id: 2,
            image: "https://via.placeholder.com/100",
            name: "Sản phẩm B",
            category: "Thời trang",
            content: "Thiết kế đẹp mắt",
            price: 350000,
            status: "Hết hàng"
        },
        {
            id: 3,
            image: "https://via.placeholder.com/100",
            name: "Sản phẩm C",
            category: "Gia dụng",
            content: "Tiện lợi và hữu ích",
            price: 250000,
            status: "Còn hàng"
        },
    ];

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Danh sách sản phẩm</h2>
                <Link className="btn btn-success" to={"addproduct"}>Sản Phẩm</Link>
            </div>

            <table className="table table-bordered table-striped text-center">
                <thead className="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Hình ảnh</th>
                    <th>Tên</th>
                    <th>Danh mục</th>
                    <th>Nội dung</th>
                    <th>Giá</th>
                    <th className={showStatus ? "" : "d-none"}>Trạng thái</th>
                    <th>Hành động</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>
                            <img src={product.image} alt="product" className="rounded" width="50" height="50"/>
                        </td>
                        <td>{product.name}</td>
                        <td>{product.category}</td>
                        <td>{product.content}</td>
                        <td>{product.price.toLocaleString()} VND</td>
                        <td className={showStatus ? "" : "d-none"}>{product.status}</td>
                        <td>
                            <Link to="editproduct">
                                <button className="btn btn-primary btn-sm me-2">Sửa</button>

                            </Link>
                            <button className="btn btn-secondary btn-sm">Xóa</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductList;
