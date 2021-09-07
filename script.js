//You can edit ALL of the code here
const renderContent = document.querySelector(".render-content");

function setup() {
  const allEpisodes = getAllEpisodes();
  //! Loop through data and retrieve required data
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

window.onload = setup;
