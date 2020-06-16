let menuShowButton = document.getElementById('menu-show-button')
let menuCloseButton = document.getElementById('menu-close-button')
let resumeItems = document.querySelector('.resume-items')

menuShowButton.addEventListener('click', () => resumeItems.classList.toggle('show'))

menuCloseButton.addEventListener('click', () => resumeItems.classList.toggle('show'))