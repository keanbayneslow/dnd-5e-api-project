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
        <button class="copyCharacterButton">Copy to Clipboard</button>
    `;

    card.querySelector('.deleteCharacterButton').addEventListener('click', () => {
        deleteCharacter(characterData.id);
        card.remove();
    });

    card.querySelector('.copyCharacterButton').addEventListener('click', () => {
        copyToClipboard(characterData.attributes);
    });

    savedCharacterList.appendChild(card);
}

async function deleteCharacter(characterId) {
    try {
        const response = await fetch(`/api/characters/${characterId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Character with ID ${characterId} deleted successfully.`);
        } else {
            console.error(`Failed to delete character with ID ${characterId}.`);
        }
    } catch (error) {
        console.error(`Error while deleting character: ${error}`);
    }
}

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';

    document.body.appendChild(textArea);
    textArea.select();

    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Text copied to clipboard.');
        } else {
            console.error('Unable to copy text to clipboard.');
        }
    } catch (error) {
        console.error('Error copying text to clipboard:', error);
    } finally {
        document.body.removeChild(textArea);
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

    if (target.classList.contains('copyCharacterButton')) {
        const attributes = target.closest('.character-card').querySelector('.attributes').textContent;
        copyToClipboard(attributes);
    }
});