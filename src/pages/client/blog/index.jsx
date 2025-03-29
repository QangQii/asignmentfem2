import {useEffect, useState} from "react";
import FooterClient from "../../../components/user/layout/footer";

const Blog = () => {
    const blogPosts = [
        {
            id: 1,
            title: "Manga nổi bật tuần này",
            author: "Tralalelo Tralala",
            date: "Dec 19, 2021",
            content: "Đón đọc và mua ngay tại BookMen nhé!",
            images: [
                "/images/op.jpg",
                "/images/unded.jpg",
                "/images/ryu.jpg"
            ]
        },
        {
            id: 2,
            title: "How To Keep Your Furniture Clean",
            author: "Bombardilo Crocodilo",
            date: "Dec 15, 2021",
            content: "Keeping your furniture clean enhances durability and aesthetics. Here are some useful tips!",
            images: [
                "/images/post-2a.jpg",
                "/images/post-2b.jpg",
                "/images/post-2c.jpg"
            ]
        },
        {
            id: 3,
            title: "Small Space Furniture Apartment Ideas",
            author: "Tung Tung Tung Sahur",
            date: "Dec 12, 2021",
            content: "Maximize your small space with these furniture arrangement tips!",
            images: [
                "/images/post-3a.jpg",
                "/images/post-3b.jpg",
                "/images/post-3c.jpg"
            ]
        },
        {
            id: 4,
            title: "Decor Tips for a Cozy Home",
            author: "Chí Thành",
            date: "Dec 10, 2021",
            content: "A cozy home is all about the right decor choices. Let’s explore the best ideas!",
            images: [
                "/images/post-4a.jpg",
                "/images/post-4b.jpg",
                "/images/post-4c.jpg"
            ]
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
            }, 3000)
        );

        return () => intervals.forEach(clearInterval);
    }, []);

    return (
        <>
            <div className="blog-section">
                <div className="container">
                    <h2 className="text-center mb-4">Bài viết mới nhất</h2>
                    <div className="row">
                        {blogPosts.map((post, i) => (
                            <div className="col-md-6 mb-4" key={post.id}>
                                <div className="blog-slider">
                                    <div className="slides">
                                        <img src={post.images[indexes[i]]} alt={post.title} className="img-fluid"/>
                                    </div>
                                    <div className="post-content-entry">
                                        <h3><a href="#">{post.title}</a></h3>
                                        <p>{post.content}</p>
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
            <FooterClient/>

            <style jsx>{`
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

                .slides img {
                    width: 100%;
                    border-radius: 10px;
                    transition: opacity 0.5s ease-in-out;
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
