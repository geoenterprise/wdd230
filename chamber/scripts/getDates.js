const optionsYear = {year: 'numeric'};
document.getElementById('year').textContent = new Date().toLocaleDateString(undefined, optionsYear);

let lastModified = document.lastModified;
const lastModifiedElement = document.getElementById('last-modified');
// lastModifiedElement.textContent = `Last modified: ${lastModified}`;

document.getElementById('last-modified').textContent = `Last modified: ${lastModified}`;

// milliseconds to days constant = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const msToDays = 86400000;
// today's date
const theDateToday = new Date();

const lastVisit = localStorage.getItem('lastVisit');

// only for the form----
const formattedDate = theDateToday.toISOString();
// Set the value of the hidden input field
document.getElementById('timestamp').value = formattedDate;
// Finish form ---------
// initialize display elements
// const todayElement = document.querySelector("#today");

const visitMessageElement = document.querySelector("#visit-message");

// processing
const today = Date.now();

let message;
if (!lastVisit) {
    // First visit
    message = "Welcome! Let us know if you have any questions.";
} else {
    const lastVisitDate = parseInt(lastVisit);
    const daysBetweenVisits = (today - lastVisitDate) / msToDays;

    if (daysBetweenVisits < 1) {
        message = "Back so soon! Awesome!";
    } else {
        const days = Math.floor(daysBetweenVisits);
        message = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
}
// Display the message
visitMessageElement.textContent = message;

// Store the current date and time as the last visit date in localStorage
localStorage.setItem('lastVisit', today);