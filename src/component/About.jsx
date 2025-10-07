import React, { useEffect } from 'react';
import logo3 from "../assets/images/clients/logo-3.png"
import logo4 from "../assets/images/clients/logo-4.png"
import logo5 from "../assets/images/clients/logo-5.png"
import logo6 from "../assets/images/clients/logo-6.png"
import logo7 from "../assets/images/clients/logo-7.png"
import logo8 from "../assets/images/clients/logo-3.png"
import "../assets/js/menu.js"
const About = () => {
    useEffect(() => {
        // ✅ Initialize Swiper after component mounts
        if (window.Swiper) {
            new window.Swiper(".testimonial3-slider", {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 20,
                navigation: {
                    nextEl: ".next-btn",
                    prevEl: ".prev-btn",
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
            });
        }
    }, []);
    return (
        <>
            <Layout>
                <div className="cursor d-none d-lg-block"></div>
                <a href="#" id="scroll-top" className="back-to-top-btn">
                    <i className="fa-solid fa-arrow-up"></i>
                </a>

                <div className="has-smooth" id="has_smooth"></div>
                <div id="smooth-wrapper">

                    <div id="smooth-content">
                        <section className="quanto-hero-about-section overflow-hidden">
                            <div className="container custom-container">
                                <div className="row g-4 align-items-end">
                                    <div className="col-lg-9 col-xxl-10">
                                        <div
                                            className="quanto-hero-about__content move-anim"
                                            data-delay="0.45"
                                        >
                                            <h1 className="title">
                                                California-based team driving creative branding solutions
                                            </h1>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 col-xxl-2">
                                        <div
                                            className="quanto-hero-about__info fade-anim"
                                            data-delay="0.60"
                                        >
                                            <h4 className="rating-point">4.8</h4>
                                            <div className="stars">
                                                <ul className="custom-ul">
                                                    <li>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.8328 9.16783L12 0L9.16718 9.16783H0L7.41641 14.8339L4.58359 24.0017L12 18.3357L19.4164 24.0017L16.9734 16.0956L12.6545 17.7925L16.5841 14.8355L16.5836 14.8339L24 9.16783H14.8328Z"
                                                                fill="#0F0F0F"
                                                            />
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.8328 9.16783L12 0L9.16718 9.16783H0L7.41641 14.8339L4.58359 24.0017L12 18.3357L19.4164 24.0017L16.9734 16.0956L12.6545 17.7925L16.5841 14.8355L16.5836 14.8339L24 9.16783H14.8328Z"
                                                                fill="#0F0F0F"
                                                            />
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.8328 9.16783L12 0L9.16718 9.16783H0L7.41641 14.8339L4.58359 24.0017L12 18.3357L19.4164 24.0017L16.9734 16.0956L12.6545 17.7925L16.5841 14.8355L16.5836 14.8339L24 9.16783H14.8328Z"
                                                                fill="#0F0F0F"
                                                            />
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.8328 9.16783L12 0L9.16718 9.16783H0L7.41641 14.8339L4.58359 24.0017L12 18.3357L19.4164 24.0017L16.9734 16.0956L12.6545 17.7925L16.5841 14.8355L16.5836 14.8339L24 9.16783H14.8328Z"
                                                                fill="#0F0F0F"
                                                            />
                                                        </svg>
                                                    </li>
                                                    <li>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            width="24"
                                                            height="24"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                clipRule="evenodd"
                                                                d="M14.8328 9.16783L12 0L9.16718 9.16783H0L7.41641 14.8339L4.58359 24.0017L12 18.3357L19.4164 24.0017L16.9734 16.0956L12.6545 17.7925L16.5841 14.8355L16.5836 14.8339L24 9.16783H14.8328Z"
                                                                fill="#0F0F0F"
                                                            />
                                                        </svg>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p className="word-anim" data-delay="0.60">
                                                2500+ reviews based on client feedback
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="quanto-video-area style-2 overflow-hidden">
                            <div className="container custom-container position-relative">
                                <a href="#quanto-funfacts-section" className="scroll-down section-link">
                                    Scroll down
                                    <img src="./assets/images/icons/scroll-down.svg" alt="Scroll down" />
                                </a>
                                <div className="row">
                                    <div className="col-12">
                                        <video
                                            muted
                                            autoPlay
                                            loop
                                            src="https://res.cloudinary.com/ducryslbe/video/upload/v1740329511/Quanto/video.sakebul.com.mp4"
                                            className="quanto-video"
                                            id="quanto-video-2"
                                            data-speed="0.8"
                                        />
                                        <button className="play-btn">Play</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <section
                            id="quanto-funfacts-section"
                            className="quanto-funfacts-section section-padding-top overflow-hidden"
                        >
                            <div className="container custom-container">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="quanto-funfacts__wrapper">
                                            <div
                                                className="quanto-funfact-box fade-anim"
                                                data-delay="0.30"
                                                data-direction="right"
                                            >
                                                <h2 className="counter-item d-inline-flex align-items-center">
                                                    <span
                                                        className="odometer d-inline-block"
                                                        data-odometer-final="17"
                                                    >.</span>
                                                    <em>+</em>
                                                </h2>
                                                <span className="funfact-info">Years of agency experience</span>
                                            </div>
                                            <div
                                                className="quanto-funfact-box fade-anim"
                                                data-delay="0.30"
                                                data-direction="right"
                                            >
                                                <h2 className="counter-item d-inline-flex align-items-center">
                                                    <span
                                                        className="odometer d-inline-block"
                                                        data-odometer-final="220"
                                                    >.</span>
                                                    <em>+</em>
                                                </h2>
                                                <span className="funfact-info">Successfully projects done</span>
                                            </div>
                                            <div
                                                className="quanto-funfact-box fade-anim"
                                                data-delay="0.30"
                                                data-direction="right"
                                            >
                                                <h2 className="counter-item d-inline-flex align-items-center">
                                                    <span
                                                        className="odometer d-inline-block"
                                                        data-odometer-final="46"
                                                    >.</span>
                                                    <em>+</em>
                                                </h2>
                                                <span className="funfact-info">World-wide team members</span>
                                            </div>
                                            <div
                                                className="quanto-funfact-box fade-anim"
                                                data-delay="0.30"
                                                data-direction="right"
                                            >
                                                <h2 className="counter-item d-inline-flex align-items-center">
                                                    <span
                                                        className="odometer d-inline-block"
                                                        data-odometer-final="98"
                                                    >.</span>
                                                    <em>%</em>
                                                </h2>
                                                <span className="funfact-info">Clients satisfied & retention</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="quanto-about-area2 bg-color-white section-padding-top">
                            <div className="container custom-container">
                                <div className="row">
                                    <div className="col-xl-9 col-xxl-8 mx-auto">
                                        <div className="quanto__header text-center text-lg-start">
                                            <h3 className="title move-anim">
                                                We believe in the power of design to elevate businesses and product solutions
                                            </h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 justify-content-between row-padding-top overflow-hidden">
                                    <div className="col-md-6 col-xl-5 col-xxl-4 d-flex align-items-xl-center order-1 order-xl-0 overflow-hidden">
                                        <div className="img_reveal overflow-hidden">
                                            <img
                                                src="./assets/images/about/about-thumb-2-1.png"
                                                alt="about-thumb"
                                                className="w-100"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-xxl-4 order-0 order-xl-1">
                                        <div className="section-content">
                                            <p className="move-anim" data-duration="0.01">
                                                Our approach is all about understanding your needs and bringing your ideas to life without complexity. We thrive turning imaginative concepts into user friendly digital solutions. Whether it's a sleek website, a user-friendly app or a memorable brand identity, we focus on creating designs that not only.
                                            </p>
                                            <p className="move-anim" data-duration="0.01">
                                                Designing immersive digital experiences, or developing strategic marketing campaigns, we approach each project with meticulous attention to detail.
                                            </p>
                                            <a className="quanto-link-btn" href="about.html">
                                                More about us
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                            <figure className="overflow-hidden">
                                                <div className="img_reveal overflow-hidden">
                                                    <img
                                                        src="./assets/images/about/about-thumb-2-2.png"
                                                        alt="about-thumb"
                                                    />
                                                </div>
                                            </figure>
                                        </div>
                                    </div>
                                    <div className="col-md-6 col-xl-2 d-flex align-items-xl-center order-xl-2 overflow-hidden">
                                        <div className="img_reveal overflow-hidden">
                                            <img
                                                src="./assets/images/about/about-thumb-2-3.png"
                                                alt="about-thumb"
                                                className="w-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="marquee-container section-margin-top fade-anim">
                                <div className="marquee">
                                    <a className="marquee-item-container" href="contact.html">
                                        <div className="marquee-item">
                                            <h1>a new generation of digital creators&nbsp;</h1>
                                        </div>
                                        <div className="marquee-item">
                                            <h1>a new generation of digital creators&nbsp;</h1>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </section>
                        <section className="quanto-awards-area section-padding-top-bottom overflow-hidden">
                            <div className="container custom-container">
                                <div className="row justify-content-end">
                                    <div className="col-lg-10 col-xl-8 col-xxl-7">
                                        <div className="quanto-awards-box fade-anim">
                                            <h6 className="awards-title">Winner - Best eCommerce Websites</h6>
                                            <span className="awards-info">Awwwards ─ 2023</span>
                                        </div>
                                        <div className="quanto-awards-box fade-anim">
                                            <h6 className="awards-title">Awarded - Top Creative Agency in United State</h6>
                                            <span className="awards-info">Envato Elements ─ 2022</span>
                                        </div>
                                        <div className="quanto-awards-box fade-anim">
                                            <h6 className="awards-title">Mentioned - Honorable Mentioned</h6>
                                            <span className="awards-info">Design Community ─ 2022</span>
                                        </div>
                                        <div className="quanto-awards-box fade-anim">
                                            <h6 className="awards-title">Winner - Behance Portfolio Review</h6>
                                            <span className="awards-info">Behance ─ 2021</span>
                                        </div>
                                        <div className="quanto-awards-box fade-anim">
                                            <h6 className="awards-title">Winner - Featured App Design of the Week</h6>
                                            <span className="awards-info">UI/UX Global Award ─ 2019</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="quanto-team-area section-padding-bottom">
                            <div className="container custom-container">
                                <div className="row gx-4 gy-2 align-items-end">
                                    <div className="col-md-9 col-xl-7 col-xxl-6">
                                        <div className="quanto__header">
                                            <h3
                                                className="title text-center text-md-start fade-anim"
                                                data-direction="left"
                                            >
                                                Meet our innovative team members
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="col-md-3 col-xl-5 col-xxl-6">
                                        <div className="quanto__headerr d-flex justify-content-center justify-content-lg-end">
                                            <a className="quanto-link-btn" href="team.html">
                                                Join the team
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="row g-4 g-sm-3 g-md-4 row-padding-top">
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div
                                            className="quanto-team-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <figure className="team-thumb">
                                                <img
                                                    src="./assets/images/team/team-1.png"
                                                    alt="team"
                                                    className="w-100"
                                                />
                                                <ul className="custom-ul">
                                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </figure>
                                            <div className="team-content">
                                                <h6 className="team-member-name">
                                                    <a href="team-details.html">Tony Lixivel</a>
                                                </h6>
                                                <span className="team-member-position">Lead Full Stack Developer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div
                                            className="quanto-team-box fade-anim"
                                            data-delay="0.45"
                                            data-direction="right"
                                        >
                                            <figure className="team-thumb">
                                                <img
                                                    src="./assets/images/team/team-2.png"
                                                    alt="team"
                                                    className="w-100"
                                                />
                                                <ul className="custom-ul">
                                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </figure>
                                            <div className="team-content">
                                                <h6 className="team-member-name">
                                                    <a href="team-details.html">Daniel Schrier</a>
                                                </h6>
                                                <span className="team-member-position">Senior Product Designer</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div
                                            className="quanto-team-box fade-anim"
                                            data-delay="0.45"
                                            data-direction="right"
                                        >
                                            <figure className="team-thumb">
                                                <img
                                                    src="./assets/images/team/team-3.png"
                                                    alt="team"
                                                    className="w-100"
                                                />
                                                <ul className="custom-ul">
                                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </figure>
                                            <div className="team-content">
                                                <h6 className="team-member-name">
                                                    <a href="team-details.html">Audrey Tassel</a>
                                                </h6>
                                                <span className="team-member-position">Administrative & HR Assistant</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div
                                            className="quanto-team-box fade-anim"
                                            data-delay="0.75"
                                            data-direction="right"
                                        >
                                            <figure className="team-thumb">
                                                <img
                                                    src="./assets/images/team/team-4.png"
                                                    alt="team"
                                                    className="w-100"
                                                />
                                                <ul className="custom-ul">
                                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                                    <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                                </ul>
                                            </figure>
                                            <div className="team-content">
                                                <h6 className="team-member-name">
                                                    <a href="team-details.html">Tanguy Caruel</a>
                                                </h6>
                                                <span className="team-member-position">Chief Technology Officer</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="quanto-testimonial3-section bg-color-2 section-padding-top-bottom">
                            <div className="container custom-container">
                                <div className="row g-4 justify-content-between overflow-hidden">
                                    <div className="col-lg-6 col-xxl-5 pe-xxl-0">
                                        <div className="quanto__header h-100">
                                            <h3
                                                className="title fade-anim"
                                                data-delay="0.30"
                                                data-direction="left"
                                            >
                                                What clients says about our company
                                            </h3>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 col-xxl-5">
                                        <div
                                            className="swiper testimonial3-slider fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <div className="swiper-wrapper">
                                                <div className="swiper-slide">
                                                    <div className="testimonial3-content">
                                                        <p>
                                                            “Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it.”
                                                        </p>
                                                        <div className="client-info">
                                                            <h5 className="client-name">Jenny Bennett</h5>
                                                            <span className="client-designation">Senior Marketing Manager at Caya</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="swiper-slide">
                                                    <div className="testimonial3-content">
                                                        <p>
                                                            “Quanto team quickly understood our business requirements and were proactive and flexible with our ongoing support and developments. You can definitely trust them for complex project requirements as they are top-notch in their field and we can only recommend it.”
                                                        </p>
                                                        <div className="client-info">
                                                            <h5 className="client-name">Jenny Bennett</h5>
                                                            <span className="client-designation">Senior Marketing Manager at Caya</span>
                                                        </div>
                                                    </div>
                                                </div>



                                            </div>
                                        </div>
                                        <div className="testimonial3-navigation">
                                            <div className="next-btn bg-color-white">
                                                <i className="fa-solid fa-angle-left"></i>
                                            </div>
                                            <div className="prev-btn bg-color-white">
                                                <i className="fa-solid fa-angle-right"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <div className="quanto-lients-area bg-color-2 section-padding-bottom">
                            <div className="container custom-container">
                                <div className="row g-4">
                                    <div className="col-12">
                                        <p>We worked with largest global brands</p>
                                    </div>
                                    <div className="col-12 clients__box-wrapper">
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.30"
                                            data-direction="right"
                                        >
                                            <img src={logo3} alt="client-logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.45"
                                            data-direction="right"
                                        >
                                            <img src={logo4} alt="client-logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.60"
                                            data-direction="right"
                                        >
                                            <img src={logo5} alt="client-logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.75"
                                            data-direction="right"
                                        >
                                            <img src={logo6} alt="client-logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="0.90"
                                            data-direction="right"
                                        >
                                            <img src={logo7} alt="client-logo" />
                                        </div>
                                        <div
                                            className="client-box fade-anim"
                                            data-delay="1.05"
                                            data-direction="right"
                                        >
                                            <img src={logo8} alt="client-logo" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </Layout>
        </>
    );
};

export default About;