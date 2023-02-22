$(document).ready(function() {


    const composition = new Swiper('.composition_slider_js', {
        speed: 500,
        autoplay: {
            delay: 5000,
        },
        lazy: true,
        slidesPerView: 1,
        spaceBetween: 10,
        // loop: true,


        navigation: {
          nextEl: ".icon_slider_right",
          prevEl: ".icon_slider_left",
        },

        pagination: {
            el: '.composition__dotted',
            clickable: true,
            dynamicBullets: true,
        },

        scrollbar: {
         el: ".swiper-scrollbar",
        },

        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },

    });

    const row = new Swiper('.row_slider_js', {
        speed: 500,
        // autoplay: {
        //     delay: 5000,
        // },
        // lazy: true,
        slidesPerView: 5,
        spaceBetween: 30,
        // loop: true,


        navigation: {
          nextEl: ".icon_slider_right",
          prevEl: ".icon_slider_left",
        },

        // pagination: {
        //     el: '.composition__dotted',
        //     clickable: true,
        //     dynamicBullets: true,
        // },

        scrollbar: {
         el: ".swiper-scrollbar",
        },

        pagination: {
          el: ".swiper-pagination",
          type: "fraction",
        },

    });

    // const indications = new Swiper('.indications-swiper-js', {
    //     speed: 500,
    //     slidesPerView: 1,
    //     scrollbar: {
    //        el: ".swiper-scrollbar",
    //        // hide: true,
    //     },
    //
    //     breakpoints: {
    //         768: {
    //             spaceBetween: 20,
    //             slidesPerView: 2,
    //         },
    //     }
    // });

    // const beforeAfter = new Swiper('.beforeAfter-swiper-js', {
    //     speed: 500,
    //     slidesPerView: 1,
    //     scrollbar: {
    //        el: ".swiper-scrollbar",
    //        // hide: true,
    //     },
    //
    //     breakpoints: {
    //         768: {
    //             spaceBetween: 68,
    //             // spaceBetween: 5,
    //             slidesPerView: 2,
    //         },
    //     }
    // });

    // const signup = new Swiper('.signup-swiper-js', {
    //     speed: 500,
    //     slidesPerView: 1,
    //     spaceBetween: 10,
    //     scrollbar: {
    //        el: ".swiper-scrollbar",
    //        // hide: true,
    //     },
    //
    //     breakpoints: {
    //         768: {
    //             spaceBetween: 40,
    //             // spaceBetween: 5,
    //             slidesPerView: 2,
    //         },
    //     }
    // });

    // const stage = new Swiper('.stage-swiper-js', {
    //     speed: 500,
    //     slidesPerView: 1,
    //     spaceBetween: 20,
    //     scrollbar: {
    //        el: ".swiper-scrollbar",
    //        // hide: true,
    //     },
    //
    //     breakpoints: {
    //         768: {
    //             spaceBetween: 40,
    //             slidesPerView: 3,
    //         },
    //     }
    // });

});
