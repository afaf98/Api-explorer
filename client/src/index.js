import _ from "lodash";
import "../style.css";

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
  document.getElementById("api").style.color = "black";
}

function displayFailure(response) {
  displayResult(response, "Something went wrong!");
}

function clearScreen() {
  document.getElementById("success").innerText = "";
  document.getElementById("api").innerText = "";
}

function displayResult(response, message) {
  clearScreen();
  const result = document
    .createElement("h1")
    .appendChild(document.createTextNode(` ${message} ${response.status}`));
  document.getElementById("success").appendChild(result);
  if (response.status === 200) {
    document.getElementById("success").style.color = "green";
  } else {
    document.getElementById("success").style.color = "red";
  }
}

function createHistoryCard(url, status) {
  const newCardItem = document
    .querySelector("#cardHistoryTemplate")
    .content.cloneNode(true);
  const urlHistory = document.createTextNode(`Response : ${status} ${url}`);
  newCardItem.querySelector("li").appendChild(urlHistory);
  if (status === 200) {
    newCardItem.querySelector("li").classList.add("background_green");
  } else {
    newCardItem.querySelector("li").classList.add("background_red");
  }
  newCardItem
    .querySelector("button.historyButton")
    .addEventListener("click", function () {
      fecthApi(url);

      console.log("heyyyy", this);
      this.parentElement.remove();
    });

  // console.log("boh", newCardItem);
  // searchFromHistory(url, newCardItem);
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
