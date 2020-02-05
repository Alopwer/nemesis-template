import { tns } from '~node/tiny-slider/src/tiny-slider'
function createSlider() {
    const slider = tns({
        container: '.slider',
        items: 1,
        controls: false,
        controlsContainer: '.slider-controls',
        prevButton: '.slider-controls__left',
        nextButton: '.slider-controls__right',
        navContainer: '.slider-nav',
        startIndex: 1,
        responsive: {
            992: {
                controls: true
            }
        }
    })
}

createSlider()