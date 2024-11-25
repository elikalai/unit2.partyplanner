const COHORT = "2410-FTB-ET-WEB-FT"; 
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    Parties: [],
};
console.log(state);
const PartyList = document.querySelector("#Parties");

const addPartyForm = document.querySelector("#addParty");
addPartyForm.addEventListener("submit", addParty);

async function render() {
    await getParties();
    renderParties();
}
render(); 

async function getParties() {
    try {
        const response = await fetch(API_URL)
        const json = await response.json();
        console.log(json.data);
        state.parties = json.data;
    } catch (error) {
        console.error(error);
    }
}

async function addParty(event) {
    event.preventDefault();
 
    await createParty(
        addPartyForm.title.value,
        addPartyForm.date.value,
        addPartyForm.location.value,
        addPartyForm.description.value
    );
}

async function createParty(title, location, date, description)
{
    try {
        const response = await fetch(API_URL, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({title, date, location, description})
        });
        const json = await response.json();
        console.log(json);
        render();
    } catch (error) {
        console.error(error);
    }
}

async function updateParty(title, date, location, description) {

    try {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify({ title, date, location, description}), 
    });
    const json = await response.json();

    if (json.error) {
        throw new Error(json.message);
    }

    render();
    } catch (error) {
        console.error(error);
    }
}

async function deleteParty(id) {
    try {
     const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
     });
     if (!response.ok) {
        throw new Error("Party could not be deleted");
     } 
     render();
    } catch (error) {
        console.error(error);
    }
}

function renderParties() {
    if (!state.Parties.length) {
        PartyList.innerHTML = 
        `<li>No parties found.</li>`;
        return;
    }

const PartyForms = state.Parties.map((party) => {
    const PartyForm = document.createElement("li");
    PartyForm.classList.add("party");
    PartyForm.innerHTML = 
    `<h2>${party.title}</h2>
     <h2>${party.location}</h2>
     <h2>${party.date}</h2>
     <p>${party.description}</p>
 `;

 const deleteButton = document.createElement("button");
 deleteButton.textContent = "Delete Party";
 PartyForm.append(deleteButton);

 deleteButton.addEventListener("click", () => deleteParty(party.id));

 return PartyForm;

});
PartyList.replaceChildren(...PartyForms)
}
