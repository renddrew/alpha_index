function AlphaIndex(config) {
  this.config = {
    contentSelector: ".content",
    indexTargetSelector: "#alphIndex-links",
    headings: ["h2", "h3", "h4"],
    offsetHeight: 0,
  };

  if (config) {
    for (let key in config) {
      if (this.config.hasOwnProperty(key)) {
        this.config[key] = config[key];
      }
    }
  }

  this.init();
}

AlphaIndex.prototype.generateSlug = function (str) {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

AlphaIndex.prototype.createIndex = function () {
  let headingsMap = {};

  const contentElements = document.querySelectorAll(
    `${this.config.contentSelector} ${this.config.headings.join(", ")}`
  );
  contentElements.forEach((heading) => {
    let slug = this.generateSlug(heading.innerText);
    heading.id = slug;

    let firstLetter = heading.innerText.charAt(0).toUpperCase();
    if (!headingsMap[firstLetter]) {
      headingsMap[firstLetter] = [];
    }
    headingsMap[firstLetter].push(heading);
  });

  const letters = ["All"].concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""));
  let indexDiv = document.createElement("div");
  indexDiv.classList.add("alphIndex-index");

  letters.forEach((letter) => {
    let link = document.createElement("a");
    link.innerText = letter;
    link.dataset.letter = letter;

    if (letter === "All") {
      link.href = `javascript:void(0)`;
      link.classList.add("active");
    } else if (headingsMap[letter] && headingsMap[letter].length > 0) {
      link.href = `javascript:void(0)`;
    } else {
      link.href = "javascript:void(0)";
      link.classList.add("inactive");
    }

    link.addEventListener("click", (e) => {
      e.preventDefault();
      this.handleLetterClick(link.dataset.letter);
    });

    indexDiv.appendChild(link);
  });

  let targetElement = document.querySelector(this.config.indexTargetSelector);
  targetElement.appendChild(indexDiv);

  return headingsMap;
};

AlphaIndex.prototype.handleLetterClick = function (letter) {
  const contentElements = document.querySelectorAll(
    `${this.config.contentSelector} ${this.config.headings.join(", ")}`
  );

  // Clear active classes from all letters
  document
    .querySelectorAll(`${this.config.indexTargetSelector} a`)
    .forEach((el) => {
      el.classList.remove("active");
    });

  // Set the active class for the clicked letter
  const clickedLetterElement = document.querySelector(
    `${this.config.indexTargetSelector} a[data-letter='${letter}']`
  );
  clickedLetterElement && clickedLetterElement.classList.add("active");

  if (letter === "All") {
    contentElements.forEach((el) => {
      el.style.display = "block";
      let sibling = el.nextElementSibling;
      while (sibling && !sibling.matches(this.config.headings.join(", "))) {
        sibling.style.display = "block";
        sibling = sibling.nextElementSibling;
      }
    });
    return;
  }

  contentElements.forEach((el) => {
    el.style.display = "none";
    let sibling = el.nextElementSibling;
    while (sibling && !sibling.matches(this.config.headings.join(", "))) {
      sibling.style.display = "none";
      sibling = sibling.nextElementSibling;
    }
  });

  this.headingsMap[letter].forEach((heading) => {
    heading.style.display = "block";
    let sibling = heading.nextElementSibling;
    while (sibling && !sibling.matches(this.config.headings.join(", "))) {
      sibling.style.display = "block";
      sibling = sibling.nextElementSibling;
    }
  });

  const targetPosition =
    this.headingsMap[letter][0].getBoundingClientRect().top +
    window.pageYOffset -
    this.config.offsetHeight;
  window.scrollTo({ top: targetPosition, behavior: "smooth" });
};

AlphaIndex.prototype.init = function () {
  this.headingsMap = this.createIndex();
};
