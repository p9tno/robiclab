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


// https://github.com/peachananr/onepage-scroll/blob/master/README.md
$(document).ready(function() {

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
    // preloader();
    // setTimeout( ()=> preloader(),15000 )

    function openMobileNav() {
        $('.toggle').click(function(event) {
            console.log('Показ меню');
            $('.toggle__toggle').toggleClass('active');
            $('.header__nav').toggleClass('active');
            $('.header').toggleClass('nav-active');
            // $( 'body' ).toggleClass( 'nav-open' );

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
        });

        if (localStorage.getItem("theme") == "night") {
            $('input[name=themeCheckbox]').prop('checked', true);
            // body.className += " dark-theme";
            $( 'body' ).toggleClass('dark_theme');
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
            threshold: threshold
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


    function changeHeader() {
        const header = document.querySelector('.header');

        gsap.to(header, {
            scrollTrigger: {
                start: '-10px top',
                // end: 'bottom 3em',
                trigger: '.section_changeTheme',
                markers: true,
                onUpdate: ({ progress }) => {
                    // console.log(progress);
                    if (progress > 0 && progress < 1) {
                        header.classList.add('header_dark');
                    } else {
                        header.classList.remove('header_dark');
                    }
                }

            }
        });
    }
    // changeHeader();

    // scrollTop
    // $(document).ready(function(){
    //     //отменяем стандартную обработку нажатия по ссылке
    //     $(".toTop").on("click","a", function (event) {
    //         event.preventDefault();
    //         console.log('click');
    //         //забираем идентификатор блока с атрибута href
    //         let id  = $(this).attr('href'),
    //         //узнаем высоту от начала страницы до блока на который ссылается якорь
    //         top = $(id).offset().top;
    //         //анимируем переход на расстояние - top за 1500 мс
    //         $('body,html').animate({scrollTop: top}, 1500);
    //     });
    // });
    //
    // $(document).ready(function(){
    //     $(window).scroll(function(){
    //         if($(window).scrollTop()>500){
    //             $('.toTop').fadeIn(900)
    //         }else{
    //             $('.toTop').fadeOut(700)
    //         }
    //     });
    // });
    // end scrollTop



    // $('.modal').on('show.bs.modal', () => {
    //     let openedModal = $('.modal.in:not(.popapCalc)');
    //     if (openedModal.length > 0) {
    //         openedModal.modal('hide');
    //     }
    // });

    // function activeNav() {
    //     $('.menu-item').on('click', function() {
    //         $('.menu-item').removeClass('current-menu-item');
    //         $(this).addClass('current-menu-item');
    //     })
    // };
    // activeNav();

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


    // <div class="tabs-wrapper">
    //     <div class="tabs">
    //         <span class="tab">Вкладка 1</span>
    //         <span class="tab">Вкладка 2</span>
    //         <span class="tab">Вкладка 3</span>
    //     </div>
    //     <div class="tabs-content">
    //         <div class="tab-item">Содержимое 1</div>
    //         <div class="tab-item">Содержимое 2</div>
    //         <div class="tab-item">Содержимое 3</div>
    //     </div>
    // </div>

    // jQuery
    $('.tabs-wrapper').each(function() {
        let ths = $(this);
        ths.find('.tab-item').not(':first').hide();
        ths.find('.tab').click(function() {
            ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
            ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
        }).eq(0).addClass('active');
    });




    function uploadYoutubeVideoForModal() {
        if ( $( ".youtubeModal-js" ) ) {

            $( '.youtubeModal-js' ).on( 'click', function () {
                $('#modalVideo').modal('show');

                let wrapp = $( this ).closest( '.youtubeModal-js' );
                let videoId = wrapp.attr( 'id' );
                let iframe_url = "https://www.youtube.com/embed/" + videoId + "?autoplay=1&autohide=1";

                // доп параметры для видоса
                // if ( $( this ).data( 'params' ) ) iframe_url += '&' + $( this ).data( 'params' );

                // Высота и ширина iframe должны быть такими же, как и у родительского блока
                let iframe = $( '<iframe/>', {
                    'frameborder': '0',
                    'src': iframe_url,
                    'allow': "autoplay"
                } )
                $(".modalVideo__wraper").append(iframe);

                $("#modalVideo").on('hide.bs.modal', function () {
                    $(".modalVideo__wraper").html('');
                });

            } );
        }
    };
    uploadYoutubeVideoForModal();


    $(function(){
        $(".tel").mask("+7 999 999 999 999");
    });



    function moveSectionUpSinglePage() {

        $('.following-single-js').click(function(event) {
            console.log('moveSectionUpSinglePage');

        });
    }
    moveSectionUpSinglePage();

    // scrollTop
    // $(document).ready(function(){
    //     //отменяем стандартную обработку нажатия по ссылке
    //     $(".toTop").on("click","a", function (event) {
    //         event.preventDefault();
    //         //забираем идентификатор блока с атрибута href
    //         let id  = $(this).attr('href'),
    //         //узнаем высоту от начала страницы до блока на который ссылается якорь
    //         top = $(id).offset().top;
    //         //анимируем переход на расстояние - top за 1500 мс
    //         $('body,html').animate({scrollTop: top}, 1500);
    //     });
    // });
    //
    // $(document).ready(function(){
    //     $(window).scroll(function(){
    //         if($(window).scrollTop()>500){
    //             $('.toTop').fadeIn(900)
    //         }else{
    //             $('.toTop').fadeOut(700)
    //         }
    //     });
    // });

    // end scrollTop

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
