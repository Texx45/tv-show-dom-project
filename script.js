//! SELECTORS
const renderContent = document.querySelector(".render-content");
const form = document.getElementById("form");
const search = document.getElementById("search");

//! SEARCH BAR FUNCTIONALITY

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchEpisodes = search.value;
  console.log(searchEpisodes); // returns value from search input
  search.value = ""; // clears search value
});

//! SETUP FUNCTION TO RENDER INFO TO SCREEN
function setup() {
  const allEpisodes = getAllEpisodes();
  //? Loop through data and retrieve required data
  for (episode in allEpisodes) {
    console.log(allEpisodes[episode]);

    let { name, number, season, image, summary } = allEpisodes[episode];

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
  }
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

//! WORK OUT SEARCH FUNCTIONALITY

window.onload = setup;
