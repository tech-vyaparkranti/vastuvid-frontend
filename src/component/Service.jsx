import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import { SplitText } from 'gsap/SplitText';
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
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
// Register Swiper modules
Swiper.use([Navigation, Autoplay, EffectFade]);

const Service = () => {
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);
    const [showAllServices, setShowAllServices] = useState(false);

    // Complete list of services
    const allServices = [
        { title: "Advanced Digital Solution", icon: "assets/images/service/service-icon-1.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
        { title: "UI/UX & Product Innovation", icon: "assets/images/service/service-icon-2.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
        { title: "Market Analysis & Planning", icon: "assets/images/service/service-icon-3.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
        { title: "Business Campaign Strategy", icon: "assets/images/service/service-icon-4.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
        { title: "Mobile App Development", icon: "assets/images/service/service-icon-1.svg", desc: "Create powerful mobile applications for iOS and Android platforms with cutting-edge technology." },
        { title: "Web Development", icon: "assets/images/service/service-icon-2.svg", desc: "Build responsive and scalable web applications tailored to your business needs." },
        { title: "Cloud Solutions", icon: "assets/images/service/service-icon-3.svg", desc: "Leverage cloud technology for secure, scalable, and efficient business operations." },
        { title: "Data Analytics", icon: "assets/images/service/service-icon-4.svg", desc: "Transform your data into actionable insights with advanced analytics solutions." },
        { title: "Cybersecurity Services", icon: "assets/images/service/service-icon-1.svg", desc: "Protect your digital assets with comprehensive security solutions and monitoring." },
        { title: "Digital Marketing", icon: "assets/images/service/service-icon-2.svg", desc: "Boost your online presence with strategic digital marketing campaigns." },
        { title: "E-commerce Solutions", icon: "assets/images/service/service-icon-3.svg", desc: "Build powerful online stores with seamless shopping experiences." },
        { title: "AI & Machine Learning", icon: "assets/images/service/service-icon-4.svg", desc: "Implement intelligent automation and predictive analytics for your business." },
    ];

    // Show only first 8 services initially
    const displayedServices = showAllServices ? allServices : allServices.slice(0, 8);
    const hasMoreServices = allServices.length > 8;

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

            document.querySelectorAll(".counter-item .odometer").forEach((el) => {
                const odometer = new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd)',
                    duration: 2000,
                });
                const finalValue = el.getAttribute("data-odometer-final");
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry.isIntersecting) {
                            odometer.update(finalValue);
                            observer.disconnect();
                        }
                    },
                    { threshold: 0.1 }
                );
                observer.observe(el);
            });

            document.querySelectorAll(".move-anim").forEach((splitTextLine) => {
                const delay_value = splitTextLine.getAttribute("data-delay") || 0.1;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: "top 85%",
                        duration: 1.3,
                        toggleActions: "play none none none",
                    },
                });
                const itemSplitted = new SplitText(splitTextLine, { type: "lines" });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: "lines" });
                tl.from(itemSplitted.lines, {
                    duration: 1,
                    delay: parseFloat(delay_value),
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: "top center -50",
                    stagger: 0.1,
                });
            });

            document.querySelectorAll(".fade-anim").forEach((item) => {
                const fade_direction = item.getAttribute("data-direction") || "bottom";
                const onscroll_value = item.getAttribute("data-on-scroll") || 1;
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
                if (onscroll_value == 1) {
                    animation_settings.scrollTrigger = {
                        trigger: item,
                        start: "top 85%",
                    };
                }
                gsap.from(item, animation_settings);
            });

            document.querySelectorAll(".word-anim").forEach((word_anim_item) => {
                const stagger_value = parseFloat(word_anim_item.getAttribute("data-stagger") || 0.04);
                const translateX_value = word_anim_item.getAttribute("data-translateX") || false;
                const translateY_value = word_anim_item.getAttribute("data-translateY") || false;
                const onscroll_value = word_anim_item.getAttribute("data-on-scroll") || 1;
                const data_delay = parseFloat(word_anim_item.getAttribute("data-delay") || 0.1);
                const data_duration = parseFloat(word_anim_item.getAttribute("data-duration") || 0.75);
                const split_word = new SplitText(word_anim_item, { type: "chars, words" });
                const animation_settings = {
                    duration: data_duration,
                    delay: data_delay,
                    autoAlpha: 0,
                    stagger: stagger_value,
                };
                if (translateX_value) animation_settings.x = parseFloat(translateX_value);
                if (translateY_value) animation_settings.y = parseFloat(translateY_value);
                if (!translateX_value && !translateY_value) animation_settings.x = 20;
                if (onscroll_value == 1) {
                    animation_settings.scrollTrigger = {
                        trigger: word_anim_item,
                        start: "top 90%",
                    };
                }
                gsap.from(split_word.words, animation_settings);
            });

            document.querySelectorAll(".quanto-hero__thumb").forEach((thumb) => {
                const image = thumb.querySelector("img");
                const dataSpeed = parseFloat(thumb.querySelector("img").getAttribute("data-speed") || 0.8);
                gsap.to(image, {
                    yPercent: 20 * (1 - dataSpeed),
                    ease: "none",
                    scrollTrigger: {
                        trigger: thumb,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                });
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

    const handleViewMore = () => {
        setShowAllServices(!showAllServices);
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    };

    return (
        <>
            <style>{`
                .quanto-service-box.style-2 {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border: 2px solid transparent;
                }

                .quanto-service-box.style-2::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(120deg, transparent, rgba(255, 105, 180, 0.15), transparent);
                    transition: left 0.6s ease;
                }

                .quanto-service-box.style-2:hover::before {
                    left: 100%;
                }

                .quanto-service-box.style-2:hover {
                    transform: translateY(-10px);
                    border-color: #FF69B4;
                    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.3);
                }

                .quanto-iconbox-icon {
                    transition: all 0.4s ease;
                }

                .quanto-service-box.style-2:hover .quanto-iconbox-icon {
                    transform: scale(1.1) rotate(5deg);
                    filter: drop-shadow(0 5px 15px rgba(255, 105, 180, 0.4));
                }

                .quanto-service-box.style-2:hover .quanto-iconbox-icon img {
                    animation: iconBounce 0.6s ease;
                }

                @keyframes iconBounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }

                .quanto-service-box.style-2 h5 {
                    transition: color 0.3s ease;
                }

                .quanto-service-box.style-2:hover h5 {
                    color: #FF69B4;
                }

                .quanto-link-btn {
                    position: relative;
                    transition: all 0.3s ease;
                }

                .quanto-link-btn span {
                    display: inline-block;
                    transition: transform 0.3s ease;
                }

                .quanto-service-box.style-2:hover .quanto-link-btn {
                    color: #FF69B4;
                }

                .quanto-service-box.style-2:hover .quanto-link-btn span {
                    transform: translateX(5px);
                }

                .quanto-link-btn .arry1 {
                    transition: all 0.3s ease;
                }

                .quanto-link-btn .arry2 {
                    position: absolute;
                    left: 0;
                    opacity: 0;
                    transition: all 0.3s ease;
                }

                .quanto-service-box.style-2:hover .quanto-link-btn .arry1 {
                    opacity: 0;
                    transform: translateX(10px);
                }

                .quanto-service-box.style-2:hover .quanto-link-btn .arry2 {
                    opacity: 1;
                    transform: translateX(5px);
                }

                .quanto-service-box.style-2 p {
                    transition: color 0.3s ease;
                }

                .quanto-service-box.style-2:hover p {
                    color: #666;
                }

                .view-more-btn {
                    background: linear-gradient(135deg, #FF69B4 0%, #FF1493 100%);
                    border: 2px solid #FF69B4;
                    color: white;
                    padding: 15px 35px;
                    cursor: pointer;
                    transition: all 0.4s ease;
                    position: relative;
                    overflow: hidden;
                    border-radius: 50px;
                }

                .view-more-btn::before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    width: 0;
                    height: 0;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: translate(-50%, -50%);
                    transition: width 0.6s ease, height 0.6s ease;
                }

                .view-more-btn:hover::before {
                    width: 300px;
                    height: 300px;
                }

                .view-more-btn:hover {
                    transform: scale(1.05);
                    box-shadow: 0 10px 30px rgba(255, 105, 180, 0.4);
                    border-color: white;
                }

                .view-more-btn span {
                    position: relative;
                    z-index: 1;
                    display: inline-block;
                    transition: transform 0.3s ease;
                }

                .view-more-btn:hover span {
                    transform: translateY(-3px);
                }

                @keyframes pulse {
                    0%, 100% {
                        box-shadow: 0 0 0 0 rgba(255, 105, 180, 0.7);
                    }
                    50% {
                        box-shadow: 0 0 0 10px rgba(255, 105, 180, 0);
                    }
                }

                .quanto-service-box.style-2:hover {
                    animation: pulse 2s infinite;
                }
            `}</style>
            <div className="cursor d-none d-lg-block"></div>
            <Link to="#header" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </Link>
            <div>
                <div id="smooth-content">
                    
                    <div className="quanto-video-area style-2 overflow-hidden">
                        <div className="container custom-container position-relative">
                            <Link to="#service-section" className="scroll-down section-link">
                                Scroll down
                                <img src="assets/images/icons/scroll-down.svg" alt="Scroll down" loading="lazy" />
                            </Link>
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-hero__thumb text-end fade-anim" data-delay="0.30" data-direction="bottom">
                                        <img
                                            src="ServiceImages/horse.webp"
                                            alt="hero-thumb"
                                            data-speed="0.8"
                                            className="w-100"
                                            height="h-50"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="quanto-service2-section section-padding-top-bottom overflow-hidden" id="service-section">
                        <div className="container custom-container">
                            <div className="row gx-4 gy-5 justify-content-between">
                                <div className="col-12 col-xl-6 col-xxl-5">
                                    <div className="quanto__header text-center text-lg-start">
                                        <h3 className="title move-anim word-anim" data-delay="0.30">We help you to build digital business</h3>
                                    </div>
                                </div>
                                <div className="col-12 col-xl-6 col-xxl-6">
                                    <div className="row g-114 quanto-service2__row">
                                        {[
                                            { title: "Advanced Digital Solution", icon: "assets/images/service/service-icon-1.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
                                            { title: "UI/UX & Product Innovation", icon: "assets/images/service/service-icon-2.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
                                            { title: "Market Analysis & Planning", icon: "assets/images/service/service-icon-3.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
                                            { title: "Business Campaign Strategy", icon: "assets/images/service/service-icon-4.svg", desc: "Brand identity design a the have to success whether you breath onfire quanto agency." },
                                        ].map((service, index) => (
                                            <div key={index} className="col-md-6 fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                                <div className="quanto-service-box style-2">
                                                    <div className="quanto-iconbox-icon">
                                                        <img src={service.icon} alt="service-icon" loading="lazy" />
                                                    </div>
                                                    <div className="quanto-iconbox-data">
                                                        <div className="quanto-iconbox-data-wrapper">
                                                            <h5 className="word-anim" data-delay={0.30 + index * 0.15}>{service.title}</h5>
                                                            <p className="move-anim" data-delay={0.45 + index * 0.15}>{service.desc}</p>
                                                        </div>
                                                        <Link to="/service-details" className="quanto-link-btn">
                                                            View details
                                                            <span>
                                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                                            </span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quanto-service2-section bg-color-2 section-padding-top-bottom overflow-hidden" id="all-services-section">
                        <div className="container custom-container">
                            <div className="row gx-4 gy-5">
                                <div className="col-12">
                                    <div className="quanto__header text-center text-lg-start">
                                        <h3 className="title move-anim word-anim" data-delay="0.30">Our Complete Service Portfolio</h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-114 quanto-service2__row row-padding-top">
                                {displayedServices.map((service, index) => (
                                    <div key={index} className="col-md-6 col-xl-3 fade-anim" data-delay={0.30 + (index % 8) * 0.15} data-direction="right">
                                        <div className="quanto-service-box style-2">
                                            <div className="quanto-iconbox-icon">
                                                <img src={service.icon} alt="service-icon" loading="lazy" />
                                            </div>
                                            <div className="quanto-iconbox-data">
                                                <div className="quanto-iconbox-data-wrapper">
                                                    <h5 className="word-anim" data-delay={0.30 + (index % 8) * 0.15}>{service.title}</h5>
                                                    <p className="move-anim" data-delay={0.45 + (index % 8) * 0.15}>{service.desc}</p>
                                                </div>
                                                <Link to="/service-details" className="quanto-link-btn">
                                                    View details
                                                    <span>
                                                        <i className="fa-solid fa-arrow-right arry1"></i>
                                                        <i className="fa-solid fa-arrow-right arry2"></i>
                                                    </span>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {hasMoreServices && (
                                <div className="row">
                                    <div className="col-12 text-center" style={{ marginTop: '40px' }}>
                                        <button 
                                            onClick={handleViewMore}
                                            className="view-more-btn"
                                        >
                                            {showAllServices ? 'View Less' : 'View More Services'}
                                            <span>
                                                <i className={`fa-solid fa-arrow-${showAllServices ? 'up' : 'down'} arry1`}></i>
                                                <i className={`fa-solid fa-arrow-${showAllServices ? 'up' : 'down'} arry2`}></i>
                                            </span>
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

export default Service;