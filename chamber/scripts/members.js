const businessCards = document.getElementById("businessCards");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
// const apiKey = "63d4f4ae7dbaca29780e9220b1b3011f";

gridButton.addEventListener("click", () => {
        // example using arrow function
    businessCards.classList.add("grid");
    businessCards.classList.remove("list");
});
listButton.addEventListener("click", () => {
    businessCards.classList.add("list");
    businessCards.classList.remove("grid");
});
   
async function getBusinessInfo(){

    const jsonsrc = "data/members.json";
    const response = await fetch(jsonsrc);

    console.log(response);

    if(!response.ok){
        throw new Error("Could not fetch members data");
    }

    return await response.json();

}
function displayBusinessInfo(data){

    businessCards.textContent = "";

    data.members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        const logoDisplay = document.createElement("img");
        logoDisplay.src = member.logo;
        logoDisplay.alt = `${member.name} logo`;

        const nameDisplay = document.createElement("h2");
        nameDisplay.textContent = member.name;

        const addressDisplay = document.createElement("p");
        addressDisplay.textContent = `Address: ${member.address}`;

        const phoneDisplay = document.createElement("p");
        phoneDisplay.textContent = `Phone: ${member.phone_number}`;

        const websiteDisplay = document.createElement("a");
        websiteDisplay.href = member.website;
        websiteDisplay.textContent = member.website;

        // const firstMember = data.members[0];
        // console.log(firstMember.logo); 

        card.appendChild(logoDisplay);
        card.appendChild(nameDisplay);
        card.appendChild(addressDisplay);
        card.appendChild(phoneDisplay);
        card.appendChild(websiteDisplay);

        businessCards.appendChild(card);
    });
}

function displayError(message) {
        businessCards.textContent = ""; // Clear previous content

        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("error");

        businessCards.appendChild(errorDisplay);
}

getBusinessInfo();