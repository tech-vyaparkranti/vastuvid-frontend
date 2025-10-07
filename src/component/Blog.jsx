import React from 'react'

const Blog = () => {
    return (
        <>

            <div class="cursor d-none d-lg-block"></div>

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
                        class="quanto-hero-blog-section section-padding-bottom overflow-hidden"
                    >
                        <div class="container custom-container">
                            <div class="row g-4">
                                <div class="col-lg-12 col-xxl-11">
                                    <div
                                        class="quanto-hero-blog__content move-anim"
                                        data-delay="0.45"
                                    >
                                        <h1 class="title">Explore latest news and insights</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        class="quanto-blog-section section-padding-bottom overflow-hidden"
                    >
                        <div class="container custom-container">
                            <div class="row gx-4 gy-5">
                                <div class="col-md-6 col-lg-4">
                                    <div
                                        class="quanto-blog-box fade-anim"
                                        data-delay="0.30"
                                        data-direction="right"
                                    >
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-1.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >Reveal business opportunities with our five point brand
                                                    audit</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div
                                        class="quanto-blog-box fade-anim"
                                        data-delay="0.45"
                                        data-direction="right"
                                    >
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-2.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >Quanto agency revolutionizes work with the power of
                                                    ai-driven</a >
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="quanto-blog-box fade-anim" data-delay="0.60">
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-3.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >How young leaders can take charge of their professional
                                                    growth</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div
                                        class="quanto-blog-box fade-anim"
                                        data-delay="0.30"
                                        data-direction="right"
                                    >
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-4.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >Accessible and Inclusive Design: Welcoming All Users</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div
                                        class="quanto-blog-box fade-anim"
                                        data-delay="0.45"
                                        data-direction="right"
                                    >
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-5.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >Common UX pain in design related projects you must
                                                    know</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="quanto-blog-box fade-anim" data-delay="0.60">
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-6.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >How to bring fold to your startup company with
                                                    Quanto</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div
                                        class="quanto-blog-box fade-anim"
                                        data-delay="0.30"
                                        data-direction="right"
                                    >
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-7.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >Simple guide to retrieval auto generated read content
                                                    models</a >
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div
                                        class="quanto-blog-box fade-anim"
                                        data-delay="0.45"
                                        data-direction="right"
                                    >
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-8.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >How to manage a talented and successful design team</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-6 col-lg-4">
                                    <div class="quanto-blog-box fade-anim" data-delay="0.60">
                                        <div class="quanto-blog-thumb">
                                            <a href="./blog-details.html">
                                                <img
                                                    src="./assets/images/blog/blog-thumb-9.png"
                                                    alt="blog-thumb"
                                                />
                                            </a>
                                        </div>
                                        <div class="quanto-blog-content">
                                            <h5 class="line-clamp-2">
                                                <a href="./blog-details.html"
                                                >We are on the quest for exceptional talent to join our
                                                    team</a>
                                            </h5>
                                            <span class="quanto-blog-date">March 8, 2024</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row row-padding-top">
                                <div class="col-12">
                                    <div class="blog-pagination">
                                        <nav aria-label="Page navigation example">
                                            <ul
                                                class="pagination justify-content-end align-items-center custom-ul"
                                            >
                                                <li class="page-item">
                                                    <a class="page-link" href="#">1</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link" href="#">2</a>
                                                </li>
                                                <li class="page-item">
                                                    <a class="page-link next" href="#">
                                                        Next
                                                        <i class="fa-solid fa-arrow-right"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

        </>
    )
}

export default Blog
