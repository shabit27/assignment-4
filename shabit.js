async  function fetchCountryData() {
    const countryName = document.getElementById('countryInput').value;
    const countryGrid = document.getElementById('countryGrid');
    countryGrid.innerHTML = '<p>Loading...</p>';

    try {
        const countryResponse = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const countryData = await countryResponse.json();

        countryGrid.innerHTML = '';

        countryData.forEach(country => {
            const card = document.createElement('div');
            card.className = 'card';

            card.innerHTML = `
             <img src="${country.flags.svg}" alt="Flag of ${country.name.common}" class="flag" />
                <h3>${country.name.common}</h3>
                <p>Region: ${country.region}</p>
                <p>Population: ${country.population.toLocaleString()}</p>
                <button onclick="fetchWeatherData('${country.capital}', '${country.name.common}')">More Details</button>
            `;

            countryGrid.appendChild(card);
        });
    } catch (error) {
        countryGrid.innerHTML = '<p>Error fetching data. Please try again.</p>';
    }
}

async function fetchWeatherData(capital, countryName) {
    const countryGrid = document.getElementById('countryGrid');

    try {
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=35&longitude=139&current_weather=true`); // Replace with a valid API and dynamic coordinates
        const weatherData = await weatherResponse.json();

        alert(`Weather for ${countryName} (Capital: ${capital}):\nTemperature: ${weatherData.current_weather.temperature}°C`);
    } catch (error) {
        alert('Error fetching weather data.');
    }
}