
$(document).ready(function() {

    console.log('laboratory');


    function initLabImage() {
        let preview1 = bodymovin.loadAnimation({
            container: document.getElementById('preview1'), // Required
            path: '../json/preview1.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            // autoplay: false, // Optional
            autoplay: false, // Optional
            name: "preview1",
        })
        let preview2 = bodymovin.loadAnimation({
            container: document.getElementById('preview2'), // Required
            path: '../json/preview2.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "preview2",
        })
        let preview3 = bodymovin.loadAnimation({
            container: document.getElementById('preview3'), // Required
            path: '../json/preview3.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "preview3",
        })
        let preview4 = bodymovin.loadAnimation({
            container: document.getElementById('preview4'), // Required
            path: '../json/preview4.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "preview4",
        })
        let preview5 = bodymovin.loadAnimation({
            container: document.getElementById('preview5'), // Required
            path: '../json/preview5.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "preview5",
        })
        let preview6 = bodymovin.loadAnimation({
            container: document.getElementById('preview6'), // Required
            path: '../json/preview6.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "preview6",
        })
        let preview7 = bodymovin.loadAnimation({
            container: document.getElementById('preview7'), // Required
            path: '../json/preview7.json', // Required
            renderer: 'svg', // Required
            loop: false, // Optional
            autoplay: false, // Optional
            name: "preview7",
        })



    }
    initLabImage();



    let total = 0;

    $('.laboratory__page').each(function(indexInArray, valueOfElement) {
        let questionBlock = indexInArray + 1
        $(this).attr('data-p', questionBlock);
        total = total + 1;
        $('.laboratory__step_total').text(total);
    });

    let lineStep = 100 / total;
    let line;
    let pageNumber = 1;

    console.log('total: ', total);
    console.log('pageNumber: ', pageNumber);

    // lineWidth();

    $('.laboratory__arrow_next').click(function() {

        $('.laboratory__arrow_prew').css('display', 'flex');

        if (pageNumber < total) {
            pageNumber++;
            changeActivePage();
            playLottie();
            lineWidth();
            changeButtonNext();
        }
    });

    $('.laboratory__arrow_prew').click(function() {
        if (pageNumber > 2) {
            pageNumber--;

            changeActivePage();
            changeButtonNext();


        } else if (pageNumber == 2) {
            pageNumber--;
            changeActivePage();
            $('.laboratory__arrow_prew').hide();
        }
        playLottie();
        lineWidth()
    });

    function changeActivePage() {
        $('.laboratory__page.active').hide();
        $('.laboratory__page.active').removeClass('active');
        $('.laboratory__page[data-p=' + pageNumber + ']').fadeIn('slow')
        $('.laboratory__page[data-p=' + pageNumber + ']').addClass('active');
    }


    function lineWidth() {
        $('.laboratory__step_current').text(pageNumber);
        line = lineStep * (pageNumber);
        line = 'calc(' + line + '% )';
        $('.laboratory__line_bg').css('width', line)
    }

    function playLottie() {
        let id = $('.laboratory__page[data-p=' + pageNumber + ']').find('.preview').attr('id');
        console.log(id);
        lottie.stop();
        setTimeout(() => {
            lottie.play(id);
        }, 500);
    }

    function changeButtonNext() {
        if (pageNumber == total) {
            $('.laboratory__arrow_next').removeClass('active');
        } else {
            $('.laboratory__arrow_next').addClass('active')
        }
    }


});
