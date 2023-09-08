function displaySavedCharacterAsCard(characterData) {
    const savedCharacterList = document.getElementById('savedCharacterList');
    const card = document.createElement('div');
    card.classList.add('character-card'); 

    card.innerHTML = `
        <h3>${characterData.name}</h3>
        <div class="attributes">
            ${characterData.attributes}
        </div>
        <button class="viewCharacterButton" data-id="${characterData.id}">View Details</button>
    `;

    card.querySelector('.viewCharacterButton').addEventListener('click', () => {
        displayCharacterDetails(characterData);
    });

    savedCharacterList.appendChild(card);
}