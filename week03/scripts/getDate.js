const optionsYear = {year: 'numeric'};
document.getElementById('year').textContent = new Date().toLocaleDateString(undefined, optionsYear);
