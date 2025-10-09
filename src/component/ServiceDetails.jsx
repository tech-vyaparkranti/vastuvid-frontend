import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom'; // Import Link for SPA navigation
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import 'odometer/themes/odometer-theme-default.css';
import $ from 'jquery';
import 'jquery-ui-dist/jquery-ui';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';
import { Swiper } from 'swiper';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';
import Odometer from 'odometer';
import Aos from 'aos';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);
// Register Swiper modules
Swiper.use([Navigation, Autoplay, EffectFade]);

const ServiceDetails = () => {
    const swiperInstances = useRef([]);
    const smootherRef = useRef(null);
    const gsapContext = useRef(null);

    useEffect(() => {
        // Initialize AOS
        Aos.init({
            duration: 2000,
            once: false, // Allow animations to replay on scroll
            mirror: true, // Animate elements when scrolling past them again
        });

        // GSAP Context for animations and cleanup
        gsapContext.current = gsap.context(() => {
            // Preloader
            $('.preloader').delay(800).fadeOut('slow');

            // Sticky Menu
            const handleScroll = () => {
                const scroll = window.scrollY;
                if (scroll > 50) {
                    $('#sticky-menu').addClass('sticky-menu');
                    $('.quanto-menu-area').addClass('sticky');
                } else {
                    $('#sticky-menu').removeClass('sticky-menu');
                    $('.quanto-menu-area').removeClass('sticky');
                }
            };
            window.addEventListener('scroll', handleScroll);

            // Set Background Image
            $('[data-bg-src]').each(function () {
                const src = $(this).attr('data-bg-src');
                $(this).css('background-image', `url(${src})`).addClass('background-image').removeAttr('data-bg-src');
            });

            // Custom Cursor
            const cursor = document.querySelector('.cursor');
            if (cursor) {
                const editCursor = (e) => {
                    cursor.style.left = `${e.clientX}px`;
                    cursor.style.top = `${e.clientY}px`;
                };
                window.addEventListener('mousemove', editCursor);
                document.querySelectorAll('a, .cursor-pointer').forEach((item) => {
                    item.addEventListener('mouseover', () => cursor.classList.add('cursor-active'));
                    item.addEventListener('mouseout', () => cursor.classList.remove('cursor-active'));
                });
            }

            // Odometer Counter (optional, add if you want counters in ServiceDetails)
            document.querySelectorAll('.counter-item .odometer').forEach((el) => {
                const odometer = new Odometer({
                    el: el,
                    value: 0,
                    format: '(,ddd)',
                    duration: 2000,
                });
                const finalValue = el.getAttribute('data-odometer-final');
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

            // Swiper Sliders (optional, add if you want sliders in ServiceDetails)
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
            if (window.innerWidth > 767 && document.querySelector('#has_smooth')) {
                smootherRef.current = ScrollSmoother.create({
                    smooth: 0.9,
                    effects: window.innerWidth < 1500 ? false : true,
                    smoothTouch: 0.1,
                    normalizeScroll: { allowNestedScroll: true },
                    ignoreMobileResize: true,
                });
            }

            // GSAP Sticky for Headers
            document.querySelectorAll('.gsap-sticky').forEach((stickyElement) => {
                ScrollTrigger.create({
                    trigger: stickyElement,
                    start: 'top 100px',
                    endTrigger: '.gsap-scroll',
                    end: 'bottom bottom',
                    pin: true,
                    pinSpacing: false,
                });
            });

            // Move Animation for Content
            document.querySelectorAll('.move-anim').forEach((splitTextLine) => {
                const delay_value = splitTextLine.getAttribute('data-delay') || 0.1;
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: splitTextLine,
                        start: 'top 85%',
                        duration: 1.3,
                        toggleActions: 'play none none none',
                    },
                });
                const itemSplitted = new SplitText(splitTextLine, { type: 'lines' });
                gsap.set(splitTextLine, { perspective: 400 });
                itemSplitted.split({ type: 'lines' });
                tl.from(itemSplitted.lines, {
                    duration: 1,
                    delay: parseFloat(delay_value),
                    opacity: 0,
                    rotationX: -80,
                    force3D: true,
                    transformOrigin: 'top center -50',
                    stagger: 0.1,
                });
            });

            // Fade Animation for Content and Thumbnails
            document.querySelectorAll('.fade-anim').forEach((item) => {
                const fade_direction = item.getAttribute('data-direction') || 'bottom';
                const onscroll_value = item.getAttribute('data-on-scroll') || 1;
                const duration_value = parseFloat(item.getAttribute('data-duration') || 1.15);
                const fade_offset = parseFloat(item.getAttribute('data-offset') || 50);
                const delay_value = parseFloat(item.getAttribute('data-delay') || 0.15);
                const ease_value = item.getAttribute('data-ease') || 'power2.out';
                const animation_settings = {
                    opacity: 0,
                    ease: ease_value,
                    duration: duration_value,
                    delay: delay_value,
                };
                if (fade_direction === 'top') animation_settings.y = -fade_offset;
                if (fade_direction === 'left') animation_settings.x = -fade_offset;
                if (fade_direction === 'bottom') animation_settings.y = fade_offset;
                if (fade_direction === 'right') animation_settings.x = fade_offset;
                if (onscroll_value == 1) {
                    animation_settings.scrollTrigger = {
                        trigger: item,
                        start: 'top 85%',
                    };
                }
                gsap.from(item, animation_settings);
            });

            // Word Animation for Titles
            document.querySelectorAll('.word-anim').forEach((word_anim_item) => {
                const stagger_value = parseFloat(word_anim_item.getAttribute('data-stagger') || 0.04);
                const translateX_value = word_anim_item.getAttribute('data-translateX') || false;
                const translateY_value = word_anim_item.getAttribute('data-translateY') || false;
                const onscroll_value = word_anim_item.getAttribute('data-on-scroll') || 1;
                const data_delay = parseFloat(word_anim_item.getAttribute('data-delay') || 0.1);
                const data_duration = parseFloat(word_anim_item.getAttribute('data-duration') || 0.75);
                const split_word = new SplitText(word_anim_item, { type: 'chars, words' });
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
                        start: 'top 90%',
                    };
                }
                gsap.from(split_word.words, animation_settings);
            });

            // Image Parallax Animation for Thumbnails
            document.querySelectorAll('.quanto-hero__thumb').forEach((thumb) => {
                const image = thumb.querySelector('img');
                const dataSpeed = parseFloat(thumb.querySelector('img').getAttribute('data-speed') || 0.8);
                gsap.to(image, {
                    yPercent: 20 * (1 - dataSpeed),
                    ease: 'none',
                    scrollTrigger: {
                        trigger: thumb,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: true,
                    },
                });
            });

            // Section Jump for Scroll Links
            document.querySelectorAll('.section-link').forEach((link) => {
                link.addEventListener('click', (event) => {
                    event.preventDefault();
                    const targetID = link.getAttribute('href');
                    if (targetID === '#header') {
                        gsap.to(window, { duration: 1.5, scrollTo: { y: 0 }, ease: 'power2.inOut' });
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
            window.removeEventListener('scroll', () => { });
            window.removeEventListener('mousemove', () => { });
            document.querySelectorAll('a, .cursor-pointer').forEach((item) => {
                item.removeEventListener('mouseover', () => { });
                item.removeEventListener('mouseout', () => { });
            });
            document.querySelectorAll('.section-link').forEach((link) => {
                link.removeEventListener('click', () => { });
            });
            console.log('Cleaned up animations and event listeners');
        };
    }, []);

    return (
        <>
            <div className="cursor d-none d-lg-block"></div>
            <div className="preloader">
                <div className="spinner-wrap">
                    <div className="preloader-logo">
                        <img src="/assets/images/preloader.svg" alt="Preloader" className="img-fluid" loading="lazy" />
                    </div>
                    <div className="spinner"></div>
                </div>
            </div>
            <Link to="#header" id="scroll-top" className="back-to-top-btn section-link">
                <i className="fa-solid fa-arrow-up"></i>
            </Link>
            <div >
                <div id="smooth-content">
                    <section className="quanto-hero-common-section section-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-center">
                                <div className="col-lg-12 col-xl-10 col-xxl-9">
                                    <div className="quanto-hero-common__content move-anim" data-delay="0.45">
                                        <h1 className="title word-anim" data-delay="0.60">Market Analysis & Planning</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="quanto-video-area style-2 overflow-hidden">
                        <div className="container custom-container position-relative">
                            <Link to="#quanto-service-details-section" className="scroll-down section-link">
                                Scroll down
                                <img src="/assets/images/icons/scroll-down.svg" alt="Scroll down" loading="lazy" />
                            </Link>
                            <div className="row">
                                <div className="col-12">
                                    <div className="quanto-hero__thumb text-center fade-anim" data-delay="0.30" data-direction="bottom">
                                        <img
                                            src="/assets/images/hero/common-hero-thumb-2.png"
                                            alt="hero-thumb"
                                            data-speed="0.8"
                                            className="w-100"
                                            loading="lazy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section id="quanto-service-details-section" className="quanto-service-details-section row-padding-top row-padding-bottom overflow-hidden">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-center">
                                <div className="col-xl-8">
                                    <div className="quanto-service-details__content fade-anim" data-delay="0.30">
                                        <p className="move-anim" data-delay="0.45">
                                            This service package is designed to create seamless, engaging, and innovative digital experiences. It combines intuitive User Interface (UI) design with strategic User Experience (UX) principles, ensuring your product not only looks great but also functions flawlessly. The focus extends beyond aesthetics, integrating product innovation strategies to help businesses stay competitive in an ever-evolving market. By leveraging user research, data analytics, and cutting-edge technologies, we deliver products.
                                        </p>
                                        <p className="service-text move-anim" data-delay="0.60">
                                            This package is ideal for businesses aiming to launch new products, enhance existing ones, or establish a competitive edge in their industry. By combining thoughtful design, strategic innovation, and a user-first approach, we create products that are not only relevant today but are also adaptable to the challenges of tomorrow.
                                        </p>
                                        <div className="service-benefits fade-anim" data-delay="0.75">
                                            <h4 className="word-anim" data-delay="0.30">Benefits of this service</h4>
                                            <p className="move-anim" data-delay="0.45">
                                                The UI/UX & Product Innovation Service Package offers a multitude of tangible and strategic benefits that help businesses enhance user satisfaction, achieve measurable outcomes, and stay ahead of the competition. Here's a detailed breakdown:
                                            </p>
                                            <div className="benefits-list">
                                                <div className="row g-3 justify-content-start">
                                                    <div className="col-sm-6 col-xl-5">
                                                        <ul className="custom-ul">
                                                            {[
                                                                'Custom Website Design',
                                                                'Responsive Web Development',
                                                                'E-Commerce Solutions',
                                                                'JavaScript',
                                                                'API Integration',
                                                                'Front End Development',
                                                            ].map((item, index) => (
                                                                <li key={index} className="fade-anim" data-delay={0.30 + index * 0.15}>
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
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="col-sm-6 col-xl-5">
                                                        <ul className="custom-ul">
                                                            {[
                                                                'Front End Development',
                                                                'Content Management Systems (CMS)',
                                                                'Website Maintenance and Support',
                                                                'SEO Optimization',
                                                                'Performance Optimization',
                                                            ].map((item, index) => (
                                                                <li key={index} className="fade-anim" data-delay={0.30 + index * 0.15}>
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
                                                                    {item}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div className="quanto-video-area style-2 overflow-hidden">
                        <div className="container custom-container">
                            <div className="row">
                                <div className="col-12">
                                    <video
                                        muted
                                        autoPlay
                                        loop
                                        src="https://res.cloudinary.com/ducryslbe/video/upload/v1740329511/Quanto/video.sakebul.com.mp4"
                                        className="quanto-video d-block w-100 fade-anim"
                                        data-speed="0.8"
                                        id="quanto-video-2"
                                        data-delay="0.30"
                                    ></video>
                                    <button className="play-btn">Play</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="quanto-choose-us-section row-padding-top section-padding-bottom">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-center">
                                <div className="col-xl-8">
                                    <div className="quanto-choose-us__content fade-anim" data-delay="0.30">
                                        <h4 className="word-anim" data-delay="0.30">Why choose this service?</h4>
                                        <p className="move-anim" data-delay="0.45">
                                            The UI/UX & Product Innovation Service Package offers a multitude of tangible and strategic benefits that help businesses enhance user satisfaction, achieve measurable outcomes, and stay ahead of the competition. Here's a detailed breakdown:
                                        </p>
                                        <p className="choose-us-text move-anim" data-delay="0.60">
                                            This package is ideal for businesses aiming to launch new products, enhance existing ones, or establish a competitive edge in their industry. By combining thoughtful design, strategic innovation, and a user-first approach, we create products that are not only relevant today but are also adaptable to the challenges.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* Integrated FAQ Section */}
                    <section id="quanto-faq-area" className="quanto-faq-area section-padding-top-bottom bg-color-white">
                        <div className="container custom-container">
                            <div className="row g-4 justify-content-between">
                                <div className="col-lg-6 col-xl-5 col-xxl-4 gsap-sticky">
                                    <div className="quanto__header">
                                        <h3 className="title fade-anim word-anim" data-delay="0.30" data-direction="left">
                                            Questions and answers
                                        </h3>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-xl-7 col-xxl-7 gsap-scroll">
                                    <div className="accordion quanto-faq-accordion" id="accordionExample">
                                        {[
                                            {
                                                id: 'collapseOne',
                                                question: 'What happens after the design is ready & I approve it?',
                                                answer: 'Once you approve the design, we move to the next steps based on your project needs, such as development, implementation, or delivery of final assets. For most projects, this phase is completed within 2-3 business days, ensuring a swift transition while maintaining top-notch quality.',
                                                expanded: true,
                                            },
                                            {
                                                id: 'collapseTwo',
                                                question: 'Can you work with wireframes or our existing designs?',
                                                answer: 'Absolutely, we can work with your wireframes or existing designs. We’ll refine and enhance them to align with your vision, ensuring a seamless integration with our design process.',
                                            },
                                            {
                                                id: 'collapseThree',
                                                question: 'Do you charge for additional revisions?',
                                                answer: 'We include a set number of revisions in all our plans to ensure your satisfaction. Additional revisions beyond the included amount may incur a fee, which we’ll discuss transparently with you.',
                                            },
                                            {
                                                id: 'collapseFour',
                                                question: 'I have an agency. Can I outsource work to you?',
                                                answer: 'Yes, we partner with agencies to provide white-label design and development services. Contact us to discuss how we can support your projects seamlessly.',
                                            },
                                            {
                                                id: 'collapseFive',
                                                question: 'What do I need to give you to get started?',
                                                answer: 'To get started, provide us with your project brief, brand guidelines, any existing assets (like logos or wireframes), and your goals. We’ll take it from there to create a tailored solution.',
                                            },
                                            {
                                                id: 'collapseSix',
                                                question: 'How does the agile manifesto address planning?',
                                                answer: 'The Agile Manifesto emphasizes adaptive planning, encouraging iterative development and continuous feedback to ensure flexibility and alignment with evolving project needs.',
                                            },
                                            {
                                                id: 'collapseSeven',
                                                question: 'What is a statement of work in project management?',
                                                answer: 'A Statement of Work (SOW) is a document that outlines the project’s scope, deliverables, timeline, and responsibilities, serving as a clear agreement between the client and the service provider.',
                                            },
                                            {
                                                id: 'collapseEight',
                                                question: 'How to become an agile project manager?',
                                                answer: 'To become an Agile project manager, gain experience in project management, learn Agile methodologies (like Scrum or Kanban), earn certifications (e.g., PMI-ACP or Certified ScrumMaster), and develop skills in leadership and collaboration.',
                                            },
                                        ].map((faq, index) => (
                                            <div key={index} className="accordion-item fade-anim" data-delay={0.30 + index * 0.15}>
                                                <h6 className="accordion-header">
                                                    <button
                                                        className={`accordion-button ${faq.expanded ? '' : 'collapsed'}`}
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target={`#${faq.id}`}
                                                        aria-expanded={faq.expanded ? 'true' : 'false'}
                                                        aria-controls={faq.id}
                                                    >
                                                        <span className="word-anim" data-delay={0.30 + index * 0.15}>{faq.question}</span>
                                                    </button>
                                                </h6>
                                                <div
                                                    id={faq.id}
                                                    className={`accordion-collapse collapse ${faq.expanded ? 'show' : ''}`}
                                                    data-bs-parent="#accordionExample"
                                                >
                                                    <div className="accordion-body">
                                                        <p className="move-anim" data-delay={0.45 + index * 0.15}>{faq.answer}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ServiceDetails;