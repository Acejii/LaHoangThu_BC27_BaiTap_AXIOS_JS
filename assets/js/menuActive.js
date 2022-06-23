const mainNav = document.querySelectorAll(".main-nav");
mainNav.forEach((nav) => nav.addEventListener("click", handleClick));

function handleClick(e) {
  document.querySelector(".tab-item.active").classList.remove("active");
  e.target.classList.add("active");
  // Close menu
  const closeMenu = document.querySelector(".close-menu-icon");
  const menu = document.querySelector(".menu");
  closeMenu.style.display = "none";
  menu.style.width = "0px";
}

// Hover
const tabItem = document.querySelectorAll(".tab-item");
tabItem.forEach((tab, index) => {
  tab.addEventListener("mouseover", handleMouseOver);
  tab.addEventListener("mouseout", handleMouseOut);
});
function handleMouseOver(e) {
  const hover = document.querySelector(".tab-item.e-hover");
  if (!hover) {
    e.target.classList.add("e-hover");
  } else {
    hover.classList.remove("e-hover");
    e.target.classList.add("e-hover");
  }
}

function handleMouseOut(e) {
  const hover = document.querySelector(".tab-item.e-hover");
  if (hover) {
    hover.classList.remove("e-hover");
  }
}

// Scroll

window.addEventListener("scroll", function (e) {
  const scroll = window.scrollY;
  if (scroll >= 700) {
    this.document
      .querySelector(".header")
      .classList.add(
        "fixed-header",
        "animate__animated",
        "animate__fadeInDown"
      );
  } else {
    this.document
      .querySelector(".header")
      .classList.remove(
        "fixed-header",
        "animate__animated",
        "animate__fadeInDown"
      );
  }
});

// An hien menu

function handleMenuButton() {
  const menu = document.querySelector(".menu");
  const closeMenu = document.querySelector(".close-menu-icon");
  menu.classList.toggle("open");
  if (menu.classList.contains("open")) {
    closeMenu.style.display = "block";
    menu.style.width = "300px";
  } else {
    closeMenu.style.display = "none";
    menu.style.width = "0px";
  }
}
