//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  //! Loop through data and retrieve required data
  for (anything in allEpisodes) {
    console.log(allEpisodes[anything]);
  }
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
}

window.onload = setup;
