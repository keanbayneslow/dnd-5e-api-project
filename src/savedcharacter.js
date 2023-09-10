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
        <button class="deleteCharacterButton" data-id="${characterData.id}">Delete</button>
        <button class="copyCharacterButton">Copy to Clipboard</button>
    `;

    card.querySelector('.viewCharacterButton').addEventListener('click', () => {
        displayCharacterDetails(characterData);
    });

    card.querySelector('.deleteCharacterButton').addEventListener('click', () => {
        // Add code here to delete the character from the server based on the characterData.id
        deleteCharacter(characterData.id);
        // Remove the card from the UI after deleting
        card.remove();
    });

    card.querySelector('.copyCharacterButton').addEventListener('click', () => {
        // Add code here to copy characterData.attributes to the clipboard
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

// Function to copy text to clipboard
function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;

    // Make the textarea invisible
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

// Add event listeners for delete and copy buttons
document.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('deleteCharacterButton')) {
        const characterId = target.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this character?')) {
            // Call the deleteCharacter function
            deleteCharacter(characterId);
            // Remove the card from the UI
            target.closest('.character-card').remove();
        }
    }

    if (target.classList.contains('copyCharacterButton')) {
        const attributes = target.closest('.character-card').querySelector('.attributes').textContent;
        // Call the copyToClipboard function
        copyToClipboard(attributes);
    }
});