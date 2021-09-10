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
function filterSearchResults(arrayOfEpisodes, searchInput) {
  filteredEpisodes = arrayOfEpisodes.filter((episode) => {
    return (
      episode.summary.includes(searchInput) ||
      episode.name.includes(searchInput)
    );
  });

  //* REFACTOR THIS 👇👇👇👇👇👇
  if (numberOfFilteredEpisodes.length === allEpisodes.length) {
    numberOfFilteredEpisodes.innerText = allEpisodes.length;
  } else {
    numberOfFilteredEpisodes.innerText = `${filteredEpisodes.length}`; // displays filtered number of episodes
  }

  renderCard(filteredEpisodes);
  listOfEpisodesDropdown(filteredEpisodes);
}

//! SELECT FUNCTION

function listOfEpisodesDropdown(filteredArray) {
  createSelect.innerHTML = "";
  // renderSelect.innerText = "Select";
  // renderSelect.appendChild(createSelect);

  filteredArray.forEach((selectEpisode) => {
    let createOption = document.createElement("option"); // create option element
    createOption.text = `${formatNumber(selectEpisode.season)} - ${formatNumber(
      selectEpisode.number
    )} ${selectEpisode.name}`; // pass in episodes from array to 'option' element
    createSelect.appendChild(createOption); // append 'option' element to 'select' element
  });
  renderSelect.appendChild(createSelect);
}

//! SETUP FUNCTION

function setup() {
  allEpisodes = getAllEpisodes();
  console.log("all Episodes in setup function:", allEpisodes);
  totalNumberOfEpisodes.innerText = `${allEpisodes.length}`; // displays total number of episodes
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

    // makePageForEpisodes(allEpisodes);
  });
};

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

//! WORK OUT SEARCH FUNCTIONALITY

window.onload = setup;
