//! SELECTORS
const renderContent = document.querySelector(".render-content");
const form = document.getElementById("form");
const search = document.getElementById("search");
const numberOfFilteredEpisodes = document.querySelector(".filtered-episodes");
const totalNumberOfEpisodes = document.querySelector(".total-episodes");
const renderSelect = document.querySelector(".render-select");
const createSelect = document.createElement("select");
const createParagraph = document.createElement("p");

let allEpisodes = [];
let filteredEpisodes = [];

//! SEARCH BAR FUNCTIONALITY
//* todo - Search filter needs to work with toLowerCase() & trim()
form.addEventListener("input", (e) => {
  e.preventDefault();
  const searchEpisodes = search.value;
  console.log("search Episodes:", searchEpisodes);
  filterSearchResults(allEpisodes, searchEpisodes);
});

//! FILTER FUNCTION
const filterSearchResults = (arrayOfEpisodes, searchInput) => {
  filteredEpisodes = arrayOfEpisodes.filter((episode) => {
    return (
      episode.summary.includes(searchInput) ||
      episode.name.includes(searchInput)
    );
  });

  //* REFACTOR THIS 👇👇👇👇👇👇
  if (numberOfFilteredEpisodes.length === allEpisodes.length) {
    numberOfFilteredEpisodes.innerText = 73;
  } else {
    numberOfFilteredEpisodes.innerText = `${filteredEpisodes.length}`; // displays filtered number of episodes
  }

  renderCard(filteredEpisodes);
};

//! SELECT FUNCTION
const testEpisodes = ["red", "blue", "green", "yellow", "pink", "brown"];

function listOfEpisodesDropdown(testEpisodes) {
  console.log(testEpisodes);
  renderSelect.innerText = "Select";
  renderSelect.appendChild(createSelect);

  testEpisodes.forEach((selectEpisode) => {
    let createOption = document.createElement("option"); // create option element
    createSelect.appendChild(createOption); // append 'option' element to 'select' element
    createOption.innerText = selectEpisode; // pass in colours from array to 'option' element
  });
}

listOfEpisodesDropdown(testEpisodes);

//! SETUP FUNCTION

function setup() {
  allEpisodes = getAllEpisodes();
  console.log("all Episodes in setup function:", allEpisodes);
  totalNumberOfEpisodes.innerText = `${allEpisodes.length}`; // displays total number of episodes
  numberOfFilteredEpisodes.innerText = `${allEpisodes.length}`;

  renderCard(allEpisodes);
}

//! RENDER FUNCTION (renders all cards to screen)
const renderCard = (array) => {
  renderContent.innerHTML = "";
  array.forEach((episode) => {
    // console.log(episode.name);

    let { name, number, season, image, summary } = episode;

    number < 10 ? (number = `0${number}`) : (number = `${number}`);

    season < 10 ? (season = `0${season}`) : (season = `${season}`);

    const createCard = document.createElement("div");
    createCard.innerHTML = `
        <div class="movie">
          <div class="movie-episode-info">Season: ${season} - Episode: ${number}</div>
            <img
              src="${image.medium}"
              alt="${name}"
            />
         <div class="movie-info">
              <h2>${name}
              </div>
         <div class="summary">
              <h2>Episode Summary</h2>
              <p>${summary}</p>
         </div>
       </div>

        `;
    renderContent.appendChild(createCard);

    // makePageForEpisodes(allEpisodes);
  });
};

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

//! WORK OUT SEARCH FUNCTIONALITY

window.onload = setup;
