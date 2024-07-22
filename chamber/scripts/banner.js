document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('banner');
    const closeBannerButton = document.getElementById('closeBanner');
    const today = new Date().getDay();

    // Show banner on Monday (1), Tuesday (2), and Wednesday (3)
    if (today === 1 || today === 2 || today === 6) {
        banner.style.display = 'block';
    }

    // Close banner functionality
    closeBannerButton.addEventListener('click', () => {
        banner.style.display = 'none';
    });
});