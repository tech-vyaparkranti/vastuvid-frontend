import React, { useEffect, useRef } from 'react';
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

    useEffect(() => {
        Aos.init({
            duration: 2000,
            once: false, // Allow animations to replay on scroll
            mirror: true, // Animate elements when scrolling past them again
        });

        // GSAP Context for cleanup
        gsapContext.current = gsap.context(() => {
            // Preloader
            $(".preloader").delay(800).fadeOut("slow");

            // Sticky Menu
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

            // Set Background Image
            $("[data-bg-src]").each(function () {
                const src = $(this).attr("data-bg-src");
                $(this).css("background-image", `url(${src})`).addClass("background-image").removeAttr("data-bg-src");
            });

            // Custom Cursor
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

            // Odometer Counter (optional, if you want to add counters to the service page)
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

            // Swiper Sliders (optional, if you want to add a slider to the service page)
            const initializeSwiper = (selector, config) => {
                const element = document.querySelector(selector);
                if (element) {
                    const swiper = new Swiper(element, config);
                    swiperInstances.current.push(swiper);
                    return swiper;
                }
                return null;
            };

            // Smooth Scrolling


            // Hover Overlay Animations for Service and Pricing Boxes

            // Move Animation for Service and Pricing Content
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

            // Fade Animation for Service and Pricing Boxes
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

            // Word Animation for Titles
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

            // Image Parallax Animation for Hero Thumbnail
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

            // Section Jump for Scroll Links
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
                        } else {
                            console.error(`Section with ID ${targetID} does not exist.`);
                        }
                    }
                });
            });
        });

        // Cleanup
        return () => {
            swiperInstances.current.forEach((swiper) => swiper.destroy(true, true));
            if (smootherRef.current) smootherRef.current.kill();
            gsapContext.current.revert();
            window.removeEventListener("scroll", () => { });
            window.removeEventListener("mousemove", () => { });
            document.querySelectorAll("a, .cursor-pointer").forEach((item) => {
                item.removeEventListener("mouseover", () => { });
                item.removeEventListener("mouseout", () => { });
            });
            document.querySelectorAll(".section-link").forEach((link) => {
                link.removeEventListener("click", () => { });
            });
            console.log("Cleaned up animations and event listeners");
        };
    }, []);

    return (
        <>
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
                                            // src="assets/images/hero/common-hero-thumb.png"
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
                    <section className="quanto-pricing-area bg-color-2 section-padding-top-bottom">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto__header">
                                        <h3 className="title text-center text-lg-start fade-anim word-anim" data-delay="0.30" data-direction="left">
                                            Find your right plan
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 row-padding-top">
                                {[
                                    { title: "Standard", price: "$990", desc: "Ideal for small businesses or startups." },
                                    { title: "Professional", price: "$1800", desc: "Ideal for small businesses or startups." },
                                    { title: "Enterprise", price: "$2900", desc: "Ideal for small businesses or startups." },
                                ].map((plan, index) => (
                                    <div key={index} className="col-md-6 col-xl-4">
                                        <div className="quanto-pricing-box bg-white fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                            <h5 className="pricing-title word-anim" data-delay={0.30 + index * 0.15}>{plan.title}</h5>
                                            <p className="pricing-info move-anim" data-delay={0.45 + index * 0.15}>{plan.desc}</p>
                                            <h3 className="pricing move-anim" data-delay={0.60 + index * 0.15}>{plan.price}</h3>
                                            <div className="pricing-list">
                                                <ul className="custom-ul">
                                                    {[
                                                        "Access to all basic features",
                                                        "Work customization",
                                                        "Mobile and desktop app",
                                                        "Access to all design templates",
                                                        "Priority customer support",
                                                    ].map((feature, idx) => (
                                                        <li key={idx} className="move-anim" data-delay={0.75 + index * 0.15 + idx * 0.05}>
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
                                                                    d="M8.26686 17.2517L23.3996 2.09009C18.5966 8.6869 13.7937 15.2841 9.01958 21.9098L0.599609 11.6671C3.17479 13.5188 5.72074 15.3708 8.2673 17.2513L8.26686 17.2517Z"
                                                                    fill="currentColor"
                                                                />
                                                            </svg>
                                                            {feature}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <Link to="/contact" className="quanto-link-btn btn-pill">
                                                Go with this plan
                                                <span>
                                                    <i className="fa-solid fa-arrow-right arry1"></i>
                                                    <i className="fa-solid fa-arrow-right arry2"></i>
                                                </span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </>
    );
};

export default Service;