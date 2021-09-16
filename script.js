//! SELECTORS
const renderContent = document.querySelector(".render-content");
const form = document.getElementById("form");
const search = document.getElementById("search");
const numberOfFilteredEpisodes = document.querySelector(".filtered-episodes");
const totalNumberOfEpisodes = document.querySelector(".total-episodes");
const renderSelect = document.querySelector(".render-select");
const createSelect = document.createElement("select");
const createParagraph = document.createElement("p");
const displayAllEpisodesButton = document.querySelector(".button");

let allEpisodes = [];
let filteredEpisodes = [];
let selectedEpisode;
let searchEpisodes;

// **********  TODO - Get all filtered episodes and descriptions into lower case **********
//! SEARCH BAR FUNCTIONALITY
form.addEventListener("input", (e) => {
  e.preventDefault();
  searchEpisodes = search.value.toLowerCase();
  console.log("search Episodes:", searchEpisodes);
  filterSearchResults(allEpisodes, searchEpisodes);
});

//! FILTER FUNCTION
function filterSearchResults(arrayOfEpisodes, searchInput) {
  filteredEpisodes = arrayOfEpisodes.filter((episode) => {
    return (
      episode.summary.toLowerCase().includes(searchInput) ||
      episode.name.toLowerCase().includes(searchInput)
    );
  });

  numberOfFilteredEpisodes.length === allEpisodes.length
    ? (numberOfFilteredEpisodes.innerText = allEpisodes.length)
    : (numberOfFilteredEpisodes.innerText = `${filteredEpisodes.length}`);

  renderCard(filteredEpisodes);
  listOfEpisodesDropdown(filteredEpisodes);
}

//! DISPLAY ALL EPISODES BUTTON

displayAllEpisodesButton.addEventListener("click", () => {
  setup();
});

//! SELECT FUNCTION

function listOfEpisodesDropdown(filteredArray) {
  createSelect.innerHTML = "";

  // renderSelect.appendChild(createSelect);

  filteredArray.forEach((selectEpisode) => {
    let createOption = document.createElement("option"); // create option element
    createOption.text = `Season ${formatNumber(
      selectEpisode.season
    )}  Episode ${formatNumber(selectEpisode.number)} - ${selectEpisode.name}`; // pass in episodes from array to 'option' element
    createSelect.appendChild(createOption); // append 'option' element to 'select' element
  });

  renderSelect.appendChild(createSelect);
  createSelect.addEventListener("change", (e) => {
    selectedEpisode = e.target.value.split("-")[1].toLowerCase().trim();
    filterSearchResults(allEpisodes, selectedEpisode);
  });
}

//! SETUP FUNCTION

function setup() {
  allEpisodes = getAllEpisodes();
  console.log("all Episodes in setup function:", allEpisodes);
  totalNumberOfEpisodes.innerText = `${allEpisodes.length}`; // displays total number of episodes
  // totalNumberOfEpisodesTest(allEpisodes); - REFACTOR
  numberOfFilteredEpisodes.innerText = `${allEpisodes.length}`;
  listOfEpisodesDropdown(allEpisodes);

  renderCard(allEpisodes);
}

function formatNumber(number) {
  return number < 10 ? (number = `0${number}`) : (number = `${number}`);
}

//! RENDER FUNCTION (renders all cards to screen)
const renderCard = (array) => {
  renderContent.innerHTML = "";
  array.forEach((episode) => {
    // console.log(episode.name);

    let { name, number, season, image, summary } = episode;

    const createCard = document.createElement("div");
    createCard.innerHTML = `
        <div class="movie">
          <div class="movie-episode-info">Season: ${formatNumber(
            season
          )} - Episode: ${formatNumber(number)}</div>
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
  });
};

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

//! WORK OUT SEARCH FUNCTIONALITY

window.onload = setup;
