import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'odometer/themes/odometer-theme-default.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { Swiper } from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Odometer from 'odometer';
import Aos from 'aos';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
Swiper.use([Navigation, Autoplay, EffectFade]);

const Blog = () => {
    const [showAll, setShowAll] = useState(false);
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);
    const blogGridRef = useRef(null);

    const blogs = [
        { title: "Reveal business opportunities with our five point brand audit", img: "./assets/images/blog/blog-thumb-1.png", date: "March 8, 2024" },
        { title: "Quanto agency revolutionizes work with the power of ai-driven", img: "./assets/images/blog/blog-thumb-2.png", date: "March 8, 2024" },
        { title: "How young leaders can take charge of their professional growth", img: "./assets/images/blog/blog-thumb-3.png", date: "March 8, 2024" },
        { title: "Accessible and Inclusive Design: Welcoming All Users", img: "./assets/images/blog/blog-thumb-4.png", date: "March 8, 2024" },
        { title: "Common UX pain in design related projects you must know", img: "./assets/images/blog/blog-thumb-5.png", date: "March 8, 2024" },
        { title: "How to bring fold to your startup company with Quanto", img: "./assets/images/blog/blog-thumb-6.png", date: "March 8, 2024" },
        { title: "Simple guide to retrieval auto generated read content models", img: "./assets/images/blog/blog-thumb-7.png", date: "March 8, 2024" },
        { title: "How to manage a talented and successful design team", img: "./assets/images/blog/blog-thumb-8.png", date: "March 8, 2024" },
        { title: "We are on the quest for exceptional talent to join our team", img: "./assets/images/blog/blog-thumb-9.png", date: "March 8, 2024" },
        { title: "Building scalable design systems for modern applications", img: "./assets/images/blog/blog-thumb-1.png", date: "March 15, 2024" },
        { title: "The future of web development and emerging technologies", img: "./assets/images/blog/blog-thumb-2.png", date: "March 15, 2024" },
        { title: "Creating engaging user experiences through storytelling", img: "./assets/images/blog/blog-thumb-3.png", date: "March 15, 2024" },
    ];

    const displayedBlogs = showAll ? blogs : blogs.slice(0, 8);

    useEffect(() => {
        Aos.init({
            duration: 2000,
            once: false,
            mirror: true,
        });

        gsapContext.current = gsap.context(() => {
            $(".preloader").delay(800).fadeOut("slow");

            const handleScroll = () => {
                const scroll = window.scrollY;
                if (scroll > 50) {
                    $("#sticky-menu").addClass("sticky-menu");
                    $(".quanto-menu-area").addClass("sticky");
                } else {
                    $("#sticky-menu").removeClass("sticky-menu");
                    $(".quanto-menu-area").removeClass("sticky");
                }
            };
            window.addEventListener("scroll", handleScroll);

            $("[data-bg-src]").each(function () {
                const src = $(this).attr("data-bg-src");
                $(this).css("background-image", `url(${src})`).addClass("background-image").removeAttr("data-bg-src");
            });

            const cursor = document.querySelector(".cursor");
            if (cursor) {
                const editCursor = (e) => {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                };
                window.addEventListener("mousemove", editCursor);
                document.querySelectorAll("a, .cursor-pointer").forEach((item) => {
                    item.addEventListener("mouseover", () => cursor.classList.add("cursor-active"));
                    item.addEventListener("mouseout", () => cursor.classList.remove("cursor-active"));
                });
            }

            if (window.innerWidth > 767 && document.querySelector("#has_smooth")) {
                smootherRef.current = ScrollSmoother.create({
                    smooth: 0.9,
                    effects: window.innerWidth < 1500 ? false : true,
                    smoothTouch: 0.1,
                    normalizeScroll: { allowNestedScroll: true },
                    ignoreMobileResize: true,
                });
            }

            // Enhanced Hover Overlay with Pink Gradient
            document.querySelectorAll(".quanto-blog-box").forEach((box) => {
                const overlay = box.querySelector(".hover-overlay");
                if (overlay) {
                    gsap.set(overlay, { autoAlpha: 0, x: 0, y: 0 });

                    const getDirection = (box, event) => {
                        const rect = box.getBoundingClientRect();
                        const mouseX = event.clientX - rect.left;
                        const mouseY = event.clientY - rect.top;
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const relativeX = mouseX - centerX;
                        const relativeY = mouseY - centerY;
                        const angle = Math.atan2(relativeY, relativeX);
                        const degrees = angle * (180 / Math.PI);
                        if (degrees >= -45 && degrees <= 45) return "right";
                        if (degrees > 45 && degrees <= 135) return "bottom";
                        if (degrees > 135 || degrees <= -135) return "left";
                        return "top";
                    };

                    box.addEventListener("mouseenter", (e) => {
                        const direction = getDirection(box, e);
                        const animProps = {
                            autoAlpha: 1,
                            x: 0,
                            y: 0,
                            duration: 0.6,
                            ease: "power2.out",
                        };
                        const distance = 100;
                        if (direction === "right") animProps.startX = `${distance}%`;
                        if (direction === "left") animProps.startX = `-${distance}%`;
                        if (direction === "bottom") animProps.startY = `${distance}%`;
                        if (direction === "top") animProps.startY = `-${distance}%`;
                        gsap.fromTo(overlay, { autoAlpha: 0, x: animProps.startX || 0, y: animProps.startY || 0 }, animProps);
                    });

                    box.addEventListener("mouseleave", (e) => {
                        const direction = getDirection(box, e);
                        const animProps = {
                            autoAlpha: 0,
                            duration: 0.6,
                            ease: "power2.in",
                        };
                        const distance = 100;
                        if (direction === "right") animProps.x = `${distance}%`;
                        if (direction === "left") animProps.x = `-${distance}%`;
                        if (direction === "bottom") animProps.y = `${distance}%`;
                        if (direction === "top") animProps.y = `-${distance}%`;
                        gsap.to(overlay, animProps);
                    });
                }
            });

            document.querySelectorAll(".fade-anim").forEach((item) => {
                const fade_direction = item.getAttribute("data-direction") || "bottom";
                const duration_value = parseFloat(item.getAttribute("data-duration") || 1.15);
                const fade_offset = parseFloat(item.getAttribute("data-offset") || 50);
                const delay_value = parseFloat(item.getAttribute("data-delay") || 0.15);
                const ease_value = item.getAttribute("data-ease") || "power2.out";
                const animation_settings = {
                    opacity: 0,
                    ease: ease_value,
                    duration: duration_value,
                    delay: delay_value,
                };
                if (fade_direction === "top") animation_settings.y = -fade_offset;
                if (fade_direction === "left") animation_settings.x = -fade_offset;
                if (fade_direction === "bottom") animation_settings.y = fade_offset;
                if (fade_direction === "right") animation_settings.x = fade_offset;
                animation_settings.scrollTrigger = {
                    trigger: item,
                    start: "top 85%",
                };
                gsap.from(item, animation_settings);
            });

            document.querySelectorAll(".section-link").forEach((link) => {
                link.addEventListener("click", (event) => {
                    event.preventDefault();
                    const targetID = link.getAttribute("href");
                    if (targetID === "#header") {
                        gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: "power2.inOut" });
                    } else {
                        const targetSection = document.querySelector(targetID);
                        if (targetSection) {
                            gsap.to(window, { duration: 1, scrollTo: { y: targetSection, offsetY: 50 } });
                        }
                    }
                });
            });
        });

        return () => {
            swiperInstances.current.forEach((swiper) => swiper.destroy(true, true));
            if (smootherRef.current) smootherRef.current.kill();
            gsapContext.current.revert();
        };
    }, []);

    // Re-trigger animations when showAll changes
    useEffect(() => {
        if (gsapContext.current) {
            ScrollTrigger.refresh();
        }
    }, [showAll]);

    const handleToggleView = () => {
        setShowAll(!showAll);
        if (showAll && blogGridRef.current) {
            setTimeout(() => {
                blogGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    };

    return (
        <>
            <style>{`
                .cursor {
                    position: fixed;
                    width: 20px;
                    height: 20px;
                    border: 2px solid #ff1493;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    transition: transform 0.2s;
                }
                .cursor.cursor-active {
                    transform: scale(1.5);
                    background: rgba(255, 20, 147, 0.2);
                }

                .quanto-blog-box {
                    position: relative;
                    overflow: hidden;
                    border-radius: 20px;
                    background: #ffffff;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                }

                .quanto-blog-box:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 60px rgba(255, 20, 147, 0.25);
                    border-color: rgba(255, 20, 147, 0.3);
                }

                .hover-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255, 20, 147, 0.85) 0%, rgba(255, 105, 180, 0.85) 50%, rgba(255, 182, 193, 0.85) 100%);
                    pointer-events: none;
                    z-index: 1;
                    mix-blend-mode: multiply;
                }

                .quanto-blog-thumb {
                    position: relative;
                    overflow: hidden;
                    border-radius: 20px 20px 0 0;
                    height: 280px;
                }

                .quanto-blog-thumb img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .quanto-blog-box:hover .quanto-blog-thumb img {
                    transform: scale(1.1);
                }

                .quanto-blog-content {
                    padding: 30px 25px;
                    position: relative;
                    z-index: 2;
                    background: #ffffff;
                    border-radius: 0 0 20px 20px;
                }

                .quanto-blog-content h5 {
                    font-size: 20px;
                    font-weight: 700;
                    margin-bottom: 15px;
                    line-height: 1.4;
                    color: #1a1a1a;
                    transition: color 0.3s;
                }

                .quanto-blog-content h5 a {
                    color: inherit;
                    text-decoration: none;
                    background: linear-gradient(to right, #ff1493, #ff69b4);
                    background-size: 0% 2px;
                    background-repeat: no-repeat;
                    background-position: left bottom;
                    transition: background-size 0.4s;
                }

                .quanto-blog-box:hover .quanto-blog-content h5 a {
                    background-size: 100% 2px;
                    color: #ff1493;
                }

                .quanto-blog-date {
                    display: inline-flex;
                    align-items: center;
                    font-size: 14px;
                    color: #666;
                    font-weight: 500;
                    padding: 8px 16px;
                    background: linear-gradient(135deg, #ffe8f5, #fff0f8);
                    border-radius: 20px;
                    border: 1px solid rgba(255, 20, 147, 0.15);
                    transition: all 0.3s;
                }

                .quanto-blog-date:before {
                    content: "📅";
                    margin-right: 6px;
                }

                .quanto-blog-box:hover .quanto-blog-date {
                    background: linear-gradient(135deg, #ff1493, #ff69b4);
                    color: white;
                    border-color: transparent;
                }

                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .view-more-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 40px;
                    font-size: 16px;
                    font-weight: 600;
                    color: white;
                    background: linear-gradient(135deg, #ff1493, #ff69b4);
                    border: none;
                    border-radius: 50px;
                    cursor: pointer;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    box-shadow: 0 8px 25px rgba(255, 20, 147, 0.3);
                    position: relative;
                    overflow: hidden;
                }

                .view-more-btn:before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.5s;
                }

                .view-more-btn:hover:before {
                    left: 100%;
                }

                .view-more-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 12px 35px rgba(255, 20, 147, 0.4);
                }

                .view-more-btn i {
                    transition: transform 0.3s;
                }

                .view-more-btn:hover i {
                    transform: translateX(5px);
                }

                .quanto-hero-blog__content {
                    text-align: center;
                    margin-bottom: 60px;
                }

                .quanto-hero-blog__content h1 {
                    font-size: 56px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #ff1493, #ff69b4);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 20px;
                }

                .section-padding-bottom {
                    padding-bottom: 80px;
                }

                .row-padding-top {
                    padding-top: 60px;
                }

                @media (max-width: 768px) {
                    .quanto-hero-blog__content h1 {
                        font-size: 36px;
                    }
                    
                    .quanto-blog-thumb {
                        height: 220px;
                    }
                    
                    .quanto-blog-content {
                        padding: 20px 18px;
                    }
                    
                    .quanto-blog-content h5 {
                        font-size: 18px;
                    }
                }
            `}</style>

            <div className="cursor d-none d-lg-block"></div>
            <a href="#" id="scroll-top" className="back-to-top-btn">
                <i className="fa-solid fa-arrow-up"></i>
            </a>
            <div>
                <div id="smooth-content">
                    <div className="quanto-video-area style-2 overflow-hidden section-padding-bottom">
                        <div className="container custom-container position-relative">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-hero__thumb text-end fade-anim" data-delay="0.30" data-direction="bottom">
                                        <img
                                            src="ServiceImages/horse.webp"
                                            alt="hero-thumb"
                                            data-speed="0.8"
                                            className="w-100"
                                            style={{height:"750px" }}
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="quanto-blog-section section-padding-bottom overflow-hidden" ref={blogGridRef}>
                        <div className="quanto-hero-blog__content move-anim" data-delay="0.45">
                            <h1 className="title word-anim" data-delay="0.60">
                                Explore latest news and insights
                            </h1>
                        </div>
                        <div className="container custom-container">
                            <div className="row gx-4 gy-5">
                                {displayedBlogs.map((blog, index) => (
                                    <div key={index} className="col-md-6 col-lg-4">
                                        <div className="quanto-blog-box fade-anim" data-delay={0.30 + (index % 3) * 0.15} data-direction="right">
                                            <div className="hover-overlay"></div>
                                            <div className="quanto-blog-thumb">
                                                <a href="./blog-details.html">
                                                    <img src={blog.img} alt="blog-thumb" loading="lazy" />
                                                </a>
                                            </div>
                                            <div className="quanto-blog-content">
                                                <h5 className="line-clamp-2 word-anim" data-delay={0.30 + (index % 3) * 0.15}>
                                                    <a href="./blog-details.html">{blog.title}</a>
                                                </h5>
                                                <span className="quanto-blog-date">{blog.date}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {blogs.length > 8 && (
                                <div className="row row-padding-top">
                                    <div className="col-12 text-center">
                                        <button 
                                            className="view-more-btn"
                                            onClick={handleToggleView}
                                        >
                                            {showAll ? (
                                                <>
                                                    View Less
                                                    <i className="fa-solid fa-arrow-up"></i>
                                                </>
                                            ) : (
                                                <>
                                                    View More
                                                    <i className="fa-solid fa-arrow-down"></i>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default Blog;