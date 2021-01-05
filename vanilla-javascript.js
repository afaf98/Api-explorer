function getUrl() {
  const exploreButton = document.getElementById("explore");
  exploreButton.addEventListener("click", () => {
    const url = document.getElementById("apiLink").value;
    // console.log("url", url);
    fecthApi(url);
    // createCardHistory(url);
  });
}
getUrl();

async function fecthApi(url) {
  let response = await fetch(`${url}`);
  console.log("Response", response);
  if (response.status !== 200) {
    const div = document.getElementById("success");
    const problem = document.createElement("h1");
    problem.appendChild(
      document.createTextNode(`Something went wrong! ${response.status}`)
    );
    div.appendChild(problem);
    console.log(div);
    createCardHistory(url, response.status);
    return null;
  }

  let data = await response.json();

  const div = document.getElementById("success");
  const success = document.createTextNode(`Sucess! ${response.status}`);
  const h1 = document.createElement("h1");
  var oneResult = document.createElement("div");
  h1.appendChild(success);
  div.appendChild(h1);
  if (data.results === []) {
    data.results.map((result) => {
      //   console.log("Each Result", result);
      oneResult = document.createTextNode(JSON.stringify(result, null, 4));
      div.appendChild(oneResult);
      //   console.log("RESULT", oneResult);
    });
  } else {
    oneResult = document.createTextNode(JSON.stringify(data, null, 4));
    div.appendChild(oneResult);
  }
  createCardHistory(url, response.status);
}

function createCardHistory(url, status) {
  const newCardItem = document
    .querySelector("#cardHistory")
    .content.cloneNode(true);
  console.log("Card", newCardItem);
  const urlHistory = document.createTextNode(`Response : ${status}` + `${url}`);
  //   console.log("Do I got it?", urlHistory);
  newCardItem.querySelector("div").appendChild(urlHistory);
  history(newCardItem);
  return newCardItem;
}

function history(url) {
  //   const url = document.querySelector("#cardHistory").content.cloneNode(true);
  //   const addUrl = createCardHistory(url);
  console.log("Check history ", url);
  const list = document.getElementById("allHistory");
  list.appendChild(url);
  console.log("ciao ", list);
}

function clearHistory() {
  const buttonDeleteHistory = document.getElementById("clearHistory");
  buttonDeleteHistory.addEventListener("click", () => {
    const historyToRemove = document.getElementById("allHistory");
    historyToRemove.remove();
    console.log("hi", historyToRemove);
  });
}

clearHistory();
