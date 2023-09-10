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

        // Create a definition list for the key-value pairs
        const dl = document.createElement('dl'); //definition list
        
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const value = data[key];

                // Create a definition term (dt) for the key
                const dt = document.createElement('dt'); //definition term
                dt.textContent = key;
                dl.appendChild(dt);

                // Create a definition description (dd) for the value
                const dd = document.createElement('dd'); //definition description

                if (Array.isArray(value)) {
                    if (key === "desc") {
                        // Handle "desc" array property (e.g., spell descriptions)
                        dd.innerHTML = value.map((descItem, index) => `${index + 1}. ${descItem}`).join('<br>');
                    } else if (value.length > 0) {
                        // Handle other arrays with non-empty values
                        const values = value.map(item => {
                            if (typeof item === 'object') {
                                return item.name;
                            }
                            return item;
                        }).join(', ');
                        dd.textContent = values;
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
                    dd.textContent = `{ ${subProperties} }`;
                } else {
                    dd.textContent = value;
                }

                dl.appendChild(dd);
            }
        }

        // Append the definition list to the selected item's div
        selectedItemDiv.appendChild(dl);

        // Display the selected item's information
        selectedInfo.innerHTML = '';
        selectedInfo.appendChild(selectedItemDiv);
    } catch (error) {
        console.error('Error fetching or processing data:', error);
    }
}