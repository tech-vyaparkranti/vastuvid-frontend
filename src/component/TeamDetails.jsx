import React from 'react'

const TeamDetails = () => {
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
            ><i class="fa-solid fa-arrow-up"></i ></a>


            <div class="has-smooth" id="has_smooth"></div>
            <div id="smooth-wrapper">

                <div id="smooth-content">
                    <section
                        class="quanto-team-details-section section-padding-top-bottom overflow-hidden"
                    >
                        <div class="container custom-container">
                            <div class="row g-4 justify-content-between">
                                <div class="col-xl-6 col-xxl-5">
                                    <div class="team-details__thumb">
                                        <img
                                            src="./assets/images/team-details/team-details-thumb.png"
                                            alt="team-details__thumb"
                                            data-speed="0.8"
                                            class="w-100"
                                        />
                                    </div>
                                </div>
                                <div class="col-xl-6 col-xxl-6">
                                    <div class="team-details__content">
                                        <h2 class="member-title move-anim" data-delay="0.5">
                                            Audrey Tassel
                                        </h2>
                                        <h5 class="member-description move-anim" data-delay="0.7">
                                            Administrative & HR Assistant
                                        </h5>
                                        <div class="member-info">
                                            <p class="fade-anim" data-delay="0.8">
                                                Jassica Oliver is known for her ability to take a creative
                                                brief and run with it, coming back with fresh ideas and a
                                                perfectly built design file every time. From digital
                                                design to long-format layouts, she blends beautiful and
                                                intuitive with each project she touches. She also happens
                                                to be the queen of deadline-crushing, all while
                                                maintaining a can-do, Zen attitude that keeps the whole
                                                Statement team centered.
                                            </p>
                                            <p class="fade-anim" data-delay="1">
                                                When he’s not building strong alliances with other
                                                creatives, project managers and stakeholders alike, you’ll
                                                find him giving voice to client strategies with fresh,
                                                compelling concepts and delightfully clever messaging.
                                            </p>
                                        </div>
                                        <div class="member-contacts">
                                            <h5>
                                                <a href="mailto:audrey@tassel.com">audrey@tassel.com</a>
                                            </h5>
                                            <a href="tel:+18884567890">+1 888 456 7890</a>
                                        </div>
                                        <div class="member-social">
                                            <ul class="custom-ul">
                                                <li>
                                                    <a href="https://x.com" target="_blank">
                                                        <i class="fab fa-x-twitter"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://instagram.com" target="_blank">
                                                        <i class="fab fa-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://linkedin.com" target="_blank">
                                                        <i class="fab fa-linkedin"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://behance.net" target="_blank">
                                                        <i class="fab fa-behance"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://dribbble.com" target="_blank">
                                                        <i class="fab fa-dribbble"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <form class="w-100 team-details__message">
                                        <div class="row g-3 mb-4 fade-anim" data-delay="0.4">
                                            <div class="col-md-6">
                                                <input
                                                    type="text"
                                                    class="form-control"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div class="col-md-6">
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    placeholder="Enter e-mail address"
                                                />
                                            </div>
                                        </div>
                                        <div class="mb-4 mb-lg-5 fade-anim" data-delay="0.6">
                                            <textarea
                                                class="form-control"
                                                rows="9"
                                                placeholder="Write your message"
                                            ></textarea>
                                        </div>
                                        <button class="quanto-link-btn btn-pill bg-color-2">
                                            Submit
                                            <span>
                                                <i class="fa-solid fa-arrow-right arry1"></i>
                                                <i class="fa-solid fa-arrow-right arry2"></i>
                                            </span>
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>

        </>
    )
}

export default TeamDetails