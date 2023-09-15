function displaySavedCharacterAsCard(characterData) {
    const savedCharacterList = document.getElementById('savedCharacterList');
    const card = document.createElement('div');
    card.classList.add('character-card');

    // Remove the "Re-Roll" buttons from the attributes
    const attributesWithoutReRoll = characterData.attributes.replace(/<button.*?Re-Roll<\/button>/g, '');

    card.innerHTML = `
        <h3>${characterData.name}</h3>
        <div class="attributes">
            ${attributesWithoutReRoll}
        </div>
        <button class="deleteCharacterButton" data-id="${characterData.id}">Delete</button>
    `;

    card.querySelector('.deleteCharacterButton').addEventListener('click', () => {
        deleteCharacter(characterData.id);
        card.remove();
    });


    savedCharacterList.appendChild(card);
}

async function deleteCharacter(characterId) {
    try {
        const response = await fetch(`/api/characters/${characterId}`, {
            method: 'DELETE',
        });

    } catch (error) {
        console.error(`Error while deleting character: ${error}`);
    }
}

document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('deleteCharacterButton')) {
        const characterId = target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this character?')) {
            deleteCharacter(characterId);
            target.closest('.character-card').remove();
        }
    }

});