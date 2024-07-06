
const positionInput = document.getElementById('position');
const pattern = /^[a-zA-Z\s-]{7,}$/;

if (!pattern.test(positionInput.value)) {
    event.preventDefault();
    alert('Please enter at least seven characters, including letters, hyphens, and spaces only.');
}