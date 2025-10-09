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
import VastuMissionVision from './VastuMissionVision';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
Swiper.use([Navigation, Autoplay, EffectFade]);

const About = () => {
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

            // Floating Symbols Animation
            gsap.to(".floating-symbol", {
                y: "random(-30, 30)",
                x: "random(-20, 20)",
                rotation: "random(-15, 15)",
                duration: "random(3, 5)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: {
                    amount: 2,
                    from: "random"
                }
            });

            // Mandala Rotation
            gsap.to(".mandala-bg", {
                rotation: 360,
                duration: 60,
                repeat: -1,
                ease: "none"
            });

            // Odometer Counter
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

            // Move Animation
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

            // Fade Animation
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

            // Word Animation
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

            // Belief Section Cards Animation
            gsap.utils.toArray(".belief-card").forEach((card, i) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                    },
                    y: 100,
                    opacity: 0,
                    duration: 1,
                    delay: i * 0.2,
                    ease: "power2.out"
                });
            });

            // Mission Vision Cards Hover
            document.querySelectorAll(".mission-vision-card").forEach((card) => {
                card.addEventListener("mouseenter", () => {
                    gsap.to(card, {
                        scale: 1.05,
                        boxShadow: "0 25px 70px rgba(236, 72, 153, 0.25)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                card.addEventListener("mouseleave", () => {
                    gsap.to(card, {
                        scale: 1,
                        boxShadow: "0 15px 40px rgba(0, 0, 0, 0.1)",
                        duration: 0.4,
                        ease: "power2.in"
                    });
                });
            });

            // Team Card Hover
            document.querySelectorAll(".vastu-team-card").forEach((box) => {
                const overlay = document.createElement("div");
                overlay.className = "hover-overlay-vastu";
                box.insertBefore(overlay, box.firstChild);
                gsap.set(overlay, { autoAlpha: 0, scale: 0.8 });

                box.addEventListener("mouseenter", () => {
                    gsap.to(overlay, {
                        autoAlpha: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "power2.out",
                    });
                    gsap.to(box, {
                        y: -10,
                        boxShadow: "0 20px 60px rgba(236, 72, 153, 0.3)",
                        duration: 0.4,
                        ease: "power2.out"
                    });
                });

                box.addEventListener("mouseleave", () => {
                    gsap.to(overlay, {
                        autoAlpha: 0,
                        scale: 0.8,
                        duration: 0.6,
                        ease: "power2.in",
                    });
                    gsap.to(box, {
                        y: 0,
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                        duration: 0.4,
                        ease: "power2.in"
                    });
                });
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
                .vastu-page {
                    background: linear-gradient(135deg, #fff5f7 0%, #ffffff 50%, #fff0f5 100%);
                }

                /* Banner Section */
                .vastu-banner {
                    position: relative;
                    min-height: 70vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: linear-gradient(135deg, rgba(236, 72, 153, 0.05) 0%, rgba(255, 255, 255, 0.95) 100%);
                }

                .banner-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    padding: 60px 20px;
                }

                .banner-title {
                    font-size: 3.5rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    font-family: 'Georgia', serif;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .banner-subtitle {
                    font-size: 1.3rem;
                    color: #841c4e;
                    font-weight: 500;
                    margin-bottom: 30px;
                }

                .banner-description {
                    font-size: 1.1rem;
                    color: #666;
                    max-width: 700px;
                    margin: 0 auto 40px;
                    line-height: 1.8;
                }

                /* Floating Elements */
                .mandala-bg {
                    position: absolute;
                    width: 800px;
                    height: 800px;
                    top: -200px;
                    right: -200px;
                    opacity: 0.12;
                    pointer-events: none;
                    z-index: 0;
                    filter: drop-shadow(0 0 20px rgba(190, 24, 93, 0.3));
                }

                .floating-symbols {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    pointer-events: none;
                    z-index: 1;
                }

                .floating-symbol {
                    position: absolute;
                    font-size: 2rem;
                    opacity: 0.08;
                    color: #841c4e;
                }

                /* Belief Section */
                .belief-section {
                    position: relative;
                    padding: 100px 0;
                }

                .belief-header {
                    text-align: center;
                    margin-bottom: 60px;
                }

                .belief-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    font-family: 'Georgia', serif;
                    margin-bottom: 20px;
                }

                .belief-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                    margin-top: 50px;
                }

                .belief-card {
                    background: white;
                    padding: 40px 30px;
                    border-radius: 20px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
                    transition: all 0.4s ease;
                    border: 2px solid transparent;
                    position: relative;
                    overflow: hidden;
                }

                .belief-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: linear-gradient(90deg, #841c4e, #db2777);
                }

                .belief-card:hover {
                    transform: translateY(-10px);
                    border-color: #5b1135ff;
                    box-shadow: 0 25px 60px rgba(236, 72, 153, 0.2);
                }

                .belief-icon {
                    width: 70px;
                    height: 70px;
                    background: linear-gradient(135deg, #841c4e, #590b2eff);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2rem;
                    color: white;
                    margin-bottom: 25px;
                }

                .belief-card-title {
                    font-size: 1.4rem;
                    font-weight: 600;
                    color: #1a1a1a;
                    margin-bottom: 15px;
                }

                .belief-card-text {
                    color: #666;
                    line-height: 1.7;
                    font-size: 1rem;
                }

                /* Milestone Section */
                .milestone-section {
                    background: white;
                    padding: 80px 0;
                    position: relative;
                }

                .milestone-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 40px;
                    margin-top: 50px;
                }

                .milestone-card {
                    text-align: center;
                    padding: 30px;
                    background: linear-gradient(135deg, #fff5f7, #ffffff);
                    border-radius: 20px;
                    border: 2px solid #fce7f3;
                    transition: all 0.3s ease;
                }

                .milestone-card:hover {
                    transform: translateY(-5px);
                    border-color: #841c4e;
                }

                .milestone-number {
                    font-size: 3.5rem;
                    font-weight: 700;
                    color: #841c4e;
                    font-family: 'Georgia', serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 15px;
                }

                .milestone-label {
                    font-size: 1.1rem;
                    color: #666;
                    font-weight: 500;
                }

                /* Mission Vision Section */
                .mission-vision-section {
                    padding: 100px 0;
                    position: relative;
                }

                .mission-vision-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
                    gap: 50px;
                    margin-top: 60px;
                }

                .mission-vision-card {
                    background: white;
                    padding: 50px 40px;
                    border-radius: 25px;
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s ease;
                }

                .mission-vision-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 6px;
                    height: 100%;
                    background: linear-gradient(180deg, #841c4e, #7c073cff);
                }

                .mv-icon {
                    width: 80px;
                    height: 80px;
                    background: linear-gradient(135deg, #841c4e, #6e0434ff);
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 2.5rem;
                    color: white;
                    margin-bottom: 25px;
                }

                .mv-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 20px;
                    font-family: 'Georgia', serif;
                }

                .mv-text {
                    color: #666;
                    line-height: 1.8;
                    font-size: 1.05rem;
                    margin-bottom: 20px;
                }

                .mv-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .mv-list li {
                    padding: 10px 0;
                    color: #666;
                    position: relative;
                    padding-left: 30px;
                }

                .mv-list li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #841c4e;
                    font-weight: bold;
                    font-size: 1.2rem;
                }

                /* Team Section Styles */
                .vastu-team-section {
                    position: relative;
                    padding: 100px 0;
                    overflow: hidden;
                }

                .vastu-team-card {
                    position: relative;
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    transition: all 0.4s ease;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    border: 2px solid transparent;
                }

                .vastu-team-card:hover {
                    border-color: #841c4e;
                }

                .hover-overlay-vastu {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    // background: linear-gradient(135deg, rgba(99, 4, 52, 0.9) 0%, rgba(142, 3, 66, 0.8) 100%);
                    z-index: 2;
                    pointer-events: none;
                }

                .team-thumb-vastu {
                    position: relative;
                    overflow: hidden;
                    height: 320px;
                }

                .team-thumb-vastu img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s ease;
                }

                .vastu-team-card:hover .team-thumb-vastu img {
                    transform: scale(1.1);
                }

                .om-symbol {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 50px;
                    height: 50px;
                    background: rgba(121, 11, 66, 0.9);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    z-index: 3;
                    opacity: 0;
                    transform: scale(0);
                    transition: all 0.4s ease;
                }

                .vastu-team-card:hover .om-symbol {
                    opacity: 1;
                    transform: scale(1);
                }

                .team-content-vastu {
                    padding: 25px;
                    position: relative;
                    z-index: 3;
                    background: white;
                }

                .team-name-vastu {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #1a1a1a;
                    margin-bottom: 8px;
                    font-family: 'Georgia', serif;
                }

                .team-name-vastu a {
                    color: #1a1a1a;
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .team-name-vastu a:hover {
                    color: #841c4e;
                }

                .team-position-vastu {
                    display: block;
                    color: #841c4e;
                    font-size: 0.95rem;
                    font-weight: 500;
                    margin-bottom: 15px;
                }

                .vastu-divider {
                    width: 60px;
                    height: 3px;
                    background: linear-gradient(90deg, #841c4e, #80083eff);
                    margin: 15px 0;
                    border-radius: 2px;
                }

                .social-links-vastu {
                    display: flex;
                    gap: 12px;
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .social-links-vastu li a {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    background: #fff5f7;
                    color: #841c4e;
                    border-radius: 50%;
                    transition: all 0.3s ease;
                    text-decoration: none;
                }

                .social-links-vastu li a:hover {
                    background: #841c4e;
                    color: white;
                    transform: translateY(-3px);
                }

                @media (max-width: 768px) {
                    .banner-title {
                        font-size: 2.5rem;
                    }
                    .mission-vision-grid {
                        grid-template-columns: 1fr;
                    }
                    .team-thumb-vastu {
                        height: 280px;
                    }
                }
            `}</style>

            <div className="cursor d-none d-lg-block"></div>
            <div className="preloader">
                <div className="spinner-wrap">
                    <div className="preloader-logo">
                        <img src="/assets/images/VastuLogo.png" alt="Preloader" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="spinner"></div>
                </div>
            </div>
            <Link to="#header" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </Link>

            <div className="vastu-page">
                <div id="smooth-content">
                    {/* Banner Section */}
                    <section className="vastu-banner">
                        <svg className="mandala-bg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#be185d" strokeWidth="2"/>
                            <circle cx="100" cy="100" r="60" fill="none" stroke="#be185d" strokeWidth="1.8"/>
                            <circle cx="100" cy="100" r="40" fill="none" stroke="#be185d" strokeWidth="1.5"/>
                            <circle cx="100" cy="100" r="20" fill="none" stroke="#be185d" strokeWidth="1.2"/>
                            {[...Array(12)].map((_, i) => (
                                <line 
                                    key={i}
                                    x1="100" 
                                    y1="100" 
                                    x2={100 + 80 * Math.cos((i * 30) * Math.PI / 180)} 
                                    y2={100 + 80 * Math.sin((i * 30) * Math.PI / 180)}
                                    stroke="#be185d" 
                                    strokeWidth="1.5"
                                />
                            ))}
                        </svg>

                        <div className="floating-symbols">
                            <div className="floating-symbol" style={{top: '10%', left: '5%'}}>🕉️</div>
                            <div className="floating-symbol" style={{top: '20%', right: '8%'}}>✨</div>
                            <div className="floating-symbol" style={{top: '60%', left: '3%'}}>☸️</div>
                            <div className="floating-symbol" style={{top: '70%', right: '5%'}}>🪷</div>
                            <div className="floating-symbol" style={{top: '40%', left: '50%'}}>🔱</div>
                        </div>

                        <div className="container">
                            <div className="banner-content fade-anim" data-direction="bottom">
                                <h1 className="banner-title word-anim">Transforming Spaces, Enriching Lives</h1>
                                <p className="banner-subtitle move-anim" data-delay="0.3">Ancient Wisdom for Modern Living</p>
                                <p className="banner-description move-anim" data-delay="0.45">
                                    We blend timeless Vastu Shastra principles with contemporary design to create harmonious spaces that promote prosperity, health, and peace.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Belief Section */}
                    
                    {/* <section className="quanto-about-area2 bg-color-white section-padding-top">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-xl-9 col-xxl-8 mx-auto">
                                    <div className="quanto__header text-center text-lg-start">
                                        <h3 className="title move-anim">
                                            We believe in the power of Vastu to elevate living spaces and bring prosperity
                                        </h3>
                                    </div>
                                </div>
                            </div>
                            <div className="row g-4 justify-content-between row-padding-top overflow-hidden">
                                <div className="col-md-6 col-xl-5 col-xxl-4 d-flex align-items-xl-center order-1 order-xl-0 overflow-hidden">
                                    <div className="img_reveal overflow-hidden">
                                        <img
                                            src="/assets/images/about/about-thumb-2-1.png"
                                            alt="Vastu consultation"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-5 col-xxl-4 order-0 order-xl-1">
                                    <div className="section-content">
                                        <p className="move-anim" data-duration="0.01">
                                            Our approach is rooted in ancient Vastu Shastra wisdom, harmonizing the five elements to create spaces that promote health, wealth, and happiness. We understand your unique needs and transform them into balanced environments that resonate with positive energy.
                                        </p>
                                        <p className="move-anim" data-duration="0.01">
                                            Whether it's a residential property, commercial space, or spiritual sanctuary, we apply authentic Vastu principles with meticulous attention to directional alignments, energy flow, and cosmic balance.
                                        </p>
                                        <Link className="quanto-link-btn" to="/about">
                                            More about us
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </Link>
                                        <figure className="overflow-hidden">
                                            <div className="img_reveal overflow-hidden">
                                                <img
                                                    src="/assets/images/about/about-thumb-2-2.png"
                                                    alt="Vastu design"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-2 d-flex align-items-xl-center order-xl-2 overflow-hidden">
                                    <div className="img_reveal overflow-hidden">
                                        <img
                                            src="/assets/images/about/about-thumb-2-3.png"
                                            alt="Vastu architecture"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="container custom-container section-margin-top">
                            <div className="belief-grid">
                                <div className="belief-card">
                                    <div className="belief-icon">🏛️</div>
                                    <h4 className="belief-card-title">Traditional Wisdom</h4>
                                    <p className="belief-card-text">
                                        Rooted in thousands of years of Vedic knowledge, we apply authentic Vastu principles to every project with precision and care.
                                    </p>
                                </div>

                                <div className="belief-card">
                                    <div className="belief-icon">✨</div>
                                    <h4 className="belief-card-title">Energy Balance</h4>
                                    <p className="belief-card-text">
                                        We create spaces that harmonize the five elements and optimize positive energy flow throughout your property.
                                    </p>
                                </div>

                                <div className="belief-card">
                                    <div className="belief-icon">🧭</div>
                                    <h4 className="belief-card-title">Directional Science</h4>
                                    <p className="belief-card-text">
                                        Precise alignment and placement based on cardinal directions to maximize benefits and minimize doshas.
                                    </p>
                                </div>

                                <div className="belief-card">
                                    <div className="belief-icon">💎</div>
                                    <h4 className="belief-card-title">Holistic Approach</h4>
                                    <p className="belief-card-text">
                                        We consider every aspect of your space - from architecture to interior design - for complete cosmic harmony.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section> */}

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
                                            src="./assets/images/project/ramedic.webp"
                                            alt="vastu Shastra"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                                <div className="col-xl-5 col-xxl-4 order-0 order-xl-1">
                                    <div className="section-content">
                                        <p className="move-anim" data-duration="0.01">
                                            Our approach is all about understanding your needs and bringing your ideas to life without complexity. We thrive turning imaginative concepts into user-friendly digital solutions. Whether it's a sleek website, a user-friendly app, or a memorable brand identity, we focus on creating designs that not only.
                                        </p>
                                        <p className="move-anim" data-duration="0.01">
                                            Designing immersive digital experiences or developing strategic marketing campaigns, we approach each project with meticulous attention to detail.
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
                                                    src="./assets/images/project/ramedic.webp"
                                                    alt="about-thumb"
                                                    loading="lazy"
                                                />
                                            </div>
                                        </figure>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xl-2 d-flex align-items-xl-center order-xl-2 overflow-hidden">
                                    <div className="img_reveal overflow-hidden">
                                        <img
                                            src="./assets/images/project/org1.webp"
                                            alt="about-thumb"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* <div className="marquee-container section-margin-top fade-anim">
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
                        </div> */}
                    </section>

                    {/* Milestone Section */}
                    <section className="milestone-section">
                        <div className="container custom-container">
                            <div className="text-center">
                                <h3 className="belief-title word-anim">Our Journey in Numbers</h3>
                            </div>
                            <div className="milestone-grid">
                                <div className="milestone-card fade-anim" data-delay="0.2">
                                    <div className="milestone-number counter-item">
                                        <span className="odometer" data-odometer-final="15">0</span>
                                        <em>+</em>
                                    </div>
                                    <p className="milestone-label">Years of Experience</p>
                                </div>

                                <div className="milestone-card fade-anim" data-delay="0.4">
                                    <div className="milestone-number counter-item">
                                        <span className="odometer" data-odometer-final="500">0</span>
                                        <em>+</em>
                                    </div>
                                    <p className="milestone-label">Projects Completed</p>
                                </div>

                                <div className="milestone-card fade-anim" data-delay="0.6">
                                    <div className="milestone-number counter-item">
                                        <span className="odometer" data-odometer-final="25">0</span>
                                        <em>+</em>
                                    </div>
                                    <p className="milestone-label">Expert Team Members</p>
                                </div>

                                <div className="milestone-card fade-anim" data-delay="0.8">
                                    <div className="milestone-number counter-item">
                                        <span className="odometer" data-odometer-final="98">0</span>
                                        <em>%</em>
                                    </div>
                                    <p className="milestone-label">Client Satisfaction</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Mission & Vision Section */}
                    {/* <section className="mission-vision-section">
                        <div className="container custom-container">
                            <div className="text-center mb-5">
                                <h3 className="belief-title word-anim">Our Mission & Vision</h3>
                            </div>
                            
                            <div className="mission-vision-grid">
                                <div className="mission-vision-card fade-anim" data-direction="left">
                                    <div className="mv-icon">🎯</div>
                                    <h4 className="mv-title">Our Mission</h4>
                                    <p className="mv-text">
                                        To bring the ancient science of Vastu Shastra into modern living spaces, creating environments that promote health, wealth, and happiness for all our clients.
                                    </p>
                                    <ul className="mv-list">
                                        <li>Preserve and promote traditional Vastu knowledge</li>
                                        <li>Provide accessible and practical Vastu solutions</li>
                                        <li>Create harmonious spaces for every budget</li>
                                        <li>Educate people about energy balance in architecture</li>
                                        <li>Integrate Vastu with modern design aesthetics</li>
                                    </ul>
                                </div>

                                <div className="mission-vision-card fade-anim" data-direction="right">
                                    <div className="mv-icon">🌟</div>
                                    <h4 className="mv-title">Our Vision</h4>
                                    <p className="mv-text">
                                        To become the most trusted name in Vastu consultation globally, transforming millions of lives by creating spaces that resonate with positive cosmic energy.
                                    </p>
                                    <ul className="mv-list">
                                        <li>Lead the Vastu industry with innovation</li>
                                        <li>Expand our services to international markets</li>
                                        <li>Build a community of Vastu practitioners</li>
                                        <li>Research and validate Vastu principles scientifically</li>
                                        <li>Make every space a source of prosperity</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </section> */}
                    <VastuMissionVision/>

                    {/* Team Section */}
                    <section className="vastu-team-section">
                        <svg className="mandala-bg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{left: '-200px', top: '50%'}}>
                            <circle cx="100" cy="100" r="80" fill="none" stroke="#be185d" strokeWidth="2"/>
                            <circle cx="100" cy="100" r="60" fill="none" stroke="#be185d" strokeWidth="1.8"/>
                            <circle cx="100" cy="100" r="40" fill="none" stroke="#be185d" strokeWidth="1.5"/>
                            <circle cx="100" cy="100" r="20" fill="none" stroke="#be185d" strokeWidth="1.2"/>
                            {[...Array(12)].map((_, i) => (
                                <line 
                                    key={i}
                                    x1="100" 
                                    y1="100" 
                                    x2={100 + 80 * Math.cos((i * 30) * Math.PI / 180)} 
                                    y2={100 + 80 * Math.sin((i * 30) * Math.PI / 180)}
                                    stroke="#be185d" 
                                    strokeWidth="1.5"
                                />
                            ))}
                        </svg>

                        <div className="container custom-container position-relative" style={{zIndex: 2}}>
                            <div className="row gx-4 gy-2 align-items-end mb-5">
                                <div className="col-md-9 col-xl-7 col-xxl-6">
                                    <div className="quanto__header">
                                        <h3 className="belief-title text-center text-md-start fade-anim word-anim" data-delay="0.30" data-direction="left">
                                            Meet Our Vastu Experts
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-md-3 col-xl-5 col-xxl-6">
                                    <div className="quanto__headerr d-flex justify-content-center justify-content-lg-end">
                                        <Link to="/join-team" className="quanto-link-btn">
                                            Join Our Team
                                            <span>
                                                <i className="fa-solid fa-arrow-right arry1"></i>
                                                <i className="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="row gx-4 gy-5 gx-sm-3 gx-md-4">
                                {[
                                    { name: "Acharya Rajesh Kumar", position: "Chief Vastu Consultant", img: "/assets/images/project/ramedic.webp", link: "/team-details" },
                                    { name: "Dr. Priya Sharma", position: "Senior Vastu Architect", img: "/assets/images/project/logo3.png", link: "/team-details" },
                                    { name: "Pandit Vikram Singh", position: "Vedic Vastu Specialist", img: "/assets/images/project/aboutThumb.png", link: "/team-details" },
                                    { name: "Anjali Mehta", position: "Residential Vastu Expert", img: "/assets/images/project/org1.webp", link: "/team-details" },
                                ].map((member, index) => (
                                    <div key={index} className="col-sm-6 col-md-6 col-lg-4 col-xl-3">
                                        <div className="vastu-team-card" data-delay={0.30 + index * 0.15} data-direction="bottom">
                                            <figure className="team-thumb-vastu">
                                                <img src={member.img} alt={member.name} className="w-100" loading="lazy" />
                                                <div className="om-symbol">ॐ</div>
                                            </figure>
                                            <div className="team-content-vastu">
                                                <h6 className="team-name-vastu word-anim" data-delay={0.30 + index * 0.15}>
                                                    <Link to={member.link}>{member.name}</Link>
                                                </h6>
                                                <span className="team-position-vastu move-anim" data-delay={0.45 + index * 0.15}>
                                                    {member.position}
                                                </span>
                                                <div className="vastu-divider"></div>
                                                {/* <ul className="social-links-vastu">
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-linkedin-in"></i></a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa-brands fa-whatsapp"></i></a>
                                                    </li>
                                                </ul> */}
                                            </div>
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

export default About;