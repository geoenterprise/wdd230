// milliseconds to days constant = 1000 ms/s * 60 s/m * 60 m/h * 24 h/day
const msToDays = 86400000;
// today's date
const theDateToday = new Date();

const lastVisit = localStorage.getItem('lastVisit');

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