const darkButton = document.querySelector('#darkBtn');
const main = document.querySelector('main');
const cardSection = document.querySelector('.card');

darkButton.addEventListener('click', () => {
    main.classList.toggle('dark');
    cardSection.classList.toggle('dark');
});