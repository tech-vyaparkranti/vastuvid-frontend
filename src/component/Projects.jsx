import React, { useEffect, useRef } from 'react';
// import logo3 from "assets/images/project/logo2.jpg";
// import logo4 from "assets/images/project/logo3.jpg";
// import logo5 from "assets/images/project/logo4.jpg";
// import logo6 from "assets/images/project/logo5.jpg";
// import logo7 from "assets/images/project/org1.webp";
// import logo8 from "assets/images/project/logo2.jpg";
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
import { Link } from 'react-router-dom';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
// Register Swiper modules
Swiper.use([Navigation, Autoplay, EffectFade]);

const Projects = () => {
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);

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

            const initializeSwiper = (selector, config) => {
                const element = document.querySelector(selector);
                if (element) {
                    const swiper = new Swiper(element, config);
                    swiperInstances.current.push(swiper);
                    return swiper;
                }
                return null;
            };

            initializeSwiper(".quanto-project__slider", {
                slidesPerView: 1,
                loop: true,
                spaceBetween: 15,
                navigation: {
                    nextEl: ".quanto-project__slider-navigation .next-btn",
                    prevEl: ".quanto-project__slider-navigation .prev-btn",
                },
                breakpoints: {
                    576: { spaceBetween: 20, slidesPerView: 1.3 },
                    768: { spaceBetween: 25, slidesPerView: 1.5 },
                    992: { spaceBetween: 30, slidesPerView: 2 },
                    1200: { spaceBetween: 40, slidesPerView: 2.3 },
                },
            });

            if (window.innerWidth > 767 && document.querySelector("#has_smooth")) {
                smootherRef.current = ScrollSmoother.create({
                    smooth: 0.9,
                    effects: window.innerWidth < 1500 ? false : true,
                    smoothTouch: 0.1,
                    normalizeScroll: { allowNestedScroll: true },
                    ignoreMobileResize: true,
                });
            }

            document.querySelectorAll(".quanto-project-box").forEach((box) => {
                const overlay = document.createElement("div");
                overlay.className = "hover-overlay";
                box.insertBefore(overlay, box.firstChild);
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
                        duration: 0.5,
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
                        duration: 0.5,
                        ease: "power2.in",
                    };
                    const distance = 100;
                    if (direction === "right") animProps.x = `${distance}%`;
                    if (direction === "left") animProps.x = `-${distance}%`;
                    if (direction === "bottom") animProps.y = `${distance}%`;
                    if (direction === "top") animProps.y = `-${distance}%`;
                    gsap.to(overlay, animProps);
                });
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

            document.querySelectorAll(".img_reveal").forEach((img_reveal) => {
                const image = img_reveal.querySelector("img");
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: img_reveal,
                        start: "top 70%",
                    },
                });
                tl.set(img_reveal, { autoAlpha: 1 })
                    .from(img_reveal, { xPercent: -100, ease: "power2.out", duration: 1 })
                    .from(image, { xPercent: 100, scale: 1.5, ease: "power2.out", duration: 1.5 }, "-=1.5");
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

    return (
        <>
            <style>{`
                .quanto-project-box {
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    border-radius: 12px;
                }
                .word-anim {
                    color:#63334E;
                    font-size:105px;
                }

                .quanto-project-box::after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255, 105, 180, 0.1), rgba(255, 20, 147, 0.1));
                    opacity: 0;
                    transition: opacity 0.4s ease;
                    pointer-events: none;
                    z-index: 1;
                }

                .quanto-project-box:hover::after {
                    opacity: 1;
                }

                .quanto-project-box:hover {
                    transform: translateY(-15px) scale(1.02);
                    box-shadow: 0 20px 50px rgba(255, 105, 180, 0.3);
                }

                .quanto-project-thumb {
                    position: relative;
                    overflow: hidden;
                }

                .quanto-project-thumb::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
                    transition: left 0.7s ease;
                    z-index: 2;
                }

                .quanto-project-box:hover .quanto-project-thumb::before {
                    left: 100%;
                }

                .quanto-project-thumb img {
                    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
                }

                .quanto-project-box:hover .quanto-project-thumb img {
                    transform: scale(1.15) rotate(2deg);
                }

                .quanto-project-content {
                    position: relative;
                    z-index: 2;
                    transition: all 0.3s ease;
                }

                .quanto-project-content h5 {
                    transition: all 0.3s ease;
                }

                .quanto-project-box:hover .quanto-project-content h5 {
                    color: #790845ff;
                    transform: translateX(10px);
                }

                .quanto-project-date {
                    transition: all 0.3s ease;
                    display: inline-block;
                }

                .quanto-project-box:hover .quanto-project-date {
                    color: #790845ff;
                    transform: translateX(10px);
                }

                .quanto-project-date i {
                    transition: transform 0.3s ease;
                    display: inline-block;
                }

                .quanto-project-box:hover .quanto-project-date i {
                    transform: rotate(180deg);
                }

                @keyframes floatAnimation {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                .quanto-project-box:hover {
                    animation: floatAnimation 3s ease-in-out infinite;
                }

                .hover-overlay {
                    background: linear-gradient(135deg, rgba(255, 105, 180, 0.15), rgba(255, 20, 147, 0.15));
                }

                .client-box {
                    transition: all 0.3s ease;
                }

                .client-box:hover {
                    transform: scale(1.1) rotate(3deg);
                    filter: drop-shadow(0 5px 15px rgba(255, 105, 180, 0.3));
                }

                .banner-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, rgba(255, 105, 180, 0.2), rgba(255, 20, 147, 0.2));
                    pointer-events: none;
                }

                .project-banner-text {
                    color:#8d1350ff;
                    text-shadow: 2px 2px 4px rgba(57, 54, 54, 0.3);
                    background: linear-gradient(135deg, #8d1350ff, #720540ff);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
            `}</style>
            <div className="cursor d-none d-lg-block"></div>
            <a href="#header" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </a>
            <div>
                <div id="smooth-content">
                    {/* Banner Section */}
                    <div className="quanto-video-area style-2 overflow-hidden">
                        <div className="container custom-container position-relative">
                            {/* <a href="#project-section" className="scroll-down section-link">
                                Scroll down
                                <img src="assets/images/icons/scroll-down.svg" alt="Scroll down" loading="lazy" />
                            </a> */}
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-hero__thumb text-end fade-anim" data-delay="0.30" data-direction="bottom" style={{ position: 'relative' }}>
                                        <div className="banner-overlay"></div>
                                        <img
                                            src="assets/images/project/projectBanner.webp"
                                            alt="project-banner"
                                            data-speed="0.8"
                                            className="w-100"
                                            loading="lazy"
                                            style={{height:'700px',objectFit:'contain'}}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className="quanto-hero-faq-section overflow-hidden" id="project-section">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-lg-12 col-xxl-11">
                                    {/* <div className="quanto-hero-common__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim project-banner-text" data-delay="0.60">
                                            Harmonizing Spaces with Ancient Wisdom
                                        </h1>
                                        <p className="move-anim" data-delay="0.75" style={{ fontSize: '1.2rem', marginTop: '20px', color: '#666' }}>
                                            Transforming environments through the timeless principles of Vastu Shastra
                                        </p>
                                    </div> */}
                                    <div className="quanto-hero-common__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim" data-delay="0.60">
                                            Harmonizing Spaces with Ancient Wisdom
                                        </h1>
                                        <p className="move-anim" data-delay="0.75" style={{ fontSize: '1.2rem', marginTop: '20px', color: 'rgb(113 4 45)' }}>
                                            Transforming environments through the timeless principles of Vastu Shastra
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="quanto-project-section bg-color-white section-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-0 gy-4 gy-md-0 justify-content-between">
                                <div className="col-12 col-md-5 order-1 order-md-0">
                                    <div className="row g-0">
                                        {[
                                            { title: "Residential Vastu Design", img: "./assets/images/project/residencialVastu.webp", year: "2024", category: "Home Consultation" },
                                            { title: "Commercial Space Alignment", img: "./assets/images/project/commercialImage.webp", year: "2024", category: "Office Design" },
                                            { title: "Temple Architecture", img: "./assets/images/project/templeArch.jpg", year: "2024", category: "Sacred Spaces" },
                                        ].map((project, index) => (
                                            <div key={index} className="col-md-12 project-row-gap">
                                                <div className="quanto-project-box overflow-hidden fade-anim" data-delay={0.30 + index * 0.15} data-direction="left">
                                                    <Link to='/projects-details'>
                                                        <div className="quanto-project-thumb overflow-hidden img_reveal">
                                                            <img src={project.img} alt="project-thumb" className="w-100" loading="lazy" />
                                                        </div>
                                                    </Link>
                                                    <div className="quanto-project-content">
                                                        <h5 className="text-color-primary line-clamp-1 word-anim" data-delay={0.30 + index * 0.15}>
                                                            <Link to='/projects-details'>{project.title}</Link>
                                                        </h5>
                                                        <span className="quanto-project-date text-color-primary move-anim" data-delay={0.45 + index * 0.15}>
                                                            {project.year}
                                                            <i className="bi bi-dash"></i>
                                                            {project.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 order-0 order-md-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="quanto__header text-center text-md-end"></div>
                                        </div>
                                        {[
                                            { title: "Industrial Vastu Planning", img: "./assets/images/project/Vastu-For-Factory.jpg", year: "2024", category: "Factory Layout" },
                                            { title: "Garden & Landscape Design", img: "./assets/images/project/garden.jpg", year: "2024", category: "Outdoor Spaces" },
                                            { title: "Remedial Solutions", img: "./assets/images/project/ramedic.webp", year: "2024", category: "Corrections" },
                                        ].map((project, index) => (
                                            <div key={index} className={`col-md-${index === 0 ? '10 ms-auto' : index === 1 ? '9 me-auto' : '10 ms-auto'} project-row-gap`}>
                                                <div className="quanto-project-box overflow-hidden fade-anim" data-delay={0.30 + index * 0.15} data-direction="right">
                                                    <Link to='/projects-details'>
                                                        <div className="quanto-project-thumb overflow-hidden img_reveal">
                                                            <img src={project.img} alt="project-thumb" className="w-100" loading="lazy" />
                                                        </div>
                                                    </Link>
                                                    <div className="quanto-project-content">
                                                        <h5 className="text-color-primary line-clamp-1 word-anim" data-delay={0.30 + index * 0.15}>
                                                            <Link to='/projects-details'>{project.title}</Link>
                                                        </h5>
                                                        <span className="quanto-project-date text-color-primary move-anim" data-delay={0.45 + index * 0.15}>
                                                            {project.year}
                                                            <i className="bi bi-dash"></i>
                                                            {project.category}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="quanto-clients-area bg-color-2 section-padding-bottom">
                        <div className="container custom-container">
                            <div className="row g-4">
                                <div className="col-12">
                                    <p className="move-anim" data-delay="0.30">Trusted by leading organizations worldwide</p>
                                </div>
                                <div className="col-12 clients__box-wrapper">
                                    {[
                                        { logo: "assets/images/project/logo4.jpg", delay: 0.30 },
                                        { logo: "assets/images/project/logo3.png", delay: 0.45 },
                                        { logo: "assets/images/project/logo4.jpg", delay: 0.60 },
                                        { logo: "assets/images/project/logo5.jpg", delay: 0.75 },
                                        { logo: "assets/images/project/logo3.png", delay: 0.90 },
                                        { logo: "assets/images/project/logo4.jpg", delay: 1.05 },
                                    ].map((client, index) => (
                                        <div key={index} className="client-box fade-anim" data-delay={client.delay} data-direction="right">
                                            <img src={client.logo} alt="client-logo" loading="lazy" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Projects;