import React from 'react'

const PortfolioDetails = () => {
    return (
        <>



            {/* <div class="preloader">
                <div class="spinner-wrap">
                    <div class="preloader-logo">
                        <img src="assets/images/preloader.svg" alt="" class="img-fluid" />
                    </div>
                    <div class="spinner"></div>
                </div>
            </div> */}


            <a href="#" id="scroll-top" class="back-to-top-btn"
            ><i class="fa-solid fa-arrow-up"></i></a>



            <div class="has-smooth" id="has_smooth"></div>
            <div id="smooth-wrapper">

                <div id="smooth-content">
                    <section
                        class="quanto-hero-common-section section-padding-bottom overflow-hidden"
                    >
                        <div class="container custom-container">
                            <div class="row g-4">
                                <div class="col-lg-12 col-xxl-11">
                                    <div
                                        class="quanto-hero-common__content move-anim"
                                        data-delay="0.45"
                                    >
                                        <h1 class="title">Hopscotch Payments</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <div class="quanto-image-area style-2 overflow-hidden">
                        <div class="container custom-container position-relative">
                            <a
                                href="#quanto-portfolio-details-section"
                                class="scroll-down section-link"
                            >
                                Scroll down
                                <img
                                    src="./assets/images/icons/scroll-down.svg"
                                    alt="Scroll down"
                                />
                            </a>
                            <div class="row">
                                <div class="col-12">
                                    <div class="quanto-hero__thumb text-end">
                                        <img
                                            src="./assets/images/portfolio-details/portfolio-details-thumb.png"
                                            alt="Image Area"
                                            data-speed="0.8"
                                            class="d-block w-100"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div
                        id="quanto-portfolio-details-section"
                        class="quanto-portfolio-details-section section-padding-top-bottom"
                    >
                        <div class="container custom-container">
                            <div class="row g-4 justify-content-between">
                                <div class="col-lg-4">
                                    <h2
                                        class="portfolio-details__title move-anim"
                                        data-delay="0.45"
                                    >
                                        Project overview
                                    </h2>
                                </div>
                                <div class="col-lg-6">
                                    <div class="portfolio-details__content">
                                        <p class="move-anim" data-delay="0.45">
                                            Tasked with revamping the branding and corporate website for
                                            Bit Weaver Studio, a forward-thinking creative agency, our
                                            team delved deep into their ethos, distilling their essence
                                            into a kaleidoscope of colors, shapes, and narratives.
                                            Seamlessly blending innovative design with user-centric
                                            functionality, we transformed their online presence into an
                                            immersive journey, reflecting their diverse talents and
                                            imaginative approach. From the fluidity of the logo to the
                                            intricacies of the interface, every element was meticulously
                                            crafted, resulting in a captivating showcase of Reimagining
                                            Reality creativity and our studio's design finesse.
                                        </p>
                                        <p class="portfolio-text move-anim" data-delay="0.45">
                                            This package is ideal for businesses aiming to launch new
                                            products, enhance existing ones, or establish competitive
                                            edge in their industry. By combining thoughtful design,
                                            strategic innovation, and a user-first approach, we create
                                            products.
                                        </p>
                                        <a class="quanto-link-btn" href="index.html"
                                        >Visit live website
                                            <span>
                                                <i class="fa-solid fa-arrow-right arry1"></i>
                                                <i class="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </a>
                                    </div>
                                    <div class="portfolio-details__info row-padding-top">
                                        <div class="portfolio-details-box fade-anim" data-delay="0.2">
                                            <span class="title">Category</span>
                                            <h6 class="info">Branding</h6>
                                        </div>
                                        <div class="portfolio-details-box fade-anim" data-delay="0.4">
                                            <span class="title">Service</span>
                                            <h6 class="info">Brand Strategy</h6>
                                        </div>
                                        <div class="portfolio-details-box fade-anim" data-delay="0.6">
                                            <span class="title">Date</span>
                                            <h6 class="info">March 6, 2024</h6>
                                        </div>
                                        <div class="portfolio-details-box fade-anim" data-delay="0.8">
                                            <span class="title">Client</span>
                                            <h6 class="info">MirrorTheme</h6>
                                        </div>
                                        <div class="portfolio-details-box fade-anim" data-delay="1">
                                            <span class="title">Software</span>
                                            <h6 class="info">Webflow, Figma</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row g-3 g-lg-4 section-padding-top">
                                <div class="col-sm-6 overflow-hidden">
                                    <img
                                        src="./assets/images/portfolio-details/portfolio-details-fig-1.png"
                                        alt="portfolio-details-fig"
                                        data-speed="0.8"
                                        class="w-100"
                                    />
                                </div>
                                <div class="col-sm-6 overflow-hidden">
                                    <img
                                        src="./assets/images/portfolio-details/portfolio-details-fig-2.png"
                                        alt="portfolio-details-fig"
                                        data-speed="0.8"
                                        class="w-100"
                                    />
                                </div>
                                <div class="col-12 overflow-hidden">
                                    <img
                                        src="./assets/images/portfolio-details/portfolio-details-fig-3.png"
                                        alt="portfolio-details-fig"
                                        data-speed="0.8"
                                        class="w-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default PortfolioDetails
