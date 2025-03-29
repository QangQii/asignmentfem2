import React from "react";
import FooterClient from "../../../components/user/layout/footer";

const Contact = () => {
    return (
        <>
            <div className="hero">
                <div className="container">
                    <div className="row justify-content-between">
                        <div className="col-lg-5">
                            <div className="intro-excerpt">
                                <h1>Contact</h1>
                                <p className="mb-4">
                                    Donec vitae odio quis nisl dapibus malesuada. Nullam ac aliquet velit. Aliquam
                                    vulputate velit imperdiet
                                    dolor tempor tristique.
                                </p>
                                <p>
                                    <a href="" className="btn btn-secondary me-2">
                                        Shop Now
                                    </a>
                                    <a href="#" className="btn btn-white-outline">
                                        Explore
                                    </a>
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="hero-img-wrap">
                                <img src="/images/couch.png" className="img-fluid" alt="Couch"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="untree_co-section">
                <div className="container">
                    <div className="block">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-8 pb-4">
                                <form>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="fname">
                                                    First name
                                                </label>
                                                <input type="text" className="form-control" id="fname"/>
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <div className="form-group">
                                                <label className="text-black" htmlFor="lname">
                                                    Last name
                                                </label>
                                                <input type="text" className="form-control" id="lname"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-black" htmlFor="email">
                                            Email address
                                        </label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>

                                    <div className="form-group mb-5">
                                        <label className="text-black" htmlFor="message">
                                            Message
                                        </label>
                                        <textarea name="" className="form-control" id="message" cols="30"
                                                  rows="5"></textarea>
                                    </div>

                                    <button type="submit" className="btn btn-primary-hover-outline">
                                        Send Message
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FooterClient/>
        </>
    );
};

export default Contact;
