document.addEventListener('DOMContentLoaded', function () {

    const characterLink = document.getElementById('characterLink');
    const searchLink = document.getElementById('searchLink');
    const savedLink = document.getElementById('savedLink')
    const landingSection = document.getElementById('landingSection');
    const landingLink = document.getElementById('landingLink');
    const characterSection = document.getElementById('characterSection');
    const savedCharacters = document.getElementById('savedCharacters');
    const searchSection = document.getElementById('searchSection');
    const footer = document.getElementById('footer');


    characterLink.addEventListener('click', () => {
        landingSection.style.display = 'none';
        characterSection.style.display = 'block';
        savedCharacters.style.display = 'none';
        searchSection.style.display = 'none';
        footer.style.display = 'none';
    });

    savedLink.addEventListener('click', () => {
        landingSection.style.display = 'none';
        characterSection.style.display = 'none';
        savedCharacters.style.display = 'block';
        searchSection.style.display = 'none';
        footer.style.display = 'none';
    });

    searchLink.addEventListener('click', () => {
        landingSection.style.display = 'none';
        characterSection.style.display = 'none';
        savedCharacters.style.display = 'none';
        searchSection.style.display = 'block';
        footer.style.display = 'none';
    });

    landingLink.addEventListener('click', () => {
        landingSection.style.display = 'block';
        characterSection.style.display = 'none';
        savedCharacters.style.display = 'none';
        searchSection.style.display = 'none';
        footer.style.display = 'block';
    });

});