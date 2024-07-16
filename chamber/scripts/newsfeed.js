const newsFeed = document.querySelector('.feed-list');
const apiKey = "FdqS6tjKOphixah01EmcTyJsnMLlymW9IGlBa5WG"; 
const url = `https://api.thenewsapi.com/v1/news/top?locale=co&language=en&api_token=${apiKey}&limit=5`;

async function fetchNews() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayNews(data.data);  // Access the 'data' field from the response
        } else {
            throw new Error('Network response was not ok');
        }
    } catch (error) {
        console.error('Fetch error: ', error);
    }
}

function displayNews(newsItems) {
    newsFeed.innerHTML = '';  // Clear any existing news items
    newsItems.forEach(item => {
        const newsItem = document.createElement('li');
        newsItem.classList.add('feed');
        newsItem.innerHTML = `
            <h2>${item.title}</h2>
            <picture>
                <img src="${item.image_url || 'images/placeholder.png'}" alt="${item.title}" loading="lazy" style="width:100%">
            </picture>
            <p>${item.description || 'No description available'}</p>
            <a href="${item.url}" target="_blank">Read more</a>
        `;
        newsFeed.appendChild(newsItem);
    });
}

fetchNews();