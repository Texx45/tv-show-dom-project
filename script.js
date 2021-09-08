//! SELECTORS
const renderContent = document.querySelector(".render-content");
const form = document.getElementById("form");
const search = document.getElementById("search");
let allEpisodes = [];

//! SEARCH BAR FUNCTIONALITY

form.addEventListener("input", (e) => {
  e.preventDefault();
  const searchEpisodes = search.value;
  filterSearchResults(allEpisodes, searchEpisodes);
});

//! FILTER FUNCTION
const filterSearchResults = (arrayOfEpisodes, searchInput) => {
  const filteredEpisodes = arrayOfEpisodes.filter((episode) => {
    return (
      episode.summary.includes(searchInput) ||
      episode.name.includes(searchInput)
    );
  });
  console.log(filteredEpisodes);

  renderCard(filteredEpisodes);
};

//! SETUP FUNCTION

function setup() {
  allEpisodes = getAllEpisodes();
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
