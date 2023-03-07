var app = {
    pageScroll: '',
    lgWidth: 1200,
    mdWidth: 992,
    smWidth: 768,
    resized: false,
    iOS: function () {
        return navigator.userAgent.match( /iPhone|iPad|iPod/i );
    },
    touchDevice: function () {
        return navigator.userAgent.match( /iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile/i );
    }
};

function isLgWidth() {
    return $( window ).width() >= app.lgWidth;
} // >= 1200
function isMdWidth() {
    return $( window ).width() >= app.mdWidth && $( window ).width() < app.lgWidth;
} //  >= 992 && < 1200
function isSmWidth() {
    return $( window ).width() >= app.smWidth && $( window ).width() < app.mdWidth;
} // >= 768 && < 992
function isXsWidth() {
    return $( window ).width() < app.smWidth;
} // < 768
function isIOS() {
    return app.iOS();
} // for iPhone iPad iPod
function isTouch() {
    return app.touchDevice();
} // for touch device


window.onload = function() {
    console.log('wonload');
    function preloader() {
        $(()=>{
            setTimeout( () => {
                let p = $('#preloader');
                p.addClass('hide');

                setTimeout( () => {
                    p.remove()
                },1000);

            },1000);
        });
    }
    preloader();
    // setTimeout( ()=> preloader(),15000 )
}

