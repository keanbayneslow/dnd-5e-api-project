// RANDOM CHARACTER GENERATION

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

async function generateRandomCharacter() {
    const characterName = document.getElementById('characterName').value;
    if (characterName === '') {
        alert('Please enter a character name.');
        return;
    }



    const numRandomSkills = Math.floor(Math.random() * 3) + 2
    const maxRandomLanguages = Math.floor(Math.random() * 3) + 2
    const maxRandomProficiencies = 6;
    const maxRandomEquipment = 8;


    const randomRaceData = await getRandomData('https://www.dnd5eapi.co/api/races');
    const randomClassData = await getRandomData('https://www.dnd5eapi.co/api/classes');
    const randomSkillsData = await getRandomData('https://www.dnd5eapi.co/api/skills');
    const randomEquipmentData = await getRandomData('https://www.dnd5eapi.co/api/equipment');
    const randomAlignmentData = await getRandomData('https://www.dnd5eapi.co/api/alignments');
    const randomLanguageData = await getRandomData('https://www.dnd5eapi.co/api/languages');
    const randomProficiencyData = await getRandomData('https://www.dnd5eapi.co/api/proficiencies');
    const randomAbilityScoreData = await getRandomData('https://www.dnd5eapi.co/api/ability-scores');

    if (
        !randomRaceData ||
        !randomClassData ||
        !randomSkillsData ||
        !randomEquipmentData ||
        !randomAlignmentData ||
        !randomLanguageData ||
        !randomProficiencyData ||
        !randomAbilityScoreData
    ) {
        alert('Error fetching data from the API.');
        return;
    }

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



    const generatedCharacterInfo = `
    <div class="characterAttribute">
    <strong>Name:</strong> ${characterName}
    </div>
    <div class="characterAttribute" id="race">
    <strong>Race:</strong> ${randomRace}
    <button class="randomiseButton" id="randomiseRace">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="class">
    <strong>Class:</strong> ${randomClass}
    <button class="randomiseButton" id="randomiseClass">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="level">
    <strong>Level:</strong> ${randomLevel}
    <button class="randomiseButton" id="randomiseLevel">Re-Roll</button>
    </div>
    <div class="characterAttribute" id="hitPoints">
    <strong>Hit Points:</strong> ${randomHitPoints}
    <button class="randomiseButton" id="randomiseHitPoints">Re-Roll</button>
    </div>
        <p><strong>Ability Scores:</strong> ${Object.keys(randomAbilityScores).map(key => `${key}: ${randomAbilityScores[key]}`).join(', ')}</p>
        <p><strong>Languages:</strong> ${randomLanguages.join(', ')}</p>
        <p><strong>Skills:</strong> ${randomSkills.join(', ')}</p>
        <p><strong>Proficiencies:</strong> ${randomProficiencies.join(', ')}</p>
        <p><strong>Starting Equipment:</strong> ${randomEquipment.join(', ')}</p>
        <p><strong>Alignment:</strong> ${randomAlignment}</p>
    `;


    document.addEventListener('click', function (event) {
        if (event.target && event.target.className === 'randomiseButton') {
            const attributeId = event.target.getAttribute('dataAttributeId');

            if (attributeId === 'race') {
                randomiseRace();
            } else if (attributeId === 'class') {
                randomiseClass();
            } else if (attributeId === 'level') {
                randomiseLevel();
            } else if (attributeId === 'hitPoints') {
                randomiseHitPoints();
            }
        }
    });

    function randomiseRace() {
        const randomRaceData = getRandomData('https://www.dnd5eapi.co/api/races');
        randomRaceData.then((data) => {
            const randomRace = data.results[Math.floor(Math.random() * data.results.length)].name;
            document.getElementById('race').innerHTML = `<strong>Race:</strong> ${randomRace}`;
        }).catch((error) => {
            console.error('Error fetching random race data:', error);
        });
    }

    document.getElementById('generatedCharacter').innerHTML = generatedCharacterInfo;

    document.getElementById('randomiseRace').addEventListener('click', randomiseRace);
    document.getElementById('randomiseClass').addEventListener('click', randomiseClass);
    document.getElementById('randomiseLevel').addEventListener('click', randomiseLevel);
    document.getElementById('randomiseHitPoints').addEventListener('click', randomiseHitPoints);
}

const generateButton = document.getElementById('generateButton');
generateButton.addEventListener('click', generateRandomCharacter);



// SEARCH FUNCTIONALITY

const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const categorySelect = document.getElementById('categorySelect');
const searchResults = document.getElementById('searchResults');
const selectedInfo = document.getElementById('selectedInfo');

searchButton.addEventListener('click', performSearch);

async function performSearch() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categorySelect.value;

    // Clear previous results
    searchResults.innerHTML = '';
    selectedInfo.innerHTML = '';

    if (searchText.length === 0) {
        return;
    }

    try {
        // Fetch data based on the selected category
        const response = await fetch(`https://www.dnd5eapi.co/api/${selectedCategory}`);
        const data = await response.json();

        // Filter data based on search text
        const filteredData = data.results.filter(item =>
            item.name.toLowerCase().includes(searchText)
        );

        // Display search results
        filteredData.forEach(item => {
            const listItem = document.createElement('div');
            listItem.textContent = item.name;
            listItem.addEventListener('click', () => displaySelectedItem(item.url));
            searchResults.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}

async function displaySelectedItem(url) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co${url}`);
        const data = await response.json();

        // Create an HTML element to display the selected item's information
        const selectedItemDiv = document.createElement('div');

        // Loop through each property in the data and create a paragraph for it
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];
                const paragraph = document.createElement('p');

                if (Array.isArray(value)) {
                    if (key === "desc") {
                        // Handle "desc" array property (e.g., spell descriptions)
                        const descParagraph = document.createElement('p');
                        descParagraph.innerHTML = `<strong>${key}:</strong>`;
                        selectedItemDiv.appendChild(descParagraph);

                        value.forEach((descItem, index) => {
                            const descSubParagraph = document.createElement('p');
                            descSubParagraph.innerHTML = `${index + 1}. ${descItem}`;
                            selectedItemDiv.appendChild(descSubParagraph);
                        });
                    } else if (value.length > 0) {
                        // Handle other arrays with non-empty values
                        const values = value.map(item => {
                            if (typeof item === 'object') {
                                return item.name;
                            }
                            return item;
                        }).join(', ');
                        paragraph.innerHTML = `<strong>${key}:</strong> ${values}`;
                        selectedItemDiv.appendChild(paragraph);
                    }
                } else if (typeof value === 'object') {
                    // Handle nested objects
                    const subProperties = Object.keys(value)
                        .map(subKey => {
                            if (typeof value[subKey] === 'object') {
                                return `${subKey}: ${JSON.stringify(value[subKey])}`;
                            }
                            return `${subKey}: ${value[subKey]}`;
                        })
                        .join(', ');
                    paragraph.innerHTML = `<strong>${key}:</strong> { ${subProperties} }`;
                    selectedItemDiv.appendChild(paragraph);
                } else {
                    paragraph.innerHTML = `<strong>${key}:</strong> ${value}`;
                    selectedItemDiv.appendChild(paragraph);
                }
            }
        }

        // Display the selected item's information
        selectedInfo.innerHTML = '';
        selectedInfo.appendChild(selectedItemDiv);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}