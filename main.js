let currentLocation = window.location.href;

if (currentLocation.includes("index")) {
  document.getElementById("homeLink").classList.add("active");
} else if (currentLocation.includes("gallery")) {
  document.getElementById("galleryLink").classList.add("active");
} else if (currentLocation.includes("rules")) {
  document.getElementById("rulesLink").classList.add("active");
}

const bar = document.querySelector(".bar");
const navbar = document.querySelector(".navbar ul");
const closeButton = document.querySelector(".close-btn");

bar.addEventListener("click", () => {
  navbar.classList.toggle("active");

  closeButton.style.display = "block";
});

closeButton.addEventListener("click", () => {
  navbar.classList.remove("active");
  closeButton.style.display = "none";
});

const THUMBNAILS = document.querySelectorAll(".thumbnail img");
const POPUP = document.querySelector(".popup");
const POPUP_CLOSE = document.querySelector(".popup_close");
const POPUP_IMG = document.querySelector(".popup__img");
const ARROW_LEFT = document.querySelector(".popup_arrow--left");
const ARROW_RIGHT = document.querySelector(".popup_arrow--right");

let currentImgIndex;

const showNextImg = () => {
  if (currentImgIndex === THUMBNAILS.length - 1) {
    currentImgIndex = 0;
  } else {
    currentImgIndex++;
  }
  POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};

const showPreviousImg = () => {
  if (currentImgIndex === 0) {
    currentImgIndex = THUMBNAILS.length - 1;
  } else {
    currentImgIndex--;
  }
  POPUP_IMG.src = THUMBNAILS[currentImgIndex].src;
};

const closePopup = () => {
  POPUP.classList.add("fade-out");
  setTimeout(() => {
    POPUP.classList.add("hidden");
    POPUP.classList.remove("fade-out");
    THUMBNAILS.forEach((element) => {
      element.setAttribute("tabindex", 1);
    });
  }, 300);
};

THUMBNAILS.forEach((thumbnail, index) => {
  const showPopup = (e) => {
    POPUP.classList.remove("hidden");
    POPUP_IMG.src = e.target.src;
    currentImgIndex = index;
    THUMBNAILS.forEach((element) => {
      element.setAttribute("tabindex", -1);
    });
  };

  thumbnail.addEventListener("click", showPopup);

  thumbnail.addEventListener("keydown", (e) => {
    if (e.code === "Enter" || e.keyCode === 13) {
      showPopup(e);
    }
  });
});

POPUP_CLOSE.addEventListener("click", closePopup);

ARROW_RIGHT.addEventListener("click", showNextImg);

ARROW_LEFT.addEventListener("click", showPreviousImg);

const FOCUSABLE_ELEMENTS = POPUP.querySelectorAll(
  "a, button, input, select, textarea"
);
const FIRST_FOCUSABLE_ELEMENT = FOCUSABLE_ELEMENTS[0];
const LAST_FOCUSABLE_ELEMENT =
  FOCUSABLE_ELEMENTS[FOCUSABLE_ELEMENTS.length - 1];

const handleTabKey = (e) => {
  if (!POPUP.classList.contains("hidden")) {
    if (e.key === "Tab" || e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === FIRST_FOCUSABLE_ELEMENT) {
          e.preventDefault();
          LAST_FOCUSABLE_ELEMENT.focus();
        }
      } else {
        if (document.activeElement === LAST_FOCUSABLE_ELEMENT) {
          e.preventDefault();
          FIRST_FOCUSABLE_ELEMENT.focus();
        }
      }
    }
  }
};

const handleArrowKeys = (e) => {
  if (!POPUP.classList.contains("hidden")) {
    if (e.key === "ArrowRight" || e.keyCode === 39) {
      showNextImg();
    } else if (e.key === "ArrowLeft" || e.keyCode === 37) {
      showPreviousImg();
    } else if (e.key === "Escape" || e.keyCode === 27) {
      closePopup();
    }
  }
};

document.addEventListener("keydown", handleTabKey);
document.addEventListener("keydown", handleArrowKeys);

POPUP.addEventListener("click", (e) => {
  if (e.target === POPUP) {
    closePopup();
  }
});