// https://github.com/peachananr/onepage-scroll/blob/master/README.md
$(document).ready(function() {
    console.log('ready');

    function toggleContent() {
        $('.header__button').click(function() {
            let wrap = $(this).closest('.header__action');
            let toggle = wrap.find('.header__button');
            let content = wrap.find('.header__content');
            let close = wrap.find('.header__close');
            content.toggleClass('active');
            toggle.toggleClass('active');
            // $('.header__button').removeClass('active');
            close.click(function () {
                content.removeClass('active');
                toggle.removeClass('active');
            })
        });
    };
    toggleContent();

    $(document).mouseup(function (e) {
        let div = $(".header__content");
        // если клик был не по нашему блоку и не по его дочерним элементам
        if (!div.is(e.target) && div.has(e.target).length === 0) {
            div.removeClass('active');
            $('.header__button').removeClass('active');
        }
    });



    function openMobileNav() {
        $('.toggle').click(function(event) {
            console.log('Показ меню');
            $('.toggle__toggle').toggleClass('active');
            $('.header__nav').toggleClass('active');
            $('.header').toggleClass('nav-active');
            $( 'body' ).toggleClass( 'nav-open' );

            if ($('header').hasClass('header_primary')) {
                $( 'header' ).toggleClass( 'header_primary_active' );
            }

            $('.close_nav_js').toggleClass('active');
            $('.open_nav_js').toggleClass('active');
        });
    };
    openMobileNav();

    function showModal() {
        $('.show_js').on('click', function (e) {
            e.preventDefault();
            let id  = $(this).attr('href');

            $(id).modal('show');
        });

        $('.modal').on('show.bs.modal', () => {
            let openedModal = $('.modal');
            if (openedModal.length > 0) {
                openedModal.modal('hide');
            }
        });

    }
    showModal();




    function changeTheme() {
        $('input[name=themeCheckbox]').change(function() {
            if ($(this).is(':checked')) {
                // console.log("Checkbox is checked..");
                localStorage.setItem("theme", "night");
                // console.log(localStorage.getItem("theme"));
                $('input[name=themeCheckbox]').prop('checked', true);
            } else {
                // console.log("Checkbox is not checked..");
                localStorage.setItem("theme", "day");
                $('input[name=themeCheckbox]').prop('checked', false);
                // lottie.play('chart-Desctop');
            }
            $( 'body' ).toggleClass('dark_theme');
            $( 'html' ).toggleClass('dark_theme');
        });

        if (localStorage.getItem("theme") == "night") {
            $('input[name=themeCheckbox]').prop('checked', true);
            // body.className += " dark-theme";
            $( 'body' ).toggleClass('dark_theme');
            $( 'html' ).toggleClass('dark_theme');
        }
    }
    changeTheme();

    function initAnimationDevaice() {
        let chartDesctop = bodymovin.loadAnimation({
            container: document.getElementById('chartDesctop'), // Required
            path: '../json/desctop.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: false, // Optional
            name: "chart-desctop",
        })

        let chartDesctopDark = bodymovin.loadAnimation({
            container: document.getElementById('chartDesctopDark'), // Required
            path: '../json/desctop_dark.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: false, // Optional
            name: "chart-desctop-dark",
        })

        let chartMobile = bodymovin.loadAnimation({
            container: document.getElementById('chartMobile'), // Required
            path: '../json/mobile.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: false, // Optional
            name: "chart-mobile",
        })

        let chartMobileDark = bodymovin.loadAnimation({
            container: document.getElementById('chartMobileDark'), // Required
            // path: '../json/mobile_dark.json', // Required
            path: '../json/mobile_dark_2.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: false, // Optional
            name: "chart-mobile-dark",
        })

    }
    initAnimationDevaice();


    function onVisible( selector, callback, playback, threshold=[0.5] ) {
        let options = {
            threshold: threshold,
             // rootMargin: "-1px",
        };
        let observer = new IntersectionObserver( onEntry, options );
        let elements = document.querySelectorAll( selector );
        // let play = selector.querySelector('.video__play');
        for ( let elm of elements ) {
            observer.observe( elm );
        }
        function onEntry( entry ) {
            entry.forEach( change => {
                let elem = change.target;
                let frame = elem.querySelector('iframe');

                if ( change.isIntersecting ) {
                    // console.log('show', elem);
                    // console.log('show chart');
                    callback(elem);
                } else {
                    // console.log('hidden', elem);
                    // console.log('hidden chart');
                    playback(elem);
                }
            } );
        }
    }

    onVisible('.chart',playDigitalLab,stopDigitalLab);

    function stopDigitalLab() {
        // console.log('stop Digital Lab');
        lottie.stop('chart-desctop');
        lottie.stop('chart-desctop-dark');
        lottie.stop('chart-mobile');
        lottie.stop('chart-mobile-dark');
    }

    function playDigitalLab() {
        // console.log('play Digital Lab');
        lottie.play('chart-desctop');
        lottie.play('chart-desctop-dark');
        lottie.play('chart-mobile');
        lottie.play('chart-mobile-dark');
    }

    function initAnimationButton() {
        let cor = bodymovin.loadAnimation({
            container: document.getElementById('cor'), // Required
            path: '../json/cor1.json', // Required
            renderer: 'svg', // Required
            loop: true, // Optional
            autoplay: false, // Optional
            // autoplay: true, // Optional
            name: "chart-cor",
        })
    }

    initAnimationButton();

    function stopAnimateButton() {
        // console.log('stop');
        lottie.stop('chart-cor');
    }
    function playAnimationButton() {
        // console.log('play');
        lottie.play('chart-cor');
    }
    onVisible('.firstscreen',playAnimationButton,stopAnimateButton);



    // function changeHeader() {
    //     const header = document.querySelector('.header');
    //
    //     gsap.to(header, {
    //         scrollTrigger: {
    //             start: '-10px top',
    //             // end: 'bottom 3em',
    //             trigger: '.section_changeTheme',
    //             markers: true,
    //             onUpdate: ({ progress }) => {
    //                 // console.log(progress);
    //                 if (progress > 0 && progress < 1) {
    //                     header.classList.add('header_dark');
    //                 } else {
    //                     header.classList.remove('header_dark');
    //                 }
    //             }
    //
    //         }
    //     });
    // }
    // changeHeader();




    function collapsed() {
        let toggle = $('[data-collapse]');

        toggle.on('click', function() {
            let id = $(this).data('collapse'),
            body = $('[data-collapse-body="'+id+'"]'),
            wrap = body.closest('[data-collapse-wrapper]');

            if (!id) {
                // $('[data-collapse-wrapper]').removeClass('open');
                body = $(this).parent().find('[data-collapse-body]');
                $(this).toggleClass('open');
                if ($(this).hasClass('open')) {
                    body.slideDown();
                } else {
                    body.slideUp();
                }
            } else if (id === 'all') {
                body.slideDown();
                toggle.addClass('open');
            } else {
                body.slideToggle();
                $(this).toggleClass('open');
            }
        });
    }
    collapsed();


    // function initTabs() {
    //     $('.tabs-wrapper').each(function() {
    //         let ths = $(this);
    //         let danger = $('.tab_danger');
    //         let wrap = $('.tabs');
    //
    //
    //         ths.find('.tab__item').not(':first').hide();
    //         ths.find('.tab').click(function() {
    //             ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
    //             ths.find('.tab__item').hide().eq($(this).index()).fadeIn();
    //
    //             if (danger.hasClass('active')) {
    //                 wrap.addClass('tabs_danger');
    //             } else {
    //                 wrap.removeClass('tabs_danger');
    //             }
    //
    //         }).eq(0).addClass('active');
    //
    //
    //     });
    // }
    // initTabs();

    function initTabs() {
      $('.tabs-wrapper').each(function() {
          let ths = $(this);
          ths.find('.tab-item').not(':first').hide();
          ths.find('.tab').click(function() {
              ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
              ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
          }).eq(0).addClass('active');
      });
  }
  initTabs();





    function uploaVideoForModal() {
        if ( $( ".videoModal_js" ) ) {

            $( '.videoModal_js' ).on( 'click', function () {
                $('#modalVideo').modal('show');
                console.log('click');

                let src = $(this).attr('data-src');
                console.log(src);


                // https://videojs.com/
                let video = $(`<video id="my-video" class="video-js" autoplay controls preload="auto"><source src="${src}" type="video/mp4" /></video>`)

                $(".modalVideo__wraper").append(video);

                $("#modalVideo").on('hide.bs.modal', function () {
                    $(".modalVideo__wraper").html('');
                });

            } );
        }
    };
    uploaVideoForModal();


    $(function(){
        $(".tel").mask("+7 999 999 999 999");
    });

    function followingScroll() {
        $(".following-single-js").on("click", function (event) {
            event.preventDefault();
            let id  = $(this).attr('href');
            let top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 700);
        });
    }
    followingScroll()

    function scrollTop() {
        $(".toTop").on("click","a", function (event) {
            event.preventDefault();
            let id  = $(this).attr('href');
            let top = $(id).offset().top;
            $('body,html').animate({scrollTop: top}, 700);
        });

        $(window).scroll(function(){
            if($(window).scrollTop()>500){
                $('.toTop').fadeIn(900)
            }else{
                $('.toTop').fadeOut(700)
            }
        });
    }
    scrollTop()

    function addDataFancybox() {
        let item = $('.itemForDataFancybox_js');
        let num = 0;

        item.each(function(index, el) {
            $(this).find('a').attr('data-fancybox', num);
            num++;
        });
    }
    // addDataFancybox();

    // $('[data-fancybox]').fancybox({
    //     loop: true,
    //     // autoFocus: false,
    //     infobar: false,
    //     toolbar: false,
    //     smallBtn: true,
    //
    // });

    // $('[data-fancybox]').fancybox({
    //     beforeLoad: function () {
    //         /* код */
    //     }
    // });

    // https://github.com/michalsnik/aos
    AOS.init({
        disable: 'mobile',
        // anchorPlacement: 'bottom-bottom',
        duration: 1000, // values from 0 to 3000, with step 50ms
        // offset: 20,
        // once: true,
    });

    AOS.init({
        disable: function () {
            var maxWidth = 768;
            return window.innerWidth < maxWidth;
        }
    });





    function showMore(classItem, btn) {
        let start = 4;
        let show = 2;

        let item = $(''+ classItem +'');
        let count = item.length;

        item.addClass('d-none');

        $('' + classItem + ':lt(' + start + ')').removeClass('d-none');
        $('' + classItem + ':nth-child('+start+')').addClass('bd_none');

        $(btn).click(function(e) {
            e.preventDefault();
            $(this).addClass('loading');

            let load = $(this).data('load');
            let more = $(this).data('more');

            start = (start + show <= count) ? start + show : count;

            $(this).text(load);

            setTimeout(() => {
                $(''+ classItem +':lt(' + start + ')').removeClass('d-none bd_none');


                if ($(''+ classItem +':not(.d-none)').length == count) {
                    $(this).parent().remove();
                }

                $(this).removeClass('loading');
                $(this).text(more);
            }, 500);
        });
    }

    // showMore('.cost__item', '.show_more_js');
    // showMore('.reviews__item', '.show_reviews_js');


})
