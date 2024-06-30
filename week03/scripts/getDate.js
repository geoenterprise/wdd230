const optionsYear = {year: 'numeric'};
document.getElementById('year').textContent = new Date().toLocaleDateString(undefined, optionsYear);

let lastModified = document.lastModified;
const lastModifiedElement = document.getElementById('last-modified');
// lastModifiedElement.textContent = `Last modified: ${lastModified}`;

document.getElementById('last-modified').textContent = `Last modified: ${lastModified}`;
