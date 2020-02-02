import { tns } from '~node/tiny-slider/src/tiny-slider'
function createSlider() {
    // const sliderItem = document.querySelector('.slider__item')
    const slider = tns({
        container: '.slider',
        items: 1,
        controls: false,
        controlsText: ['<', '>'],
        controlsContainer: '.content__slider-controls',
        navContainer: '.content__slider-nav',
        startIndex: 1,
        responsive: {
            992: {
                controls: true
            }
        }
    })
}

createSlider()