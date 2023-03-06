//Дождёмся загрузки API и готовности DOM.
ymaps.ready(init);

function init() {
    // let result = document.getElementById('result'), // для отладки

    destinations = {
        'robiclab': [59.891376287271626,30.33715034903524]
    },

    myMap = new ymaps.Map('map', {
        center: destinations['robiclab'],
        zoom: 16
    });


    let windowWidth = $(this).innerWidth();
    let mediaQuerySize = 767;
    let imgSize = [100, 100];
    let imgOfSize = [-60, -40];

    let imgSizeSm = [50, 50];
    let imgOfSizeSm = [-20, -40];

    // console.log(windowWidth);
    if (windowWidth <= mediaQuerySize) {
        // console.log('sm');
        imgSize = imgSizeSm;
        imgOfSize = imgOfSizeSm;

    } else {
        // console.log('lg');
    }





    let placemark = new ymaps.Placemark(destinations[['robiclab']], {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/mark.svg',
        iconImageSize: imgSize,
        iconImageOffset: imgOfSize,
    });

    myMap.geoObjects.add(placemark);




    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    //myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    // все ок
    // result.textContent = 'map init:';


}
