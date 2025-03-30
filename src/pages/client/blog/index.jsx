import {useEffect, useState} from "react";

const Blog = () => {
    const banner = {
        image: "/images/boruto.jpg",
        title: "Chào Mừng Đến Với Trang Blog",
        description: "Khám Phá Tin Tức Mới Nhất Nhanh Chóng Với BookMen",
        link: "#"
    };

    const blogPosts = [
        {
            id: 1,
            title: "Manga nổi bật tuần này",
            author: "Tralalelo Tralala",
            date: "Dec 19, 2021",
            content: "Đón đọc và mua ngay tại BookMen nhé!",
            images: ["/images/op.jpg", "/images/unded.jpg", "/images/ryu.jpg"]
        },
        {
            id: 2,
            title: "Top Nhân Vật Tuần",
            author: "Bombardilo Crocodilo",
            date: "Dec 15, 2025",
            content: "Khám Phá Ngay Các Nhân Vật Hot Nhất Tuần!",
            images: ["/images/jojo.jpg", "/images/ruka1.jpg", "/images/joline.png"]
        },
        {
            id: 3,
            title: "Manga Bán Chạy Nhất Tuần!",
            author: "Tung Tung Tung Sahur",
            date: "Dec 12, 2025",
            content: "Khám Phá Các Bộ Manga Được Mua Nhiều Nhất!",
            images: ["/images/kanori.jpg", "/images/kanori2.jpg", "/images/kanori3.jpg"]
        },
        {
            id: 4,
            title: "Tin Tức Manga Anime Mới Nhất",
            author: "Chí Thành",
            date: "Dec 10, 2025",
            content: [
                "Boruto Đạt Doanh Thu Khủng!",
                "Evangelion Chính Thức Qua Chương Mới!",
                "Thanh Gươm Diệt Quỷ Xô Đổ Hàng Loạt Kỷ Lục?"
            ],
            images: ["/images/boruto.jpg", "/images/eva.jpg", "/images/kimetsu.jpg"]
        }
    ];

    const [indexes, setIndexes] = useState(blogPosts.map(() => 0));

    useEffect(() => {
        const intervals = blogPosts.map((_, i) =>
            setInterval(() => {
                setIndexes((prevIndexes) => {
                    const newIndexes = [...prevIndexes];
                    newIndexes[i] = (newIndexes[i] + 1) % blogPosts[i].images.length;
                    return newIndexes;
                });
            }, 5000)
        );
        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <>
            {/* Banner Section */}
            <div className="banner-section mb-3">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            <img src={banner.image} alt="Banner" className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-6">
                            <h1>{banner.title}</h1>
                            <p>{banner.description}</p>
                            <a href={banner.link} className="btn btn-primary">See more</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="blog-section">
                <div className="container">
                    <h2 className="text-center mb-4">Bài viết mới nhất</h2>
                    <div className="row">
                        {blogPosts.map((post, i) => (
                            <div className="col-md-6 mb-4" key={post.id}>
                                <div className="blog-slider">
                                    <div className="slides">
                                        <img src={post.images[indexes[i]]} alt={post.title}
                                             className={post.id === 3 ? "top-cropped-image" : "img-fluid"}/>
                                    </div>
                                    <div className="post-content-entry">
                                        <h3><a href="#">{post.title}</a></h3>
                                        <p>
                                            {post.id === 4 ? post.content[indexes[i]] : post.content}
                                        </p>
                                        <div className="meta">
                                            <span>by <a href="#">{post.author}</a></span>
                                            <span>on <a href="#">{post.date}</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .banner-section {
                    padding: 30px 0;
                    background: #f8f9fa;
                    border-radius: 10px;
                }

                .blog-section {
                    margin-top: 5px;
                }
                .blog-slider {
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                    text-align: center;
                    padding: 20px;
                    background: #fff;
                    border-radius: 10px;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .slides {
                    width: 100%;
                    height: 350px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                    border-radius: 10px;
                }
                .slides img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    border-radius: 10px;
                    transition: opacity 0.5s ease-in-out;
                }

                .top-cropped-image {
                    width: auto;
                    height: 100%;
                    object-fit: cover;
                    object-position: top;
                }
                .post-content-entry {
                    margin-top: 10px;
                }
                .meta {
                    font-size: 14px;
                    color: #888;
                }
            `}</style>
        </>
    );
};

export default Blog;
