const wrapper = document.querySelector('.header__menu')
const nav = document.querySelector('.header__nav')
const body = document.querySelector('body')
wrapper.onclick = function() {
    const menu = document.querySelector('.menu__icon')
    menu.classList.toggle('menu__icon_active')
    nav.classList.toggle('header__nav_active')
    body.classList.toggle('lock')
}