$(document).ready(function() {
    $(".main_scroll").onepage_scroll({
        sectionContainer: ".section_scrool",     // sectionContainer accepts any kind of selector in case you don't want to use section
        easing: "ease",                  // Easing options accepts the CSS3 easing animation such "ease", "linear", "ease-in",
        // "ease-out", "ease-in-out", or even cubic bezier value such as "cubic-bezier(0.175, 0.885, 0.420, 1.310)"
        animationTime: 800,             // AnimationTime let you define how long each section takes to animate
        pagination: true,                // You can either show or hide the pagination. Toggle true for show, false for hide.
        // updateURL: false,                // Toggle this true if you want the URL to be updated automatically when the user scroll to each page.
        beforeMove: function(index) {
            // console.log('beforeMove init, index: ', index);

        },  // This option accepts a callback function. The function will be called before the page moves.
        afterMove: function(index) {
            // console.log('afterMove init, index: ', index);

            if (index > 2) {
                $('.toTop').fadeIn(900);
            } else {
                $('.toTop').fadeOut(700);
            };

            addClassAnimate(index);

        },   // This option accepts a callback function. The function will be called after the page moves.
        loop: false,                     // You can have the page loop back to the top/bottom when the user navigates at up/down on the first/last page.
        keyboard: true,                  // You can activate the keyboard controls
        responsiveFallback: 768,        // You can fallback to normal page scroll by defining the width of the browser in which
        // you want the responsive fallback to be triggered. For example, set this to 600 and whenever
        // the browser's width is less than 600, the fallback will kick in.
        direction: "vertical"            // You can now define the direction of the One Page Scroll animation. Options available are "vertical" and "horizontal". The default value is "vertical".
    });

    function toTopScroll() {
        $(".toTopSlide-js").on("click","a", function (event) {
            event.preventDefault();
            console.log('click');
            $(".main").moveTo(1);
        })
    }
    toTopScroll();

    function addClassAnimate(index) {
        $('.animate-js').removeClass('aos-animate')
        let wrap = $(".section_scrool[data-index='"+index+"']");
        let animate = wrap.find('.animate-js');
        animate.addClass('aos-animate');
    }

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

    function moveSectionUp() {

        $('.following-js').click(function(event) {
            console.log('Показ меню');
            // $(".main_scroll").moveUp();
            $(".main_scroll").moveDown();

        });
    }
    moveSectionUp();






});
