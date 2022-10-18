const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    "X-RapidAPI-Key": "ca03dc8b4amsh8fe919ef52202dbp1412f2jsn8b0561de19b7",
  },
};

let input = document.querySelector(".input");
let inputValue;
let button = document.querySelector("button");
let audio = document.querySelector(".audio");
// let slider = document.querySelector(".slider");
// audio.volume = slider.value / 100; //ползунок громкости сделать
audio.volume = 0.25;
let result = document.querySelector(".result");
let trackItems = document.createElement("div");
trackItems.classList.add("trackItems");
let artistItems = document.createElement("div");
artistItems.classList.add("artistItems");
let artists = [];

input.addEventListener("keydown", function (event) {
  if (event.key == "Enter" && input.value !== "") {
    clear();
    getApi("q=" + inputValue);
  }
});

button.addEventListener("click", function () {
  if (!input.value) return;
  clear();
  getApi("q=" + inputValue);
});

// slider.addEventListener("input", function (event) {
//   audio.volume = slider.value / 100;
// });

function clear() {
  result.innerHTML = "Подождите...";
  inputValue = input.value;
  trackItems.innerHTML = "";
  artistItems.innerHTML = "";
  artists = [];
}

function getApi(q) {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/search?" + q, options)
    .then((response) => response.json())
    .then((response) => handleData(response))
    .catch(() => getApi(q));
}

function handleData(data) {
  if (data) {
    createItems(data.data);
  }
  if (data.next) {
    getApi(data.next.split("?")[1]);
  } else if (true) {
    result.innerHTML = "";
    audio.src = "";
    result.appendChild(trackItems);
    result.appendChild(artistItems);
    fixHeight();
  }
}

function createItems(datas) {
  for (let i = 0; i < datas.length; i++) {
    let item = createItem(datas[i].album.cover_medium);

    let name = document.createElement("div");
    name.textContent = datas[i].artist.name;

    let title = document.createElement("div");
    title.textContent = datas[i].title;

    name.addEventListener("mouseenter", function () {
      this.style.color = "rgb(43, 115, 209)";
    });
    name.addEventListener("mouseleave", function () {
      this.style.color = "white";
    });

    name.addEventListener("click", function () {
      inputValue = datas[i].artist.name;
      input.value = inputValue;
      clear();
      getApi("q=" + datas[i].artist.name);
    });
    item.appendChild(name);
    item.appendChild(title);

    item.addEventListener("mouseenter", function () {
      audio.src = datas[i].preview;
    });
    item.addEventListener("mouseleave", function () {
      audio.src = "";
    });
    trackItems.appendChild(item);
    //
    if (!artists.includes(datas[i].artist.id)) {
      artists.push(datas[i].artist.id);
      let artist = createItem(datas[i].artist.picture_medium);
      let background = document.createElement("div");
      let nameArtist = document.createElement("span");
      nameArtist.textContent = datas[i].artist.name;
      background.appendChild(nameArtist);
      artist.appendChild(background);
      artist.addEventListener("mouseenter", function () {
        background.style.backgroundColor = "rgb(0, 0, 0, 60%)";
        nameArtist.style.display = "inline";
        this.style.borderColor = "red";
        audio.src = datas[i].preview;
        input.value = datas[i].artist.name + " " + datas[i].title;
      });
      artist.addEventListener("mouseleave", function () {
        nameArtist.style.display = "none";
        background.style.backgroundColor = "rgb(0, 0, 0, 0%)";
        this.style.borderColor = "gray";
        audio.src = "";
        input.value = inputValue;
      });
      artist.addEventListener("click", function () {
        inputValue = datas[i].artist.name;
        input.value = inputValue;
        clear();
        getApi("q=" + datas[i].artist.name);
      });
      artistItems.appendChild(artist);
    }
  }
}

function createItem(image) {
  let item = document.createElement("div");
  item.style.backgroundImage = "url('" + image + "')";
  item.classList.add("item");
  return item;
}

window.addEventListener("resize", fixHeight);

function fixHeight() {
  let items = document.querySelectorAll(".item");
  items.forEach((elem) => (elem.style.height = getComputedStyle(elem).width));
}
