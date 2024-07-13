const businessCards = document.querySelector("#businessCards");
const gridButton = document.querySelector("#grid");
const listButton = document.querySelector("#list");
// const apiKey = "63d4f4ae7dbaca29780e9220b1b3011f";
const jsonsrc = "data/members.json";
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
    try {
        const response = await fetch(jsonsrc);
        if (response.ok) {
          const data = await response.json();
          // console.log(data); // testing only
          displayBusinessInfo(data)
        } else {
            throw new Error("Could not fetch members data");
        }
      } catch (error) {
          console.log(error);
      }    

}
function displayBusinessInfo(data){

    businessCards.innerHTML = "";

    data.members.forEach(member => {
        const bcard = document.createElement("div");
        bcard.classList.add("bcard");

        const logoDisplay = document.createElement("img");
        logoDisplay.src = member.logo;
        logoDisplay.alt = `${member.name} logo`;

        const nameDisplay = document.createElement("h2");
        nameDisplay.textContent = member.name;

        const addressDisplay = document.createElement("p");
        addressDisplay.textContent = member.address;

        const phoneDisplay = document.createElement("p");
        phoneDisplay.textContent = member.phone_number;

        const websiteDisplay = document.createElement("a");
        websiteDisplay.href = member.website;
        websiteDisplay.textContent = member.website;

        const firstMember = data.members[0];
        console.log(firstMember.logo); 

        bcard.appendChild(logoDisplay);
        bcard.appendChild(nameDisplay);
        bcard.appendChild(addressDisplay);
        bcard.appendChild(phoneDisplay);
        bcard.appendChild(websiteDisplay);

        businessCards.appendChild(bcard);
    });
}

function displayError(message) {
        // businessCards.textContent = ""; // Clear previous content

        const errorDisplay = document.createElement("p");
        errorDisplay.textContent = message;
        errorDisplay.classList.add("error");

        businessCards.appendChild(errorDisplay);
}

getBusinessInfo();
// const member1 = document.querySelector("#member1");
// const member2 = document.querySelector("#member2");
// const member3 = document.querySelector("#member3");

// async function displayAllMembers(data) {
//     const memberSections = document.querySelectorAll(".member-section");
//     memberSections.forEach((section, index) => {
//         displayOneBusinessInfo(section, data.members[index]);
//     });
// }
// function displayOneBusinessInfo(memberSection, member) {
//     memberSection.innerHTML = "";

//     if (member) {
//         const bcard = document.createElement("div");
//         bcard.classList.add("bcard");

//         const logoDisplay = document.createElement("img");
//         logoDisplay.src = member.logo;
//         logoDisplay.alt = `${member.name} logo`;

//         const nameDisplay = document.createElement("h2");
//         nameDisplay.textContent = member.name;

//         const addressDisplay = document.createElement("p");
//         addressDisplay.textContent = member.address;

//         const phoneDisplay = document.createElement("p");
//         phoneDisplay.textContent = member.phone_number;

//         const websiteDisplay = document.createElement("a");
//         websiteDisplay.href = member.website;
//         websiteDisplay.textContent = member.website;

//         bcard.appendChild(logoDisplay);
//         bcard.appendChild(nameDisplay);
//         bcard.appendChild(addressDisplay);
//         bcard.appendChild(phoneDisplay);
//         bcard.appendChild(websiteDisplay);

//         memberSection.appendChild(bcard);
//     } else {
//         console.error(`No member found for this section`);
//         displayError("No member found for this section");
//     }
// }


// Display specific member info in each section
// displayOneBusinessInfo(member1, 0);
// displayOneBusinessInfo(member2, 1);
// displayOneBusinessInfo(member3, 2);