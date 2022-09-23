window.addEventListener("resize", fixHeight);

function fixHeight() {
  let items = document.querySelectorAll(".item");
  items.forEach((elem) => (elem.style.height = getComputedStyle(elem).width));
}