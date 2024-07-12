const baseURL = "https://geoenterprise.github.io/wdd230/";

const linksURL = "https://geoenterprise.github.io/wdd230/data/links.json";


async function getLinks(){

    const response = await fetch(linksURL);
    
    
    // console.log(response);
    

    if(!response.ok){
        throw new Error("Could not fetch links");
    }
    // console.log(data);
    const data = await response.json();
    displayLinks(data)
}



function displayLinks(data) {

    // card.innerHTML = "";
    const section = document.querySelector(".card");
    const list = section.querySelector("ul");
    list.innerHTML = "";

    
    data.weeks.forEach(week => {
        const listItem = document.createElement("li");
        listItem.textContent = `${week.week}: `;

        week.links.forEach((link, index) => {
            const anchor = document.createElement("a");
            anchor.href = link.url.startsWith("http") ? link.url : `${baseURL}${link.url}`;
            anchor.textContent = link.title;

            listItem.appendChild(anchor);
            
            if (index < week.links.length - 1) {
                listItem.appendChild(document.createTextNode(" | "));
            }
        });

        list.appendChild(listItem);
    });
}

getLinks();
