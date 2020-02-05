const wrapper = document.querySelector('.header-menu')
const link = document.querySelectorAll('.header-list__link') 

function menuAction(action) {
    const nav = document.querySelector('.header-nav')
    const body = document.querySelector('body')
    const menu = document.querySelector('.header-menu__icon')

    if (action) {
        menu.classList.toggle('header-menu__icon_active')
        nav.classList.toggle('header-nav_active')
        body.classList.toggle('lock')
    } else {
        menu.classList.remove('header-menu__icon_active')
        nav.classList.remove('header-nav_active')
        body.classList.remove('lock')
    }
}

wrapper.onclick = function() {
    menuAction(true)
}
link.forEach(link => link.addEventListener('click', () => {
    menuAction(false)
}))