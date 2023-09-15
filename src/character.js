// RANDOM CHARACTER GENERATION

//Sets limits for character attributes returning more than one value
const numRandomSkills = Math.floor(Math.random() * 4) + 2
const maxRandomLanguages = Math.floor(Math.random() * 2) + 1
const maxRandomProficiencies = 6;
const maxRandomEquipment = 8;


// Function to fetch data from an API endpoint
async function getRandomData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}


// Function to get random items from a list
function getRandomItems(data, maxItems) {
    const randomItems = [];
    while (randomItems.length < maxItems && randomItems.length < data.length) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomItem = data[randomIndex].name;
        if (!randomItems.includes(randomItem)) {
            randomItems.push(randomItem);
        }
    }
    return randomItems;
}

// Variables to store fetched data
let randomRaceData, randomClassData, randomSkillsData, randomEquipmentData, randomAlignmentData, randomLanguageData, randomProficiencyData, randomAbilityScoreData;


// Function to fetch data from multiple endpoints
async function fetchData() {
    try {
        // Use Promise.all to fetch data from multiple endpoints simultaneously
        const fetchPromises = [
            getRandomData('https://www.dnd5eapi.co/api/races'),
            getRandomData('https://www.dnd5eapi.co/api/classes'),
            getRandomData('https://www.dnd5eapi.co/api/skills'),
            getRandomData('https://www.dnd5eapi.co/api/equipment'),
            getRandomData('https://www.dnd5eapi.co/api/alignments'),
            getRandomData('https://www.dnd5eapi.co/api/languages'),
            getRandomData('https://www.dnd5eapi.co/api/proficiencies'),
            getRandomData('https://www.dnd5eapi.co/api/ability-scores')
        ];

        // Wait for all data to be fetched - destructuring assignment to store the fetched data in their respective variables
        [
            randomRaceData,
            randomClassData,
            randomSkillsData,
            randomEquipmentData,
            randomAlignmentData,
            randomLanguageData,
            randomProficiencyData,
            randomAbilityScoreData
        ] = await Promise.all(fetchPromises);

        // Check if any of the data requests failed
        if (fetchPromises.some(data => !data)) {
            alert('Error fetching data from the API.');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('An error occurred while fetching data.');
    }
}
// Call fetchData function before generating the character
fetchData();

// Function to generate a random character
async function generateRandomCharacter() {
    const characterName = document.getElementById('characterName').value;
    if (characterName === '') {
        alert('Please enter a character name.');
        return;
    }

    // Generate random values for character attributes
    const randomRace = randomRaceData.results[Math.floor(Math.random() * randomRaceData.results.length)].name;
    const randomClass = randomClassData.results[Math.floor(Math.random() * randomClassData.results.length)].name;
    const randomSkills = getRandomItems(randomSkillsData.results, numRandomSkills);
    const randomEquipment = getRandomItems(randomEquipmentData.results, maxRandomEquipment);
    const randomAlignment = randomAlignmentData.results[Math.floor(Math.random() * randomAlignmentData.results.length)].name;
    const randomLanguages = getRandomItems(randomLanguageData.results, maxRandomLanguages);
    const randomProficiencies = getRandomItems(randomProficiencyData.results, maxRandomProficiencies);
    const randomAbilityScores = randomAbilityScoreData.results.reduce((scores, ability) => {
        scores[ability.index] = Math.floor(Math.random() * 10) + 10;
        return scores;
    }, {});
    const randomLevel = Math.floor(Math.random() * 5) + 1;
    const randomHitPoints = 15 + randomLevel * (Math.floor(Math.random() * 8) + 4);

    // Generate character info HTML
    const generatedCharacterInfo = `
    <div class="characterAttribute">
    <strong>Name:</strong> ${characterName}
    </div>
    <div class="characterAttribute" id="race">
    <strong>Race:</strong> ${randomRace}&nbsp&nbsp&nbsp&nbsp 
    <button class="randomiseButton" id="randomiseRace">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="class">
    <strong>Class:</strong> ${randomClass}&nbsp&nbsp&nbsp&nbsp
    <button class="randomiseButton" id="randomiseClass">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="level">
    <strong>Level:</strong> ${randomLevel}&nbsp&nbsp&nbsp&nbsp
    <button class="randomiseButton" id="randomiseLevel">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="hitPoints">
    <strong>Hit Points:</strong> ${randomHitPoints}&nbsp&nbsp&nbsp&nbsp
    <button class="randomiseButton" id="randomiseHitPoints">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="abilities">
    <strong>Ability Scores:</strong> ${Object.keys(randomAbilityScores).map(key => `${key}: ${randomAbilityScores[key]}`).join(', ')}&nbsp&nbsp&nbsp&nbsp
    <button class="randomiseButton" id="randomiseAbilityScores">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="languages">
    <strong>Additional Languages:</strong> ${randomLanguages.join(', ')}&nbsp&nbsp&nbsp&nbsp 
    <button class="randomiseButton" id="randomiseLanguages">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="skills">
    <strong>Skills:</strong> ${randomSkills.join(', ')}&nbsp&nbsp&nbsp&nbsp 
    <button class="randomiseButton" id="randomiseSkills">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="proficiencies">
    <strong>Proficiencies:</strong> ${randomProficiencies.join(', ')}&nbsp&nbsp&nbsp&nbsp 
    <button class="randomiseButton" id="randomiseProficiencies">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="equipment">
    <strong>Starting Equipment:</strong> ${randomEquipment.join(', ')}&nbsp&nbsp&nbsp&nbsp 
    <button class="randomiseButton" id="randomiseEquipment">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="alignment">
    <strong>Alignment:</strong> ${randomAlignment}&nbsp&nbsp&nbsp&nbsp 
    <button class="randomiseButton" id="randomiseAlignment">Re-Roll</button>
    </div>
    `;

    //RE-ROLL FUNCTIONS

    document.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('randomiseButton')) {
            const parentDiv = event.target.parentElement;
            const attributeId = parentDiv.getAttribute('id');

            if (attributeId === 'race') {
                randomiseRace(parentDiv);
            } else if (attributeId === 'class') {
                randomiseClass(parentDiv);
            } else if (attributeId === 'level') {
                randomiseLevel(parentDiv);
            } else if (attributeId === 'hitPoints') {
                randomiseHitPoints(parentDiv);
            } else if (attributeId === 'abilities') {
                randomiseAbilityScores(parentDiv);
            } else if (attributeId === 'languages') {
                randomiseLanguages(parentDiv);
            } else if (attributeId === 'skills') {
                randomiseSkills(parentDiv);
            } else if (attributeId === 'proficiencies') {
                randomiseProficiencies(parentDiv);
            } else if (attributeId === 'equipment') {
                randomiseEquipment(parentDiv);
            } else if (attributeId === 'alignment') {
                randomiseAlignment(parentDiv);
            }
        }
    });

    // Function to re-roll the attributes
    function randomiseRace(parentDiv) {
        const randomRaceData = getRandomData('https://www.dnd5eapi.co/api/races');
        randomRaceData.then((data) => {
            const randomRace = data.results[Math.floor(Math.random() * data.results.length)].name;
            parentDiv.innerHTML = `
                <strong>Race:</strong> ${randomRace}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseRace">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random race data:', error);
        });
    }

    function randomiseClass(parentDiv) {
        const randomClassData = getRandomData('https://www.dnd5eapi.co/api/classes');
        randomClassData.then((data) => {
            const randomClass = data.results[Math.floor(Math.random() * data.results.length)].name;
            parentDiv.innerHTML = `
                <strong>Class:</strong> ${randomClass}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseClass">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random class data:', error);
        });
    }

    function randomiseLevel(parentDiv) {
        const randomLevel = Math.floor(Math.random() * 5) + 1;
        parentDiv.innerHTML = `
            <strong>Level:</strong> ${randomLevel}&nbsp&nbsp&nbsp&nbsp
            <button class="randomiseButton" id="randomiseLevel">Re-Roll</button>
        `;
    }

    function randomiseHitPoints(parentDiv) {
        const randomHitPoints = 15 + Math.floor(Math.random() * 8) + 4;
        parentDiv.innerHTML = `
            <strong>Hit Points:</strong> ${randomHitPoints}&nbsp&nbsp&nbsp&nbsp
            <button class="randomiseButton" id="randomiseHitPoints">Re-Roll</button>
        `;
    }

    function randomiseAbilityScores(parentDiv) {
        const randomAbilityScoreData = getRandomData('https://www.dnd5eapi.co/api/ability-scores');
        randomAbilityScoreData.then((data) => {
            const randomAbilityScores = data.results.reduce((scores, ability) => {
                scores[ability.index] = Math.floor(Math.random() * 10) + 10;
                return scores;
            }, {});
            const abilityScoresString = Object.keys(randomAbilityScores)
                .map((key) => `${key}: ${randomAbilityScores[key]}`)
                .join(', ');
            parentDiv.innerHTML = `
                <strong>Ability Scores:</strong> ${abilityScoresString}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseAbilityScores">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random ability scores data:', error);
        });
    }

    function randomiseLanguages(parentDiv) {
        const randomLanguageData = getRandomData('https://www.dnd5eapi.co/api/languages');
        randomLanguageData.then((data) => {
            const randomLanguages = getRandomItems(data.results, maxRandomLanguages); // You might want to define maxRandomLanguages at the beginning of your script.
            const languagesString = randomLanguages.join(', ');
            parentDiv.innerHTML = `
                <strong>Additional Languages:</strong> ${languagesString}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseLanguages">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random languages data:', error);
        });
    }

    function randomiseSkills(parentDiv) {
        const randomSkillsData = getRandomData('https://www.dnd5eapi.co/api/skills');
        randomSkillsData.then((data) => {
            const randomSkills = getRandomItems(data.results, numRandomSkills);
            const skillsString = randomSkills.join(', ');
            parentDiv.innerHTML = `
                <strong>Skills:</strong> ${skillsString}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseSkills">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random skills data:', error);
        });
    }

    function randomiseProficiencies(parentDiv) {
        const randomProficiencyData = getRandomData('https://www.dnd5eapi.co/api/proficiencies');
        randomProficiencyData.then((data) => {
            const randomProficiencies = getRandomItems(data.results, maxRandomProficiencies);
            const proficienciesString = randomProficiencies.join(', ');
            parentDiv.innerHTML = `
                <strong>Proficiencies:</strong> ${proficienciesString}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseProficiencies">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random proficiencies data:', error);
        });
    }

    function randomiseEquipment(parentDiv) {
        const randomEquipmentData = getRandomData('https://www.dnd5eapi.co/api/equipment');
        randomEquipmentData.then((data) => {
            const randomEquipment = getRandomItems(data.results, maxRandomEquipment);
            const equipmentString = randomEquipment.join(', ');
            parentDiv.innerHTML = `
                <strong>Starting Equipment:</strong> ${equipmentString}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseEquipment">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random equipment data:', error);
        });
    }

    function randomiseAlignment(parentDiv) {
        const randomAlignmentData = getRandomData('https://www.dnd5eapi.co/api/alignments');
        randomAlignmentData.then((data) => {
            const randomAlignment = data.results[Math.floor(Math.random() * data.results.length)].name;
            parentDiv.innerHTML = `
                <strong>Alignment:</strong> ${randomAlignment}&nbsp&nbsp&nbsp&nbsp
                <button class="randomiseButton" id="randomiseAlignment">Re-Roll</button>
            `;
        }).catch((error) => {
            console.error('Error fetching random alignment data:', error);
        });
    }

    document.getElementById('generatedCharacter').innerHTML = generatedCharacterInfo;

    document.getElementById('randomiseRace').addEventListener('click', randomiseRace);
    document.getElementById('randomiseClass').addEventListener('click', randomiseClass);
    document.getElementById('randomiseLevel').addEventListener('click', randomiseLevel);
    document.getElementById('randomiseHitPoints').addEventListener('click', randomiseHitPoints);
    document.getElementById('randomiseAbilityScores').addEventListener('click', randomiseAbilityScores);
    document.getElementById('randomiseLanguages').addEventListener('click', randomiseLanguages);
    document.getElementById('randomiseSkills').addEventListener('click', randomiseSkills);
    document.getElementById('randomiseProficiencies').addEventListener('click', randomiseProficiencies);
    document.getElementById('randomiseEquipment').addEventListener('click', randomiseEquipment);
    document.getElementById('randomiseAlignment').addEventListener('click', randomiseAlignment);
}

const generateButton = document.getElementById('generateButton');
const generateButtonText = document.getElementById('generateButtonText');
const characterNameInput = document.getElementById('characterName');

generateButton.addEventListener('click', generateRandomCharacter);
generateButton.addEventListener('mouseover', () => {
    generateButtonText.textContent = 'Roll to generate a random Character';
});

generateButton.addEventListener('mouseout', () => {
    generateButtonText.textContent = '';
});

characterNameInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        generateRandomCharacter();
    }
});


// Function to save the generated character
async function saveCharacter(characterData) {
    try {
        const response = await fetch('http://localhost:3000/characters', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(characterData),
        });

    } catch (error) {
        console.error('Error saving character:', error);
    }
}


// Event listener for saving a character
saveCharacterButton.addEventListener('click', () => {
    const characterName = characterNameInput.value;
    const generatedCharacterInfo = document.getElementById('generatedCharacter').innerHTML;

    const characterData = {
        name: characterName,
        attributes: generatedCharacterInfo,
    };

    saveCharacterButton.classList.add('ticked');

    saveCharacterButton.disabled = true;

    saveCharacter(characterData)
        .then(() => {
            setTimeout(() => {
                saveCharacterButton.classList.remove('ticked');
                saveCharacterButton.disabled = false;
            }, 100);
        })
        .catch((error) => {
            console.error('Error saving character:', error);
        });

    displaySavedCharacterAsCard(characterData);
});