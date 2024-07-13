const currentTemp = document.querySelector('#weather-info');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');
const apiKey = "3dd3a034ad96bb287cb4ff6817aaedb8";
const lat = "4.13";
const lon = "-73.63";

const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;


async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        // console.log(data); // testing only
        displayResults(data); 
      } else {
          throw Error(await response.text());
      }
    } catch (error) {
        console.log(error);
    }
}
  
apiFetch();

function displayResults(data) {
    
    weatherIcon.innerHTML = "";
    const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    let desc = data.weather[0].description;    
    // weatherIcon.setAttribute('src', iconsrc);
    // weatherIcon.setAttribute('alt', desc);
    currentTemp.innerHTML = `<img src="${iconsrc}" alt="${desc}">${data.main.temp}&deg;F - ${desc.charAt(0).toUpperCase() + desc.slice(1)}`;
}
