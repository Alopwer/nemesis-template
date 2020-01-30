const wrapper = document.querySelector('.header__menu')
const link = document.querySelectorAll('.header__nav-link') 

function menuAction(action) {
    const nav = document.querySelector('.header__nav')
    const body = document.querySelector('body')
    const menu = document.querySelector('.menu__icon')

    if (action) {
        menu.classList.toggle('menu__icon_active')
        nav.classList.toggle('header__nav_active')
        body.classList.toggle('lock')
    } else {
        menu.classList.remove('menu__icon_active')
        nav.classList.remove('header__nav_active')
        body.classList.remove('lock')
    }
}

wrapper.onclick = function() {
    menuAction(true)
}
link.forEach(link => link.addEventListener('click', () => {
    menuAction(false)
}))