document.addEventListener('DOMContentLoaded', () => {
    fetch('data/members.json')
        .then(response => response.json())
        .then(data => {
            const card2 = document.querySelector('.card2');
            const qualifiedMembers = data.members.filter(member => member.membLevel === 'Silver' || member.membLevel === 'Gold');
            const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
            const selectedMembers = shuffledMembers.slice(0, 3);

            selectedMembers.forEach((member, index) => {
                const section = document.getElementById(`member${index + 1}`);
                
                if (section) {
                    section.innerHTML = `
                        <h2>${member.name}</h2>`;
                    const adDisplay = document.createElement("img");
                    adDisplay.src = member.ad;
                    adDisplay.alt = `${member.name} advertisement`;
                    section.appendChild(adDisplay);
                    `<p>${member.membLevel}</p>`;
                    section.classList.add('highlighted');
                }
            });
        });
});