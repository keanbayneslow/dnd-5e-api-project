document.addEventListener('DOMContentLoaded', function () {

    const characterLink = document.getElementById('characterLink');
    const searchLink = document.getElementById('searchLink');
    const landingSection = document.getElementById('landingSection');
    const characterSection = document.getElementById('characterSection');
    const searchSection = document.getElementById('searchSection');

    characterLink.addEventListener('click', () => {
        landingSection.style.display = 'none';
        characterSection.style.display = 'block';
        searchSection.style.display = 'none';
    });

    searchLink.addEventListener('click', () => {
        landingSection.style.display = 'none';
        characterSection.style.display = 'none';
        searchSection.style.display = 'block';
    });

});