function getUrl() {
  document.getElementById("explore").addEventListener("click", () => {
    fecthApi(document.getElementById("apiUrl").value);
  });
}
getUrl();

async function fecthApi(url) {
  let response = await fetch(`${url}`);
  console.log("Response", response);
  addToHistory(url, response.status);
  if (response.status !== 200) {
    displayFailure(response);
  } else {
    await displaySuccess(response);
  }
}

async function displaySuccess(response) {
  let data = await response.json();

  displayResult(response, "Success!");
  displayData(data);
}

function displayData(data) {
  const oneResult = document.createTextNode(JSON.stringify(data, null, 4));
  document.getElementById("api").appendChild(oneResult);
}

function displayFailure(response) {
  displayResult(response, "Something went wrong!");
}

function displayResult(response, message) {
  const result = document
    .createElement("h1")
    .appendChild(document.createTextNode(` ${message} ${response.status}`));
  document.getElementById("success").appendChild(result);
}

function createHistoryCard(url, status) {
  const newCardItem = document
    .querySelector("#cardHistoryTemplate")
    .content.cloneNode(true);
  const urlHistory = document.createTextNode(`Response : ${status} ${url}`);
  newCardItem.querySelector("div").appendChild(urlHistory);
  return newCardItem;
}

function addToHistory(url, status) {
  const card = createHistoryCard(url, status);
  document.getElementById("allHistory").appendChild(card);
}

function addClearHistoryEventListener() {
  document
    .getElementById("clearHistory")
    .addEventListener("click", clearHistory);
}
function clearHistory() {
  document.querySelectorAll(".historyCard").forEach((card) => {
    card.remove();
  });
}

addClearHistoryEventListener();
